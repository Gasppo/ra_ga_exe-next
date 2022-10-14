import { LoadingButton } from '@mui/lab'
import { Archivo } from '@prisma/client'
import { downloadFromFetch } from '@utils/downloadFromFetch'
import React, { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';

type Props = {
    archivo: Archivo
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
                {archivo.name}
            </LoadingButton>
        </div>
    )
}

export default OrderDownloadItem