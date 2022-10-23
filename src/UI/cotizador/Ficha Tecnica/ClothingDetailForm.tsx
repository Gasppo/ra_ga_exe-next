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
            <FormItem layout={clothingDetailLayout} selectOptions={{
                    cantidades: [
                        { key: 'none', text: 'Sólo Desarrollo' },
                        { key: 'Muestra', text: 'Muestrario ( 1 a 5 prendas )' },
                        { key: 'Nano', text: 'Nano Producción ( 5 a 20 prendas )' },
                        { key: 'Micro', text: 'Micro Producción ( 20 a 80 prendas )' },
                        { key: 'Mini', text: 'Mini Producción ( 80 a 250 prendas )' },
                        { key: 'Medio', text: 'Producción Media ( 250 a 1000 prendas )' },
                        { key: 'Alto', text: 'Gran Producción ( 1000 o más prendas )' }
                    ],
                    generos: [
                        { key: 'bebe', text: 'Bebés' },
                        { key: 'kids', text: 'Niños y Niñas' },
                        { key: 'teen', text: 'Adolecentes' },
                        { key: 'woman', text: 'Mujer' },
                        { key: 'man', text: 'Hombre' },
                        { key: 'unisex', text: 'Unisex' },
                        { key: 'special', text: 'Talles Especiales' },
                        { key: 'other', text: 'Otro' },
                    ]
                }} />
        </div>
    )
}

export default ClothingDetailForm
