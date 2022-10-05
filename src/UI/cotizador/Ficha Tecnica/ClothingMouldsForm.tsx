import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import FormItem from '@UI/Forms/FormItem';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { clothingMouldsLayout } from './forms/clothingMoulds.layout';

const ClothingMouldsForm = () => {

    const { watch, setValue } = useFormContext<OrderCreationData>()
    const cotizadorData = watch()

    const molderiaBaseDisabled = !cotizadorData.molderiaBase.selected
    const geometralDisabled = !cotizadorData.geometral.selected

    useEffect(() => {
        if (molderiaBaseDisabled) setValue('files', [])
    }, [molderiaBaseDisabled, setValue])

    useEffect(() => {
        if (geometralDisabled) setValue('files', [])
    }, [geometralDisabled, setValue])

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <div className="form-input-section">
                <FormItem layout={clothingMouldsLayout} />
            </div>
        </div>
    )
}

export default ClothingMouldsForm
