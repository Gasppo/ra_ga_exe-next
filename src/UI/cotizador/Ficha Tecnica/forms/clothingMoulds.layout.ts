import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { LayoutElement } from "../../../Forms/types";

export const clothingMouldsLayout: LayoutElement<OrderCreationData> = {
    type: 'Horizontal',
    elements: [{
        type: 'Horizontal',
        justifyContent: 'center',
        width: 12,
        elements: [
            {
                type: 'Uploader',
                scope: 'files',
                width: 12,
                options: {
                    fileSection: 'molderiaBase.files',
                    multifile: true
                }
            },
            {
                type: 'Input',
                scope: 'molderiaBase.observaciones',
                label: 'Observaciones Archivos',
                options: {
                    multiline: 6
                },
                className: 'mr-4 mt-2 ml-2 md:ml-2 md:mr-6 md:mt-4',
                width: 12,
            }]
    }

    ]
}