import { LayoutElement } from "@UI/Forms/types";
import { ProcesoFicha } from '../SelectableOrderProcessItem';

export const processItemChangeLayout: LayoutElement<ProcesoFicha> = {
    type: "Vertical",
    spacing: 4,
    elements: [
        {
            type: 'Select',
            scope: 'estado',
            label: 'Estado',
            options: { optionsName: 'states' }
        },
        {
            type: 'DatePicker',
            scope: 'ficha.estimatedAt',
            label: 'Fecha Estimada',
        }
    ]
}