import { LayoutElement } from "@UI/Forms/types";

export const editUserAvailabilityLayout: LayoutElement<{ available: boolean }> = {

    type: "Vertical",
    elements: [
        {
            type: 'Select',
            scope: "available",
            width: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
            label: 'Habilite/Deshabilite la cuenta',
            options: {
                optionsName: 'availabilities',
            },
        },
    ]
}