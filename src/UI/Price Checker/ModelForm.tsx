import { MenuItem, TextField } from "@mui/material";

const ModelForm = ({ clothesData, complexityData, sessionData, priceCheckerModel, handleComplexityChange, handleClothesChange }) => {


    return (
        <div className="grid w-6/12 md:flex-col justify-items-center">
            <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
            <div className="md:mt-7 w-3/6">
                <TextField name='tipoPrenda' id="outlined-select-currency" select fullWidth label="Elija categoria" value={priceCheckerModel.tipoPrenda !== '' ? priceCheckerModel.tipoPrenda.id : ''} onChange={handleClothesChange} helperText="Seleccione categoría de la prenda">
                    {clothesData?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="md:mt-7 w-3/6">
                <TextField name='complejidad' id="outlined-select-currency" select fullWidth label="Elija complejidad" value={priceCheckerModel.complejidad !== '' ? priceCheckerModel.complejidad.id : ''} onChange={handleComplexityChange} helperText="Seleccione complejidad de la prenda">
                    {complexityData?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    )
}

export default ModelForm
