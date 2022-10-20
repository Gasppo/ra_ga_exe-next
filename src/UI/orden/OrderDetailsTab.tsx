import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"

type Props = {
    orderData: ExtendedOrdenData
}

const OrderDetailsTab = ({ orderData }: Props) => {
    return (
        <div className='flex flex-col mt-4'>
            <div className='text-gray-700 text-xl font-semibold'>Atributos seleccionados</div>
            <div className='flex flex-col'>
                {orderData?.detallesPrenda?.atributos.map(el => (
                    <div key={el.id} className="p-2 flex flex-col">
                        <div className='capitalize text-gray-700'>
                            - {el.name}
                        </div>
                        {el.observacion && <div className='text-xs  flex flex-row'>
                            <div>Observaciones: </div>
                            <div className='mx-1'>{el.observacion}</div>
                        </div>}

                        {el.cantidad > 0 && <div className='text-xs  flex flex-row'>
                            <div>Cantidad: </div>
                            <div className='mx-1'>{el.cantidad}</div>
                        </div>}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrderDetailsTab