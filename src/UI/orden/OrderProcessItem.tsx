import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { adminRole } from '@utils/roles/SiteRoles';
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


export const ProcessStateTextColors = (estado: string) => {
    switch (estado.toLowerCase()) {
        case "pedido":
            return "text-cyan-500";
        case "traido por cliente":
            return "text-violet-500";
        case "no pedido":
            return "text-gray-500";
        case "iniciado":
            return "text-orange-500";
        case "en proceso":
            return "text-yellow-500";
        case "terminado":
            return "text-green-500";
        case "en pausa":
            return "text-teal-500";
        case "cancelado":
            return "text-red-500";
    }
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

    const color = ProcessStateTextColors(estado)


    if (role === adminRole) return (
        <>
            <OrderProcessItemChangeDialog process={proceso} open={dialogOpen} onClose={handleDialogClose} />
            <div className="py-2 px-4 flex flex-row items-center justify-between text-2 m-2 border-2">
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

    return (
        <div className="py-2 px-4 flex flex-row items-center space-x-4 text-2 m-2 border-2">
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
}

export default OrderProcessItem