import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Divider, IconButton } from "@mui/material";
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FichaTecnicaForm } from '../../Types/cotizadorTypes';
import { CotizadorFormItem } from '../Inputs/CotizadorSelect';
import FileInfoTag from '../Inputs/FileInfoTag';

const ClothingDetailForm = () => {


    const { watch, setValue } = useFormContext<FichaTecnicaForm>()
    const cotizadorData = watch()

    const logoMarcaDisabled = !cotizadorData.molderiaBase.selected
    const bolsillosDisabled = !cotizadorData.bolsillos.selected
    const elasticoDisabled = !cotizadorData.elastico.selected
    const botonesDisabled = !cotizadorData.botones.selected
    const cierreDisabled = !cotizadorData.cierre.selected
    const mangaDisabled = !cotizadorData.manga.selected

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files)
        setValue('files', files)
    }

    const handleFileRemove = (fileName: string) => {
        const updatedFiles = cotizadorData?.files.filter(file => file.name !== fileName)
        setValue('files', updatedFiles)
    }


    useEffect(() => {
        if (logoMarcaDisabled) setValue('files', [])
    }, [logoMarcaDisabled, setValue])

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section justify-start flex-row ">
                <CotizadorFormItem scope="logoMarca.selected" renderer='Switch' label="Logo marca" labelPlacement='end' />
                <IconButton color="primary" aria-label="upload picture" component="label" disabled={logoMarcaDisabled} className="justify-end">
                    <input multiple hidden accept="image/*" type="file" onChange={handleFileUpload} />
                    <FileUploadIcon />
                </IconButton>
                <div className='border-2 md:w-full mx-2 md:mx-4 p-4 flex flex-row flex-wrap'>
                    {cotizadorData?.files.map((file, i) => <FileInfoTag file={file} key={i} onRemove={handleFileRemove} />)}
                </div>
                <CotizadorFormItem scope="logoMarca.observaciones" renderer='Input' label='Observaciones' type='text' disabled={logoMarcaDisabled} className='mx-4' />
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="bolsillos.selected" renderer='Switch' label="Bolsillos" labelPlacement='end' />
                <div className="form-input-inner-section" >
                    <CotizadorFormItem scope="bolsillos.cantidad" renderer='Input' label='Cantidad' type='number' disabled={bolsillosDisabled} className='mx-4' />
                    <CotizadorFormItem scope="bolsillos.observaciones" renderer='Input' label='Observaciones' type='text' disabled={bolsillosDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="elastico.selected" renderer='Switch' label="Elástico" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="elastico.metros" renderer='Input' label='Metros' type='number' disabled={elasticoDisabled} className='mx-4' />
                    <CotizadorFormItem scope="elastico.observaciones" renderer='Input' label='Notas elástico' type='text' disabled={elasticoDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="botones.selected" renderer='Switch' label="Botones" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="botones.cantidad" renderer='Input' label='Cantidad' type='number' disabled={botonesDisabled} className='mx-4' />
                    <CotizadorFormItem scope="botones.observaciones" renderer='Input' label='Observaciones' type='text' disabled={botonesDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="cierre.selected" renderer='Switch' label="Cierre" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="cierre.observaciones" renderer='Input' label='Observaciones' type='text' disabled={cierreDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="manga.selected" renderer='Switch' label="Manga" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="manga.observaciones" renderer='Input' label='Observaciones' type='text' disabled={mangaDisabled} className='mx-4' />
                </div>
            </div>


        </div>
    )
}

export default ClothingDetailForm
