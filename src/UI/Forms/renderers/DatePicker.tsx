import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker as MDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { LayoutElement } from '../types';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export type DatePickerProps<Model> = {
    layout: LayoutElement<Model>;
    onBlur?: (value: any, onChange: (value: any) => any) => any;
    hasParent?: boolean;
    parentScope?: string
} & Partial<TextFieldProps>

function DatePicker<Model>(props: DatePickerProps<Model>) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { layout, parentScope, hasParent, ...textFieldProps } = props

    return (<Controller
        name={layout?.scope}
        render={({
            field: { onChange, value },
        }) => {
            return (
                <>
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{}}>
                        <MDatePicker
                            label={layout.label}
                            value={value}
                            onChange={(event) => { onChange(event.$d.toISOString()) }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </>
            )
        }}
    />
    )
}

export default DatePicker
