import { Slide } from "@mui/material";
import Button from '@mui/material/Button';
import { ClothesCategory, Complexity } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from "react-query";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import DevelopmentForm from "../UI/cotizador/Price Checker/DevelopmentForm";
import ModelForm from "../UI/cotizador/Price Checker/ModelForm";
import PriceCheckerSteps from "../UI/cotizador/Price Checker/PriceCheckerSteps";
import ProductionForm from "../UI/cotizador/Price Checker/ProductionForm";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";
import { boolean } from "zod";



export type PriceCheckerModel = {
    cliente: string,
    tipoPrenda: ClothesCategory | '',
    complejidad: Complexity | ''
}

export type PriceCheckerDevelopmentForm = {
    molderiaBase: {
        selected: boolean
    },
    digitalizacionYProgresion: {
        selected: boolean,
        moldes: number,
        avios: number
    },
    impresionMolde: {
        selected: boolean,
        meters: number
    },
    geometral: {
        selected: boolean
    },
    corteMuestra: {
        selected: boolean,
        telaCorte: string
    },
    confeccionMuestrista: {
        selected: boolean
    },
    muestraProduccion: {
        selected: boolean
    },
    envios: {
        selected: boolean,
        viajes: number,
        total: number
    }
}

export type PriceCheckerProductionForm = {
    fichaTecnica: {
        selected: boolean,
        cantidad: number
    },
    muestraProduccion: {
        selected: boolean
    },
    programacionTizada: {
        selected: boolean,
        metros: number
    },
    impresionTizada: {
        selected: boolean,
        metros: number
    },
    corte: {
        selected: boolean,
        cantPrendas: number,
        precioPorPrenda: number
    },
    confeccion: {
        selected: boolean,
        cantPrendas: number,
        precioPorPrenda: number
    },
    envios: {
        selected: boolean,
        viajes: number
    }
}

const getGlothes = () => fetch('/api/clothes/obtain').then(res => res.json())
const getComplexity = () => fetch('/api/complexity/obtain').then(res => res.json())

const Home: NextPage = () => {

    const { data: clothesData, isFetching: isFetchingClothes } = useQuery<ClothesCategory[]>(['clothes'], getGlothes, { refetchOnWindowFocus: false });
    const { data: complexityData, isFetching: isFetchingComplexity } = useQuery<Complexity[]>(['complexities'], getComplexity, { refetchOnWindowFocus: false });

    const [price] = useState(0)
    const [step, setStep] = useState(0)

    const [priceCheckerModel, setPriceCheckerModel] = useState<PriceCheckerModel>({
        cliente: '',
        tipoPrenda: '',
        complejidad: ''
    })
    const [priceCheckerDevelopmentForm, setPriceCheckerDevelopmentForm] = useState<PriceCheckerDevelopmentForm>({
        molderiaBase: { selected: false },
        digitalizacionYProgresion: { selected: false, moldes: 0, avios: 0 },
        impresionMolde: { selected: false, meters: 0 },
        geometral: { selected: false },
        corteMuestra: { selected: false, telaCorte: '' },
        confeccionMuestrista: { selected: false },
        muestraProduccion: { selected: false },
        envios: { selected: false, viajes: 0, total: 0 }
    })
    const [priceCheckerProductionForm, setPriceCheckerProductionForm] = useState<PriceCheckerProductionForm>({
        fichaTecnica: { selected: false, cantidad: 0 },
        muestraProduccion: { selected: false },
        programacionTizada: { selected: false, metros: 0 },
        impresionTizada: { selected: false, metros: 0 },
        corte: { selected: false, cantPrendas: 0, precioPorPrenda: 0 },
        confeccion: { selected: false, cantPrendas: 0, precioPorPrenda: 0 },
        envios: { selected: false, viajes: 0 }
    })

    const steps = ['Modelo', 'Desarrollo', 'Produccion']
    const backDisabled = step === 0
    const continueDisabled = step === steps.length - 1
    const isStepOptional = (index: number) => false

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

    function handleChangeGeneric<Model>(newData: Model[keyof Model], field: keyof Model, updateStateFunction: Dispatch<SetStateAction<Model>>) {
        updateStateFunction(prev => ({
            ...prev,
            [field]: newData
        }))
    }

    function handleChangeModel(newData: PriceCheckerModel[keyof PriceCheckerModel], field: keyof PriceCheckerModel) {
        handleChangeGeneric(newData, field, setPriceCheckerModel)
    }

    function handleChangeDevelopment(newData: PriceCheckerDevelopmentForm[keyof PriceCheckerDevelopmentForm], field: keyof PriceCheckerDevelopmentForm) {
        handleChangeGeneric(newData, field, setPriceCheckerDevelopmentForm)
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
                    <div>
                        <LoadingIndicator show={isFetchingClothes || isFetchingComplexity}>
                            <div className="container mx-auto flex flex-col min-h-[80vh] md:min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                                <div  >
                                    <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 md:ml-7" onClick={advanceStep}>
                                        Cotizador
                                    </h1>
                                </div>
                                <PriceCheckerSteps step={step} steps={steps} price={price} isStepOptional={isStepOptional} />

                                <div className="md:mt-9 grow flex justify-evenly">
                                    <div className="hidden md:flex w-2/12 justify-center place-content-center relative">
                                        <Image src={priceCheckerModel.tipoPrenda !== '' ? priceCheckerModel.tipoPrenda.picture : ''} layout="fill" objectFit="contain" alt="Seleccione prenda.." />
                                    </div>
                                    {step === 0 && <ModelForm clothesData={clothesData} complexityData={complexityData} priceCheckerModel={priceCheckerModel} onChangeModel={handleChangeModel} />}
                                    {step === 1 && <DevelopmentForm priceCheckerDevelopmentForm={priceCheckerDevelopmentForm} complexityData={complexityData} onChangeDevelopment={handleChangeDevelopment} />}
                                    {step === 2 && <ProductionForm />}
                                </div>

                                <div className="flex justify-center md:justify-end w-full md:w-10/12 space-x-4 mt-7 mb-7 md:mt-24">
                                    <div>
                                        <Button variant="outlined" disabled={backDisabled} onClick={goBackOneStep}>Atrás</Button>
                                    </div>
                                    <div>
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

    return { props: { session } };
};
