import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { Slide } from "@mui/material";
import { TipoPrenda } from "@prisma/client";
import ClothingImage from "@UI/cotizador/Ficha Tecnica/ClothingImage";
import FichaTecnicaControls from "@UI/cotizador/Ficha Tecnica/FichaTecnicaControls";
import HookForm from "@UI/Forms/HookForm";
import HeaderBar from "@UI/Generic/HeaderBar";
import { Paths } from "@UI/Types/nestedObjTypes";
import { generateOrderID } from "@utils/generateOrderID";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from 'react';
import { useIsFetching, useIsMutating, useMutation, useQuery } from "react-query";
import ClothingConfirmationForm from "../UI/cotizador/Ficha Tecnica/ClothingConfirmationForm";
import ClothingDetailForm from "../UI/cotizador/Ficha Tecnica/ClothingDetailForm";
import ClothingFilesForm from "../UI/cotizador/Ficha Tecnica/ClothingFilesForm";
import ClothingSelectionForm from "../UI/cotizador/Ficha Tecnica/ClothingSelectionForm";
import ClothingProcessesForm from "../UI/cotizador/Ficha Tecnica/ClothingProcessesForm";
import PriceCheckerSteps from "../UI/cotizador/Stepper";
import Footer from "../UI/Generic/Footer";
import PageTitle from "../UI/Generic/Utils/PageTitle";
import { fichaTecnicaVaciaForm } from "../UI/Types/fichaTecnicaTypes";
import { ErrorHandlerContext } from "../utils/ErrorHandler/error";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";
import { createOrder, DriveUploadResponse, ErrorMessage, FileUploadData, getClothes, updateFileURL, uploadFile } from "../utils/queries/cotizador";

const Home: NextPage = () => {

    const { addError } = useContext(ErrorHandlerContext)
    const isMutating = !!useIsMutating()
    const isFetching = !!useIsFetching()
    const { data: clothesData } = useQuery<TipoPrenda[], ErrorMessage>(['clothes'], getClothes,
        { refetchOnWindowFocus: false, onError: (error) => addError(error.error) }
    );


    const { mutateAsync: uploadFilesMutation } = useMutation<DriveUploadResponse, ErrorMessage, FileUploadData>(uploadFile,
        { onError: (error) => addError(error.error), }
    )


    const { mutateAsync: createOrderMutation } = useMutation<{ message: string }, ErrorMessage, OrderCreationData>(createOrder, {
        onSuccess: (obj) => {
            router.replace('/');
            addError(obj.message, "info");
        },
        onError: (error) => addError(JSON.stringify(error))
    })

    const { data: sessionData } = useSession()
    const [price] = useState(0)
    const [step, setStep] = useState(0)

    const router = useRouter()

    const steps = ['Selección Prenda', 'Archivos', 'Especificaciones', 'Procesos',  'Confirmación']

    const isStepOptional = () => false

    const advanceStep = () => step < 4 ? setStep(prev => prev + 1) : alert('No se puede ir mass para adelante')
    const goBackOneStep = () => step > 0 ? setStep(prev => prev - 1) : alert('No se puede ir mas para atras')


    const handleFormSubmit = async (data: OrderCreationData) => {

        const orderID = generateOrderID(data)
        if (data?.files?.length > 0) {
            const uploadedFiles = await (await handleUploadFile(data.files, orderID)).data
            const mapKeys = data.files.reduce((prev, currStep) => ({ ...prev, [currStep.file.name]: currStep.section }), {})
            Array.isArray(uploadedFiles) ?
                uploadedFiles.forEach(file => updateFileURL(data, file, mapKeys)) :
                updateFileURL(data, uploadedFiles, mapKeys)
        }
        await createOrderMutation(data)

    }

    const handleUploadFile = async (file: { file: File, section: Paths<OrderCreationData> }[], orderID: string) => {
        const folderName = sessionData?.user.name || 'Sin Asignar'
        const formData = new FormData()
        for (const f of file) {
            formData.append('file', f.file)
        }
        return await uploadFilesMutation({ clientName: folderName, orderID: orderID, formData: formData })
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
                        <LoadingIndicator show={isFetching || isMutating}>
                            <div className="container mx-auto flex flex-col justify-evenly min-h-[80vh] md:min-h-screen p-4 md:p-0 lg:p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                                <PageTitle title="Cotizador" hasBack />
                                <PriceCheckerSteps step={step} steps={steps} price={price} isStepOptional={isStepOptional} />
                                <ErrorAlerter />
                                <HookForm defaultValues={{ ...fichaTecnicaVaciaForm, user: sessionData?.user }} onSubmit={handleFormSubmit}>
                                    <div className="flex flex-col" >
                                        <div className="md:mt-9 grow flex justify-evenly">
                                            <ClothingImage clothesData={clothesData} currStep={step} />
                                            {step === 0 && <ClothingSelectionForm clothesData={clothesData} />}
                                            {step === 1 && <ClothingFilesForm />}
                                            {step === 2 && <ClothingDetailForm />}
                                            {step === 3 && <ClothingProcessesForm />}
                                            {step === 4 && <ClothingConfirmationForm />}
                                        </div>
                                        <div className="flex justify-self-end justify-center md:justify-end w-full md:w-10/12 space-x-4 mt-7 md::mb-7 md:mt-24">
                                            <FichaTecnicaControls currStep={step} numberSteps={steps.length} onBack={goBackOneStep} onForward={advanceStep} />
                                        </div>

                                    </div>
                                </HookForm>
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
