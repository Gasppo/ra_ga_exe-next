import { Typography } from '@mui/material';
import { formRenderers } from './formRenderers';
import { SelectOptionsContextType, SelectOptionsProvider } from './SelectOptionsContext';
import { LayoutElement } from './types';


interface FormItemProps<Model> {
    id?: string;
    layout: LayoutElement<Model>;
    hasParent?: boolean,
    parentScope?: string,
    selectOptions?: SelectOptionsContextType
}

function FormItem<Model>(props: FormItemProps<Model>) {
    const { layout, hasParent, parentScope, selectOptions } = props

    const FormComponent = formRenderers[layout.type]


    if (!FormComponent) {
        return <Typography className="text-red-500">{"No renderer found for type:"} {layout.type}</Typography>
    }

    if (!selectOptions) return <FormComponent layout={layout} hasParent={hasParent || false} parentScope={parentScope} />
    
    return (
        <SelectOptionsProvider value={selectOptions} >
            <FormComponent layout={layout} hasParent={hasParent || false} parentScope={parentScope} />
        </SelectOptionsProvider>
    )
}

export default FormItem
