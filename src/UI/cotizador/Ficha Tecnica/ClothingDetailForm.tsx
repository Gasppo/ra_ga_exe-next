import { clothingDetailLayout } from '@UI/cotizador/Ficha Tecnica/forms/clothingDetail.layout';
import FormItem from '@UI/Forms/FormItem';
import { FichaTecnicaForm } from '@UI/Types/fichaTecnicaTypes';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const ClothingDetailForm = () => {


    const { watch, setValue } = useFormContext<FichaTecnicaForm>()
    const cotizadorData = watch()

    const logoMarcaDisabled = !cotizadorData.molderiaBase.selected


    useEffect(() => {
        if (logoMarcaDisabled) setValue('files', [])
    }, [logoMarcaDisabled, setValue])


    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <FormItem layout={clothingDetailLayout} />
        </div>
    )
}

export default ClothingDetailForm
