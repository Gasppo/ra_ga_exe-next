import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import IconState from '@UI/Generic/Utils/IconState';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchAllOrders } from '@utils/queries/order';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { ExtendedOrdenData } from "../../../utils/Examples/ExtendedOrdenData";
import PageTitle from '../../Generic/Utils/PageTitle';

const UsuariosDashboard = () => {

    const { data: sessionData } = useSession();
    const { addError } = React.useContext(ErrorHandlerContext);

    const { data: allOrderData, isLoading: isFetchingAllOrders } = useQuery(
        ['ordenes', sessionData?.user?.email],
        () => fetchAllOrders(), {
        onError: () => addError('Error al traer ordenes'),
    })

    const columns = useMemo((): GridColumns<ExtendedOrdenData> => ([
        { field: 'nombre', headerName: 'Nombre', flex: 1, maxWidth: 200, align: "center", headerAlign: "center" },
        { field: 'id', headerName: 'Orden', flex: 1, maxWidth: 200, align: "center", headerAlign: "center" },
        { field: 'createdAt', headerName: 'Fecha', flex: 1, maxWidth: 100, align: "center", headerAlign: "center", valueFormatter: (params) => params.value.slice(0, 10) },
        { field: 'user', headerName: 'Creador', flex: 1, maxWidth: 150, align: "center", headerAlign: "center", valueGetter: (params) => params.row.user.name },
        {
            field: 'procesos', headerName: 'Diseño', flex: 1, disableColumnMenu: true, align: "center", headerAlign: "center", filterable: false, sortable: false, renderCell: (params) =>
                <>
                    {params.row?.procesos?.map(proceso => <IconState key={proceso.proceso} state={proceso.estado} alt={proceso.proceso} icon={proceso.icon} />)}
                </>
        },
        {
            field: 'link', headerName: 'Link', flex: 1, maxWidth: 75, align: "center", disableColumnMenu: true, headerAlign: "center", filterable: false, sortable: false, renderCell: (params) =>
                <Link href={`/orden/${params.row.id}`}><LaunchIcon /></Link>
        }
    ]), []);

    const mobileColumns = useMemo((): GridColumns<ExtendedOrdenData> => ([
        { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 100, align: "center", headerAlign: "center" },
        {
            field: 'link', headerName: 'Link', flex: 1, maxWidth: 75, align: "center", disableColumnMenu: true, headerAlign: "center", filterable: false, sortable: false, renderCell: (params) =>
                <Link href={`/orden/${params.row.id}`}><LaunchIcon /></Link>
        }
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
            <PageTitle title='Ordenes' hasBack />
            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-5/6 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <div>
                        <LoadingIndicator show={isFetchingAllOrders}>
                            <div style={{ height: 510, width: '100%' }}>
                                <DataGrid
                                    rows={allOrderData || []}
                                    columns={columns || []}
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    autoPageSize
                                    disableSelectionOnClick
                                    disableColumnSelector
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

                <div className="md:hidden w-full flex-col shadow-2xl rounded-3xl bg-gray-100">
                    <div>
                        <LoadingIndicator show={isFetchingAllOrders}>
                            <div style={{ height: 510, width: '100%' }}>
                                <DataGrid
                                    rows={allOrderData || []}
                                    columns={mobileColumns || []}
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    autoPageSize
                                    disableSelectionOnClick
                                    disableColumnSelector
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


            </div>
        </div>
    )
}

export default UsuariosDashboard
