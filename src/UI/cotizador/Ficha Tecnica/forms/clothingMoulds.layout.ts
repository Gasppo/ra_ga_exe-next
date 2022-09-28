import { FichaTecnicaForm } from "@pages/api/order/new";
import { LayoutElement } from "../../../Forms/types";

export const clothingMouldsLayout: LayoutElement<FichaTecnicaForm> = {
    type: 'Horizontal',
    elements: [{
        type: 'Horizontal',
        justifyContent: 'center',
        width: 12,
        elements: [{
            type: 'Switch',
            scope: 'molderiaBase.selected',
            label: "Molderia Base",
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
                { type: 'required', scope: 'molderiaBase.selected' }
            ]
        },
        {
            type: 'Input',
            scope: 'molderiaBase.observaciones',
            label: 'Observaciones Moldería Base',
            options: {
                multiline: 3
            },
            className: 'mr-4 mt-2 ml-2 md:ml-2 md:mr-6 md:mt-4',
            width: 12,
            rules: [
                { type: 'required', scope: 'molderiaBase.selected' }
            ]
        }]
    },
    {
        type: 'Horizontal',
        width: 12,
        className: 'mt-4',
        elements: [
            {
                type: 'Switch',
                scope: 'geometral.selected',
                label: "Geometral",
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
                    { type: 'required', scope: 'geometral.selected' }
                ]
            },
            {
                type: 'Input',
                scope: 'geometral.observaciones',
                label: 'Observaciones Geometral',
                options: {
                    multiline: 3
                },
                className: 'mr-4 mt-2 ml-2 md:ml-2 md:mr-6 md:mt-4',
                width: 12,
                rules: [
                    { type: 'required', scope: 'geometral.selected' }
                ]
            }
        ]
    }

    ]
}