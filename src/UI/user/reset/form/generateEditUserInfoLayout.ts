
import { User } from "@prisma/client";
import { LayoutElement } from "../../../Forms/types";

export const generateEditUserInfoLayout = (editMode: boolean): LayoutElement<User> => {
    return {
        type: 'Vertical',
        spacing: 2,
        elements: [
            {
                type: 'Input',
                label: 'Correo',
                scope: 'email',
                options: { disabled: !editMode, variant: 'standard' },

            },
            {
                type: 'Input',
                label: 'Nombre',
                scope: 'name',
            },
        ]
    }
}