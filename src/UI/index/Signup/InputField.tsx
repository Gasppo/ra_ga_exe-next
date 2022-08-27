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
}

const InputField = ({ errors, name, onChange, label, type }: InputFieldProps) => {

    const error = errors?.[name] ? true : false

    return (
        <div className="mx-4 mb-6" >
            <TextField name={name} label={label} onChange={onChange} error={error} helperText={errors?.[name]?.[0]} className="w-72" type={type} size='small' />
        </div>
    )
}

export default InputField
