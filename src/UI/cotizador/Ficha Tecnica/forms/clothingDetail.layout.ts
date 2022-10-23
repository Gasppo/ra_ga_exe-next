import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const clothingDetailLayout: LayoutElement<OrderCreationData> = {
    type: 'Horizontal',
    elements: [
        {
            type: 'Vertical',
            justifyContent: 'center',
            width: 12,
            spacing: 2,
            elements: [
                {
                    type: 'Select',
                    scope: 'atributosPrenda.genero.observaciones',
                    label: "Genero",
                    options: {
                        labelPlacement: 'end',
                        optionsName: 'generos',
                    },
                    width: 6
                },
                {
                    type: 'Select',
                    label: 'Cantidad a producir',
                    scope: 'cantidad',
                    width: 6,
                    options: {
                        shrinkLabel: true,
                        optionsName: 'cantidades',
                    }
                },
                {
                    type: 'Input',
                    label: 'Talles',
                    scope: 'cantidad',
                    width: 6,
                    options: {
                        shrinkLabel: true,
                        optionsName: 'cantidades',
                    }
                }
            ]
        }
    ]
}