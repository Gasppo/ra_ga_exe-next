import { Slide, Tab, Tabs } from "@mui/material";
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import { useEffect, useState } from "react";
import OrderMessagesTab from "./Tabs/General/Message/OrderMessagesTab";
import ServiceDetailsTab from "./Tabs/Services/Details/ServiceDetailsTab";
import ServiceFilesTab from "./Tabs/Services/Files/ServiceFilesTab";

type Props = {
    orderData: ExtendedOrdenData
    selectedProcess: string
}

const OrderProcessContentService = ({ orderData, selectedProcess }: Props) => {
    const [value, setValue] = useState(0);
    const [slide, setSlide] = useState(true)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        setSlide(false)
        setValue(0)
        setTimeout(() => setSlide(true), 200)
    }, [selectedProcess]);

    return (
        <Slide direction="up" in={slide} >
            <div className='flex flex-col items-center space-y-4 w-full'>
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
                            <ServiceDetailsTab orderData={orderData} selectedProcess={selectedProcess} />
                        </div>
                        <div hidden={value !== 1} className='w-full'>
                            <ServiceFilesTab orderData={orderData} selectedProcess={selectedProcess} />
                        </div>
                        <div hidden={value !== 2} className='w-full'>
                            <OrderMessagesTab orderData={orderData} selectedProcess={selectedProcess} />
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    )
}

export default OrderProcessContentService