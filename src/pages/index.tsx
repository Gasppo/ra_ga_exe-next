import { Button, Slide } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import DashboardAdmin from "../UI/index/Dashboard/DashboardAdmin";
import DashboardCliente from "../UI/index/Dashboard/DashboardCliente";
import DashboardDesconectado from "../UI/index/Dashboard/DashboardDesconectado";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import { useGetRole } from "../utils/useGetRole";

const Home: NextPage = () => {

  const { data } = useSession()
  const role = useGetRole(data?.user?.email || '')


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
              <div className="flex justify-between " >
                <div />
                {data?.user && <div className="hidden md:flex md:mr-10 mt-10" >
                  <div className="rounded-2xl" >
                    <Link href={'/cotizador'}>
                      <Button variant="text" >Nueva Orden</Button>
                    </Link>
                  </div>
                </div>}
              </div>
              {!data?.user && <DashboardDesconectado />}
              {data?.user && role !== 'admin' && <DashboardCliente />}
              {data?.user && role === 'admin' && <DashboardAdmin />}
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
