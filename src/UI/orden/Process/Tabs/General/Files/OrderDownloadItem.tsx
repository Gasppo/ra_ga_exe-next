import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Archivo, ArchivoFichaTecnica } from '@prisma/client';
import { downloadFromFetch } from '@utils/downloadFromFetch';
import { useState } from 'react';

type Props = {
    archivo: Archivo | ArchivoFichaTecnica
}

const OrderDownloadItem = ({ archivo }: Props) => {
    const [downloading, setDownloading] = useState(false)


    const handleDownload = async () => {
        setDownloading(true)
        await downloadFromFetch(`/api/drive/download?file=${archivo.urlID}`, archivo.name)
        setDownloading(false)
    }


    return (
        <div className='my-3 mr-4'>
            <LoadingButton
                onClick={handleDownload}
                endIcon={<SaveIcon />}
                loading={downloading}
                loadingPosition="end"
                variant='outlined'
                type='button'
            >
                <div className='flex flex-col space-y-2'>
                    <div>
                        {archivo.name}
                    </div>
                </div>
            </LoadingButton>
        </div>
    )
}

export default OrderDownloadItem