import { FichaTecnicaUploadFormData } from '@backend/schemas/FichaTecnicaFileUploadSchema'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { ArchivoFichaTecnica, ContenidoFichaTencica, FichaTecnica } from '@prisma/client'
import FormItem from '@UI/Forms/FormItem'
import HookForm from '@UI/Forms/HookForm'
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator'

type Ficha = {
    estado: string;
    proceso: string;
    icon: string;
    id: string;
    ficha: FichaTecnica & {
        archivos: ArchivoFichaTecnica[];
        contenido: ContenidoFichaTencica;
    };
}

type Props = {
    process: Ficha,
    open: boolean,
    onClose: () => void
}


const ServiceUploadDialog = ({ process, open, onClose }: Props) => {

    const handleUploadDocuments = (data: FichaTecnicaUploadFormData) => console.log(data)

    return <Dialog
        open={open}
        keepMounted
        onClose={onClose}
        fullWidth={true}
    >
        <div className="p-4">
            <DialogTitle>{`Subir archivo para ficha de ${process.proceso.toLowerCase()}`}</DialogTitle>
            <LoadingIndicator show={false} >
                <HookForm defaultValues={{
                    files: [],
                    fichaFiles: {
                        observaciones: '',
                        files: []
                    }
                }} onSubmit={handleUploadDocuments}   >
                    <DialogContent className='space-y-5'>
                        <FormItem layout={{
                            type: 'Uploader',
                            scope: 'files',
                            options: {
                                fileSection: 'fichaFiles.files',
                                multifile: true,
                                helperText: 'Inserte archivos correspondientes a imágenes, diseños, dibujos o bocetos de la prenda'
                            }
                        }} />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Confirmar</Button>
                    </DialogActions>
                </HookForm>
            </LoadingIndicator>
        </div>
    </Dialog >
}
export default ServiceUploadDialog