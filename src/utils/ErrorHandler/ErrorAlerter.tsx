import { Alert, Snackbar } from '@mui/material'
import React, { useContext } from 'react'
import { ErrorHandlerContext } from './error'


const ErrorAlerter = () => {

    const { errors, removeError } = useContext(ErrorHandlerContext)

    const handleClose = (uuid: string) => {
        removeError(uuid)
    }

    return (
        <>
            {errors.length > 0 && (
                <Snackbar
                    autoHideDuration={3000}
                    open={true}
                    onClose={() => handleClose(errors[0].id)}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    key={errors[0].id}
                >
                    <Alert onClose={() => handleClose(errors[0].id)} severity="error" sx={{ width: '100%' }}>
                        {errors[0].message} {errors.length > 1 ? ` [+${errors.length - 1}]` : ''}
                    </Alert>
                </Snackbar>
            )}
        </>
    )
}

export default ErrorAlerter