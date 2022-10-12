import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const clothingSizesLayout: LayoutElement<OrderCreationData> = {
    type: 'Horizontal',
    elements: [{
        type: 'Select',
        label: 'Cantidad a producir',
        scope: 'cantidad',
        width: 6,
        options: {
            shrinkLabel: true,
            optionsName: 'cantidades',
        }
    }
    ]
}