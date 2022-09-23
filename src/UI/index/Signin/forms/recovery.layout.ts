import { LayoutElement } from "../../../Testing/types";

export const recoveryLayout: LayoutElement<{ email: string }> = {
    type: 'Horizontal',
    elements: [
        {
            type: 'Input',
            label: 'Correo',
            scope: 'email',
            width: 12,
            options: {
                size: 'small'
            }
        }
    ]
}