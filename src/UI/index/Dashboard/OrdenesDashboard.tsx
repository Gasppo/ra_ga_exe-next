import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Link } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { errorHandle } from '@utils/queries/cotizador';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { ExtendedOrdenData } from "../../../utils/Examples/ExtendedOrdenData";
import PageTitle from '../../Generic/Utils/PageTitle';

const UsuariosDashboard = () => {

    const { data: sessionData } = useSession();
    const { addError } = React.useContext(ErrorHandlerContext);

    const fetchOrders = (): Promise<ExtendedOrdenData[]> =>
        fetch(`/api/orders/obtainAll`, {
            method: "POST",
            headers: { "Content-Type": "application/json", accept: "application/json" },
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke bringing orders");
                throw error;
            });

    const { data: allOrderData, isLoading: isFetchingAllOrders } = useQuery(
        ['ordenes', sessionData?.user?.email],
        () => fetchOrders(), {
        onError: () => addError('Error al traer ordenes')
    })

    const columns: GridColumns = useMemo(() => ([
        { field: 'nombre', headerName: 'Nombre', minWidth: 150, flex: 1 },
        { field: 'cantidad', headerName: 'Cantidad', minWidth: 75, flex: 1 },
        { field: 'estado', headerName: 'Estado', minWidth: 150, valueGetter: (params) => params.row.estado.nombre, flex: 1 },
        { field: 'createdAt', type: 'date', headerName: 'Creación', minWidth: 150, valueFormatter: (params) => new Date(params.value as string).toLocaleDateString(), flex: 1 },
        { field: ' ', headerName: 'Enlace', renderCell: (params) => <Link href={`/orden/${params.row.id}`}><LaunchIcon /></Link>, filterable: false, sortable: false, align: 'center', minWidth: 75, flex: 1 }
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
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <div className="text-xl my-8 flex flex-row justify-between" >
                        <div className='border-gray-400 border-2 rounded-xl w-2/3 p-2 flex items-center shadow-md'>
                            <SearchIcon className='w-1/12' />
                            <div className='ml-2 w-8/12'>
                                <InputBase placeholder="Busqueda por # orden, prenda..." className='w-full' />
                            </div>
                        </div>
                        <div className='flex justify-end items-center w-1/12 mr-1'>
                            <DownloadIcon fontSize='large' />
                        </div>
                    </div>
                    <div>
                        <LoadingIndicator show={isFetchingAllOrders}>
                            <div style={{ height: 510, width: '100%' }}>
                                <DataGrid
                                    rows={allOrderData || []}
                                    columns={columns || []}
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    pageSize={7}
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
