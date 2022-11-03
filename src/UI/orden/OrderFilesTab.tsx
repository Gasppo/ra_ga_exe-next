import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"
import OrderDownloadItem from './OrderDownloadItem'

type Props = {
    orderData: ExtendedOrdenData
}

const OrderFilesTab = ({ orderData }: Props) => {

    return (
        <div className='flex flex-col mt-4'>
            <div hidden={orderData?.archivos?.length === 0}>
                <div className='text-gray-700 text-lg font-medium '>Orden</div>
                <div className='flex flex-row flex-wrap' >
                    {orderData?.archivos?.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                </div>
            </div>

        </div>
    )
}

export default OrderFilesTab