import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { TipoPrenda } from '@prisma/client'

type Props = {
    item: TipoPrenda
    onDelete: (id: string) => void
    onEdit: (id: string) => void
}

const NewClothesListItem = ({ item, onDelete, onEdit }: Props) => {

    const handleEdit = () => {
        onEdit(item.id)
    }

    const handleDelete = () => {
        onDelete(item.id)
    }

    return (
        <div className="text-2xl flex flex-row items-center justify-center">
            <div className='w-1/2'>
                - {item.name}
            </div>
            <Button >
                <CreateIcon onClick={handleEdit} />
            </Button>
            <Button >
                <DeleteIcon onClick={handleDelete} />
            </Button>
        </div>
    )
}

export default NewClothesListItem