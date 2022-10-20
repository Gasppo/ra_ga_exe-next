import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { TipoPrenda } from "@prisma/client";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import FormItem from "../../Forms/FormItem";
import { clothingSelectionLayout } from "./forms/clothingSelection.layout";

interface ModelFormProps {
    clothesData: TipoPrenda[],
}


const ClothingSelectionForm = (props: ModelFormProps) => {

    const { clothesData } = props
    const clothes = useMemo(() => clothesData?.map(el => ({ key: el.name, text: el.name })) || [], [clothesData])
    const { setValue, watch } = useFormContext<OrderCreationData>()

    const currPrendaName = watch('tipoPrenda.name')
    const prendaSelected = useMemo(() => clothesData?.find(el => el.name === currPrendaName), [currPrendaName, clothesData])

    useEffect(() => {
        if (prendaSelected) {
            setValue('tipoPrenda.picture', prendaSelected.picture)
            setValue('tipoPrenda.id', prendaSelected.id)
        }
    }, [prendaSelected, setValue]);

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-center md:mt-0">
            <div className="mt-7 md:w-3/6">
                <FormItem layout={clothingSelectionLayout} selectOptions={{ 'clothesData': clothes }} />
            </div>
        </div>
    )
}

export default ClothingSelectionForm
