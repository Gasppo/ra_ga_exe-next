import AddIcon from '@mui/icons-material/Add'
import { Button } from "@mui/material"
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"
import { prestadorDeServiciosRole } from '@utils/roles/SiteRoles'
import { useGetRole } from '@utils/roles/useGetRole'
import { useSession } from 'next-auth/react'
import { useMemo, useState } from "react"
import OrderDownloadItem from "../../General/Files/OrderDownloadItem"
import OrderImageItem from '../../General/Files/OrderImageItem'
import ServiceUploadDialog from './ServiceUploadDialog'

type Props = {
    orderData: ExtendedOrdenData
    selectedProcess: string
}


const ServiceFilesTab = ({ orderData, selectedProcess }: Props) => {

    const currProcess = useMemo(() => orderData?.procesos.find(el => el.id === selectedProcess), [selectedProcess, orderData?.procesos])
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

    const { data } = useSession()

    const { role } = useGetRole(data.user.email)

    const handleUploadDialogOpen = () => setUploadDialogOpen(true)
    const handleUploadDialogClose = () => setUploadDialogOpen(false)

    const imagenes = currProcess?.ficha?.archivos?.filter(file => file.type.includes('image'))
    const pdfs = currProcess?.ficha?.archivos?.filter(file => file.type.includes('pdf'))
    const otros = currProcess?.ficha?.archivos?.filter(file => !file.type.includes('pdf') && !file.type.includes('image'))


    return (
        <div className='flex flex-col mt-4'>
            <div hidden={currProcess?.ficha?.archivos?.length === 0}>
                {role !== prestadorDeServiciosRole && <div >
                    <Button variant="text" onClick={handleUploadDialogOpen} startIcon={<AddIcon />}>Subir nuevo archivo</Button>
                </div>}
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
            <div hidden={currProcess?.ficha?.archivos?.length !== 0}>
                < div className="h-full border-2 flex justify-center items-center p-4">
                    <div className="flex flex-col space-y-4 items-center">
                        <div className="text-2xl">No hay archivos correspondientes al proceso de <span className="lowercase">{currProcess?.proceso}</span></div>
                        {role !== prestadorDeServiciosRole && <div >
                            <Button variant="outlined" onClick={handleUploadDialogOpen} startIcon={<AddIcon />}>Subir nuevo archivo</Button>
                        </div>}
                    </div>
                </div>
            </div>
            {
                uploadDialogOpen && <div>
                    <ServiceUploadDialog onClose={handleUploadDialogClose} open={uploadDialogOpen} process={currProcess} orderData={orderData} />
                </div>
            }
        </div >
    )
}



export default ServiceFilesTab