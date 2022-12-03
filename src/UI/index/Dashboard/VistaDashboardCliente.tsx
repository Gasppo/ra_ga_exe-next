import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, TextField } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchOrderFromEmail } from '@utils/queries/order';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import MobileOrderDashboard from './MobileOrderDashboard';

interface props {
    emailToFetchOrders,
    columns: GridColumns<ExtendedOrdenData>,
}

const VistaDashboardCliente = (props: props) => {

    const [editEnabled, setEditEnabled] = useState(false);
    const { addError } = useContext(ErrorHandlerContext);
    const { data: sessionData } = useSession();

    const { data: orderData, isLoading: isFetchingOrders } = useQuery(['ordenes', props.emailToFetchOrders], () => fetchOrderFromEmail(props.emailToFetchOrders), {
        onError: () => addError('Error al traer ordenes')
    })

    const handleEnableEdit = () => {
        setEditEnabled((prev) => !prev);
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (

        <>
            <div className="flex justify-between">
                <PageTitle title="Productos en desarrollo" hasBack={false} />
                <div className="hidden md:flex md:mr-10 items-center justify-center">
                    <div className="rounded-2xl">
                        <Link href={"/fichaTecnicaForm"}>
                            <Button variant="outlined" startIcon={<PostAddIcon />} >
                                Nuevo Producto
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="md:mt-4 flex flex-col md:mx-10 lg:mx-0">

                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <LoadingIndicator show={isFetchingOrders}>
                        <div className="w-full h-[510px] p-4">
                            <DataGrid
                                rows={orderData || []}
                                columns={props.columns || []}
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
                        </div>
                    </LoadingIndicator>
                </div>

                <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">

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
                                value={sessionData?.user?.name}
                                InputProps={{ disableUnderline: !editEnabled }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                variant="standard"
                                disabled
                                label="Correo"
                                value={sessionData?.user?.email}
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

                </div>

            </div>

            <MobileOrderDashboard isFetchingOrders={isFetchingOrders} orderData={orderData} />

        </>
    )
}

export default VistaDashboardCliente
