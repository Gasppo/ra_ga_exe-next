import { Button, Divider, IconButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FichaTecnicaForm } from "../../Types/fichaTecnicaTypes";
import { CotizadorFormItem } from "../Inputs/CotizadorSelect";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import RemoveIcon from '@mui/icons-material/Remove';

const ClothingSizesForm = () => {

    const { watch, setValue } = useFormContext<FichaTecnicaForm>()
    const cotizadorData = watch()
    const talles = cotizadorData.talles.talle

    const tallesDisabled = !cotizadorData.talles.selected

    const addNewSize = () => {
        const newTalles = [...talles, { nombre: '', medidas: '' }]
        setValue('talles.talle', newTalles)
    }

    useEffect(() => {
        console.log(cotizadorData)
    }, [cotizadorData])


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



        </div>
    )
}

export default ClothingSizesForm