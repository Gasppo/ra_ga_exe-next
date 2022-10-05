import { SignInSchemaType } from "@backend/schemas/SignInSchema";
import { LayoutElement } from "../../../Forms/types";

export const signInLayout: LayoutElement<SignInSchemaType> = {
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