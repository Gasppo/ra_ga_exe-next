import { OrderStateUpdateSchemaType } from "@backend/schemas/OrderStateUpdateSchema";
import InfoIcon from '@mui/icons-material/Info';
import { Button, Slide } from "@mui/material";
import { Categoria, EstadoOrden, Orden, Prenda, User } from "@prisma/client";
import PriceCheckerSteps from "@UI/cotizador/Stepper";
import HookForm from "@UI/Forms/HookForm";
import Footer from "@UI/Generic/Footer";
import HeaderBar from "@UI/Generic/HeaderBar";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import ConfirmStateChangeDialog from "@UI/orden/ConfirmStateChangeDialog";
import OrderStateChange from "@UI/orden/OrderStateChange";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import ErrorAlerter from "@utils/ErrorHandler/ErrorAlerter";
import LoadingIndicator from "@utils/LoadingIndicator/LoadingIndicator";
import { errorHandle } from "@utils/queries/cotizador";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIsFetching, useMutation, useQuery, useQueryClient } from "react-query";

const Home: NextPage = () => {

    const queryClient = useQueryClient()
    const isLoading = useIsFetching()
    const { addError } = React.useContext(ErrorHandlerContext)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [price] = React.useState(0)
    const isStepOptional = () => false

    const { query } = useRouter()
    const { orderId: id } = query


    const stepNames = [
        'Orden Cancelada',
        'Aguardando Seña',
        'Moldería Base',
        'Digitalización',
        'Geometral',
        'Aguardando materiales',
        'Corte Muestra',
        'Confección Muestra',
        'Envío al cliente',
        'Aguardando Aprobación Muestra',
        'En producción',
        'Finalizado',
        'Entregado',
        'Expirado'
    ]

    const stepDescriptions = [
        'La orden fue cancelada y su desarrollo no va a continuar.',
        'La orden fue creada y se esta esperando la seña para comenzar las muestras.',
        'La moldería base se está confeccionando.',
        'La orden está siendo digitalizada.',
        'Se están confeccionando los gemoetrales de la orden.',
        'Aguardando telas y avíos para poder elaborar la muestra.',
        'Se está confeccionando el corte para la muestra.',
        'La muestra está siendo confeccionada.',
        'La muestra está siendo enviada al cliente.',
        'El cliente está evaluando la muestra y necesita confirmarla para continuar.',
        'El producto está en producción.',
        'El producto está finalizado, se está preparando el envío.',
        'El producto fue entregado al cliente.',
        'Orden expirada.'
    ]

    const fetchOrder = (): Promise<Orden & { estado: EstadoOrden, user: User, categoria: Categoria & { Prenda: Prenda } }> =>
        fetch(`/api/order/obtain`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            body: JSON.stringify({ orderId: id })
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke bringing order");
                throw error;
            });


    const { data: orderData, } = useQuery(['order'], fetchOrder, {
        onError: () => addError('Error al traer orden'),
        refetchOnWindowFocus: false
    });


    const orderTitle = 'Orden: ' + orderData?.nombre


    const modifyOrderState = async (data: OrderStateUpdateSchemaType): Promise<string> => {
        const { id, newStateId } = data
        return await fetch(`/api/order/updateState`, {
            method: "POST",
            headers: { "Content-Type": "application/json", accept: "application/json" },
            body: JSON.stringify({ id, newStateId }),
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke trying to update order");
                throw error;
            });
    };

    const { mutate, isLoading: isUpdatingState } = useMutation(modifyOrderState, {
        onSuccess: () => {
            addError('Modificacion exitosa', 'success')
            queryClient.invalidateQueries(['order'])
        }
    })

    const defaultFormData = {
        orderState: 0
    }


    const handleFormSubmit = (data: { orderState: number }) => {
        mutate({ id: id as string, newStateId: data.orderState })
    }

    const handleOpenConfirmDialog = () => {
        setConfirmOpen(true)
    }

    const handleCloseConfirmDialog = () => {
        setConfirmOpen(false)
    }

    return (
        <div className="bg-split-white-black">
            <Head>
                <title>HS-Taller</title>
                <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderBar />
            <main>
                <Slide in={true} timeout={500} direction='up'>
                    <div>
                        <ErrorAlerter />
                        <div className="container mx-auto flex flex-col min-h-[80vh] md:min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                            <PageTitle title={orderTitle} hasBack />
                            <LoadingIndicator show={!!isLoading || isUpdatingState}>

                                <div className="mt-16 w-full">
                                    <PriceCheckerSteps step={0} price={price} isStepOptional={isStepOptional} steps={stepNames} />
                                </div>

                                <div className="flex flex-row mx-20 justify-between" >
                                    <div className="md:mt-9 grow flex flex-col w-6/12 p-10">
                                        <div className="hidden md:flex relative h-64">
                                            <Image src={orderData?.categoria?.Prenda?.picture || ''} layout="fill" objectFit="contain" alt="Seleccione prenda.." />
                                        </div>
                                        {orderData?.idEstado && <div className="mt-16 flex italic flex-row">
                                            <InfoIcon className="mr-2" /> {stepDescriptions[orderData?.idEstado]}
                                        </div>}
                                    </div>
                                    <div className="hidden md:flex w-2/12  mt-9" />
                                    <div className="flex flex-col justify-center items-center md:justify-between w-full md:w-7/12 md:mt-9 p-10 ">
                                        <HookForm defaultValues={defaultFormData} onSubmit={handleFormSubmit}>
                                            <OrderStateChange order={orderData} />
                                            <ConfirmStateChangeDialog onClose={handleCloseConfirmDialog} open={confirmOpen} formSubmit={handleFormSubmit} />
                                            <div className="mt-8">
                                                <div className="flex flex-row">
                                                    <Button onClick={handleOpenConfirmDialog}>Confirmar</Button>
                                                </div>
                                            </div>
                                        </HookForm>
                                    </div>

                                </div>
                            </LoadingIndicator>
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