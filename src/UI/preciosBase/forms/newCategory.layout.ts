import { LayoutElement } from "@UI/Forms/types";

export const newCategoryLayout: LayoutElement<{
    name: string, picture: string, precioBasico: number, precioMedio: number, precioComplejo: number, precioMuyComplejo: number, precioUltraComplejo: number, precioExtremadamenteComplejo: number
}> = {

    type: "Vertical",
    elements: [
        {
            type: "Input",
            scope: "name",
            label: "Nombre",
            className: 'mt-1',

        }, {
            type: "Input",
            scope: "picture",
            label: "Imagen prenda nueva",
            className: 'mt-1',
        }, {
            type: "Input",
            scope: "precioBasico",
            label: "Precio básico",
            className: 'mt-1',
            options: { numeric: true, }
        }, {
            type: "Input",
            scope: "precioMedio",
            label: "Precio medio",
            className: 'mt-1',
            options: { numeric: true, }
        }, {
            type: "Input",
            scope: "precioComplejo",
            label: "Precio complejo",
            className: 'mt-1',
            options: { numeric: true, }
        }, {
            type: "Input",
            scope: "precioMuyComplejo",
            label: "Precio muy complejo",
            className: 'mt-1',
            options: { numeric: true, }
        }, {
            type: "Input",
            scope: "precioUltraComplejo",
            label: "Precio ultra complejo",
            className: 'mt-1',
            options: { numeric: true, }
        }, {
            type: "Input",
            scope: "precioExtremadamenteComplejo",
            label: "Precio extremadamente complejo",
            className: 'mt-1',
            options: { numeric: true, }
        }
    ]
}