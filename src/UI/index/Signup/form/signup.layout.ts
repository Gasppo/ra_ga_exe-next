import { SignupData } from "../../../../utils/queries/user";
import { LayoutElement } from "../../../Testing/types";

export const signupLayout: LayoutElement<SignupData> = {
    type: 'Horizontal',
    elements: [
        {
            type: 'Input',
            label: 'Nombre',
            scope: 'name',
            className: 'mt-1',
            width: 12,
        },
        {
            type: 'Input',
            label: 'Email',
            scope: 'email',
            className: 'mt-1',
            width: 12,
        },
        {
            type: 'Input',
            label: 'Password',
            scope: 'password',
            className: 'mt-1',
            options: { textType: 'password' },
            width: 12,
        },
        {
            type: 'Input',
            label: 'Confirm Password',
            scope: 'confirmPassword',
            className: 'mt-1',
            options: { textType: 'password' },
            width: 12,
        },
    ]
}