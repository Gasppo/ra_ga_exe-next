import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import React from "react";

type Props = {
    children: React.ReactNode
    orderData: ExtendedOrdenData
}

export const OrderViewContext = React.createContext<{
    orderData: ExtendedOrdenData | null
}>({
    orderData: null
})

const OrderViewProvider = ({ children, orderData }: Props) => {

    return (
        <OrderViewContext.Provider value={{ orderData }}>
            {children}
        </OrderViewContext.Provider>
    )
}


export default OrderViewProvider