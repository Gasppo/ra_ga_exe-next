import { FormControlLabel, FormLabel, Switch as MSwitch } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Paths } from '../../Types/nestedObjTypes'



interface SwitchProps<Model> {
    scope: Paths<Model>,
    required?: boolean
    disabled?: boolean
    label: string,
    labelPlacement?: "end" | "bottom" | "top" | "start"
}



function Switch<Model>(props: SwitchProps<Model>) {
    const { scope, disabled, required, label, labelPlacement } = props


    return (
        <>
            <Controller
                name={scope}
                defaultValue={null}
                rules={{
                    required: {
                        value: required,
                        message: 'Please check this field'
                    }
                }}
                render={({
                    field: { onChange, value, name, ref },
                    fieldState: { invalid },
                }) => {
                    return (
                        <>
                            <FormControlLabel
                                className='ml-0'
                                control={
                                    <MSwitch
                                        id={`${name}-switch`}
                                        size="medium"
                                        disabled={disabled}
                                        required={required}
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                        inputRef={ref}
                                    />
                                }
                                labelPlacement={labelPlacement || "start"}
                                label={(label ? <FormLabel
                                    error={invalid}
                                    required={required}>
                                    {label}
                                </FormLabel> : null) as any}
                            />
                        </>
                    )
                }}
            />

        </>
    )
}

export default Switch