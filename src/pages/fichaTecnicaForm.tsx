import { Slide } from "@mui/material";
import Button from '@mui/material/Button';
import { ClothesCategory, Complexity } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useContext, useMemo, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import PageTitle from "../UI/Generic/Utils/PageTitle";
import ClothingConfirmationForm from "../UI/cotizador/Ficha Tecnica/ClothingConfirmationForm";
import ClothingDetailForm from "../UI/cotizador/Ficha Tecnica/ClothingDetailForm";
import ClothingSelectionForm from "../UI/cotizador/Ficha Tecnica/ClothingSelectionForm";
import ClothingSizesForm from "../UI/cotizador/Ficha Tecnica/ClothingSizesForm";
import Footer from "../UI/index/Footer";
import HeaderBar from "../UI/index/HeaderBar";
import { FichaTecnicaForm, fichaTecnicaVaciaForm } from "../UI/Types/fichaTecnicaTypes";
import { ErrorHandlerContext } from "../utils/ErrorHandler/error";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";
import { ErrorMessage, FileUploadData, FileUploadResponse, getClothes, getComplexity, uploadFile } from "../utils/queries/cotizador";
import ClothingMouldsForm from "../UI/cotizador/Ficha Tecnica/ClothingMouldsForm";
import PriceCheckerSteps from "../UI/cotizador/Stepper";


const Home: NextPage = () => {

    const { addError } = useContext(ErrorHandlerContext)

    const { data: clothesData, isFetching: isFetchingClothes } = useQuery<ClothesCategory[], ErrorMessage>(['clothes'], getClothes,
        { refetchOnWindowFocus: false, onError: (error) => addError(error.error) });

    const { isFetching: isFetchingComplexity } = useQuery<Complexity[], ErrorMessage>(['complexities'], getComplexity,
        { refetchOnWindowFocus: false, onError: (error) => addError(error.error) }
    );

    const { isLoading: isUploadingFiless, mutateAsync, } = useMutation<FileUploadResponse, ErrorMessage, FileUploadData>(uploadFile,
        { onError: (error) => addError(error.error), }
    )

    const { data: sessionData } = useSession()
    const [price] = useState(0)
    const [step, setStep] = useState(0)

    const steps = ['Selección Prenda', 'Moldería', 'Especificaciones', 'Talles', 'Confirmación']

    const isStepOptional = () => false

    const advanceStep = () => step < 4 ? setStep(prev => prev + 1) : alert('No se puede ir mass para adelante')
    const goBackOneStep = () => step > 0 ? setStep(prev => prev - 1) : alert('No se puede ir mas para atras')

    const formContext = useForm({ defaultValues: { ...fichaTecnicaVaciaForm, user: sessionData?.user } })

    const clothesName = formContext.watch('tipoPrenda.name')
    const image = useMemo(() => clothesData?.find(el => el.name === clothesName), [clothesData, clothesName])?.picture

    const disableContinueSeleccionPrenda = !formContext.watch('tipoPrenda.name')


    const backDisabled = step <= 0
    const continueDisabled = step === steps.length - 1 || (disableContinueSeleccionPrenda /*|| disableContinueProduction*/)
    // const continueDisabled = (step === 0) ? disableContinueModel : ((step === 1) ? disableContinueProduction : disableContinueProduction)

    const handleFormSubmit = async (data: FichaTecnicaForm) => {
        if (data?.files?.length > 0) {
            await handleUploadFile(data.files)
        }

    }

    const handleUploadFile = async (file: File[]) => {
        const folderName = sessionData?.user.name || 'Sin Asignar'
        const orderID = `ID-12345`;
        const formData = new FormData()
        for (const f of file) {
            formData.append('file', f)
        }
        await mutateAsync({ clientName: folderName, orderID: orderID, formData: formData })
    }

    return (

        <div className="bg-split-white-black">
            <Head>
                <title>HS-Taller - Cotizador</title>
                <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderBar />
            <main>
                <Slide in={true} timeout={500} direction='up'>
                    <div>
                        <LoadingIndicator show={isFetchingClothes || isFetchingComplexity || isUploadingFiless}>
                            <div className="container mx-auto flex flex-col justify-evenly min-h-[80vh] md:min-h-screen p-4 md:p-0 lg:p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                                <PageTitle title="Cotizador" />
                                <PriceCheckerSteps step={step} steps={steps} price={price} isStepOptional={isStepOptional} />
                                <FormProvider {...formContext} >
                                    <ErrorAlerter />
                                    <form onSubmit={formContext.handleSubmit(handleFormSubmit)}>
                                        <div className="flex flex-col " >
                                            <div className="md:mt-9 grow flex justify-evenly">
                                                <div className="hidden md:flex w-2/12 justify-center place-content-center relative">
                                                    {image && <Image src={image} layout="fill" objectFit="contain" alt="Seleccione prenda.." />}
                                                </div>
                                                {step === 0 && <ClothingSelectionForm clothesData={clothesData} />}
                                                {step === 1 && <ClothingMouldsForm />}
                                                {step === 2 && <ClothingDetailForm />}
                                                {step === 3 && <ClothingSizesForm />}
                                                {step === 4 && <ClothingConfirmationForm />}
                                            </div>
                                            <div className="flex justify-center md:justify-end w-full md:w-10/12 space-x-4 mt-7 mb-7 md:mt-24">
                                                <div className="mx-4" >
                                                    <Button variant="outlined" disabled={backDisabled} type="button" onClick={goBackOneStep}>Atrás</Button>
                                                </div>
                                                {step !== 4 && <div className="mx-4" >
                                                    <Button variant="outlined" disabled={continueDisabled} type="button" onClick={advanceStep}>Continuar</Button>
                                                </div>}
                                                {step !== 2 && <div className="mx-4 hidden md:flex" >
                                                    <Button variant="outlined" disabled={false} type="submit">Submit [DEBUG]</Button>
                                                </div>}
                                                {step === 2 && <div className="mx-4 md:flex" >
                                                    <Button variant="outlined" disabled={false} type="submit">Submit </Button>
                                                </div>}
                                                <div className="mx-4" >
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </FormProvider>
                                <div className="hidden md:flex" />
                                <div className="hidden md:flex" />
                                <div className="hidden md:flex" />
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
