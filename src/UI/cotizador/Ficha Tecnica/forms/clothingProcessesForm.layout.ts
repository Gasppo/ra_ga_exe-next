import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const clothingProcessesLayout: LayoutElement<OrderCreationData> = {
    type: 'Horizontal',
    elements: [
        {
            type: 'Switch',
            scope: 'molderiaBase.selected',
            className: 'mt-2',
            label: "Moldería Base",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            scope: 'Digitalización y Progresiones.selected',
            label: "Digitalizacion y Progresionado / Corrección Moldería",
            className: 'mt-2',
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            scope: 'molderiaBase.selected',
            className: 'mt-2',
            label: "Impresión Moldertía Base",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            scope: 'Ficha Técnica de Consumos.selected',
            className: 'mt-2',
            label: "Ficha Técnica (Geometral + Guía de Armado)",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            className: 'mt-2',
            scope: 'Corte Muestra.selected',
            label: "Corte Muestra",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            className: 'mt-2',
            scope: 'Confección Muestra.selected',
            label: "Confección Muestra",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            scope: 'logoMarca.selected',
            className: 'mt-2',
            label: "Terminación (Ojal, Botón, Plancha, etc)",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            scope: 'logoMarca.selected',
            className: 'mt-2',
            label: "Cotización",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
    ]
}