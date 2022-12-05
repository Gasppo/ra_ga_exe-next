import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import { useMemo } from "react";
import OrderProcessContentGeneral from "./OrderProcessContentGeneral";
import OrderProcessContentService from "./OrderProcessContentService";

type Props = {
    orderData: ExtendedOrdenData,
    selectedProcess: string
}

const OrderProcessContent = ({ orderData, selectedProcess }: Props) => {
    
    
    const currProcess = useMemo(() => orderData?.procesos.find(el => el.id === selectedProcess), [selectedProcess, orderData?.procesos])

    return (
        <>
            <div className='text-4xl mb-20'>
                {selectedProcess !== 'general' ? `Ficha de proceso de ${currProcess?.proceso || 'N/A'}` : 'Detalles de la orden'}
            </div>
            {selectedProcess === 'general' && <OrderProcessContentGeneral orderData={orderData} selectedProcess={selectedProcess} />}
            {selectedProcess !== 'general' && <OrderProcessContentService orderData={orderData} selectedProcess={selectedProcess} />}
        </>
    )
}

export default OrderProcessContent