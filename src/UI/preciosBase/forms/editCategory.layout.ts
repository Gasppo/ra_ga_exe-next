import { LayoutElement } from "@UI/Forms/types";
import { ClothingAndPrices } from "../EditCategoryDialog";

export const editCategoryLayout: LayoutElement<ClothingAndPrices> = {

    type: "Vertical",
    elements: [
        {
            type: "Input",
            scope: "name",
            label: "Nombre",
            className: 'mt-1',
        }, {
            type: "Input",
            scope: "picture",
            label: "Imagen",
            className: 'mt-1',
        }
    ]
}