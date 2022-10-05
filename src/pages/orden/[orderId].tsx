import { Button, MenuItem, Slide, TextField } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import HeaderBar from "@UI/Generic/HeaderBar";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import PriceCheckerSteps from "@UI/cotizador/Stepper";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from "next/router";
import { Categoria, EstadoOrden, Orden, Prenda, User } from "@prisma/client";
import { errorHandle } from "@utils/queries/cotizador";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingIndicator from "@utils/LoadingIndicator/LoadingIndicator";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import Footer from "@UI/Generic/Footer";
import ErrorAlerter from "@utils/ErrorHandler/ErrorAlerter";
import Image from "next/image";

const Home: NextPage = () => {
    const queryClient = useQueryClient()
    const { addError } = React.useContext(ErrorHandlerContext)

    const [step, setStep] = React.useState(0)
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



    const { data: orderData, isFetching: isFetchingOrderData } = useQuery(
        ['order'],
        () => fetchOrder(), {
        onError: () => addError('Error al traer orden'),
        refetchOnWindowFocus: false

    });

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

    const { data: orderStateData, isFetching: isFetchingOrderStateData } = useQuery(
        ['orderStates'],
        () => fetchOrderStates(), {
        onError: () => addError('Error al traer estados de ordenes'),
        refetchOnWindowFocus: false
    });


    const orderTitle = 'Orden: ' + orderData?.nombre

    const fetchOrderStates = (): Promise<EstadoOrden[]> =>
        fetch(`/api/orders/states`, {})
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke bringing order states");
                throw error;
            });

    const handleOrderStateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // on confirm, submit the new state
        // print id of the order and the new state
        console.log('holaa', event.target.id, event.target.value);
        confirm('Modificar estado a: "' + event.target.value + '"?') ? mutate({ id: id as string, newOrderState: event.target.value }) : alert('No se modificó el estado, error');

    }

    const modifyOrderState = async (data: { id: string, newOrderState: string }): Promise<string> => {
        const { id, newOrderState } = data
        return await fetch(`/api/order/updateState`, {
            method: "POST",
            headers: { "Content-Type": "application/json", accept: "application/json" },
            body: JSON.stringify({ id, newOrderState }),
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke trying to update order");
                throw error;
            });
    };

    const { mutate, isLoading: isChangingState } = useMutation(modifyOrderState, {
        onSuccess: () => {
            addError('Modificacion exitosa', 'success')
            queryClient.invalidateQueries(['order'])
        }
    })

    React.useEffect(() => {
        console.log('Order data:' + JSON.stringify(orderData))
        console.log('Order state data:' + JSON.stringify(orderStateData))
        console.log('Fetching order', isFetchingOrderData)
        console.log('Fetching order state', isFetchingOrderStateData)
        console.log('Imagen: ' + orderData?.categoria?.Prenda.picture)
    }, [orderData, orderStateData, isFetchingOrderData, isFetchingOrderStateData, orderData?.categoria?.Prenda?.picture])

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
                            <LoadingIndicator show={isFetchingOrderData || isFetchingOrderStateData || isChangingState}>
                                <div className="mt-16 w-full">
                                    <PriceCheckerSteps step={step} price={price} isStepOptional={isStepOptional} steps={stepNames} />
                                </div>

                                <div className="flex flex-row mx-20 justify-between" >
                                    <div className="md:mt-9 grow flex flex-col w-5/12 p-4 bg-gray-400">
                                        <div className="hidden md:flex relative h-64">
                                            <Image src={orderData?.categoria?.Prenda?.picture || ''} layout="fill" objectFit="contain" alt="Seleccione prenda.." />
                                        </div>
                                        <div className="mt-16 flex italic flex-row">
                                            <InfoIcon className="mr-2" /> {stepDescriptions[step]}
                                        </div>
                                    </div>
                                    <div className="hidden md:flex w-2/12  mt-9" />
                                    <div className="flex flex-col justify-center items-center md:justify-between w-full md:w-7/12 md:mt-9 p-4 bg-gray-300">
                                        <div className="mt-16">
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                label="Estado de la orden"
                                                value={orderData?.estado?.nombre || ''}
                                                onChange={handleOrderStateChange}
                                                helperText="Modifique el estado de la orden"
                                                variant="standard"
                                            >
                                                {orderStateData?.map((option) => (
                                                    <MenuItem key={option.nombre} value={option.nombre}>
                                                        {option.nombre}
                                                    </MenuItem>
                                                )) || <MenuItem value={''}>No hay estados</MenuItem>}
                                            </TextField>
                                        </div>
                                        <div className="mt-8">
                                            <div className="flex flex-row">
                                                <Button onClick={() => setStep(step + 1)} disabled={step === 13}>Siguiente Paso</Button>
                                            </div>
                                        </div>
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