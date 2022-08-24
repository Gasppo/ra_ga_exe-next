import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
const Home: NextPage = () => {

  const isFetching = false


  return (
    <div className="bg-split-white-black">
      <Head>
        <title>Ra_Ga.exe</title>
        <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderBar />
      <main>
        <div className="container mx-auto flex flex-col items-center justify-center text-center min-h-screen p-4 bg-white mt-20 rounded-xl shadow-2xl">
          {!isFetching && <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
            Pagina en desarrollo
          </h1>}
          {isFetching && <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
            Cargando...
          </h1>}
        </div>
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
