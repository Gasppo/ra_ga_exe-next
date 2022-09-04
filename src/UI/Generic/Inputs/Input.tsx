import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Paths } from '../../Types/nestedObjTypes'

export type InputProps<Model> = {
    scope: Paths<Model>
    size?: "small" | "medium"
    labelClassName?: string
    variant?: "outlined" | "standard" | "filled"
    label: string
    disabled?: boolean
    type?: string
    className?: string
}

function Input<Model>(props: InputProps<Model>) {

    const { scope, size, labelClassName, variant, label, disabled, type, className } = props



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
                    className={className ? className : "border-gray-50"}
                    onChange={onChange}
                />
            )
        }}
    />
    )
}

export default Input
