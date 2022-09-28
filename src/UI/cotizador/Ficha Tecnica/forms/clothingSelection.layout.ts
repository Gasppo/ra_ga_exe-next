import { FichaTecnicaForm } from "@pages/api/order/new";
import { LayoutElement } from "../../../Forms/types";

export const clothingSelectionLayout: LayoutElement<FichaTecnicaForm> = {
    type: 'Vertical',
    spacing: 4,
    elements: [
        {
            type: 'Input',
            scope: 'user.name',
            label: 'Cliente',
            options: {
                disabled: true
            }
        },
        {
            type: 'Select',
            scope: 'tipoPrenda.name',
            label: 'Tipo de prenda',
            options: {
                optionsName: 'clothesData',
                helperText: 'Seleccione categoría de la prenda'
            }
        }
    ]
}