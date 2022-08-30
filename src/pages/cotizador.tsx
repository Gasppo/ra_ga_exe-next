import { Slide } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import { useGetRole } from "../utils/useGetRole";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ClothesCategory, Complexity } from "@prisma/client";
import { useQuery } from "react-query";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";
import Image from "next/image";
import PriceCheckerSteps from "../UI/Price Checker/PriceCheckerSteps";
import ModelForm from "../UI/Price Checker/ModelForm";
import DevelopmentForm from "../UI/Price Checker/DevelopmentForm";
import ProductionForm from "../UI/Price Checker/ProductionForm";



type PriceCheckerModel = {
    cliente: string,
    tipoPrenda: ClothesCategory | '',
    complejidad: Complexity | ''
}

const getGlothes = () => fetch('/api/clothes/obtain').then(res => res.json())
const getComplexity = () => fetch('/api/complexity/obtain').then(res => res.json())

const Home: NextPage = () => {

    const { data: sessionData } = useSession()
    const { data: clothesData, isFetching: isFetchingClothes } = useQuery<ClothesCategory[]>(['clothes'], getGlothes, { refetchOnWindowFocus: false });
    const { data: complexityData, isFetching: isFetchingComplexity } = useQuery<Complexity[]>(['complexities'], getComplexity, { refetchOnWindowFocus: false });

    const role = useGetRole(sessionData?.user?.email || '')
    const [price, setPrice] = useState(0)
    const [step, setStep] = useState(0)

    const [priceCheckerModel, setPriceCheckerModel] = useState<PriceCheckerModel>({ cliente: '', tipoPrenda: '', complejidad: '' })

    const [continueButton, setContinueButton] = useState(true)
    const [goBackButton, setGoBackButton] = useState(true)

    const steps = ['Modelo', 'Desarrollo', 'Produccion']

    const isStepOptional = (index: number) => index === 1

    const advanceStep = () => {
        if (step < 2)
            setStep(step + 1)
        else
            alert('Cannot advance anymore !!')
    }

    const goBackOneStep = () => {
        if (step > 0)
            setStep(step - 1)
    }

    useEffect(() => {
        verifyCanContinue()
        verifyCanGoBack()
        formView()
    }, [step])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceCheckerModel(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        console.log('Model vale:', priceCheckerModel)
        console.log('Event vale: ', event)
    }

    const handleClothesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceCheckerModel(prev => ({
            ...prev,
            [event.target.name]: clothesData.find(clothesType => clothesType.id === event.target.value)
        }))
        verifyCanContinue()
    }

    const handleComplexityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceCheckerModel(prev => ({
            ...prev,
            [event.target.name]: complexityData.find(clothesType => clothesType.id === event.target.value)
        }))
        verifyCanContinue()
    }

    const verifyCanContinue = () => {
        if ((priceCheckerModel.complejidad !== '') && (priceCheckerModel.tipoPrenda !== ''))
            setContinueButton(false)
        if (step === 2)
            setContinueButton(true)
    }

    const verifyCanGoBack = () => {
        if (step === 1 || step === 2)
            setGoBackButton(false)
        else if (step === 0)
            setGoBackButton(true)
    }

    const formView = () => {
        console.log('Step is', step)
        switch (step) {
            case 0:
                return (<ModelForm clothesData={clothesData} complexityData={complexityData} sessionData={sessionData} priceCheckerModel={priceCheckerModel} handleComplexityChange={handleComplexityChange} handleClothesChange={handleClothesChange} />)
            case 1:
                return (<DevelopmentForm sessionData={sessionData} />)
            case 2:
                return (<ProductionForm sessionData={sessionData} />)
        }

    }

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
                        <LoadingIndicator show={isFetchingClothes || isFetchingComplexity}>

                            <div>
                                <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 md:ml-7" onClick={advanceStep}>
                                    Cotizador
                                </h1>
                            </div>

                            <PriceCheckerSteps step={step} steps={steps} price={price} isStepOptional={isStepOptional} />

                            <div className="md:mt-9 flex justify-evenly">
                                <div className="hidden md:flex w-2/12 justify-center place-content-center relative">
                                    <Image src={priceCheckerModel.tipoPrenda !== '' ? priceCheckerModel.tipoPrenda.picture : ''} layout="fill" objectFit="contain" alt="Seleccione prenda.." />
                                </div>
                                {formView()}
                            </div>

                            <div className="flex justify-end w-10/12 space-x-4 md:mt-24">
                                <div><Button variant="outlined" disabled={goBackButton} onClick={goBackOneStep}>Atrás</Button></div>
                                <div><Button variant="outlined" disabled={continueButton} onClick={advanceStep}>Continuar</Button></div>
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

    return { props: { session } };
};
