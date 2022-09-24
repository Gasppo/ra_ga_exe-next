import { SignupData } from "../../../../utils/queries/user";
import { LayoutElement } from "../../../Forms/types";

export const signupLayout: LayoutElement<SignupData> = {
    type: 'Vertical',
    spacing: 2,
    elements: [
        {
            type: 'Input',
            label: 'Nombre',
            scope: 'name',
            width: 12,
            options: { size: 'small' }
        },
        {
            type: 'Input',
            label: 'Email',
            scope: 'email',
            width: 12,
            options: { size: 'small' }
        },
        {
            type: 'Input',
            label: 'Password',
            scope: 'password',
            options: { textType: 'password', size: 'small' },
            width: 12,
        },
        {
            type: 'Input',
            label: 'Confirm Password',
            scope: 'confirmPassword',
            options: { textType: 'password', size: 'small' },
            width: 12,
        },
    ]
}