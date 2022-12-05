import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData'
import { clienteRole, prestadorDeServiciosRole } from '@utils/roles/SiteRoles'
import { useSession } from 'next-auth/react'
import SelectableOrderProcessItem from './SelectableOrderProcessItem'

type Props = {
    orderData: ExtendedOrdenData
    selectedProcess: string
    role: string
    onSelect: (processID: string) => void
}

const OrderProcessSidebar = ({ orderData, role, selectedProcess, onSelect }: Props) => {

    const { data } = useSession()


    return (
        <div className='flex flex-col mt-4'>
            <div className='flex flex-col max-h-screen overflow-y-auto'>
                <SelectableOrderProcessItem
                    proceso={{
                        estado: 'N/A',
                        id: 'general',
                        icon: 'https://cdn-icons-png.flaticon.com/512/839/839599.png',
                        proceso: 'General',
                        ficha: { archivos: [], contenido: null, contenidoId: null, estimatedAt: null, id: null, procesoId: null, updatedAt: null },
                        recursos: []
                    }}
                    role={role || 'Cliente'}
                    onSelect={onSelect}
                    selected={selectedProcess === 'general'}
                />
            </div>
            <div className='m-2 font-bold text-lg'>Procesos</div>
            <div className='flex flex-col max-h-screen overflow-y-auto'>
                {orderData?.procesos.filter(proc => {
                    if (proc.proceso === 'Molderia' || proc.proceso === 'Geometral') return true
                    if (role === clienteRole) return proc.estado !== 'No Pedido'
                    if (role === prestadorDeServiciosRole) return proc.recursos.some(el => el.key === data.user.email)
                    return true
                })
                    .map(proc => <SelectableOrderProcessItem
                        key={proc.id}
                        proceso={proc}
                        role={role || 'Cliente'}
                        onSelect={onSelect}
                        selected={selectedProcess === proc.id}
                    />)}
            </div>
        </div>
    )
}

export default OrderProcessSidebar