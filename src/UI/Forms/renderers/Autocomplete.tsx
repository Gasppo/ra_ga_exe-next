/* eslint-disable react-hooks/rules-of-hooks */
import { Autocomplete as MuiAutocomplete, Checkbox } from '@mui/material'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useContext } from 'react'
import { Controller } from 'react-hook-form'
import { SelectOptionsContext } from '../SelectOptionsContext'
import { LayoutElement } from '../types'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export type SelectProps<Model> = {
    layout: LayoutElement<Model>;
    onBlur?: (value: any, onChange: (value: any) => any) => any;
    parentScope?: string
    hasParent?: boolean
} & Partial<TextFieldProps>

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Autocomplete<Model>(props: SelectProps<Model>) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { layout, parentScope, hasParent, ...textFieldProps } = props
    const context = useContext(SelectOptionsContext)
    const options = context?.[layout?.options?.optionsName] || []


    return (
        <>
            <Controller
                name={layout?.scope}
                render={({
                    field: { onChange: formChangeCallback, value },
                }) => {
                    return (
                        <MuiAutocomplete
                            multiple
                            id="tags-standard"
                            options={options}
                            freeSolo={false}
                            getOptionLabel={(option) => option.text}
                            onChange={(e, data) => formChangeCallback(data)}
                            isOptionEqualToValue={(option, value) => option.key === value.key}
                            value={value}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant={"outlined"}
                                    label={layout.label}
                                    placeholder={layout?.options?.placeholderText || ''}
                                    helperText={layout?.options?.helperText}
                                    size={(layout?.options?.variant === 'outlined' || !layout?.options?.variant) ? "medium" : "small"}
                                    className={layout.className}
                                />
                            )}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.text}
                                </li>
                            )}
                        />
                    )
                }}
            />
        </>
    )
}

export default Autocomplete
