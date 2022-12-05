import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LoadingButton } from '@mui/lab';
import { Button, Grow, Menu, MenuItem } from '@mui/material';
import { Archivo, ArchivoFichaTecnica } from '@prisma/client';
import { downloadFromFetch } from '@utils/downloadFromFetch';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
    archivo: Archivo | ArchivoFichaTecnica
}
const OrderImageItem = ({ archivo }: Props) => {
    const [downloading, setDownloading] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleImageDisplay = () => {
        setAnchorEl(null);
        setShowImage(true)
    }
    const handleImageHide = () => {
        setAnchorEl(null);
        setShowImage(false)
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDownload = async () => {
        setDownloading(true)
        setAnchorEl(null);
        await downloadFromFetch(`/api/drive/download?file=${archivo.urlID}`, archivo.name)
        setDownloading(false)
    }

    const imageSRC = `https://drive.google.com/uc?export=view&id=${archivo.urlID}`

    return (
        <div className='my-3 mr-4 flex flex-col space-y-4'>
            <div>
                <LoadingButton
                    onClick={handleMenuOpen}
                    endIcon={<MoreVertIcon />}
                    loading={downloading}
                    loadingPosition="end"
                    variant='outlined'
                    type='button'
                >
                    <div>
                        {archivo.name}
                    </div>
                </LoadingButton>
            </div>
            <Grow in={showImage} mountOnEnter unmountOnExit>
                <div className='border-2 p-4 w-fit transition-all duration-400'>
                    <div className='flex flex-col items-center'>
                        <div className='self-start'>
                            <Button type='button' onClick={handleImageHide}>Cerrar visualización</Button>
                        </div>
                        <Image src={imageSRC} height='300%' width={'300%'} alt="Imagen" />
                    </div>
                </div>
            </Grow>
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleDownload}>Descargar</MenuItem>
                {!showImage && <MenuItem onClick={handleImageDisplay}>Visualizar</MenuItem>}
                {showImage && <MenuItem onClick={handleImageHide}>Cerrar visualización</MenuItem>}
            </Menu>
        </div>
    )
}

export default OrderImageItem