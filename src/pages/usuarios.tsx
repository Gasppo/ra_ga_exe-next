import { Slide } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import UsuariosDashboard from "../UI/index/Dashboard/UsuariosDashboard";
import Footer from "../UI/Generic/Footer";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import HeaderBar from "@UI/Generic/HeaderBar";
import { obtainRole } from "@backend/dbcalls/user";
import { adminRole } from "@utils/roles/SiteRoles";


const Home: NextPage = () => {

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
                            <UsuariosDashboard />
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

    const getUserRole = await obtainRole(session?.user?.email || '');

    if (!session || getUserRole?.role?.name !== adminRole) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: { session } };
};
