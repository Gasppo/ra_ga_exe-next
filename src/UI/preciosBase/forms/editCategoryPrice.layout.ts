import { LayoutElement } from "@UI/Forms/types";
import { PrecioPrendaExtended } from "@utils/queries/cotizador";

export const editCategoryPriceLayout: LayoutElement<PrecioPrendaExtended> = {

    type: "Vertical",
    elements: [
        {
            type: "Input",
            scope: "precioBase",
            label: "Nombre",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }
    ]
}