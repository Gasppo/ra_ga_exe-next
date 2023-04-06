import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Servicio } from "@prisma/client";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getServices } from "@utils/queries/cotizador";
import { useContext, useState } from "react";
import { useIsMutating, useQuery, useQueryClient } from "react-query";
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import EditServicePriceDialog from "@UI/preciosServicios/EditServicePriceDialog";



const ServicesPricesTab = () => {

    const { addError } = useContext(ErrorHandlerContext)
    const [confirmEditServicePriceOpen, setConfirmEditServicePriceOpen] = useState(false)
    const [focusedItem, setFocusedItem] = useState('')
    const queryClient = useQueryClient()

    const isMutating = !!useIsMutating()

    const { data: servicesData, isFetching: isFetchingServicesData } = useQuery<Servicio[], ErrorMessage>(['services'], getServices, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(error.error),
        onSuccess: () => { console.log('se trajo de bd servicios: ', servicesData) }
    });

    const EditButton = (id: string) => (
        <IconButton type="button" onClick={() => handleEditServicePriceDialog(id || '')}                >
            <EditIcon color='primary' />
        </IconButton>
    )

    const handleEditServicePriceDialog = (id: string) => {
        setFocusedItem(id)
        setConfirmEditServicePriceOpen(true)
    }

    const handleCloseEditServicePriceDialog = () => {
        setConfirmEditServicePriceOpen(false)
        queryClient.invalidateQueries('servicePriceData')
        queryClient.invalidateQueries('services')
    }

    const columns: GridColumns = [
        { field: 'name', headerName: 'Nombre', minWidth: 150, flex: 2, valueGetter: (params) => params?.row?.name },
        { field: 'description', headerName: 'Descripción', minWidth: 150, flex: 2, valueGetter: (params) => params?.row?.description },
        { field: 'precioFijo', headerName: 'Precio fijo', minWidth: 150, flex: 2, valueGetter: (params) => params?.row?.precioFijo.toFixed(2) },
        { field: 'factorMultiplicador', headerName: 'Factor', minWidth: 150, flex: 2, renderCell: (params) => params?.row?.factorMultiplicador.toFixed(5) },
        { field: ' ', headerName: 'Acciones', headerAlign: 'center', align: 'center', sortable: false, minWidth: 150, flex: 1, renderCell: (params) => EditButton(params.row.id) }
    ]

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <LoadingIndicator show={isFetchingServicesData || isMutating}>
            <EditServicePriceDialog onClose={handleCloseEditServicePriceDialog} open={confirmEditServicePriceOpen} idToShow={focusedItem} />
            <div className="flex justify-center items-center text-4xl font-bold mt-5 mb-10 text-gray-700">
                Precios de los servicios
            </div>
            <div style={{ height: 510, width: '100%' }}>
                <DataGrid
                    rows={servicesData || []}
                    columns={columns || []}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    pageSize={7}
                />
            </div>
        </LoadingIndicator>
    )
}

export default ServicesPricesTab