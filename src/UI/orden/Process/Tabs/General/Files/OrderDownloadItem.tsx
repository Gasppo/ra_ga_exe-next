import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Archivo, ArchivoFichaTecnica } from '@prisma/client';
import { downloadFromFetch } from '@utils/downloadFromFetch';
import Image from 'next/image';
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

    const imageSRC = `https://drive.google.com/uc?export=view&id=${archivo.urlID}`

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
                    {/* {archivo.type.includes('image') && <div>
                        <Image src={imageSRC} height='50%' width={'50%'} alt="Imagen" />
                    </div>} */}
                </div>
            </LoadingButton>
        </div>
    )
}

export default OrderDownloadItem