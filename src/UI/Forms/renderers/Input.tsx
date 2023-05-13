import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useIsDisabled } from '../../../utils/useIsDisabled';
import { LayoutElement } from '../types';

export type InputProps<Model> = {
    layout: LayoutElement<Model>;
    onBlur?: (value: any, onChange: (value: any) => any) => any;
    hasParent?: boolean;
    parentScope?: string
} & Partial<TextFieldProps>

function Input<Model>(props: InputProps<Model>) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { layout, parentScope, hasParent, ...textFieldProps } = props
    const isDisabled = useIsDisabled(layout?.rules || [])


    return (<Controller
        name={layout?.scope}
        render={({
            field: { onChange, value, name, ref },
            fieldState: { error }
        }) => {
            const val = layout?.options?.numeric ? parseFloat(value) : value
            return (
                <>
                    <TextField
                        {...textFieldProps}
                        disabled={layout?.options?.disabled || isDisabled}
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
                        onChange={(e) => {
                            let parsedValue: string | number = e.target.value
                            if (layout?.options?.numeric) {
                                parsedValue = parseFloat(parsedValue)
                                if (isNaN(parsedValue as number)) {
                                    parsedValue = ''
                                }
                                return onChange(parsedValue)
                            }
                            return onChange(parsedValue)
                        }}
                        multiline={!!layout?.options?.multiline}
                        minRows={layout?.options?.multiline}
                        error={!!error}
                        type={layout?.options?.textType || (layout?.options?.numeric ? 'number' : 'text')}
                        helperText={error?.message || layout?.options?.helperText}
                        required={layout?.options?.required}
                        placeholder={layout?.options?.placeholderText}
                    />
                </>
            )
        }}
    />
    )
}

export default Input
