import AddIcon from '@mui/icons-material/Add'
import { Button } from "@mui/material"
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"
import { useMemo, useState } from "react"
import OrderDownloadItem from "../../General/Files/OrderDownloadItem"
import ServiceUploadDialog from './ServiceUploadDialog'

type Props = {
    orderData: ExtendedOrdenData
    selectedProcess: string
}


const ServiceFilesTab = ({ orderData, selectedProcess }: Props) => {

    const currProcess = useMemo(() => orderData?.procesos.find(el => el.id === selectedProcess), [selectedProcess, orderData?.procesos])
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

    const handleUploadDialogOpen = () => setUploadDialogOpen(true)
    const handleUploadDialogClose = () => setUploadDialogOpen(false)

    return (
        <div className='flex flex-col mt-4'>
            <div hidden={currProcess?.ficha?.archivos?.length === 0}>
                <div >
                    <Button variant="text" onClick={handleUploadDialogOpen} startIcon={<AddIcon />}>Subir nuevo archivo</Button>
                </div>
                <div className='flex flex-row flex-wrap' >
                    {currProcess?.ficha?.archivos?.map(el => <OrderDownloadItem archivo={el} key={el.id} />)}
                </div>
            </div>
            <div hidden={currProcess?.ficha?.archivos?.length !== 0}>
                < div className="h-full border-2 flex justify-center items-center p-4">
                    <div className="flex flex-col space-y-4 items-center">
                        <div className="text-2xl">No hay archivos correspondientes al proceso de <span className="lowercase">{currProcess.proceso}</span></div>
                        <div >
                            <Button variant="outlined" onClick={handleUploadDialogOpen} startIcon={<AddIcon />}>Subir nuevo archivo</Button>
                        </div>
                    </div>
                </div>
            </div>
            {uploadDialogOpen && <div>
                <ServiceUploadDialog onClose={handleUploadDialogClose} open={uploadDialogOpen} process={currProcess} orderData={orderData} />
            </div>}
        </div>
    )
}



export default ServiceFilesTab