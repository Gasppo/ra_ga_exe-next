import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const clothingSelectionLayout: LayoutElement<OrderCreationData> = {
    type: 'Vertical',
    spacing: 4,
    justifyContent: 'space-between',
    elements: [
        {
            type: 'Input',
            scope: 'nombreProducto',
            label: 'Nombre del producto',
            width: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
            options: {
                required: true,
            }
        },
        {
            type: 'Select',
            scope: 'tipoPrenda.name',
            width: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
            label: 'Tipo de prenda',
            options: {
                required: true,
                optionsName: 'clothesData',
            }
        },
        {
            type: 'Select',
            scope: 'complejidad',
            width: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
            label: 'Complejidad',
            options: {
                optionsName: 'complexities',
                required: true,
            }
        }
        ,
        {
            type: 'Input',
            scope: 'atributosPrenda.material.observaciones',
            width: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
            label: 'Material',
            options: {
                required: true,
            }
        }
    ]
}