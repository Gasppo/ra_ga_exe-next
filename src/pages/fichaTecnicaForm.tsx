import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { Slide } from "@mui/material";
import { ComplejidadConfeccion, TipoPrenda } from "@prisma/client";
import ClothingImage from "@UI/cotizador/Ficha Tecnica/ClothingImage";
import FichaTecnicaControls from "@UI/cotizador/Ficha Tecnica/FichaTecnicaControls";
import HookForm from "@UI/Forms/HookForm";
import HeaderBar from "@UI/Generic/HeaderBar";
import { Paths } from "@UI/Types/nestedObjTypes";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from 'react';
import { useMutation, useQuery } from "react-query";
import ClothingConfirmationForm from "../UI/cotizador/Ficha Tecnica/ClothingConfirmationForm";
import ClothingDetailForm from "../UI/cotizador/Ficha Tecnica/ClothingDetailForm";
import ClothingMouldsForm from "../UI/cotizador/Ficha Tecnica/ClothingMouldsForm";
import ClothingSelectionForm from "../UI/cotizador/Ficha Tecnica/ClothingSelectionForm";
import ClothingSizesForm from "../UI/cotizador/Ficha Tecnica/ClothingSizesForm";
import PriceCheckerSteps from "../UI/cotizador/Stepper";
import Footer from "../UI/Generic/Footer";
import PageTitle from "../UI/Generic/Utils/PageTitle";
import { fichaTecnicaVaciaForm } from "../UI/Types/fichaTecnicaTypes";
import { ErrorHandlerContext } from "../utils/ErrorHandler/error";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import LoadingIndicator from "../utils/LoadingIndicator/LoadingIndicator";
import { createOrder, DriveUploadResponse, ErrorMessage, FileUploadData, getClothes, getComplexity, uploadFile } from "../utils/queries/cotizador";

const Home: NextPage = () => {

    const { addError } = useContext(ErrorHandlerContext)

    const { data: clothesData, isFetching: isFetchingClothes } = useQuery<TipoPrenda[], ErrorMessage>(['clothes'], getClothes,
        { refetchOnWindowFocus: false, onError: (error) => addError(error.error) });

    const { isFetching: isFetchingComplexity } = useQuery<ComplejidadConfeccion[], ErrorMessage>(['complexities'], getComplexity,
        { refetchOnWindowFocus: false, onError: (error) => addError(error.error) }
    );

    const { mutateAsync: uploadFilesMutation, isLoading: isUploadingFiless } = useMutation<DriveUploadResponse, ErrorMessage, FileUploadData>(uploadFile,
        { onError: (error) => addError(error.error), }
    )


    const { mutateAsync: createOrderMutation, isLoading: isCreatingOrder } = useMutation<{ message: string }, ErrorMessage, OrderCreationData>(createOrder, {
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

    const steps = ['Selección Prenda', 'Moldería', 'Especificaciones', 'Talles', 'Confirmación']

    const isStepOptional = () => false

    const advanceStep = () => step < 4 ? setStep(prev => prev + 1) : alert('No se puede ir mass para adelante')
    const goBackOneStep = () => step > 0 ? setStep(prev => prev - 1) : alert('No se puede ir mas para atras')


    const handleFormSubmit = async (data: OrderCreationData) => {
        if (data?.files?.length > 0) {
            const uploadedFiles = await (await handleUploadFile(data.files)).data
            const mapKeys = data.files.reduce((prev, currStep) => ({ ...prev, [currStep.file.name]: currStep.section }), {})
            if (Array.isArray(uploadedFiles)) {
                console.log('mapKeys', mapKeys)
                uploadedFiles.forEach(file => {
                    console.log('fileName', file.fileName)
                    if (mapKeys[file.fileName] === 'molderiaBase.files') {
                        data.molderiaBase.files = data.molderiaBase.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)
                    }
                    else if (mapKeys[file.fileName] === 'geometral.files') {
                        data.geometral.files = data.geometral.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)
                    }
                    else if (mapKeys[file.fileName] === 'logoMarca.files') {
                        data.logoMarca.files = data.logoMarca.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)
                    }
                })
            }
            else {
                if (mapKeys[uploadedFiles.fileName] === 'molderiaBase.files') {
                    data.molderiaBase.files = data.molderiaBase.files.map(el => el.name === uploadedFiles.fileName ? { ...el, urlID: uploadedFiles.file.data.id } : el)
                }
                else if (mapKeys[uploadedFiles.fileName] === 'geometral.files') {
                    data.geometral.files = data.geometral.files.map(el => el.name === uploadedFiles.fileName ? { ...el, urlID: uploadedFiles.file.data.id } : el)
                }
                else if (mapKeys[uploadedFiles.fileName] === 'logoMarca.files') {
                    data.logoMarca.files = data.logoMarca.files.map(el => el.name === uploadedFiles.fileName ? { ...el, urlID: uploadedFiles.file.data.id } : el)
                }
            }

        }
        console.log(data)
        await createOrderMutation(data)

    }

    const handleUploadFile = async (file: { file: File, section: Paths<OrderCreationData> }[]) => {
        const folderName = sessionData?.user.name || 'Sin Asignar'
        const orderID = `ID-${Math.random() * 100}`;
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
                        <LoadingIndicator show={isFetchingClothes || isFetchingComplexity || isUploadingFiless || isCreatingOrder}>
                            <div className="container mx-auto flex flex-col justify-evenly min-h-[80vh] md:min-h-screen p-4 md:p-0 lg:p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                                <PageTitle title="Cotizador" />
                                <PriceCheckerSteps step={step} steps={steps} price={price} isStepOptional={isStepOptional} />
                                <ErrorAlerter />
                                <HookForm defaultValues={{ ...fichaTecnicaVaciaForm, user: sessionData?.user }} onSubmit={handleFormSubmit}>
                                    <div className="flex flex-col" >
                                        <div className="md:mt-9 grow flex justify-evenly">
                                            <ClothingImage clothesData={clothesData} />
                                            {step === 0 && <ClothingSelectionForm clothesData={clothesData} />}
                                            {step === 1 && <ClothingMouldsForm />}
                                            {step === 2 && <ClothingDetailForm />}
                                            {step === 3 && <ClothingSizesForm />}
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
