import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData'
import OrderProcessItem from './OrderProcessItem'

type Props = {
    orderData: ExtendedOrdenData
    role?: string
}

const OrderProcessesTab = ({ orderData, role }: Props) => {

    const procesos = orderData?.procesos || []



    return (
        <div className='flex flex-col mt-4'>
            <div className='flex flex-col max-h-[20rem] overflow-y-scroll'>
                {procesos.map(proc => <OrderProcessItem key={proc.id} proceso={proc} role={role || 'Cliente'} />)}
            </div>
        </div>
    )
}

export default OrderProcessesTab