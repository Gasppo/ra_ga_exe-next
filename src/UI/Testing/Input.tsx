import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import { LayoutElement } from './types';

export type InputProps<Model> = {
    layout: LayoutElement<Model>;
    onBlur?: (value: any, onChange: (value: any) => any) => any;
    hasParent?: boolean
} & Partial<TextFieldProps>

function Input<Model>(props: InputProps<Model>) {

    const { layout, ...textFieldProps } = props



    return (<Controller
        name={layout?.scope}
        render={({
            field: { onChange, value, name, ref },
        }) => {
            const val = layout?.options?.numeric ? parseInt(value) : value
            return (
                <TextField
                    {...textFieldProps}
                    disabled={layout?.options?.disabled}
                    value={val}
                    fullWidth
                    InputProps={{
                        classes: { input: `${layout?.options?.size === "medium" ? 'text-36' : 'text-14'}` } as any,
                    } as any}
                    InputLabelProps={{
                        shrink: layout?.options?.shrinkLabel === false ? false : true,
                        className: layout?.labelClassName
                    }}
                    size={layout?.options?.size}
                    variant={layout?.options?.variant || "outlined"}
                    inputRef={ref}
                    name={name}
                    label={layout?.label}
                    className={layout?.className ? layout?.className : "border-gray-50"}
                    onChange={onChange}

                />
            )
        }}
    />
    )
}

export default Input
