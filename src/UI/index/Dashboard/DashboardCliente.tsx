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

const fakeOrders = [
    {
        id: 1,
        date: '2021-01-01',
        nombre: 'Remera Basica MC',
        orden: 'Inv22-MerB-RemBas-001',
        procesos: [
            { proceso: 'Diseño', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/5996/5996559.png' },
            { proceso: 'Molderia', estado: 'Traido Por Cliente', icon: 'https://cdn-icons-png.flaticon.com/512/4277/4277751.png' },
            { proceso: 'Digitalización', estado: 'No Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/2630/2630802.png' },
            { proceso: 'Modificación', estado: 'Iniciado', icon: 'https://cdn-icons-png.flaticon.com/512/4556/4556475.png' },
            { proceso: 'Geometral', estado: 'En Proceso', icon: 'https://cdn-icons-png.flaticon.com/512/4904/4904582.png' },
            { proceso: 'Impresion', estado: 'Terminado', icon: 'https://cdn-icons-png.flaticon.com/512/8746/8746757.png' },
            { proceso: 'Materiales', estado: 'En Pausa', icon: 'https://cdn-icons-png.flaticon.com/512/5797/5797962.png' },
            { proceso: 'Tizado', estado: 'Terminado', icon: 'https://cdn-icons-png.flaticon.com/512/1812/1812432.png' },
            { proceso: 'Corte', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/6181/6181345.png' },
            { proceso: 'Pre-confección', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/6232/6232486.png' },
            { proceso: 'Confección', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/588/588488.png' },
            { proceso: 'Terminado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/4283/4283035.png' },
            { proceso: 'Planchado', estado: 'Traido Por Cliente', icon: 'https://cdn-icons-png.flaticon.com/512/2990/2990664.png' },
            { proceso: 'Entregado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/819/819873.png' },
            { proceso: 'Aprobado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/3161/3161829.png' }
        ],
    },
    {
        id: 2,
        date: '2021-01-01',
        nombre: 'Pantalon Cargo Chupin',
        orden: 'Ver22/23-MerB-PantMed-001',
        procesos: [
            { proceso: 'Diseño', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/5996/5996559.png' },
            { proceso: 'Molderia', estado: 'Traido Por Cliente', icon: 'https://cdn-icons-png.flaticon.com/512/4277/4277751.png' },
            { proceso: 'Digitalización', estado: 'No Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/2630/2630802.png' },
            { proceso: 'Modificación', estado: 'Iniciado', icon: 'https://cdn-icons-png.flaticon.com/512/4556/4556475.png' },
            { proceso: 'Geometral', estado: 'En Proceso', icon: 'https://cdn-icons-png.flaticon.com/512/4904/4904582.png' },
            { proceso: 'Impresion', estado: 'Terminado', icon: 'https://cdn-icons-png.flaticon.com/512/8746/8746757.png' },
            { proceso: 'Materiales', estado: 'En Pausa', icon: 'https://cdn-icons-png.flaticon.com/512/5797/5797962.png' },
            { proceso: 'Tizado', estado: 'Terminado', icon: 'https://cdn-icons-png.flaticon.com/512/1812/1812432.png' },
            { proceso: 'Corte', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/6181/6181345.png' },
            { proceso: 'Pre-confección', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/6232/6232486.png' },
            { proceso: 'Confección', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/588/588488.png' },
            { proceso: 'Terminado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/4283/4283035.png' },
            { proceso: 'Planchado', estado: 'Traido Por Cliente', icon: 'https://cdn-icons-png.flaticon.com/512/2990/2990664.png' },
            { proceso: 'Entregado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/819/819873.png' },
            { proceso: 'Aprobado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/3161/3161829.png' }
        ],
    },
    {
        id: 3,
        date: '2021-01-01',
        nombre: 'Musculosas con Recortes y Bolsillos',
        orden: 'Ver22/23-MerB-MuscCom-001',
        procesos: [
            { proceso: 'Diseño', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/5996/5996559.png' },
            { proceso: 'Molderia', estado: 'Traido Por Cliente', icon: 'https://cdn-icons-png.flaticon.com/512/4277/4277751.png' },
            { proceso: 'Digitalización', estado: 'No Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/2630/2630802.png' },
            { proceso: 'Modificación', estado: 'Iniciado', icon: 'https://cdn-icons-png.flaticon.com/512/4556/4556475.png' },
            { proceso: 'Geometral', estado: 'En Proceso', icon: 'https://cdn-icons-png.flaticon.com/512/4904/4904582.png' },
            { proceso: 'Impresion', estado: 'Terminado', icon: 'https://cdn-icons-png.flaticon.com/512/8746/8746757.png' },
            { proceso: 'Materiales', estado: 'En Pausa', icon: 'https://cdn-icons-png.flaticon.com/512/5797/5797962.png' },
            { proceso: 'Tizado', estado: 'Terminado', icon: 'https://cdn-icons-png.flaticon.com/512/1812/1812432.png' },
            { proceso: 'Corte', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/6181/6181345.png' },
            { proceso: 'Pre-confección', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/6232/6232486.png' },
            { proceso: 'Confección', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/588/588488.png' },
            { proceso: 'Terminado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/4283/4283035.png' },
            { proceso: 'Planchado', estado: 'Traido Por Cliente', icon: 'https://cdn-icons-png.flaticon.com/512/2990/2990664.png' },
            { proceso: 'Entregado', estado: 'Pedido', icon: 'https://cdn-icons-png.flaticon.com/512/819/819873.png' },
            { proceso: 'Aprobado', estado: 'No pedido', icon: 'https://cdn-icons-png.flaticon.com/512/3161/3161829.png' }
        ],
    },
]
type FakeOrderType = typeof fakeOrders[0]

type Props = {
    roleName: string
}

const DashboardCliente = ({ roleName }: Props) => {
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

    const columns = useMemo((): GridColumns<FakeOrderType> => ([
        { field: 'nombre', headerName: 'Nombre', maxWidth: 250, minWidth: 100, flex: 1 },
        { field: 'orden', headerName: 'Orden', maxWidth: 250, minWidth: 100, flex: 1 },
        {
            field: 'estado', headerName: 'Diseño', flex: 1, renderCell: (params) =>
                <>
                    {params.row?.procesos?.map(proceso => <IconState key={proceso.proceso} state={proceso.estado} alt={proceso.proceso} icon={proceso.icon} />)}
                </>
        },


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
                    roleName === 'Usuario' ? <PageTitle title="Mis Ordenes" hasBack={false} /> : <PageTitle title="Administrar ordenes" hasBack={false} />
                }
                {roleName === 'Usuario' && sessionData?.user && (
                    <div className="hidden md:flex md:mr-10 items-center justify-center">
                        <div className="rounded-2xl">
                            <Link href={"/fichaTecnicaForm"}>
                                <Button variant="outlined" startIcon={<PostAddIcon />} >
                                    Nueva Cotización
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
                            <DataGrid
                                rows={fakeOrders || []}
                                columns={columns || []}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                                autoPageSize
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            id: false
                                        }
                                    }
                                }}
                            />
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


