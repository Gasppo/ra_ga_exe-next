import { verifyUserOrder } from '@backend/dbcalls/order';
import InfoIcon from '@mui/icons-material/Info';
import { Slide, Tab, Tabs } from "@mui/material";
import PriceCheckerSteps from "@UI/cotizador/Stepper";
import Footer from "@UI/Generic/Footer";
import HeaderBar from "@UI/Generic/HeaderBar";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import OrderDetailsTab from '@UI/orden/OrderDetailsTab';
import OrderFilesTab from '@UI/orden/OrderFilesTab';
import OrderMessagesTab from '@UI/orden/OrderMessagesTab';
import OrderStateTab from "@UI/orden/OrderStateTab";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import ErrorAlerter from "@utils/ErrorHandler/ErrorAlerter";
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import LoadingIndicator from "@utils/LoadingIndicator/LoadingIndicator";
import { errorHandle } from "@utils/queries/cotizador";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const Home: NextPage = () => {

    const { addError } = React.useContext(ErrorHandlerContext)
    const [price] = React.useState(0)
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const isStepOptional = () => false

    const { query } = useRouter()
    const { orderId: id } = query

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

    const fetchStateNames = (): Promise<{ id: number, nombre: string; }[]> =>
        fetch(`/api/orders/states`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' }
        })
            .then((res) => res.ok ? res.json() : errorHandle(res))
            .catch((e) => { throw e })

    const { data: stateNames, } = useQuery(['states'], fetchStateNames, {
        onError: () => console.log("Error al traer los estados"),
        refetchOnWindowFocus: false,
        initialData: []
    });
    const names = stateNames?.map(v => v.nombre);

    const fetchOrder = (): Promise<ExtendedOrdenData> =>
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


    const { data: orderData, isFetching: isFetchingOrders } = useQuery(['order'], fetchOrder, {
        onError: () => addError('Error al traer orden'),
        refetchOnWindowFocus: false
    });

    const orderTitle = 'Orden: ' + orderData?.nombre


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
                            <PageTitle title={orderTitle} hasBack size='medium' />
                            <LoadingIndicator show={isFetchingOrders}>

                                <div className="mt-16 w-full hidden md:flex">
                                    <PriceCheckerSteps step={orderData?.estado?.id - 1} price={price} isStepOptional={isStepOptional} steps={names} />

                                </div>

                                <div className="flex flex-col md:flex-row  mx-2 md:mx-20 justify-between" >
                                    <div className="md:mt-9 grow flex flex-col items-center md:w-8/12 lg:w-6/12 md:p-2 lg:p-10">
                                        <div className="hidden md:flex">
                                            <Image src={orderData?.prenda?.tipo?.picture || ''} height='200px' width={'200px'} alt="Seleccione prenda.." />
                                        </div>
                                        <div className="my-4">
                                            Precio Estimado: <b className='italic'>${orderData?.cotizacionOrden?.[0]?.precio?.toFixed(2) || '0.00'}</b>
                                        </div>
                                        {orderData?.idEstado && <div className="mt-4 flex italic flex-row w-full text-xs lg:text-base">
                                            <InfoIcon className="mr-2" /> {stepDescriptions[orderData?.idEstado]}
                                        </div>}
                                    </div>
                                    <div className="hidden lg:flex w-2/12  mt-9" />
                                    <div className="flex flex-col justify-center items-center md:justify-between w-full md:w-7/12 mt-4 md:mt-9 md:p-10">
                                        <div className='w-full flex flex-col items-start border-2 p-4 shadow-lg max-h-[75vh] overflow-y-auto'>
                                            <div className='border-b-2 w-full'>
                                                <Tabs value={value} onChange={handleChange} variant='scrollable'>
                                                    <Tab label="Estado" value={0} />
                                                    {orderData?.archivos?.length > 0 && <Tab label="Archivos" value={1} />}
                                                    {orderData?.detallesPrenda?.atributos?.length > 0 && <Tab label="Detalles" value={2} />}
                                                    {true && <Tab label="Mensajes" value={3} />}
                                                </Tabs>
                                            </div>
                                            <div hidden={value !== 0} className='w-full'>
                                                <OrderStateTab orderData={orderData} />
                                            </div>
                                            <div hidden={value !== 1} className='w-full'>
                                                <OrderFilesTab orderData={orderData} />
                                            </div>
                                            <div hidden={value !== 2} className='w-full'>
                                                <OrderDetailsTab orderData={orderData} />
                                            </div>
                                            <div hidden={value !== 3} className='w-full'>
                                                <OrderMessagesTab orderData={orderData} />
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
    const correctOrder = await verifyUserOrder(context.query.orderId, session.user.email)
    console.log(correctOrder)
    if (!correctOrder) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: { session } };
};