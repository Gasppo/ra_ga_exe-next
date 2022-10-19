import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import EditCategoryPricesDialog from '@UI/orden/EditCategoryPricesDialog'
import { ErrorHandlerContext } from '@utils/ErrorHandler/error'
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator'
import { ErrorMessage, getAllClothesPrices, TipoPrendaExtended } from '@utils/queries/cotizador'
import { useContext, useMemo, useState } from 'react'
import { useIsMutating, useQuery } from 'react-query'
import EditIcon from '@mui/icons-material/Edit'

const BasePricesTab = () => {

    const isMutating = !!useIsMutating()
    const { addError } = useContext(ErrorHandlerContext)
    const [confirmEditPricesOpen, setConfirmEditPricesOpen] = useState(false)
    const [focusedItem, setFocusedItem] = useState('')


    const { data: allClothesPrices, isFetching: isFetchingData } = useQuery<TipoPrendaExtended[], ErrorMessage>(['clothesAndPrices'], getAllClothesPrices, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(error.error)
    });


    const handleEditCategoryDialog = (id: string) => {
        setFocusedItem(id)
        setConfirmEditPricesOpen(true)
    }

    const handleCloseEditCategoryDialog = () => {
        setConfirmEditPricesOpen(false)
    }

    const columns: GridColumns = useMemo(() => ([
        { field: 'tipo', headerName: 'Tipo', minWidth: 150, flex: 2, renderCell: (params) => params.row.tipo.name },
        { field: 'complejidad', headerName: 'Complejidad', minWidth: 150, flex: 2, renderCell: (params) => params.row.complejidad.name },
        { field: 'precioBase', headerName: 'Precio Base', minWidth: 150, flex: 2 },
        {
            field: 'edit', headerName: 'Acciones', sortable: false, minWidth: 150, flex: 1, renderCell: (params) => (
                <button onClick={() => handleEditCategoryDialog(params.row.id)}                >
                    <EditIcon color='primary' />
                </button>
            )
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
        <LoadingIndicator show={isFetchingData || isMutating}>
            <EditCategoryPricesDialog onClose={handleCloseEditCategoryDialog} open={confirmEditPricesOpen} idToShow={focusedItem} />
            <div className="flex justify-center items-center text-4xl font-bold mt-5 mb-10">
                Precios de prendas base
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