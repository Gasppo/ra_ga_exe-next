import CreateIcon from '@mui/icons-material/Create';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchServicesFromEmail } from '@utils/queries/servicios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import { Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { ReducedUserInfoSchemaType } from '@backend/schemas/ReducedUserInfoSchema';
import { getReducedUser } from '@utils/queries/user';
import React from 'react';

type props = {
    emailToFetchOrders
}

const VistaDashboardPrestadorDeServicios = (props: props) => {

    const { addError } = useContext(ErrorHandlerContext);
    const { data } = useSession()
    const { data: providerServices, isLoading: isFetchingProviderServices } = useQuery(['providerServices'], () => fetchServicesFromEmail(data.user.email), {
        onError: () => addError('Error al traer ordenes')
    });

    const { data: reducedUserInfo, isLoading: isFetchingReducedUserInfo } = useQuery<ReducedUserInfoSchemaType>(
        ['reducedUserInfo', props?.emailToFetchOrders], () => getReducedUser(props?.emailToFetchOrders), {
        onError: () => addError('Error al traer información del usuario'),
        onSuccess: () => {
            console.log('reducedUserInfo vale: ', JSON.stringify(reducedUserInfo))
        }
    })

    React.useEffect(() => {
        console.log('Data user vale:', JSON.stringify(data?.user))
    }, [data.user])

    React.useEffect(() => {
        console.log('Props vale: ', JSON.stringify(props))
    }, [props])

    const serviceColumns = useMemo(() => ([
        { field: 'idOrden', headerName: 'Cód. Orden', minWidth: 100, flex: 1 },
        { field: 'proceso', headerName: 'Tipo de servicio', minWidth: 100, flex: 1, renderCell: (params) => params.row.proceso.nombre },
        { field: 'estado', headerName: 'Estado proceso', minWidth: 100, flex: 1, renderCell: (params) => params.row.estado.descripcion },
        { field: 'orden', headerName: 'Fecha Creacion orden', minWidth: 100, flex: 1, renderCell: (params) => params.row.orden.createdAt.slice(0, 10) },
        { field: 'link', headerName: 'Modificar', maxWidth: 100, disableColumnMenu: true, filterable: false, sortable: false, renderCell: (params) => <div className="cursor-pointer"><Link href={`/orden/${params.row.idOrden}`} ><CreateIcon /></Link></div>, minWidth: 75, flex: 1 }
    ]), []);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <div className="md:mt-4 flex flex-col md:mx-10 lg:mx-0">
                <LoadingIndicator show={isFetchingReducedUserInfo}>
                    <div className="flex justify-between">
                        <PageTitle title="Mis trabajos" hasBack={false} />
                        <div className="hidden md:flex items-center justify-center space-x-2 md:mt-4">
                            <div className="rounded-2xl">
                                <Link href={"/user/" + reducedUserInfo?.user?.id} passHref={true}>
                                    <Button variant="outlined" startIcon={<PostAddIcon />} >
                                        Datos de usuario
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </LoadingIndicator>
            </div>

            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <LoadingIndicator show={isFetchingProviderServices}>
                        <div className="w-full h-[510px] p-4">
                            <DataGrid
                                rows={providerServices || []}
                                columns={serviceColumns || []}
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
            </div >


        </>
    )
}

export default VistaDashboardPrestadorDeServicios
