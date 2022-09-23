import { LayoutElement } from "../../../Testing/types";
import { SignInData } from "../components/SignInForm";

export const signInLayout: LayoutElement<SignInData> = {
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
        },
        {
            type: 'Input',
            label: 'Contraseña',
            width: 12,
            scope: 'password',
            className: 'mt-1',
            options: {
                textType: 'password',
                size: 'small'
            }
        }
    ]
}