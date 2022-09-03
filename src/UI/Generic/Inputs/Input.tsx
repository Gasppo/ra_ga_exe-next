import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Paths } from '../../Types/nestedObjTypes'

interface TextProps<Model> {
    scope: Paths<Model>
    size?: "small" | "medium"
    labelClassName?: string
    variant?: "outlined" | "standard" | "filled"
    label: string
    disabled?: boolean
    type?: string
}

function Input<Model>(props: TextProps<Model>) {

    const { scope, size, labelClassName, variant, label, disabled, type } = props



    return (<Controller
        name={scope}
        render={({
            field: { onChange, value, name, ref },
        }) => {
            const val = type === "number" ? parseInt(value) : value
            return (
                <TextField
                    disabled={disabled}
                    value={val}
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                        classes: { input: `${size === "medium" ? 'text-36' : 'text-14'}` } as any,
                    } as any}
                    InputLabelProps={{
                        shrink: true,
                        className: labelClassName
                    }}
                    size={size}
                    variant={variant || "outlined"}
                    inputRef={ref}
                    name={name}
                    label={label}
                    className="border-gray-50"
                    onChange={onChange}
                />
            )
        }}
    />
    )
}

export default Input
