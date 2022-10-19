import CreateIcon from '@mui/icons-material/Create'
import { Button } from '@mui/material'
import { TipoPrenda } from '@prisma/client'

type Props = {
    item: TipoPrenda

    onEdit: (id: string) => void
}

const ModifyPricesListItem = ({ item, onEdit }: Props) => {

    const handleEdit = () => {
        onEdit(item.id)
    }

    return (
        <div className="text-2xl flex flex-row items-center justify-center">
            <div className='w-1/2'>
                - {item.name}
            </div>
            <Button >
                <CreateIcon onClick={handleEdit} />
            </Button>
        </div>
    )
}

export default ModifyPricesListItem