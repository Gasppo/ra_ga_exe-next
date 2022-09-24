import { LayoutElement } from "../../../Forms/types";
import { FichaTecnicaForm } from "../../../Types/fichaTecnicaTypes";

export const clothingDetailLayout: LayoutElement<FichaTecnicaForm> = {
    type: 'Horizontal',
    elements: [

        //Logo Marca
        {
            type: 'Horizontal',
            justifyContent: 'center',
            width: 12,
            elements: [
                {
                    type: 'Switch',
                    scope: 'logoMarca.selected',
                    label: "Logo Marca",
                    options: {
                        labelPlacement: 'end'
                    },
                    width: 12
                },
                {
                    type: 'Uploader',
                    scope: 'files',
                    width: 12,
                    rules: [
                        { type: 'required', scope: 'logoMarca.selected' }
                    ]
                },
                {
                    type: 'Input',
                    scope: 'logoMarca.observaciones',
                    label: 'Observaciones',
                    options: {
                        multiline: 3
                    },
                    className: 'mr-4 mt-2 ml-2 md:ml-2 md:mr-6 md:mt-4',
                    width: 12,
                    rules: [
                        { type: 'required', scope: 'logoMarca.selected' }
                    ]
                },
            ]
        },

        //Bolsillos
        {
            type: 'Horizontal',
            justifyContent: 'center',
            width: 12,
            spacing: 4,
            className: 'mt-1 mr-4 ',
            elements: [
                {
                    type: 'Switch',
                    scope: 'bolsillos.selected',
                    label: "Bolsillos",
                    options: {
                        labelPlacement: 'end'
                    },
                    width: {
                        xs: 12,
                        sm: 6,
                    }
                },
                {
                    type: 'Input',
                    scope: 'bolsillos.cantidad',
                    label: 'Cantidad',
                    width: {
                        xs: 6,
                        sm: 3
                    },
                    rules: [
                        { type: 'required', scope: 'bolsillos.selected' }
                    ]
                },
                {
                    type: 'Input',
                    scope: 'bolsillos.observaciones',
                    label: 'Observaciones',
                    width: {
                        xs: 6,
                        sm: 3
                    },
                    rules: [
                        { type: 'required', scope: 'bolsillos.selected' }
                    ]
                },
            ]
        },

        //Elastico
        {
            type: 'Horizontal',
            justifyContent: 'center',
            width: 12,
            spacing: 4,
            className: 'mt-1 mr-4',
            elements: [
                {
                    type: 'Switch',
                    scope: 'elastico.selected',
                    label: "Elástico",
                    options: {
                        labelPlacement: 'end'
                    },
                    width: {
                        xs: 12,
                        sm: 6,
                    }
                },
                {
                    type: 'Input',
                    scope: 'elastico.metros',
                    label: 'Cantidad',
                    width: {
                        xs: 6,
                        sm: 3
                    },
                    rules: [
                        { type: 'required', scope: 'elastico.selected' }
                    ]
                },
                {
                    type: 'Input',
                    scope: 'elastico.observaciones',
                    label: 'Observaciones',
                    width: {
                        xs: 6,
                        sm: 3
                    },
                    rules: [
                        { type: 'required', scope: 'elastico.selected' }
                    ]
                },
            ]
        },

        //Botones
        {
            type: 'Horizontal',
            justifyContent: 'center',
            width: 12,
            spacing: 4,
            className: 'mt-1 mr-4',
            elements: [
                {
                    type: 'Switch',
                    scope: 'botones.selected',
                    label: "Botones",
                    options: {
                        labelPlacement: 'end'
                    },
                    width: {
                        xs: 12,
                        sm: 6
                    }
                },
                {
                    type: 'Input',
                    scope: 'botones.cantidad',
                    label: 'Cantidad',
                    width: {
                        xs: 6,
                        sm: 3
                    },
                    rules: [
                        { type: 'required', scope: 'botones.selected' }
                    ]
                },
                {
                    type: 'Input',
                    scope: 'botones.observaciones',
                    label: 'Observaciones',
                    width: {
                        xs: 6,
                        sm: 3
                    },
                    rules: [
                        { type: 'required', scope: 'botones.selected' }
                    ]
                },
            ]
        },

        //Cierre
        {
            type: 'Horizontal',
            justifyContent: 'center',
            width: 12,
            spacing: 4,
            className: 'mt-1 mr-4',
            elements: [
                {
                    type: 'Switch',
                    scope: 'cierre.selected',
                    label: "Cierre",
                    options: {
                        labelPlacement: 'end'
                    },
                    width:  {
                        xs: 12,
                        sm: 6
                    }
                },
                {
                    type: 'Input',
                    scope: 'cierre.observaciones',
                    label: 'Observaciones',
                    width:  {
                        xs: 12,
                        sm: 6
                    },
                    rules: [
                        { type: 'required', scope: 'cierre.selected' }
                    ]
                },
            ]
        },

        //Manga
        {
            type: 'Horizontal',
            justifyContent: 'center',
            width: 12,
            spacing: 4,
            className: 'mt-1 mr-4',
            elements: [
                {
                    type: 'Switch',
                    scope: 'manga.selected',
                    label: "Manga",
                    options: {
                        labelPlacement: 'end'
                    },
                    width: {
                        xs: 12,
                        sm: 6
                    }
                },
                {
                    type: 'Input',
                    scope: 'manga.observaciones',
                    label: 'Observaciones',
                    width: {
                        xs: 12,
                        sm: 6
                    },
                    rules: [
                        { type: 'required', scope: 'manga.selected' }
                    ]
                },
            ]
        }
    ]
}