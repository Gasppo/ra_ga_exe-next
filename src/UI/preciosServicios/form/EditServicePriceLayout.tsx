import { LayoutElement } from "@UI/Forms/types";
import { PrecioServicioExtended } from "@utils/queries/cotizador";

export const editServicePriceLayout: LayoutElement<PrecioServicioExtended> = {

    type: "Vertical",
    elements: [
        {
            type: "Input",
            scope: "precioBase",
            label: "Precio",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        },
        {
            type: "Input",
            scope: "factorMultiplicador",
            label: "Factor",
            className: 'mt-1',
            options: {
                numeric: true,
            }
        },
    ]
}