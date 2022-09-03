import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Divider, IconButton } from "@mui/material";
import { Complexity } from "@prisma/client";
import { useFormContext } from 'react-hook-form';
import { CotizadorForm } from '../../Types/cotizadorTypes';
import { CotizadorFormItem } from '../Inputs/CotizadorSelect';

interface DevelopmentFormProps {
    complexityData: Complexity[]
}


const DevelopmentForm = (props: DevelopmentFormProps) => {

    const { complexityData } = props

    const { watch } = useFormContext<CotizadorForm>()
    const cotizadorData = watch()

    const molderiaBaseDisabled = !cotizadorData.molderiaBase.selected
    const digitalizacionDisabled = !cotizadorData.digitalizacionYProgresion.selected
    const impresionMoldeDisabled = !cotizadorData.impresionMolde.selected
    const enviosDisabled = !cotizadorData.envios.selected
    const corteMuestraDisabled = !cotizadorData.corteMuestra.selected

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="form-input-section justify-start flex-row">
                <CotizadorFormItem scope="molderiaBase.selected" renderer='Switch' label="Molderia Base" labelPlacement='end' />
                <IconButton color="primary" aria-label="upload picture" component="label" disabled={molderiaBaseDisabled} className="justify-end">
                    <input hidden accept="image/*" type="file" />
                    <FileUploadIcon />
                </IconButton>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="digitalizacionYProgresion.selected" renderer='Switch' label="Digitalización y Progresión +4" labelPlacement='end' />
                <div className="form-input-inner-section" >
                    <CotizadorFormItem scope="digitalizacionYProgresion.moldes" renderer='Input' label='Moldes' type='number' disabled={digitalizacionDisabled} className='mx-4' />
                    <CotizadorFormItem scope="digitalizacionYProgresion.avios" renderer='Input' label='Avíos' type='number' disabled={digitalizacionDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="impresionMolde.selected" renderer='Switch' label="Impresión Molde" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="impresionMolde.meters" renderer='Input' label='Metros' type='number' disabled={impresionMoldeDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="w-full md:mt-5">
                <CotizadorFormItem scope="geometral.selected" renderer='Switch' label="Geometral" labelPlacement='end' />
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="corteMuestra.selected" renderer='Switch' label="Corte Muestra" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem renderer="Select" scope="corteMuestra.telaCorte" label="Elija Complejidad" options={complexityData} optionKey='name' optionText='name' disabled={corteMuestraDisabled} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="confeccionMuestrista.selected" renderer='Switch' label="Confección Muestrista" labelPlacement='end' />
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="muestraProduccion.selected" renderer='Switch' label="Muestra Producción" labelPlacement='end' />
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="envios.selected" renderer='Switch' label="Envios" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="envios.viajes" renderer='Input' label='Viajes' type='number' disabled={enviosDisabled} className='mx-4' />
                    <CotizadorFormItem scope="envios.total" renderer='Input' label='Total' type='number' disabled={enviosDisabled} className='mx-4' />
                </div>
            </div>
        </div>
    )
}

export default DevelopmentForm
