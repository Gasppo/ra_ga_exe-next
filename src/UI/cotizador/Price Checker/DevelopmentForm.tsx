import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from "@mui/material";
import { Complexity } from "@prisma/client";
import { useFormContext } from 'react-hook-form';
import { CotizadorForm, PriceCheckerDevelopmentForm } from '../../Types/cotizadorTypes';
import { CotizadorFormItem } from '../Inputs/CotizadorSelect';

interface DevelopmentFormProps {
    complexityData: Complexity[]
}


const DevelopmentForm = (props: DevelopmentFormProps) => {

    const { complexityData } = props

    const { watch } = useFormContext<CotizadorForm>()
    const cotizadorData = watch()

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="w-full">
                <CotizadorFormItem scope="molderiaBase.selected" renderer={'Switch'} label="Molderia Base" labelPlacement='end' />
                <IconButton color="primary" aria-label="upload picture" component="label" disabled={!cotizadorData.molderiaBase.selected} className="justify-end">
                    <input hidden accept="image/*" type="file" />
                    <FileUploadIcon />
                </IconButton>

            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5">
                <CotizadorFormItem scope="digitalizacionYProgresion.selected" renderer={'Switch'} label="Digitalización y Progresión +4" labelPlacement='end' />
                <div className="flex w-full flex-col md:space-x-4 justify-end md:flex-row" >
                    <CotizadorFormItem scope="digitalizacionYProgresion.moldes" renderer='Input' label='Moldes' type='number' disabled={!cotizadorData.digitalizacionYProgresion.selected} />
                    <CotizadorFormItem scope="digitalizacionYProgresion.avios" renderer='Input' label='Avíos' type='number' disabled={!cotizadorData.digitalizacionYProgresion.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5">
                <CotizadorFormItem scope="impresionMolde.selected" renderer={'Switch'} label="Impresión Molde" labelPlacement='end' />
                <div className="flex w-full md:justify-end justify-center">
                    <CotizadorFormItem scope="impresionMolde.meters" renderer='Input' label='Metros' type='number' disabled={!cotizadorData.impresionMolde.selected} />
                </div>
            </div>
            <div className="w-full md:mt-5">
                <CotizadorFormItem scope="geometral.selected" renderer={'Switch'} label="Geometral" labelPlacement='end' />
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5">
                <CotizadorFormItem scope="corteMuestra.selected" renderer={'Switch'} label="Corte Muestra" labelPlacement='end' />
                <CotizadorFormItem renderer="Select" scope={"corteMuestra.telaCorte"} label="Elija Complejidad" options={complexityData} optionKey={"name"} optionText={'name'} helperText={"Seleccione categoría de la prenda"} disabled={!cotizadorData.corteMuestra.selected} />
            </div>
            <div className="w-full md:mt-5">
                <CotizadorFormItem scope="confeccionMuestrista.selected" renderer={'Switch'} label="Confección Muestrista" labelPlacement='end' />
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5 ">
                <CotizadorFormItem scope="muestraProduccion.selected" renderer={'Switch'} label="Muestra Producción" labelPlacement='end' />
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5 ">
                <CotizadorFormItem scope="envios.selected" renderer={'Switch'} label="Envios" labelPlacement='end' />
                <div className="flex w-full flex-col md:flex-row md:space-x-4 justify-end">
                    <div className="flex justify-center">
                        <CotizadorFormItem scope="envios.viajes" renderer='Input' label='Viajes' type='number' disabled={!cotizadorData.envios.selected} />
                    </div>
                    <div className="flex justify-center">
                        <CotizadorFormItem scope="envios.total" renderer='Input' label='Total' type='number' disabled={!cotizadorData.envios.selected} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DevelopmentForm
