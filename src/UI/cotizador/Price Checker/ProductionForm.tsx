import { Divider } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CotizadorForm } from "../../Types/cotizadorTypes";
import { CotizadorFormItem } from "../Inputs/CotizadorSelect";

const ProductionForm = () => {


    const { watch } = useFormContext<CotizadorForm>()
    const cotizadorData = watch()

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="form-input-section">
                <CotizadorFormItem scope="fichaTecnica.selected" renderer={'Switch'} label="Ficha Tecnica" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="fichaTecnica.cantidad" renderer='Input' label='Cantidad' type='number' disabled={!cotizadorData.fichaTecnica.selected} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="muestraProduccion.selected" renderer={'Switch'} label="Muestra Produccion" labelPlacement='end' />
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="programacionTizada.selected" renderer={'Switch'} label="Programación Tizada" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="programacionTizada.metros" renderer='Input' label='Metros' type='number' disabled={!cotizadorData.programacionTizada.selected} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="impresionTizada.selected" renderer={'Switch'} label="Impresión Tizada" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="impresionTizada.metros" renderer='Input' label='Metros' type='number' disabled={!cotizadorData.impresionTizada.selected} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="corte.selected" renderer={'Switch'} label="Corte" labelPlacement='end' />
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="corte.cantPrendas" renderer='Input' label='# Prendas' type='number' disabled={!cotizadorData.corte.selected} className='mx-4' />
                    <CotizadorFormItem scope="corte.precioPorPrenda" renderer='Input' label='$ por prenda' type='number' disabled={!cotizadorData.corte.selected} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <div>
                    <CotizadorFormItem scope="confeccion.selected" renderer={'Switch'} label="Confección" labelPlacement='end' />
                </div>
                <div className="form-input-inner-section">
                    <CotizadorFormItem scope="confeccion.cantPrendas" renderer='Input' label='# Prendas' type='number' disabled={!cotizadorData.confeccion.selected} className='mx-4' />
                    <CotizadorFormItem scope="confeccion.precioPorPrenda" renderer='Input' label='$ por prenda' type='number' disabled={!cotizadorData.confeccion.selected} className='mx-4' />
                </div>
            </div>

            <Divider variant='fullWidth' className="form-divider" />
            <div className="form-input-section">
                <CotizadorFormItem scope="envios.selected" renderer={'Switch'} label="Envios" labelPlacement='end' />
                <div className="form-input-inner-section ">
                    <CotizadorFormItem scope="envios.viajes" renderer='Input' label='$ por prenda' type='number' disabled={!cotizadorData.envios.selected} className='mx-4' />
                </div>
            </div>
        </div>
    )
}

export default ProductionForm
