import { ClothesCategory, Complexity } from "@prisma/client";
import { CotizadorFormItem } from "../Inputs/CotizadorSelect";

interface ModelFormProps {
    clothesData: ClothesCategory[],
    complexityData: Complexity[]
}


const ModelForm = (props: ModelFormProps) => {

    const { clothesData, complexityData } = props

    return (
        <div className="flex w-7/12 md:w-6/12 flex-col justify-center items-center mt-10 md:mt-0">
            <div className="w-full md:w-3/6">
                <CotizadorFormItem scope={"user.name"} renderer={'Input'} disabled label="Cliente" />
            </div>
            <div className="mt-7 w-full md:w-3/6">
                <CotizadorFormItem renderer="Select" scope={"tipoPrenda.name"} label="Categoría" options={clothesData} optionKey={"name"} optionText={'name'}/>
            </div>
            <div className="mt-7 w-full md:w-3/6">
                <CotizadorFormItem renderer="Select" scope="complejidad.name" label="Complejidad" options={complexityData} optionKey={"name"} optionText={"name"} />
            </div>
        </div>
    )
}

export default ModelForm
