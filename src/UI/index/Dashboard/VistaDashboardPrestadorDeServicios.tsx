import CreateIcon from '@mui/icons-material/Create';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchServicesFromEmail } from '@utils/queries/servicios';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import MobileOrderDashboard from './MobileOrderDashboard';


const VistaDashboardPrestadorDeServicios = () => {

    const { addError } = useContext(ErrorHandlerContext);

    const { data: providerServices, isLoading: isFetchingProviderServices } = useQuery(['providerServices'], () => fetchServicesFromEmail('prestador@prestador.com'), {
        onError: () => addError('Error al traer ordenes')
    });

    const serviceColumns = useMemo(() => ([
        { field: 'idOrden', headerName: 'Nombre', maxWidth: 200, minWidth: 100, flex: 1 },
        { field: 'estado', headerName: 'Estado', maxWidth: 200, minWidth: 100, flex: 1, renderCell: (params) => params.row.estado.descripcion },
        { field: 'proceso', headerName: 'Proceso', maxWidth: 200, minWidth: 100, flex: 1, renderCell: (params) => params.row.proceso.nombre },
        { field: 'orden', headerName: 'Fecha Creacion', maxWidth: 200, minWidth: 100, flex: 1, renderCell: (params) => params.row.orden.createdAt.slice(0, 10) },
        { field: 'link', headerName: 'Modificar', maxWidth: 100, disableColumnMenu: true, filterable: false, sortable: false, renderCell: () => <Link href={`#`}><CreateIcon /></Link>, minWidth: 75, flex: 1 }

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

                <div className="flex justify-between">
                    <PageTitle title="Mis trabajos" hasBack={false} />
                </div>

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
            </div>

            <MobileOrderDashboard isFetchingOrders={isFetchingProviderServices} orderData={providerServices} />

        </>
    )
}

export default VistaDashboardPrestadorDeServicios
