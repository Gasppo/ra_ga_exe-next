import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import EditCategoryPricesDialog from '@UI/orden/EditCategoryPricesDialog'
import { ErrorHandlerContext } from '@utils/ErrorHandler/error'
import { currencyFormatter } from '@utils/Examples/currencyFormatter'
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator'
import { getAllClothesPrices, PrecioPrendaExtended } from '@utils/queries/cotizador'
import { useContext, useState } from 'react'
import { useIsMutating, useQuery } from 'react-query'

const BasePricesTab = () => {

    const isMutating = !!useIsMutating()
    const { addError } = useContext(ErrorHandlerContext)
    const [confirmEditPricesOpen, setConfirmEditPricesOpen] = useState(false)
    const [focusedItem, setFocusedItem] = useState('')


    const { data: allClothesPrices, isFetching: isFetchingData } = useQuery(['clothesAndPrices'], getAllClothesPrices, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(JSON.stringify(error))
    });


    const handleEditCategoryDialog = (id: string) => {
        setFocusedItem(id)
        setConfirmEditPricesOpen(true)
    }

    const handleCloseEditCategoryDialog = () => {
        setConfirmEditPricesOpen(false)
    }

    const EditButton = (id: string) => (
        <IconButton type="button" onClick={() => handleEditCategoryDialog(id || '')}                >
            <EditIcon color='primary' />
        </IconButton>
    )

    const columns: GridColumns<PrecioPrendaExtended> = [
        { field: 'tipo', headerName: 'Tipo', minWidth: 150, flex: 2, valueGetter: (params) => params.row.tipo.name },
        { field: 'complejidad', headerName: 'Complejidad', minWidth: 150, flex: 2, valueGetter: (params) => params.row.complejidad.name },
        { field: 'precioBase', headerName: 'Precio Base', minWidth: 150, flex: 2, renderCell: (params) => `${currencyFormatter.format(params?.row?.precioBase || 0)}` },
        { field: ' ', headerName: 'Acciones', align: 'right', headerAlign: 'right', sortable: false, minWidth: 150, flex: 1, renderCell: (params) => EditButton(params.row.id) }
    ]

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <LoadingIndicator show={isFetchingData || isMutating}>
            <EditCategoryPricesDialog onClose={handleCloseEditCategoryDialog} open={confirmEditPricesOpen} idToShow={focusedItem} />
            <div className="flex justify-center items-center text-4xl font-bold mt-5 mb-10 text-gray-700">
                Precios Base
            </div>
            <div style={{ height: 510, width: '100%' }}>
                <DataGrid
                    rows={allClothesPrices || []}
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

export default BasePricesTab