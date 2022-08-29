import { Slide, Step, StepLabel, Stepper, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import { useGetRole } from "../utils/useGetRole";
import { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { ClothesCategory } from "@prisma/client";
import { useQuery } from "react-query";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";
import Image from "next/image";


type PriceCheckerModel = {
    cliente: string,
    tipoPrenda: ClothesCategory | '',
    complejidad: string
}

const getGlothes = () => fetch('/api/clothes/obtain').then(res => res.json())

const Home: NextPage = () => {

    const { data: sessionData } = useSession()
    const { data: clothesData, isFetching: isFetchingClothes } = useQuery<ClothesCategory[]>(['clothes'], getGlothes, { refetchOnWindowFocus: false });

    const role = useGetRole(sessionData?.user?.email || '')
    const [price, setPrice] = useState(0)
    const [step, setStep] = useState(0)
    const [complejidad, setComplejidad] = useState(0)

    const [priceCheckerModel, setPriceCheckerModel] = useState<PriceCheckerModel>({ cliente: '', tipoPrenda: '', complejidad: '' })
    const [clothesTypes, setClothesTypes] = useState([''])

    const [continueButton, setContinueButton] = useState(true)
    const [backButton, setBackButton] = useState(true)

    const [numberOfModelCorrectFields, setNumberOfModelCorrectFields] = useState(0)

    const steps = ['Modelo', 'Desarrollo', 'Produccion']

    const isStepOptional = (index: number) => index === 1

    const advanceStep = () => {
        if (step < 2)
            setStep(step + 1)
        else
            alert('Cannot advance anymore !!')
    }

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
        console.log('Model dps de clickear picture vale:', priceCheckerModel)
        console.log('Event dps de clickear picture vale: ', event)
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
                        <LoadingIndicator show={isFetchingClothes}>
                            <div>
                                <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 md:ml-7" onClick={advanceStep}>
                                    Cotizador
                                </h1>
                            </div>

                            <div className="flex flex-row mt-10 justify-between">
                                <div className="hidden md:flex md:displ md:pr-4 md:ml-10 md:w-4/5 items-center justify-start">
                                    <Stepper activeStep={step} orientation='horizontal' alternativeLabel>
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
                                <div className="ml-4 text-5xl md:text-[2rem]" >
                                    ${price}
                                </div>
                                <div className="w-0" />
                            </div>

                            <div className="md:mt-9 flex justify-evenly">
                                <div className="hidden md:flex w-2/12 justify-center place-content-center">
                                    <img src={priceCheckerModel.tipoPrenda !== '' ? priceCheckerModel.tipoPrenda.picture : ''} alt="..." />
                                </div>
                                <div className="grid w-6/12 md:flex-col justify-items-center">
                                    <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
                                    <div className="md:mt-7 w-3/6">
                                        <TextField name='tipoPrenda' id="outlined-select-currency" select fullWidth label="Elija categoria" value={priceCheckerModel.tipoPrenda !== '' ? priceCheckerModel.tipoPrenda.name : ''} onChange={handleClothesChange} helperText="Seleccione categoría de la prenda">
                                            {clothesData?.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="md:mt-7 w-3/6"><TextField fullWidth type='number' name='complejidad' id="outlined-basic" label="Complejidad" variant="outlined" onChange={handleChange} /></div>
                                </div>
                            </div>

                            <div className="flex justify-end w-10/12 space-x-4 md:mt-24">
                                <div><Button variant="outlined" disabled={backButton}>Atrás</Button></div>
                                <div><Button variant="outlined" disabled={continueButton}>Continuar</Button></div>
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
