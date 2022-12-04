import { FichaTecnicaUploadFormData, ValidatedFichaTecnicaFileUploadSchema } from '@backend/schemas/FichaTecnicaFileUploadSchema'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { ArchivoFichaTecnica, ContenidoFichaTencica, FichaTecnica } from '@prisma/client'
import FormItem from '@UI/Forms/FormItem'
import HookForm from '@UI/Forms/HookForm'
import { Paths } from '@UI/Types/nestedObjTypes'
import { ErrorHandlerContext } from '@utils/ErrorHandler/error'
import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData'
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator'
import { DriveUploadResponse } from '@utils/queries/cotizador'
import { ErrorMessage } from '@utils/queries/user'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateFichaFiles, updateFileURL, uploadFile } from './serviceUploadAPIs'

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
    orderData: ExtendedOrdenData
    process: Ficha,
    open: boolean,
    onClose: () => void
}

type FileUploadData = { clientName: string, orderID: string, formData: FormData, fichaType: string }

const ServiceUploadDialog = ({ process, open, onClose, orderData }: Props) => {

    const queryClient = useQueryClient()

    const { addError } = useContext(ErrorHandlerContext)
    const { data: sessionData } = useSession()

    const { mutateAsync: uploadFilesMutation, isLoading: isUploading } = useMutation<DriveUploadResponse, ErrorMessage, FileUploadData>(uploadFile,
        { onError: (error) => addError(error.error), }
    )

    const { mutateAsync: updateFicha } = useMutation<FichaTecnica, any, { data: ValidatedFichaTecnicaFileUploadSchema, fichaID: string }>(updateFichaFiles,
        {
            onError: (error) => addError(JSON.stringify(error)),
            onSuccess: () => { onClose(); queryClient.invalidateQueries(['order']) }
        }
    )

    const handleUploadDocuments = async (data: FichaTecnicaUploadFormData) => {
        if (data?.files?.length > 0) {
            const uploadedFiles = await (await handleUploadFile(data.files)).data
            Array.isArray(uploadedFiles) ?
                uploadedFiles.forEach(file => updateFileURL(data, file)) :
                updateFileURL(data, uploadedFiles)
        }
        await updateFicha({ data, fichaID: process.ficha.id })
    }


    const handleUploadFile = async (file: { file: File, section: Paths<ValidatedFichaTecnicaFileUploadSchema> }[]) => {
        const folderName = sessionData?.user.name || 'Sin Asignar'
        const formData = new FormData()
        for (const f of file) {
            formData.append('file', f.file)
        }
        return await uploadFilesMutation({ clientName: folderName, orderID: orderData.id, formData: formData, fichaType: process.proceso })
    }


    return (
        <Dialog open={open} keepMounted onClose={onClose} fullWidth={true} >
            <div className="p-4">
                <DialogTitle>{`Subir archivo para ficha de ${process.proceso.toLowerCase()}`}</DialogTitle>
                <LoadingIndicator show={isUploading} >
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
    )
}
export default ServiceUploadDialog