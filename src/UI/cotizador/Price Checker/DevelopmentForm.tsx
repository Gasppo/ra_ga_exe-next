import FileUploadIcon from '@mui/icons-material/FileUpload';
import { FormControlLabel, IconButton, MenuItem, Switch, TextField } from "@mui/material";
import { Complexity } from "@prisma/client";
import { PriceCheckerDevelopmentForm } from "../../../pages/cotizador";
import CotizadorInput from '../CotizadorInput';

interface DevelopmentFormProps {
    complexityData: Complexity[],
    priceCheckerDevelopmentForm: PriceCheckerDevelopmentForm,
    onObjectChange: (newData: PriceCheckerDevelopmentForm[keyof PriceCheckerDevelopmentForm], field: keyof PriceCheckerDevelopmentForm) => void
    onToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, parentElement: string) => void

}


const DevelopmentForm = (props: DevelopmentFormProps) => {

    const { priceCheckerDevelopmentForm, complexityData, onObjectChange, onToggleChange, onValueChange } = props

    const handleComplexityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const complexity = complexityData.find(complexityType => complexityType.name === event.target.value)
        const newData = { selected: priceCheckerDevelopmentForm.corteMuestra.selected, telaCorte: complexity.name }
        console.log('New data vale', newData)
        onObjectChange(newData, "corteMuestra")
    }

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="w-full">
                <FormControlLabel value="start" control={<Switch color="primary" name="molderiaBase" checked={priceCheckerDevelopmentForm.molderiaBase.selected} onChange={onToggleChange} />} label="Molderia Base" labelPlacement="end" />
                <IconButton color="primary" aria-label="upload picture" component="label" disabled={!priceCheckerDevelopmentForm.molderiaBase.selected} className="justify-end">
                    <input hidden accept="image/*" type="file" />
                    <FileUploadIcon />
                </IconButton>
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5">
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Digitalización y Progresión +4" labelPlacement="end" />
                <div className="flex w-full flex-col md:space-x-4 justify-end md:flex-row" >
                    <CotizadorInput label="Moldes" name="moldes" value={priceCheckerDevelopmentForm.digitalizacionYProgresion.moldes} onChange={(e) => { onValueChange(e, 'digitalizacionYProgresion') }} type="number" />
                    <CotizadorInput label="Avíos" name="moldes" value={priceCheckerDevelopmentForm.digitalizacionYProgresion.avios} onChange={(e) => { onValueChange(e, 'digitalizacionYProgresion') }} type="number" />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5">
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Impresión Molde" labelPlacement="end" />
                <div className="flex w-full md:justify-end justify-center">
                    <TextField id="outlined-disabled" label="Metros" type="number" className="w-36" />
                </div>
            </div>
            <div className="w-full md:mt-5">
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Geometral" labelPlacement="end" />
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5">
                <FormControlLabel value="start" control={<Switch color="primary" name="corteMuestra" onChange={onToggleChange} />} label="Corte Muestra" labelPlacement="end" />
                <div className="flex w-full md:justify-end justify-center">
                    <TextField name='complejidad' id="outlined-select-currency" select label="Complejidad" className="w-72" value={priceCheckerDevelopmentForm.corteMuestra.telaCorte} onChange={handleComplexityChange}>
                        {complexityData?.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            <div className="w-full md:mt-5">
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Confeccion Muestrista" labelPlacement="end" />
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5 ">
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Muestra producción" labelPlacement="end" />
            </div>
            <div className="w-full flex flex-col md:flex-row md:mt-5 ">
                <FormControlLabel value="start" control={<Switch color="primary" />} label="Envios" labelPlacement="end" />
                <div className="flex w-full flex-col md:flex-row md:space-x-4 justify-end">
                    <div className="flex justify-center">
                        <TextField id="outlined-disabled" label="Viajes" type="number" className="w-36" />
                    </div>
                    <div className="flex justify-center">
                        <TextField id="outlined-disabled" label="Total" type="number" className="w-36" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DevelopmentForm
