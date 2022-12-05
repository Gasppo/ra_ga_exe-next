import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';
import { ArchivoFichaTecnica, ContenidoFichaTencica, FichaTecnica } from '@prisma/client';
import { adminRole, prestadorDeServiciosRole } from '@utils/roles/SiteRoles';
import Image from 'next/image';
import { useState } from 'react';
import OrderProcessItemChangeDialog from './Process/OrderProcessItemChangeDialog';
import OrderProcessItemResourcesDialog from './Process/OrderProcessItemResourcesDialog';

export type ProcesoFicha = {
    estado: string;
    proceso: string;
    icon: string;
    id: string;
    ficha: FichaTecnica & {
        archivos: ArchivoFichaTecnica[];
        contenido: ContenidoFichaTencica;
    };
    recursos: { key: string, text: string }[]
}

type Props = {
    proceso: ProcesoFicha
    role: string,
    selected?: boolean
    onSelect?: (processID: string) => void
}


export const ProcessStateTextColors = (estado: string) => {
    switch (estado?.toLowerCase()) {
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

    const { estado, proceso: nombreProceso, icon, id, ficha } = proceso
    const [statusDialogOpen, setStatusDialogOpen] = useState(false)
    const [resourceDialogOpen, setResourceDialogOpen] = useState(false)

    const handleStatusDialogClose = () => setStatusDialogOpen(false)
    const handleStatusDialogOpen = () => setStatusDialogOpen(true)

    const handleResourceDialogClose = () => setResourceDialogOpen(false)
    const handleResourceDialogOpen = () => setResourceDialogOpen(true)

    const color = ProcessStateTextColors(estado)

    const selectable = estado !== 'No Pedido' || ['Modlería', 'Geometral'].includes(nombreProceso)

    const backgroundColor = selected ? 'bg-blue-100 border-blue-100' : !selectable ? 'bg-gray-300' : 'hover:bg-gray-100 cursor-pointer'
    const estimatedAt = new Date(ficha.estimatedAt).toLocaleDateString('es-AR')

    const handleSelectProcess = () => {
        if (selected || !selectable) return
        onSelect(id)
    }

    if (id === 'general') return (
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
    if (role === adminRole || role === prestadorDeServiciosRole) return (
        <>
            <OrderProcessItemChangeDialog process={proceso} open={statusDialogOpen} onClose={handleStatusDialogClose} />
            <OrderProcessItemResourcesDialog process={proceso} open={resourceDialogOpen} onClose={handleResourceDialogClose} />
            <div className={`py-2 px-4 flex flex-row items-center justify-between text-2 m-2 border-2 ${backgroundColor}`} onClick={handleSelectProcess}>
                <div className='flex flex-row items-center space-x-4'>
                    <div>
                        <Image src={icon} alt='hola' width={30} height={30} />
                    </div>
                    <div>
                        <li className='flex flex-col'>
                            <div className='font-bold text-lg'>{nombreProceso}</div>
                            <div className='text-gray-400 text-xs'>Estado: <span className={`${color}`}>{estado}</span></div>
                            <div className='text-gray-400 text-xs'>Plazo estimado: <span >{estimatedAt}</span></div>
                        </li>
                    </div>
                </div>
                <div className='flex flex-row'>
                    {role === adminRole && <div>
                        <IconButton type='button' onClick={handleResourceDialogOpen}>
                            <PersonAddIcon />
                        </IconButton>
                    </div>}
                    <div>
                        <IconButton type='button' onClick={handleStatusDialogOpen}>
                            <EditIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
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
                    <div className='text-gray-400 text-xs'>Plazo estimado: <span >{estimatedAt}</span></div>
                </li>
            </div>
        </div>
    )
}

export default SelectableOrderProcessItem