import { OrderStateUpdateSchemaType } from '@backend/schemas/OrderStateUpdateSchema'
import { Button } from '@mui/material'
import HookForm from '@UI/Forms/HookForm'
import { ErrorHandlerContext } from '@utils/ErrorHandler/error'
import { ExtendedOrdenData } from '@utils/Examples/BasicOrderTable'
import { errorHandle } from '@utils/queries/cotizador'
import React, { useContext, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import ConfirmStateChangeDialog from './ConfirmStateChangeDialog'
import OrderStateChange from './OrderStateChange'

type Props = {
    orderData: ExtendedOrdenData
}

const OrderStateTab = (props: Props) => {

    const { orderData } = props
    const { addError } = useContext(ErrorHandlerContext)
    const queryClient = useQueryClient()
    const [confirmOpen, setConfirmOpen] = useState(false)

    const modifyOrderState = async (data: OrderStateUpdateSchemaType): Promise<string> => {
        const { id, newStateId } = data
        return await fetch(`/api/order/updateState`, {
            method: "POST",
            headers: { "Content-Type": "application/json", accept: "application/json" },
            body: JSON.stringify({ id, newStateId }),
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke trying to update order");
                throw error;
            });
    };

    const { mutate } = useMutation(modifyOrderState, {
        onSuccess: () => {
            addError('Modificacion exitosa', 'success')
            queryClient.invalidateQueries(['order'])
        }
    })

    const handleFormSubmit = (data: { orderState: number }) => {
        mutate({ id: orderData.id, newStateId: data.orderState })
    }

    const handleOpenConfirmDialog = () => {
        setConfirmOpen(true)
    }

    const handleCloseConfirmDialog = () => {
        setConfirmOpen(false)
    }

    const defaultFormData = {
        orderState: 0
    }

    return (
        <HookForm defaultValues={defaultFormData} onSubmit={handleFormSubmit}>
            <OrderStateChange order={orderData} />
            <ConfirmStateChangeDialog onClose={handleCloseConfirmDialog} open={confirmOpen} formSubmit={handleFormSubmit} />
            <div className="mt-8">
                <div className="flex flex-row">
                    <Button onClick={handleOpenConfirmDialog}>Confirmar</Button>
                </div>
            </div>
        </HookForm>
    )
}

export default OrderStateTab