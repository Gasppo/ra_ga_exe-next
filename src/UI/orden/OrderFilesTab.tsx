import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"
import React, { useMemo } from 'react'
import OrderDownloadItem from './OrderDownloadItem'

type Props = {
    orderData: ExtendedOrdenData
}

const OrderFilesTab = ({ orderData }: Props) => {

    const archivosMolderia = useMemo(() => orderData?.archivos?.filter(el => el.type === 'molderiaBase') || [], [orderData?.archivos])
    const archivosGeometral = useMemo(() => orderData?.archivos?.filter(el => el.type === 'geometral') || [], [orderData?.archivos])
    const archivosLogo = useMemo(() => orderData?.archivos?.filter(el => el.type === 'logoMarca') || [], [orderData?.archivos])

    return (
        <div className='flex flex-col mt-4'>
            <div hidden={archivosMolderia.length === 0}>
                <div className='text-gray-700 text-lg font-medium '>Moldería</div>
                <div className='flex flex-row flex-wrap' >
                    {archivosMolderia?.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                </div>
            </div>
            <div hidden={archivosGeometral.length === 0}>
                <div className='text-gray-700 text-lg font-medium '>Geometral</div>
                <div className='flex flex-row flex-wrap' >
                    {archivosGeometral?.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                </div>
            </div>
            <div hidden={archivosLogo.length === 0}>
                <div className='text-gray-700 text-lg font-medium '>Logo Marca</div>
                <div className='flex flex-row flex-wrap' >
                    {archivosLogo?.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                </div>
            </div>
        </div>
    )
}

export default OrderFilesTab