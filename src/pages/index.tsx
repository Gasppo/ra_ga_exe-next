import { Slide } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import { useGetRole } from "../utils/useGetRole";
const Home: NextPage = () => {

  const { data } = useSession()
  const isFetching = false
  const role = useGetRole(data?.user?.email || '')

  return (
    <div className="bg-split-white-black">
      <Head>
        <title>Ra_Ga.exe</title>
        <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />
      <main>
        <Slide in={true} timeout={500} direction='up'>
          <div className="container mx-auto flex flex-col items-center justify-center text-center min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
            <>
              {!isFetching && <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
                Pagina en desarrollo
              </h1>}
              {isFetching && <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
                Cargando...
              </h1>}
              <h1>
                Rol de usuario: {role}
              </h1>
            </>
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
