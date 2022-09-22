import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import FormItem from '../../Testing/FormItem';
import { FichaTecnicaForm } from '../../Types/fichaTecnicaTypes';
import { clothingDetailLayout } from './forms/clothingDetail.layout.';

const ClothingDetailForm = () => {


    const { watch, setValue } = useFormContext<FichaTecnicaForm>()
    const cotizadorData = watch()

    const logoMarcaDisabled = !cotizadorData.molderiaBase.selected


    useEffect(() => {
        if (logoMarcaDisabled) setValue('files', [])
    }, [logoMarcaDisabled, setValue])

    const Item = FormItem<FichaTecnicaForm>

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
                <Item layout={clothingDetailLayout}/>
        </div>
    )
}

export default ClothingDetailForm
