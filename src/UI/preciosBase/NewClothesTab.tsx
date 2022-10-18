import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Button } from '@mui/material'
import { TipoPrenda } from '@prisma/client'
import AddNewCategoryDialog from '@UI/orden/AddNewCategoryDialog'
import DeleteCategoryDialog from '@UI/orden/DeleteCategoryDialog'
import EditCategoryDialog from '@UI/orden/EditCategoryDialog'
import { ErrorHandlerContext } from '@utils/ErrorHandler/error'
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator'
import { ErrorMessage, getClothes } from '@utils/queries/cotizador'
import { useContext, useState } from 'react'
import { useIsMutating, useQuery } from 'react-query'
import NewClothesListItem from './NewClothesListItem'


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


    return (
        <LoadingIndicator show={isFetchingClothesData || isMutating}>
            <AddNewCategoryDialog onClose={handleCloseNewCategoryConfirmDialog} open={confirmNewClothingOpen} />
            <EditCategoryDialog onClose={handleCloseEditCategoryDialog} open={confirmEditPricesOpen} idToShow={focusedItem} />
            <DeleteCategoryDialog onClose={handleCloseDeleteCategoryDialog} open={confirmDeleteClothingOpen} idToDelete={focusedItem} />
            <div className="flex justify-center items-center text-4xl font-bold mt-5">
                Prendas actuales
            </div>
            <div className="mt-6">
                {clothesData?.map((item) => <NewClothesListItem
                    item={item}
                    key={item.id}
                    onDelete={handleDeleteCategoryDialog}
                    onEdit={handleEditCategoryDialog}
                />
                )}
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