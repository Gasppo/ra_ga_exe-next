import { Button, Slide } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Footer from "../UI/Generic/Footer";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import HeaderBar from "@UI/Generic/HeaderBar";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import PriceCheckerSteps from "@UI/cotizador/Stepper";
import React, { useContext } from "react";
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Router from "next/router";
import { useQuery } from "react-query";
import { EstadoOrden } from "@prisma/client";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import { generateEmailer } from "@utils/email/generateEmailer";

const Home: NextPage = () => {

    const { addError } = useContext(ErrorHandlerContext);
    const { sendEmail } = generateEmailer({
        password: process.env.MAILGUN_SMTP_PASS,
        user: 'postmaster@gasppo.lol',
        from: 'soporte@gasppo.lol',
        fromTitle: 'Soporte HS-Taller'
    })

    const [step, setStep] = React.useState(0)
    const [price] = React.useState(0)
    const isStepOptional = () => false

    const { query } = Router
    const { id } = query

    const orderTitle = 'Orden: ' + id

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


      const { data: orderStateData, isFetching: isFetchingComplexity } = useQuery(
          ['orderStates'],
          () => fetchOrderStates(), {
          onError: () => addError('Error al traer estados de ordenes')
      });
  
      const handleOrderStateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          // on confirm, submit the new state
          // print id of the order and the new state
          console.log('holaa', event.target.id, event.target.value);
          const rta = confirm('Modificar estado a: "' + event.target.value + '"?') ? modifyOrderState(event.target.id, event.target.value) : alert('No se modificó el estado, error');
          if(typeof rta === "string") {
            addError(rta, "success");
            sendEmail({
                to: "exequiel.videlapm@gmail.com",
                subject: 'Reseteo de contraseña - HS-Taller',
                html: `<h1>Orden Actualizada</h1>
        <p>Se ha actualizado una orden con el nombre</p>`
              }).then((res) => console.log(res)).catch(err => console.log(err))

          }
      }
  
      const fetchOrderStates = (): Promise<EstadoOrden[]> =>
          fetch(`/api/orders/states`, {})
              .then((res) => (res.ok ? res.json() : console.log(res)))
              .catch((error) => {
                  console.log("Broke bringing order states");
                  throw error;
              });
  
      const modifyOrderState = (id: string, newOrderState: string): Promise<string> => {
          return fetch(`/api/order/updateState`, {
              method: "POST",
              headers: { "Content-Type": "application/json", accept: "application/json" },
              body: JSON.stringify({ id, newOrderState }),
          })
              .then((res) => (res.ok ? res.json() : console.log(res)))
              .catch((error) => {
                  console.log("Broke trying to update order");
                  throw error;
              });
      };

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
                            <div className="mt-16 w-full">
                                <PriceCheckerSteps step={step} price={price} isStepOptional={isStepOptional} steps={stepNames} />
                            </div>
                            <div className="mt-16 flex place-content-center italic flex-row">
                                <InfoIcon /> {stepDescriptions[step]}
                            </div>
                            <div className="mt-16 flex place-content-center">
                                <Button variant="outlined" endIcon={<OpenInNewIcon />}>
                                    Ver detalles de orden
                                </Button>
                            </div>
                            <div className="mt-8">
                                <div className="flex flex-row place-content-center">
                                    <Button onClick={() => setStep(step - 1)} disabled={step === 0}>Paso Anterior</Button>
                                    <Button onClick={() => setStep(step + 1)} disabled={step === 13}>Siguiente Paso</Button>
                                </div>
                            </div>
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


