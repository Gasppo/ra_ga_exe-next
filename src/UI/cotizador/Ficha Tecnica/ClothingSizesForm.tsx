import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Divider, IconButton } from "@mui/material";
import FormItem from '@UI/Forms/FormItem';
import { useFormContext } from "react-hook-form";
import { CotizadorFormItem } from "../Inputs/CotizadorSelect";
import { clothingSizesLayout } from './forms/clothingSizesForm.layout';

const ClothingSizesForm = () => {

    const { watch, setValue } = useFormContext<OrderCreationData>()
    const cotizadorData = watch()
    const talles = cotizadorData.talles.talle

    const tallesDisabled = !cotizadorData.talles.selected

    const addNewSize = () => {
        const newTalles = [...talles, { nombre: '', medidas: '' }]
        setValue('talles.talle', newTalles)
    }

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">

            <div className="form-input-section">
                <CotizadorFormItem scope="talles.selected" renderer={'Switch'} label="Talles" labelPlacement='end' />
            </div>

            {talles.map((_talle, i) => (
                <div key={i} className="form-input-section">
                    <CotizadorFormItem scope={`talles.talle[${i}].nombre`} renderer='Input' label='Nombre' type='text' disabled={tallesDisabled} className='mx-4' />
                    <CotizadorFormItem scope={`talles.talle[${i}].medidas`} renderer='Input' label='Medidas' type='text' disabled={tallesDisabled} className='mx-4' />
                    <Button disabled={tallesDisabled} className='rounded-full'><RemoveIcon className="cursor-pointer m-auto" color="info" fontSize="medium" onClick={() => {
                        // const newTalles = [...talles]
                        // newTalles.splice(i, 1)
                        // setValue('talles.talle', newTalles)
                        setValue('talles.talle', talles.filter((_, index) => index !== i))
                    }} /></Button>
                </div>
            ))}

            <Divider variant='fullWidth' className="form-divider" />
            <div className="flex justify-center w-full mt-4" >
                <IconButton aria-label="delete" size="large" color="info" onClick={addNewSize} disabled={tallesDisabled}>
                    <AddIcon />
                </IconButton>
            </div>

            <div className="form-input-section">
                <FormItem layout={clothingSizesLayout} selectOptions={{
                    cantidades: [
                        { key: 'none', text: 'Sólo Desarrollo' },
                        { key: 'Muestra', text: 'Muestrario ( 1 a 5 prendas )' },
                        { key: 'Nano', text: 'Nano Producción ( 5 a 20 prendas )' },
                        { key: 'Micro', text: 'Micro Producción ( 20 a 80 prendas )' },
                        { key: 'Mini', text: 'Mini Producción ( 80 a 250 prendas )' },
                        { key: 'Medio', text: 'Producción Media ( 250 a 1000 prendas )' },
                        { key: 'Alto', text: 'Gran Producción ( 1000 o más prendas )' }
                    ]
                }} />
            </div>

        </div>
    )
}

export default ClothingSizesForm