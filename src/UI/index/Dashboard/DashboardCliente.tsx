import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Divider, Link, TextField } from "@mui/material";
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import IconState from "@UI/Generic/Utils/IconState";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import MobileOrderInfoItem from "@UI/orden/MobileOrderInfoItem";
import MobileOrderInfoSkeleton from "@UI/orden/MobileOrderInfoSkeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { ErrorHandlerContext } from "../../../utils/ErrorHandler/error";
import { ExtendedOrdenData } from "../../../utils/Examples/ExtendedOrdenData";
import LoadingIndicator from "../../../utils/LoadingIndicator/LoadingIndicator";
import { errorHandle } from "../../../utils/queries/cotizador";
import ActionButton from "./ActionButton";
import LaunchIcon from '@mui/icons-material/Launch';
type Props = {
    roleName: string
}

const DashboardCliente = ({ roleName }: Props) => {

    const [editEnabled, setEditEnabled] = useState(false);
    const { data: sessionData } = useSession();

    const emailToFetchOrders = useMemo(() => {
        if (roleName === "Usuario") {
            return { email: sessionData?.user?.email };
        }
        return '';
    }, [roleName, sessionData]);

    const { addError } = useContext(ErrorHandlerContext);

    const fetchOrders = (): Promise<ExtendedOrdenData[]> =>
        fetch(`/api/orders/obtain`, {
            method: "POST",
            body: JSON.stringify(emailToFetchOrders),
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


    const { data: orderData, isLoading: isFetchingOrders } = useQuery(['ordenes', emailToFetchOrders], () => fetchOrders(), {
        onError: () => addError('Error al traer ordenes')
    })

    const handleEnableEdit = () => {
        setEditEnabled((prev) => !prev);
    };

    const columns = useMemo((): GridColumns<ExtendedOrdenData> => ([
        { field: 'nombre', headerName: 'Nombre', maxWidth: 200, minWidth: 100, flex: 1 },
        { field: 'id', headerName: 'Orden', maxWidth: 200, minWidth: 100, flex: 1 },
        {
            field: 'procesos', headerName: 'Diseño', flex: 1, disableColumnMenu: true, filterable: false, sortable: false, renderCell: (params) =>
                <>
                    {params.row?.procesos?.map(proceso =>
                        proceso.estado === 'No Pedido' ?
                            <button disabled={true} className={'opacity-30'}>
                                <IconState key={proceso.proceso} state={proceso.estado} alt={proceso.proceso} icon={proceso.icon} />
                            </button> :
                            <IconState key={proceso.proceso} state={proceso.estado} alt={proceso.proceso} icon={proceso.icon} />
                    )}
                </>
        },
        { field: 'link', headerName: 'Ver', maxWidth: 75, disableColumnMenu: true, filterable: false, sortable: false, renderCell: (params) => <Link href={`/orden/${params.row.id}`}><LaunchIcon /></Link>, minWidth: 75, flex: 1 }


    ]), []);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <div>

            <div className="flex justify-between">
                {
                    roleName === 'Usuario' ? <PageTitle title="Productos en desarrollo" hasBack={false} /> : <PageTitle title="Administrar ordenes" hasBack={false} />
                }
                {roleName === 'Usuario' && sessionData?.user && (
                    <div className="hidden md:flex md:mr-10 items-center justify-center">
                        <div className="rounded-2xl">
                            <Link href={"/fichaTecnicaForm"}>
                                <Button variant="outlined" startIcon={<PostAddIcon />} >
                                    Nueva Orden
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <LoadingIndicator show={isFetchingOrders}>
                        <div className="w-full h-[510px] p-4">
                            {orderData?.length > 0 && <DataGrid
                                rows={orderData || []}
                                columns={columns || []}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                                autoPageSize
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            id: true
                                        }
                                    }
                                }}
                            />
                            }
                            <div className="h-full border-2 flex justify-center items-center">
                                <div className="flex flex-col space-y-4 items-center">
                                    <div className="text-2xl">Actualmente no tiene ordenes de desarrollo activas</div>
                                    <div >
                                        <Link href={"/fichaTecnicaForm"}>
                                            <Button variant="outlined" startIcon={<PostAddIcon />} >Iniciar una nueva orden</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LoadingIndicator>
                </div>

                {sessionData?.user && roleName === 'Usuario' && (
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
                )}
                <div className="flex flex-col  md:hidden w-full">


                    <div className=" bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 p-4">
                        <div className="flex flex-row flex-wrap items-center justify-start mt-2">
                            <ActionButton
                                Icon={AddIcon}
                                label="Nuevo Producto"
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


