import { EstadoOrden } from '@prisma/client';
import FormItem from '@UI/Forms/FormItem';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { ExtendedOrdenData } from '@utils/Examples/BasicOrderTable';
import { errorHandle } from '@utils/queries/cotizador';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';

interface OrderStateChangeProps {
    order: ExtendedOrdenData
}

const OrderStateChange = ({ order }: OrderStateChangeProps) => {
    const { addError } = React.useContext(ErrorHandlerContext)

    const { setValue } = useFormContext<{ orderState: number }>()

    const fetchOrderStates = (): Promise<EstadoOrden[]> =>
        fetch(`/api/orders/states`, {})
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke bringing order states");
                throw error;
            });


    const { data: orderStateData } = useQuery(
        ['orderStates'],
        () => fetchOrderStates(), {
        onError: () => addError('Error al traer estados de ordenes'),
        refetchOnWindowFocus: false,
        initialData: []
    });

    const estados = orderStateData?.map(el => ({ key: el.id, text: el.nombre }))

    useEffect(() => {
        setValue('orderState', order?.idEstado)
    }, [order?.idEstado, setValue]);


    return (
        <div className="mt-10 w-64">
            <FormItem layout={{
                type: 'Select',
                scope: 'orderState',
                options: { optionsName: 'estados', helperText: "Modifique el estado de la orden" }
            }}
                selectOptions={{ 'estados': estados }}
            />
        </div>
    )
}

export default OrderStateChange
