import { Slide } from "@mui/material";
import HeaderBar from "@UI/Generic/HeaderBar";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from 'next/router';
import Footer from "../../../UI/Generic/Footer";
import PasswordReset from "../../../UI/user/reset/PasswordReset";
import ErrorAlerter from "../../../utils/ErrorHandler/ErrorAlerter";

const Home: NextPage = () => {

    const router = useRouter()
    const { resetToken } = router.query as { resetToken: string }


    return (
        <div className="bg-split-white-black">
            <Head>
                <title>HS-Taller</title>
                <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderBar />
            <main>
                <ErrorAlerter />
                <Slide in={true} timeout={500} direction='up'>
                    <div className="container mx-auto flex flex-col min-h-[80vh] md:min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                        <PasswordReset token={resetToken} />
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
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: { session } };
};
