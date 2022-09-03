import { TextField } from '@mui/material'
import React from 'react'

interface InputFieldProps {
    name: string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    errors?: {
        [key: string]: string[]
    }
    type?: string
    errorFlag?: boolean
}

const InputField = ({ errors, name, onChange, label, type, errorFlag }: InputFieldProps) => {

    const error = errors?.[name] ? true : false

    return (
        <div className="mx-4 mb-4" >
            <TextField InputLabelProps={{ shrink: true }} name={name} label={label} onChange={onChange} error={error || errorFlag} helperText={errors?.[name]?.[0]} type={type} size='small' />
        </div>
    )
}

export default InputField
