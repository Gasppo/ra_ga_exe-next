import { LayoutElement } from "@UI/Forms/types";
import { ClothingAndPrices } from "../EditCategoryDialog";

export const editCategoryLayout: LayoutElement<ClothingAndPrices> = {

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
            label: "Imagen",
            className: 'mt-1',
        }, {
            type: "Input",
            scope: "precioBasico",
            label: "Precio básico",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }, {
            type: "Input",
            scope: "precioMedio",
            label: "Precio medio",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }, {
            type: "Input",
            scope: "precioComplejo",
            label: "Precio complejo",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }, {
            type: "Input",
            scope: "precioMuyComplejo",
            label: "Precio muy complejo",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }, {
            type: "Input",
            scope: "precioUltraComplejo",
            label: "Precio ultra complejo",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }, {
            type: "Input",
            scope: "precioExtremadamenteComplejo",
            label: "Precio extremadamente complejo",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        }
    ]
}