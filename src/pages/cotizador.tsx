import { Slide } from "@mui/material";
import Button from '@mui/material/Button';
import { ClothesCategory, Complexity } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import DevelopmentForm from "../UI/cotizador/Price Checker/DevelopmentForm";
import ModelForm from "../UI/cotizador/Price Checker/ModelForm";
import PriceCheckerSteps from "../UI/cotizador/Price Checker/PriceCheckerSteps";
import ProductionForm from "../UI/cotizador/Price Checker/ProductionForm";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import { CotizadorForm, emptyCotizadorForm } from "../UI/Types/cotizadorTypes";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";


const getGlothes = () => fetch('/api/clothes/obtain').then(res => res.json())
const getComplexity = () => fetch('/api/complexity/obtain').then(res => res.json())

const Home: NextPage = () => {


    const { data: clothesData, isFetching: isFetchingClothes, } = useQuery<ClothesCategory[]>(['clothes'], getGlothes, { refetchOnWindowFocus: false });
    const { data: complexityData, isFetching: isFetchingComplexity } = useQuery<Complexity[]>(['complexities'], getComplexity, { refetchOnWindowFocus: false });
    const { data: sessionData } = useSession()
    const [price] = useState(0)
    const [step, setStep] = useState(0)


    const steps = ['Modelo', 'Desarrollo', 'Produccion']

    const isStepOptional = () => false

    const advanceStep = () => {
        if (step < 2)
            setStep(prev => prev + 1)
        else
            alert('Cannot advance anymore !!')
    }

    const goBackOneStep = () => {
        if (step > 0)
            setStep(prev => prev - 1)
    }

    const formContext = useForm({
        defaultValues: { ...emptyCotizadorForm, user: sessionData?.user }
    })

    const clothesName = formContext.watch('tipoPrenda.name')
    const image = useMemo(() => clothesData?.find(el => el.name === clothesName), [clothesData, clothesName])?.picture

    const modelFormComplete = formContext.watch()
    const disableContinueModel = !modelFormComplete.tipoPrenda || !modelFormComplete.complejidad

    const backDisabled = step === 0
    const continueDisabled = step === steps.length - 1 || disableContinueModel



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
                    <div>
                        <LoadingIndicator show={isFetchingClothes || isFetchingComplexity}>
                            <div className="container mx-auto flex flex-col min-h-[80vh] md:min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                                <div  >
                                    <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 md:ml-7" onClick={advanceStep}>
                                        Cotizador
                                    </h1>
                                </div>
                                <PriceCheckerSteps step={step} steps={steps} price={price} isStepOptional={isStepOptional} />
                                <FormProvider {...formContext} >
                                    <form onSubmit={formContext.handleSubmit((data) => { console.log(data) })}>
                                        <div className="md:mt-9 grow flex justify-evenly">
                                            <div className="hidden md:flex w-2/12 justify-center place-content-center relative">
                                                <Image src={image} layout="fill" objectFit="contain" alt="Seleccione prenda.." />
                                            </div>
                                            {step === 0 && <ModelForm clothesData={clothesData} complexityData={complexityData} />}
                                            {step === 1 && <DevelopmentForm complexityData={complexityData} />}
                                            {step === 2 && <ProductionForm />}
                                        </div>
                                    </form>
                                </FormProvider>
                                <div className="flex justify-center md:justify-end w-full md:w-10/12 space-x-4 mt-7 mb-7 md:mt-24">
                                    <div className="mx-4" >
                                        <Button variant="outlined" disabled={backDisabled} onClick={goBackOneStep}>Atrás</Button>
                                    </div>
                                    <div className="mx-4" >
                                        <Button variant="outlined" disabled={continueDisabled} onClick={advanceStep}>Continuar</Button>
                                    </div>
                                </div>
                            </div>
                        </LoadingIndicator>
                    </div>
                </Slide>
            </main>
            <Footer />
        </div >
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: { session } };
};
