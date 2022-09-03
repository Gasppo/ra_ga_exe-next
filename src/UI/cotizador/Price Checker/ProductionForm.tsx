import { FormControlLabel, Switch, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { CotizadorForm } from "../../Types/cotizadorTypes";
import { CotizadorFormItem } from "../Inputs/CotizadorSelect";

const ProductionForm = () => {

    const { data } = useSession()

    const { watch } = useFormContext<CotizadorForm>()
    const cotizadorData = watch()

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="fichaTecnica.selected" renderer={'Switch'} label="Ficha Tecnica" labelPlacement='end' />
                <div className="flex w-full md:justify-end justify-center">
                    <CotizadorFormItem scope="fichaTecnica.cantidad" renderer='Input' label='Cantidad' type='number' disabled={!cotizadorData.fichaTecnica.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="muestraProduccion.selected" renderer={'Switch'} label="Muestra Produccion" labelPlacement='end' />
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="programacionTizada.selected" renderer={'Switch'} label="Programación Tizada" labelPlacement='end' />
                <div className="flex w-full md:justify-end justify-center">
                    <CotizadorFormItem scope="programacionTizada.metros" renderer='Input' label='Metros' type='number' disabled={!cotizadorData.programacionTizada.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="impresionTizada.selected" renderer={'Switch'} label="Impresión Tizada" labelPlacement='end' />
                <div className="flex w-full md:justify-end justify-center">
                    <CotizadorFormItem scope="impresionTizada.metros" renderer='Input' label='Metros' type='number' disabled={!cotizadorData.impresionTizada.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="corte.selected" renderer={'Switch'} label="Corte" labelPlacement='end' />
                <div className="flex w-full md:justify-end space-x-4 justify-center">
                    <CotizadorFormItem scope="corte.cantPrendas" renderer='Input' label='# Prendas' type='number' disabled={!cotizadorData.corte.selected} />
                    <CotizadorFormItem scope="corte.precioPorPrenda" renderer='Input' label='$ por prenda' type='number' disabled={!cotizadorData.corte.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="confeccion.selected" renderer={'Switch'} label="Confección" labelPlacement='end' />
                <div className="flex w-full md:justify-end space-x-4 justify-center">
                    <CotizadorFormItem scope="confeccion.cantPrendas" renderer='Input' label='# Prendas' type='number' disabled={!cotizadorData.confeccion.selected} />
                    <CotizadorFormItem scope="confeccion.precioPorPrenda" renderer='Input' label='$ por prendas' type='number' disabled={!cotizadorData.confeccion.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <CotizadorFormItem scope="envios.selected" renderer={'Switch'} label="Envios" labelPlacement='end' />
                <div className="flex w-full md:justify-end justify-center">
                    <CotizadorFormItem scope="envios.viajes" renderer='Input' label='$ por prendas' type='number' disabled={!cotizadorData.envios.selected} />
                </div>
            </div>
        </div>
    )
}

export default ProductionForm
