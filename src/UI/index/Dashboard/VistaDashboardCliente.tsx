import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { reducedUserInfoLayout } from '@UI/user/info/form/reducedUserInfo.layout';
import { ReducedUserInfoSchema, ReducedUserInfoSchemaType } from '@backend/schemas/ReducedUserInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchOrderFromEmail } from '@utils/queries/order';
import { getReducedUser } from '@utils/queries/user';
import { useSession } from 'next-auth/react';
import Image from "next/image";
import Link from 'next/link';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import MobileOrderDashboard from './MobileOrderDashboard';

interface props {
    emailToFetchOrders,
    columns: GridColumns<ExtendedOrdenData>,
}

const VistaDashboardCliente = (props: props) => {

    const { addError } = useContext(ErrorHandlerContext);
    const { data: sessionData } = useSession();


    const { data: orderData, isLoading: isFetchingOrders } = useQuery(['ordenes', props?.emailToFetchOrders], () => fetchOrderFromEmail(props?.emailToFetchOrders), {
        onError: () => addError('Error al traer ordenes')
    })

    const { data: reducedUserInfo, isLoading: isFetchingReducedUserInfo } = useQuery<ReducedUserInfoSchemaType>(
        ['reducedUserInfo', props?.emailToFetchOrders], () => getReducedUser(props?.emailToFetchOrders), {
        onError: () => addError('Error al traer información del usuario'),
        refetchOnWindowFocus: false,
    })


    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const handleFormSubmit = function () {
        console.log(":(")
    }

    return (

        <>
            <div className="lg:flex lg:justify-between pl-8 pr-8 pt-4">
                <PageTitle title="Productos en desarrollo" hasBack={false} />
                <div className="hidden md:flex items-center justify-center space-x-2 md:mt-4">
                    <div className="rounded-2xl">
                        <Link href={"/fichaTecnicaForm"}>
                            <Button variant="outlined" startIcon={<PostAddIcon />} >
                                Nuevo Producto
                            </Button>
                        </Link>
                    </div>
                    <div className="lg:hidden rounded-2xl">
                        <Link href={"/fichaTecnicaForm"}>
                            <Button variant="outlined" startIcon={<PersonIcon />} >
                                Datos de usuario
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <LoadingIndicator show={isFetchingOrders}>
                        <div className="w-full h-[510px] p-4">
                            {orderData?.length > 0 && <DataGrid
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
                            />}
                            {orderData?.length === 0 && < div className="h-full border-2 flex justify-center items-center">
                                <div className="flex flex-col space-y-4 items-center">
                                    <div className="text-2xl">Actualmente no tiene ordenes de desarrollo activas</div>
                                    <div >
                                        <Link href={"/fichaTecnicaForm"}>
                                            <Button variant="outlined" startIcon={<PostAddIcon />} >Iniciar una nueva orden</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </LoadingIndicator>
                </div>

                <div className="hidden lg:flex lg:flex-col p-4 lg:w-1/3 xl:w-1/4 shadow-2xl rounded-3xl bg-gray-100  mr-10">
                    <LoadingIndicator show={isFetchingReducedUserInfo}>
                        <div className="text-xl my-8 flex justify-between">
                            <div>Mi cuenta</div>
                            <div>
                                <Link href={"/user/" + reducedUserInfo?.user.id} passHref={true}>
                                    <a>
                                        <Button variant="outlined" startIcon={<EditIcon />}>
                                            Mi Perfil
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>


                        {!isFetchingReducedUserInfo &&
                            <HookForm defaultValues={reducedUserInfo} formOptions={{ resolver: zodResolver(ReducedUserInfoSchema) }} onSubmit={handleFormSubmit} >
                                <FormItem layout={reducedUserInfoLayout} />
                            </HookForm>
                        }

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


                    </LoadingIndicator>
                </div>


            </div>

            <MobileOrderDashboard isFetchingOrders={isFetchingOrders} orderData={orderData} />

        </>
    )
}

export default VistaDashboardCliente
