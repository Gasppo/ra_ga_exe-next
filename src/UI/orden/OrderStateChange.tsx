import { Categoria, EstadoOrden, Orden, Prenda, User } from '@prisma/client';
import FormItem from '@UI/Forms/FormItem';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { errorHandle } from '@utils/queries/cotizador';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';

interface OrderStateChangeProps {
    order: Orden & { estado: EstadoOrden, user: User, categoria: Categoria & { Prenda: Prenda } }
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
        <div className="mt-16 w-64">
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
