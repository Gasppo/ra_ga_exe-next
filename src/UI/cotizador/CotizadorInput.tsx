import { TextField } from '@mui/material'
import React from 'react'

interface CotizadorInputProps {
    name: string,
    label: string
    value: string | number | boolean
    type?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CotizadorInput = (props: CotizadorInputProps) => {

    const { label, name, onChange, value, type } = props

    return (
        <div className="flex justify-center">
            <TextField id="outlined-disabled" label={label} name={name} value={value} onChange={onChange} type={type} className="w-36" />
        </div>
    )
}

export default CotizadorInput
