import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { TipoPrenda } from '@prisma/client'
import DeleteCategoryDialog from '@UI/preciosBase/DeleteCategoryDialog'
import { ErrorHandlerContext } from '@utils/ErrorHandler/error'
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator'
import { ErrorMessage, getClothes } from '@utils/queries/cotizador'
import { useContext, useState } from 'react'
import { useIsMutating, useQuery } from 'react-query'
import AddNewCategoryDialog from './AddNewCategoryDialog'
import EditCategoryDialog from './EditCategoryDialog'
const NewClothesTab = () => {

    const isMutating = !!useIsMutating()
    const { addError } = useContext(ErrorHandlerContext)
    const [confirmNewClothingOpen, setConfirmNewClothingOpen] = useState(false)
    const [confirmEditPricesOpen, setConfirmEditPricesOpen] = useState(false)
    const [confirmDeleteClothingOpen, setConfirmDeleteClothingOpen] = useState(false)
    const [focusedItem, setFocusedItem] = useState('')


    const { data: clothesData, isFetching: isFetchingClothesData } = useQuery<TipoPrenda[], ErrorMessage>(['clothes'], getClothes, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(error.error)
    });


    const handleOpenNewCategoryDialog = () => {
        setConfirmNewClothingOpen(true)
    }

    const handleCloseNewCategoryConfirmDialog = () => {
        setConfirmNewClothingOpen(false)
    }

    const handleEditCategoryDialog = (id: string) => {
        setFocusedItem(id)
        setConfirmEditPricesOpen(true)
    }

    const handleCloseEditCategoryDialog = () => {
        setConfirmEditPricesOpen(false)
    }

    const handleDeleteCategoryDialog = (id: string) => {
        setFocusedItem(id)
        setConfirmDeleteClothingOpen(true)
    }

    const handleCloseDeleteCategoryDialog = () => {
        setConfirmDeleteClothingOpen(false)
    }


    const TableActions = (item: TipoPrenda) => (
        <div className='flex flex-row space-x-4'>
            <div>
                <IconButton type='button' onClick={() => handleEditCategoryDialog(item.id)}>
                    <EditIcon color='primary' />
                </IconButton>
            </div>
            <div >
                <IconButton type='button' onClick={() => handleDeleteCategoryDialog(item.id)} >
                    <DeleteIcon />
                </IconButton>
            </div>

        </div>
    )


    const columns: GridColumns<TipoPrenda> = [
        { field: 'name', headerName: 'Nombre', minWidth: 150, flex: 1 },
        { field: ' ', headerName: 'Acciones', renderCell: (params) => TableActions(params.row), filterable: false, sortable: false, align: 'center', headerAlign: 'center', maxWidth: 200, flex: 1 }
    ]


    return (
        <LoadingIndicator show={isFetchingClothesData || isMutating}>
            <AddNewCategoryDialog onClose={handleCloseNewCategoryConfirmDialog} open={confirmNewClothingOpen} />
            <EditCategoryDialog onClose={handleCloseEditCategoryDialog} open={confirmEditPricesOpen} idToShow={focusedItem} />
            <DeleteCategoryDialog onClose={handleCloseDeleteCategoryDialog} open={confirmDeleteClothingOpen} idToDelete={focusedItem} />
            <div className="flex justify-center items-center text-4xl font-bold mt-5 text-gray-700">
                Prendas actuales
            </div>
            <div className="mt-6 h-[400px] ">
                <DataGrid
                    rows={clothesData || []}
                    columns={columns || []}
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
            <div className="flex items-center justify-center mt-4">
                <Button variant="outlined" endIcon={<ControlPointIcon />} onClick={handleOpenNewCategoryDialog}>
                    Nueva Prenda
                </Button>
            </div>
        </LoadingIndicator>
    )
}

export default NewClothesTab