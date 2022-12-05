import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const clothingProcessesLayout: LayoutElement<OrderCreationData> = {
    type: 'Horizontal',
    elements: [
        {
            type: 'Switch',
            scope: 'Moldería Base.selected',
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
            label: "Digitalización y Progresionado / Corrección Moldería",
            className: 'mt-2',
            options: {
                labelPlacement: 'end'
            },
            width: 12
        },
        {
            type: 'Switch',
            scope: 'Impresión Moldertía Base.selected',
            className: 'mt-2',
            label: "Impresión Moldería Base",
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
            scope: 'Terminación.selected',
            className: 'mt-2',
            label: "Terminación (Ojal, Botón, Plancha, etc)",
            options: {
                labelPlacement: 'end'
            },
            width: 12
        }
    ]
}