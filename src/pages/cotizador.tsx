import { Slide, Step, StepLabel, Stepper, Typography } from "@mui/material";
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

    const steps = ['uno', 'dos']

    const isStepOptional = (index: number) => index === 1
    console.log(data)
    
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

                    <div className="container mx-auto flex flex-col min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                        <div>
                            <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700">
                                Cotizador
                            </h1>
                        </div>
                        <div className="flex flex-row mt-10 justify-between">
                            <div className="hidden md:flex md:displ md:border-r-2 md:pr-4 md:ml-4 md:w-1/5">
                                <Stepper activeStep={0} orientation='vertical'>
                                    {steps.map((label, index) => {
                                        const stepProps: { completed?: boolean } = {};
                                        const labelProps: {
                                            optional?: React.ReactNode;
                                        } = {};
                                        if (isStepOptional(index)) {
                                            labelProps.optional = (
                                                <Typography variant="caption">(Optional)</Typography>
                                            );
                                        }
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </div>
                            <div className="ml-4" >
                                Content
                            </div>
                            <div className="w-0"/>
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
