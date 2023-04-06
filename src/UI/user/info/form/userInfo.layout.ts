
import { UserInfoSchemaType } from "@backend/schemas/UserInfoSchema";
import { LayoutElement } from "../../../Forms/types";

export const userInfoLayout: LayoutElement<UserInfoSchemaType> = {
    type: 'Vertical',
    spacing: 2,
    elements: [
        {
            type: 'Input',
            label: 'Nombre',
            scope: 'name',
            width: 12,
            options: { size: 'small', variant: 'standard', }
        },
        {
            type: 'Input',
            label: 'Teléfono',
            scope: 'telefono',
            width: 12,
            options: { size: 'small', variant: 'standard', numeric: true }
        },
        {
            type: 'Input',
            label: 'Whatsapp',
            scope: 'whatsapp',
            width: 12,
            options: { size: 'small', variant: 'standard', numeric: true }
        },
        {
            type: 'Input',
            label: 'Marca',
            scope: 'marca',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Dirección de Facturación',
            scope: 'direccionFacturacion',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Dirección de Envío',
            scope: 'direccionEnvio',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Ciudad',
            scope: 'ciudad',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Cuit / RazonSocial',
            scope: 'cuitORazonSocial',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Medios de Pago',
            scope: 'mediosDePago',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        },
        {
            type: 'Input',
            label: 'Datos Bancarios',
            scope: 'datosBancarios',
            width: 12,
            options: { size: 'small', variant: 'standard' }
        }
    ]
}