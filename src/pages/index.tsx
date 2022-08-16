import type { NextPage } from "next";
import Head from "next/head";
import GithubLink from "../UI/index/GithubLink";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ra_Ga.exe</title>
        <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Hola <span className="text-purple-300">Amigos</span>
        </h1>
        <p className="text-2xl text-gray-700">Bienvenidos</p>
        <div>Desarrollado por </div>
        <div className="flex flex-row my-10">
          <GithubLink href="https://github.com/RamaOnate" label="Rama" />
          <GithubLink href="https://github.com/Gasppo" label="Gasppo" />
          <GithubLink href="https://github.com/tutividela" label="Tuti" />
        </div>
      </main>
    </>
  );
};

export default Home;
