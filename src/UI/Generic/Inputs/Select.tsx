/* eslint-disable react-hooks/rules-of-hooks */
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { Paths } from '../../Types/nestedObjTypes'

interface SelectProps<Model, T> {
    scope: Paths<Model>
    variant?: "outlined" | "standard" | "filled"
    label: string
    required?: boolean
    disabled?: boolean,
    options?: T[] | { key: string, text: string, disabled?: boolean }[]
    optionKey?: keyof T
    optionText?: keyof T
    helperText?: string
}

function Select<Model, T>(props: SelectProps<Model, T>) {
    const { label, scope, required, variant, disabled, optionKey, optionText, options, helperText } = props

    return (
        <>
            <Controller
                name={scope}
                rules={{
                    required: {
                        value: required,
                        message: 'Please fill this field'
                    }
                }}
                render={({
                    field: { onChange: formChangeCallback, onBlur, value, name, ref },
                }) => {
                    return (
                        <TextField
                            id={`${name}-select`}
                            fullWidth
                            select
                            onBlur={onBlur}
                            data-testid={name}
                            onChange={(e) => {
                                formChangeCallback(e.target.value)
                            }}
                            value={value || ""}
                            disabled={disabled}
                            size={(variant === 'outlined' || !variant) ? "medium" : "small"}
                            required={required}
                            inputRef={ref}
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            variant={"outlined"}
                            name={name}
                            label={label}
                            helperText={helperText}
                        >
                            {options?.length > 0 ? options?.map((option) => {
                                return (
                                    <MenuItem data-testid={`${name}-option`} disabled={option?.disabled} dense key={optionKey ? option[optionKey] : option.key ? option.key : option} value={optionKey ? option[optionKey] : option.key ? option.key : option}>
                                        {(optionText ? option[optionText] : option.text ? option.text : option)}
                                    </MenuItem>
                                )
                            }) : <MenuItem data-testid={`${name}-option`} dense key={value} value={value} />}
                        </TextField>
                    )
                }}
            />
        </>
    )
}

export default Select
