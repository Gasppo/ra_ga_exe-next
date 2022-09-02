import { FormControlLabel, Switch, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { PriceCheckerProductionForm } from "../../../pages/cotizador";

interface ProductionFormProps {
    priceCheckerProductionForm: PriceCheckerProductionForm,
    onToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductionForm = (props: ProductionFormProps) => {

    const { priceCheckerProductionForm, onToggleChange } = props

    const { data } = useSession()

    useEffect(() => {
        console.log('Price checker production form', priceCheckerProductionForm)
    }, [priceCheckerProductionForm])

    return (
        <div className="flex md:w-6/12 flex-col justify-around items-baseline mt-10 md:mt-0">
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="fichaTecnica" checked={priceCheckerProductionForm.fichaTecnica.selected} onChange={onToggleChange} />} label="Ficha tecnica" labelPlacement="end" />
                <div className="flex w-full md:justify-end justify-center">
                    <TextField id="outlined-disabled" label="Cantidad" type="number" className="w-36" disabled={!priceCheckerProductionForm.fichaTecnica.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="muestraProduccion" checked={priceCheckerProductionForm.muestraProduccion.selected} onChange={onToggleChange} />} label="Muestra producción" labelPlacement="end" />
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="programacionTizada" checked={priceCheckerProductionForm.programacionTizada.selected} onChange={onToggleChange} />} label="Programación Tizada" labelPlacement="end" />
                <div className="flex w-full md:justify-end justify-center">
                    <TextField id="outlined-disabled" label="Metros" type="number" className="w-36" disabled={!priceCheckerProductionForm.programacionTizada.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="impresionTizada" checked={priceCheckerProductionForm.impresionTizada.selected} onChange={onToggleChange} />} label="Impresión Tizada" labelPlacement="end" />
                <div className="flex w-full md:justify-end justify-center">
                    <TextField id="outlined-disabled" label="Metros" type="number" className="w-36" disabled={!priceCheckerProductionForm.impresionTizada.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="corte" checked={priceCheckerProductionForm.corte.selected} onChange={onToggleChange} />} label="Corte" labelPlacement="end" />
                <div className="flex w-full md:justify-end space-x-4 justify-center">
                    <TextField id="outlined-disabled" label="# Prendas" type="number" className="w-36" disabled={!priceCheckerProductionForm.corte.selected} />
                    <TextField id="outlined-disabled" label="$ por prenda" type="number" className="w-36" disabled={!priceCheckerProductionForm.corte.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="confeccion" checked={priceCheckerProductionForm.confeccion.selected} onChange={onToggleChange} />} label="Corte" labelPlacement="end" />
                <div className="flex w-full md:justify-end space-x-4 justify-center">
                    <TextField id="outlined-disabled" label="# Prendas" type="number" className="w-36" disabled={!priceCheckerProductionForm.confeccion.selected} />
                    <TextField id="outlined-disabled" label="$ por prenda" type="number" className="w-36" disabled={!priceCheckerProductionForm.confeccion.selected} />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <FormControlLabel value="start" control={<Switch color="primary" name="envios" checked={priceCheckerProductionForm.envios.selected} onChange={onToggleChange} />} label="Impresión Tizada" labelPlacement="end" />
                <div className="flex w-full md:justify-end justify-center">
                    <TextField id="outlined-disabled" label="Viajes" type="number" className="w-36" disabled={!priceCheckerProductionForm.envios.selected} />
                </div>
            </div>
        </div>
    )
}

export default ProductionForm
