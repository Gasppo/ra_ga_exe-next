import { Role } from "@prisma/client";
import { LayoutElement } from "@UI/Forms/types";

export const editUserRoleLayout: LayoutElement<Role> = {

    type: "Vertical",
    elements: [
        {
            type: 'Select',
            scope: "name",
            width: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
            label: 'Seleccione el rol',
            options: {
                optionsName: 'roles',
            },
        },
    ]
}