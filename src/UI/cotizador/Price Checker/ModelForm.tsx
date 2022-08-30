import { MenuItem, TextField } from "@mui/material";
import { ClothesCategory, Complexity } from "@prisma/client";
import { useSession } from "next-auth/react";
import { PriceCheckerModel } from "../../../pages/cotizador";

interface ModelFormProps {
    clothesData: ClothesCategory[],
    complexityData: Complexity[],
    priceCheckerModel: PriceCheckerModel,
    onChangeModel: <Model>(newData: Model[keyof Model], field: keyof Model) => void
}


const ModelForm = (props: ModelFormProps) => {

    const { clothesData, complexityData, onChangeModel, priceCheckerModel } = props

    const { data } = useSession()


    const handleClothesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = clothesData.find(clothesType => clothesType.id === event.target.value)
        onChangeModel<PriceCheckerModel>(newData, "tipoPrenda")
    }

    const handleComplexityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = clothesData.find(clothesType => clothesType.id === event.target.value)
        onChangeModel<PriceCheckerModel>(newData, "complejidad")
    }

    return (
        <div className="grid w-6/12 md:flex-col justify-items-center">
            <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
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
