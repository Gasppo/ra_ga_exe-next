import { LayoutElement } from "../../../Testing/types";

export const passwordResetLayout: LayoutElement<{ password: string, confirmPassword: string }> = {
    type: 'Vertical',
    spacing: 2,
    elements: [
        {
            type: 'Input',
            label: 'Contraseña',
            scope: 'password',
            options: { textType: 'password', size: 'small' },
            width: 12,
        },
        {
            type: 'Input',
            label: 'Confirmar Contraseña',
            scope: 'confirmPassword',
            options: { textType: 'password', size: 'small' },
            width: 12,
        },
    ]
}