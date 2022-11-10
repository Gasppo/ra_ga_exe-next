import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { IconBorders } from '@UI/Generic/Utils/IconState';
import Image from 'next/image';
import { useState } from 'react';
import OrderProcessItemChangeDialog from './OrderProcessItemChangeDialog';

type Props = {
    proceso: {
        estado: string;
        proceso: string;
        icon: string;
        id: string;
    }
    role: string
}

const OrderProcessItem = ({ proceso, role }: Props) => {

    const { estado, proceso: nombreProceso, icon } = proceso
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const color = IconBorders(estado, 'text')
    if (role === 'cliente') return (
        <div className="py-2 px-4 flex flex-row items-center space-x-4 border-2 m-2">
            <div>
                <Image src={icon} alt='hola' width={30} height={30} />
            </div>
            <div>
                <li className='flex flex-col'>
                    <div className='font-bold text-lg'>{nombreProceso}</div>
                    <div className='text-gray-400 text-xs'>Estado: <span className={`${color}`}>{estado}</span></div>
                    <div className='text-gray-400 text-xs'>Plazo estimado: <span >N/A</span></div>
                </li>
            </div>
        </div>
    )

    return (
        <>
            <OrderProcessItemChangeDialog process={proceso} open={dialogOpen} onClose={handleDialogClose} />
            <div className="py-2 px-4 flex flex-row items-center justify-between border-2 m-2">
                <div className='flex flex-row items-center space-x-4'>
                    <div>
                        <Image src={icon} alt='hola' width={30} height={30} />
                    </div>
                    <div>
                        <li className='flex flex-col'>
                            <div className='font-bold text-lg'>{nombreProceso}</div>
                            <div className='text-gray-400 text-xs'>Estado: <span className={`${color}`}>{estado}</span></div>
                            <div className='text-gray-400 text-xs'>Plazo estimado: <span >N/A</span></div>
                        </li>
                    </div>
                </div>
                <div>
                    <IconButton type='button' onClick={handleDialogOpen}>
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default OrderProcessItem