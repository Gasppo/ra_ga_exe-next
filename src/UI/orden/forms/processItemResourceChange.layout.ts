import { LayoutElement } from "@UI/Forms/types";
import { ProcesoFicha } from '../SelectableOrderProcessItem';

export const processItemResourceChangeLayout: LayoutElement<ProcesoFicha> = {
    type: "Vertical",
    spacing: 4,
    elements: [
        {
            type: 'Autocomplete',
            scope: 'recursos',
            label: 'Recursos Asignados',
            options: { optionsName: 'serviceUsers' }
        }
    ]
}