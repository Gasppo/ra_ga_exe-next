import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"
import OrderDownloadItem from './OrderDownloadItem'
import OrderImageItem from "./OrderImageItem"

type Props = {
    orderData: ExtendedOrdenData
}

const OrderFilesTab = ({ orderData }: Props) => {

    const imagenes = orderData?.archivos?.filter(file => file.type.includes('image'))
    const pdfs = orderData?.archivos?.filter(file => file.type.includes('pdf'))
    const otros = orderData?.archivos?.filter(file => !file.type.includes('pdf') && !file.type.includes('image'))


    return (
        <div className='flex flex-col mt-4'>
            <div hidden={orderData?.archivos?.length === 0}>
                {imagenes?.length > 0 && <div className='flex flex-col'>
                    <div><p className='underline'>Imagenes</p></div>
                    <div className='flex flex-col flex-wrap' >
                        {imagenes.map(el => <OrderImageItem archivo={el} key={el.id} />)}
                    </div>
                </div>}
                {pdfs?.length > 0 && <div className='flex flex-col'>
                    <div><p className='underline'>PDFs</p></div>
                    <div className='flex flex-row flex-wrap' >
                        {pdfs.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                    </div>
                </div>}
                {otros?.length > 0 && <div className='flex flex-col'>
                    <div><p className='underline'>Otros tipos</p></div>
                    <div className='flex flex-row flex-wrap' >
                        {otros.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default OrderFilesTab