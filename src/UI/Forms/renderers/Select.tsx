/* eslint-disable react-hooks/rules-of-hooks */
import MenuItem from '@mui/material/MenuItem'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useContext } from 'react'
import { Controller } from 'react-hook-form'
import { SelectOptionsContext } from '../SelectOptionsContext'
import { LayoutElement } from '../types'

export type SelectProps<Model> = {
    layout: LayoutElement<Model>;
    onBlur?: (value: any, onChange: (value: any) => any) => any;
    hasParent?: boolean
} & Partial<TextFieldProps>

function Select<Model>(props: SelectProps<Model>) {
    const { layout, ...textFieldProps } = props
    const context = useContext(SelectOptionsContext)
    const options = context?.[layout?.options?.optionsName] || []
    return (
        <>
            <Controller
                name={layout?.scope}
                render={({
                    field: { onChange: formChangeCallback, onBlur, value, name, ref },
                }) => {
                    return (
                        <TextField
                            {...textFieldProps}
                            id={`${name}-select`}
                            fullWidth
                            className={layout.className}
                            select
                            onBlur={onBlur}
                            data-testid={name}
                            onChange={(e) => {
                                formChangeCallback(e.target.value)
                            }}
                            value={value || ""}
                            size={(layout?.options?.variant === 'outlined' || !layout?.options?.variant) ? "medium" : "small"}
                            inputRef={ref}
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            variant={"outlined"}
                            name={name}
                            label={layout?.label}
                            helperText={layout?.options?.helperText}
                        >
                            {options?.length > 0 ? options?.map((option) => {
                                return (
                                    <MenuItem data-testid={`${name}-option`} disabled={option?.disabled} dense key={option.key} value={option.key}>
                                        {option.text}
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
