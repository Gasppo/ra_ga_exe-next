import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Divider, InputBase, Link, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ErrorHandlerContext } from "../../../utils/ErrorHandler/error";
import BasicTable, { ExtendedOrdenData } from "../../../utils/Examples/BasicOrderTable";
import LoadingIndicator from "../../../utils/LoadingIndicator/LoadingIndicator";
import { errorHandle } from "../../../utils/queries/cotizador";
import ActionButton from "./ActionButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MobileOrderInfoItem from "@UI/orden/MobileOrderInfoItem";
import MobileOrderInfoSkeleton from "@UI/orden/MobileOrderInfoSkeleton";

const DashboardCliente = () => {
    const [editEnabled, setEditEnabled] = useState(false);
    const { data: sessionData } = useSession();

    const { addError } = useContext(ErrorHandlerContext);

    const fetchOrders = (email: string): Promise<ExtendedOrdenData[]> =>
        fetch(`/api/orders/obtain`, {
            method: "POST",
            body: JSON.stringify({ email: email }),
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke here");
                throw error;
            });


    const { data: orderData, isLoading: isFetchingOrders } = useQuery(['ordenes', sessionData?.user?.email], () => fetchOrders(sessionData?.user?.email), {
        onError: () => addError('Error al traer ordenes')
    })

    const handleEnableEdit = () => {
        setEditEnabled((prev) => !prev);
    };

    useEffect(() => {
        console.log(isFetchingOrders)
    }, [isFetchingOrders]);

    return (
        <div>
            <div className="flex justify-between ">
                <div />
                {sessionData?.user && (
                    <div className="hidden md:flex md:mr-10 mt-10">
                        <div className="rounded-2xl">
                            <Link href={"/fichaTecnicaForm"}>
                                <Button variant="text">Nueva cotización</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <div className="text-xl my-8 flex flex-row justify-between">
                        <div className="border-gray-400 border-2 rounded-xl w-2/3 p-2 flex items-center shadow-md">
                            <SearchIcon className="w-1/12" />
                            <div className="ml-2 w-8/12">
                                <InputBase
                                    placeholder="Busqueda por # orden, prenda..."
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end items-center w-1/12 mr-1">
                            <DownloadIcon fontSize="large" />
                        </div>
                    </div>
                    <LoadingIndicator show={isFetchingOrders}>
                        <div>
                            <BasicTable rows={orderData || []} />
                        </div>
                    </LoadingIndicator>
                </div>
                <div className="hidden lg:flex lg:flex-col p-4 lg:w-1/3 xl:w-1/4 shadow-2xl rounded-3xl bg-gray-100  mr-10">
                    <div className="text-xl my-8 flex justify-between">
                        <div>Mis datos</div>
                        <div className="cursor-pointer">
                            <EditIcon onClick={handleEnableEdit} />
                        </div>
                    </div>
                    <div className="my-2">
                        <TextField
                            variant="standard"
                            disabled={!editEnabled}
                            label="Nombre"
                            value={sessionData.user.name}
                            InputProps={{ disableUnderline: !editEnabled }}
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            variant="standard"
                            disabled
                            label="Correo"
                            value={sessionData.user.email}
                            InputProps={{ disableUnderline: true }}
                        />
                    </div>
                    <div className="my-10 flex justify-center">
                        <div className="rounded-full flex items-center hover:opacity-25 transition-all duration-300">
                            <Image
                                src={
                                    sessionData?.user?.image ||
                                    "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
                                }
                                alt=""
                                width={128}
                                height={128}
                                className="rounded-full hover:b"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  md:hidden w-full">


                    <div className=" bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 p-4">
                        <div className="flex flex-row flex-wrap items-center justify-start mt-2">
                            <ActionButton
                                Icon={AddIcon}
                                label="Nueva Cotizacion"
                                href="/fichaTecnicaForm"
                            />
                            <ActionButton
                                Icon={ManageAccountsIcon}
                                label="Editar mi Perfil"
                                href="/perfil"
                            />
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 my-4">
                        <div className="text-xl font-bold m-4">
                            <div>Mis Ordenes</div>
                        </div>
                        <Divider />
                        <div className="flex flex-col">
                            {isFetchingOrders ? (
                                <>
                                    <MobileOrderInfoSkeleton />
                                    <MobileOrderInfoSkeleton />
                                    <MobileOrderInfoSkeleton />
                                </>
                            ) : orderData?.length > 0 ? orderData?.slice(0, 3).map(el => <MobileOrderInfoItem orden={el} key={el.id} />) :
                                <div className="m-4 text-xs">
                                    No se registran ordenes al momento
                                </div>
                            }
                        </div>
                        <Divider />
                        {orderData?.length > 0 && <div className="flex flex-row mx-4 my-2 items-center justify-between text-blue-500 font-semibold text-xs">
                            <div className="">
                                Ver todas mis ordenes
                            </div>
                            <div className="">
                                <ArrowForwardIosIcon fontSize='inherit' />
                            </div>
                        </div>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardCliente;
