
import { ReducedUserInfoSchemaType } from "@backend/schemas/ReducedUserInfoSchema";
import { LayoutElement } from "../../../Forms/types";

export const reducedUserInfoLayout: LayoutElement<ReducedUserInfoSchemaType> = {
    type: 'Vertical',
    spacing: 2,
    elements: [
        {
            type: 'Input',
            label: 'Nombre',
            scope: 'user.name',
            width: 12,
            options: { size: 'small', disabled: true, variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Email',
            scope: 'user.email',
            width: 12,
            options: { size: 'small', disabled: true, variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Telefono',
            scope: 'user.userPersonalData.telefono',
            width: 12,
            options: { size: 'small', disabled: true, variant: 'standard' },
        },
        {
            type: 'Input',
            label: 'Dirección',
            scope: 'user.userPersonalData.direccionFacturacion',
            width: 12,
            options: { size: 'small', disabled: true, variant: 'standard' },
        },
    ]
}