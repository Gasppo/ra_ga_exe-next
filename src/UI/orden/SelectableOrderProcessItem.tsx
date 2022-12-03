import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
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
    role: string,
    selected?: boolean
    onSelect?: (processID: string) => void
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
        default:
            return "text-gray-500"
    }
}

const SelectableOrderProcessItem = ({ proceso, role, selected, onSelect }: Props) => {

    const { estado, proceso: nombreProceso, icon, id } = proceso
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const color = ProcessStateTextColors(estado)

    const backgroundColor = selected ? 'bg-blue-100 border-blue-100' : estado === 'No Pedido' ? 'bg-gray-300' : 'hover:bg-gray-100 cursor-pointer'

    const handleSelectProcess = () => {
        if (selected || estado === 'No Pedido') return
        onSelect(id)
    }

    if (role === 'Dueño') return (
        <>
            <OrderProcessItemChangeDialog process={proceso} open={dialogOpen} onClose={handleDialogClose} />
            <div className={`py-2 px-4 flex flex-row items-center justify-between text-2 m-2 border-2 ${backgroundColor}`}>
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

    if( id === 'general') return (
        <div className={`py-2 px-4 flex flex-row items-center space-x-4 text-2 m-2 border-2 transition-all ${backgroundColor}`} onClick={handleSelectProcess}>
            <div>
                <Image src={icon} alt='hola' width={30} height={30} />
            </div>
            <div>
                <li className='flex flex-col'>
                    <div className='font-bold text-lg'>{nombreProceso}</div>
                    <div className='text-gray-400 text-xs'>Detalles generales de la orden</div>
                </li>
            </div>
        </div>
    )

    return (
        <div className={`py-2 px-4 flex flex-row items-center space-x-4 text-2 m-2 border-2 transition-all ${backgroundColor}`} onClick={handleSelectProcess}>
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

export default SelectableOrderProcessItem