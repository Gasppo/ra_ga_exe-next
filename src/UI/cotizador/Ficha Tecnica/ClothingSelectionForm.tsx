import { ClothesCategory } from "@prisma/client";
import { useMemo } from "react";
import FormItem from "../../Testing/FormItem";
import { clothingSelectionLayout } from "./forms/clothingSelection.layout";

interface ModelFormProps {
    clothesData: ClothesCategory[],
}


const ClothingSelectionForm = (props: ModelFormProps) => {

    const { clothesData } = props
    const clothes = useMemo(() => clothesData?.map(el => ({ key: el.name, text: el.name })) || [], [clothesData])

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-center mt-10 md:mt-0">
            <div className="mt-7 md:w-3/6">
                <FormItem layout={clothingSelectionLayout} selectOptions={{ 'clothesData': clothes }} />
            </div>
        </div>
    )
}

export default ClothingSelectionForm
