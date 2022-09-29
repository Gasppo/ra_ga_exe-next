import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import { clothingDetailLayout } from '@UI/cotizador/Ficha Tecnica/forms/clothingDetail.layout';
import FormItem from '@UI/Forms/FormItem';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const ClothingDetailForm = () => {


    const { watch, setValue } = useFormContext<OrderCreationData>()
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
