import { LayoutElement } from "@UI/Forms/types";

export const generalOrderChangelayout: LayoutElement<{ prendaID: string }> = {
    type: "Vertical",
    spacing: 4,
    elements: [
        {
            type: 'Select',
            scope: 'prendaID',
            label: 'Complejidad',
            options: {
                optionsName: 'states'
            }
        }
    ]
}