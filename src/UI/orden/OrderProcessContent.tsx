import { Tab, Tabs } from "@mui/material";
import OrderDetailsTab from '@UI/orden/OrderDetailsTab';
import OrderFilesTab from '@UI/orden/OrderFilesTab';
import OrderMessagesTab from '@UI/orden/OrderMessagesTab';
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import { useMemo, useState } from "react";

type Props = {
    orderData: ExtendedOrdenData,
    selectedProcess: string
}

const OrderProcessContent = ({ orderData, selectedProcess }: Props) => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const currProcess = useMemo(() => orderData?.procesos.find(el => el.id === selectedProcess), [selectedProcess, orderData?.procesos])

    return (
        <>
            {selectedProcess !== 'general' && <div className='text-4xl'>
                Ficha de proceso de {currProcess?.proceso || 'N/A'}
            </div>}
            {selectedProcess === 'general' && (
                <div className='flex flex-col items-center space-y-4 w-full'>
                    <div className='text-4xl'>
                        Detalles de la orden
                    </div>
                    <div className='flex justify-center items-center w-full'>
                        <div className='w-full flex flex-col items-start border-2 p-4 shadow-lg max-h-[75vh] overflow-y-auto'>
                            <div className='border-b-2 w-full'>
                                <Tabs value={value} onChange={handleChange} variant='scrollable'>
                                    {<Tab label="Detalles" value={0} />}
                                    {orderData?.archivos?.length > 0 && <Tab label="Archivos" value={1} />}
                                    {true && <Tab label="Mensajes" value={2} />}
                                </Tabs>
                            </div>
                            <div hidden={value !== 0} className='w-full'>
                                <OrderDetailsTab orderData={orderData} />
                            </div>
                            <div hidden={value !== 1} className='w-full'>
                                <OrderFilesTab orderData={orderData} />
                            </div>
                            <div hidden={value !== 2} className='w-full'>
                                <OrderMessagesTab orderData={orderData} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderProcessContent