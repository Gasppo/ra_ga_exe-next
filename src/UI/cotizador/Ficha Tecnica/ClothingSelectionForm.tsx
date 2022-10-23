import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { TipoPrenda } from "@prisma/client";
import { getComplexity } from "@utils/queries/cotizador";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import FormItem from "../../Forms/FormItem";
import { clothingSelectionLayout } from "./forms/clothingSelection.layout";

interface ModelFormProps {
    clothesData: TipoPrenda[],
}


const ClothingSelectionForm = (props: ModelFormProps) => {

    const { clothesData } = props
    const { data: complexitiesData } = useQuery(['complexities'], getComplexity, { initialData: [], refetchOnWindowFocus: false})
    const { setValue, watch } = useFormContext<OrderCreationData>()
    const clothes = useMemo(() => clothesData?.map(el => ({ key: el.name, text: el.name })) || [], [clothesData])
    const complexities = useMemo(() => complexitiesData?.map(el => ({ key: el.name, text: el.name })) || [], [complexitiesData])

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
            <div className="mt-7 md:w-4/6">
                <FormItem layout={clothingSelectionLayout} selectOptions={{ 'clothesData': clothes, complexities }} />
            </div>
        </div>
    )
}

export default ClothingSelectionForm
