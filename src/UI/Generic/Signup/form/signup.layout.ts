import { UserCreationSchemaType } from "@backend/schemas/UserCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const signupLayout: LayoutElement<UserCreationSchemaType> = {
    type: 'Vertical',
    spacing: 2,
    elements: [
        {
            type: 'Input',
            label: 'Email',
            scope: 'email',
            width: 12,
            options: { size: 'small' }
        },
        {
            type: 'Horizontal',
            className: 'flex justify-between',
            elements:[
                {
                    type: 'Input',
                    label: 'Nombre',
                    scope: 'name',
                    width: 6,
                    options: { size: 'small' }
                },
                {
                    type: 'Input',
                    label: 'Razon Social',
                    scope: 'razonSocial',
                    width: 6,
                    options: { size: 'small' }
                },
            ]
        },
        {
            type: 'Horizontal',
            className: 'flex justify-between',
            elements:[
            {
            type: 'Input',
            label: 'Telefono',
            scope: 'telefono',
            options: { size: 'small' },
            width: 6,
        },
        {
            type: 'Input',
            label: 'CUIT',
            scope: 'cuit',
            options: { size: 'small' },
            width: 6,
        }
            ]
        },
        {
            type: 'Horizontal',
            className: 'flex justify-between',
            elements:[
        {
            type: 'Input',
            label: 'Password',
            scope: 'password',
            options: { textType: 'password', size: 'small' },
            width: 6,
        },
        {
            type: 'Input',
            label: 'Direccion de Facturacion',
            scope: 'direccionFacturacion',
            options: { size: 'small' },
            width: 6,
                }
            ]
        }, 
        {
            type: 'Horizontal',
            className: 'flex justify-between',
            elements:[           
        {
            type: 'Input',
            label: 'Confirm Password',
            scope: 'confirmPassword',
            options: { textType: 'password',size: 'small' },
            width: 6,
        },
        
        {
            type: 'Input',
            label: 'Direccion de Envio',
            scope: 'direccionEnvio',
            options: { size: 'small' },
            width: 6,
        },
    ]
    }
    ]
}