import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Divider, IconButton } from "@mui/material";
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FichaTecnicaForm } from '../../Types/fichaTecnicaTypes';
import { CotizadorFormItem } from '../Inputs/CotizadorSelect';
import FileInfoTag from '../Inputs/FileInfoTag';

const ClothingMouldsForm = () => {

    const { watch, setValue } = useFormContext<FichaTecnicaForm>()
    const cotizadorData = watch()

    const molderiaBaseDisabled = !cotizadorData.molderiaBase.selected
    const geometralDisabled = !cotizadorData.geometral.selected


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files)
        setValue('files', files)
    }

    const handleFileRemove = (fileName: string) => {
        const updatedFiles = cotizadorData?.files.filter(file => file.name !== fileName)
        setValue('files', updatedFiles)
    }


    useEffect(() => {
        if (molderiaBaseDisabled) setValue('files', [])
    }, [molderiaBaseDisabled, setValue])

    useEffect(() => {
        if (geometralDisabled) setValue('files', [])
    }, [geometralDisabled, setValue])

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">

            <div className="form-input-section justify-start flex-row ">
                <CotizadorFormItem scope="molderiaBase.selected" renderer='Switch' label="Molderia Base" labelPlacement='end' />
                <IconButton color="primary" aria-label="upload picture" component="label" disabled={molderiaBaseDisabled} className="justify-end">
                    <input multiple hidden accept="image/*" type="file" onChange={handleFileUpload} />
                    <FileUploadIcon />
                </IconButton>
                <div className='border-2 md:w-full mx-2 md:mx-4 p-4 flex flex-row flex-wrap'>
                    {cotizadorData?.files.map((file, i) => <FileInfoTag file={file} key={i} onRemove={handleFileRemove} />)}
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section" >
                <CotizadorFormItem scope="molderiaBase.observaciones" renderer='Input' label='Observaciones Moldería Base' type='text' disabled={molderiaBaseDisabled} className='mx-4' />
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section justify-start flex-row ">
                <CotizadorFormItem scope="geometral.selected" renderer='Switch' label="Geometral" labelPlacement='end' />
                <IconButton color="primary" aria-label="upload picture" component="label" disabled={geometralDisabled} className="justify-end">
                    <input multiple hidden accept="image/*" type="file" onChange={handleFileUpload} />
                    <FileUploadIcon />
                </IconButton>
                <div className='border-2 md:w-full mx-2 md:mx-4 p-4 flex flex-row flex-wrap'>
                    {cotizadorData?.files.map((file, i) => <FileInfoTag file={file} key={i} onRemove={handleFileRemove} />)}
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section" >
                <CotizadorFormItem scope="geometral.observaciones" renderer='Input' label='Observaciones Geometral' type='text' disabled={molderiaBaseDisabled} className='mx-4' />
            </div>
        </div>
    )
}

export default ClothingMouldsForm
