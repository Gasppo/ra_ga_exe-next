import { Slide } from "@mui/material";
import HeaderBar from "@UI/Generic/HeaderBar";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import { getRole } from "@utils/queries/user";
import { adminRole } from "@utils/roles/SiteRoles";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import Footer from "../UI/Generic/Footer";
import DashboardAdmin from "../UI/index/Dashboard/DashboardAdmin";
import DashboardNoAdmin from "../UI/index/Dashboard/DashboardNoAdmin";
import DashboardDesconectado from "../UI/index/Dashboard/DashboardDesconectado";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";

const Home: NextPage = () => {

  const { data } = useSession()
  const { addError } = useContext(ErrorHandlerContext)

  //const role = useGetRole(data?.user?.email || '')

  const { data: roleData } = useQuery(['userRole', data?.user?.email], () => data?.user?.email ? getRole(data?.user?.email) : null,
    { refetchOnWindowFocus: false, onError: (error) => addError(JSON.stringify(error)) }
  )

  React.useEffect(() => {
    console.log('ROLE DATA', roleData, ' with current time being ', new Date())
  }, [roleData])

  return (
    <div className="bg-split-white-black">
      <Head>
        <title>HS-Taller</title>
        <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />
      <main>
        <Slide in={true} timeout={500} direction='up'>
          <div>
            <ErrorAlerter />
            <div className="container mx-auto flex flex-col min-h-[80vh] md:min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
              <div className="flex justify-between" >
                <div />
              </div>
              {!data?.user && <DashboardDesconectado />}
              {roleData && data?.user && (roleData?.name !== adminRole) && <DashboardNoAdmin roleName={roleData?.name} />}
              {roleData && data?.user && (roleData?.name === adminRole) && <DashboardAdmin />}
            </div>
          </div>
        </Slide>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  return { props: { session } };
};
