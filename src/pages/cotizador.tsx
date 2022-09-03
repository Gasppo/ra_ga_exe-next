import { Slide } from "@mui/material";
import Button from '@mui/material/Button';
import { ClothesCategory, Complexity } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import DevelopmentForm from "../UI/cotizador/Price Checker/DevelopmentForm";
import ModelForm from "../UI/cotizador/Price Checker/ModelForm";
import PriceCheckerSteps from "../UI/cotizador/Price Checker/PriceCheckerSteps";
import ProductionForm from "../UI/cotizador/Price Checker/ProductionForm";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import { emptyCotizadorForm, PriceCheckerDevelopmentForm } from "../UI/Types/cotizadorTypes";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";




const getGlothes = () => fetch('/api/clothes/obtain').then(res => res.json())
const getComplexity = () => fetch('/api/complexity/obtain').then(res => res.json())

const Home: NextPage = () => {

    const router = useRouter()

    const { data: clothesData, isFetching: isFetchingClothes, } = useQuery<ClothesCategory[]>(['clothes'], getGlothes, { refetchOnWindowFocus: false });
    const { data: complexityData, isFetching: isFetchingComplexity } = useQuery<Complexity[]>(['complexities'], getComplexity, { refetchOnWindowFocus: false });
    const { data: sessionData } = useSession()
    const [price] = useState(0)
    const [step, setStep] = useState(0)

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

    // const [priceCheckerProductionForm, setPriceCheckerProductionForm] = useState<PriceCheckerProductionForm>({
    //     fichaTecnica: { selected: false, cantidad: 0 },
    //     muestraProduccion: { selected: false },
    //     programacionTizada: { selected: false, metros: 0 },
    //     impresionTizada: { selected: false, metros: 0 },
    //     corte: { selected: false, cantPrendas: 0, precioPorPrenda: 0 },
    //     confeccion: { selected: false, cantPrendas: 0, precioPorPrenda: 0 },
    //     envios: { selected: false, viajes: 0 }
    // })

    const steps = ['Modelo', 'Desarrollo', 'Produccion']
    const backDisabled = step === 0
    const continueDisabled = step === steps.length - 1
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

    function handleChangeGeneric<Model>(newData: Model[keyof Model], field: keyof Model, updateStateFunction: Dispatch<SetStateAction<Model>>) {
        updateStateFunction(prev => ({
            ...prev,
            [field]: newData
        }))
    }


    function handleChangeDevelopment(newData: PriceCheckerDevelopmentForm[keyof PriceCheckerDevelopmentForm], field: keyof PriceCheckerDevelopmentForm) {
        handleChangeGeneric(newData, field, setPriceCheckerDevelopmentForm)
    }

    function handleToggleChange<Model>(value: boolean | string | number, parentField: string, field: string, updateStateFunction: Dispatch<SetStateAction<Model>>,) {
        updateStateFunction(prev => ({
            ...prev,
            [parentField]: {
                ...prev[parentField],
                [field]: value
            }
        }))
    }

    function handleToggleDevelopment(event: React.ChangeEvent<HTMLInputElement>) {
        handleToggleChange<PriceCheckerDevelopmentForm>(event.target.checked, event.target.name, 'selected', setPriceCheckerDevelopmentForm)
    }

    function handleDevelopmentValueChange(event: React.ChangeEvent<HTMLInputElement>, parentElement: string) {
        handleToggleChange<PriceCheckerDevelopmentForm>(event.target.type === 'number' ? parseInt(event.target.value) : event.target.value, parentElement, event.target.name, setPriceCheckerDevelopmentForm)
    }

    const formContext = useForm({
        defaultValues: { ...emptyCotizadorForm, user: sessionData?.user }
    })

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
                                        <button type="submit">A</button>
                                        <div className="md:mt-9 grow flex justify-evenly">
                                            <div className="hidden md:flex w-2/12 justify-center place-content-center relative">
                                                <Image src={''} layout="fill" objectFit="contain" alt="Seleccione prenda.." />
                                            </div>
                                            {step === 0 && <ModelForm clothesData={clothesData} complexityData={complexityData} />}
                                            {step === 1 && (
                                                <DevelopmentForm complexityData={complexityData} />
                                            )}
                                            {step === 2 && (
                                                <ProductionForm />)}
                                        </div>
                                    </form>
                                </FormProvider>
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
