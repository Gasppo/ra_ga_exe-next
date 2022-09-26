import React, { useCallback, useState } from 'react';

type Props = {
    children: React.ReactNode
}

type AlertTypes = 'info' | 'warning' | 'error' | 'success'

export const ErrorHandlerContext = React.createContext<{
    errors: { message: string, id: string, level?: AlertTypes }[],
    addError: (message: string, level?: AlertTypes) => void;
    removeError: (uuid: string) => void
    queryErrorHandler: (error: any) => void
}>({
    errors: [],
    addError: (message: string) => { console.log(message) },
    removeError: (uuid: string) => { console.log(uuid) },
    queryErrorHandler: (error: any) => { console.log(error) }
})


const ErrorHandlerProvider = ({ children }: Props) => {

    const [errors, setErrors] = useState<{ message: string, id: string }[]>([])

    const addError = useCallback((message: string, level?: AlertTypes) => setErrors(prev => [...prev, { id: crypto.randomUUID(), message, level }]), [])
    const removeError = useCallback((uuid: string) => setErrors(prev => prev.filter(err => err.id !== uuid)), [])


    const queryErrorHandler = useCallback((error: any) => {
        if (error?.error?.formErrors?.length > 0) {
            for (const err in error?.error?.formErrors) {
                if (Object.prototype.hasOwnProperty.call(error?.error?.formErrors, err)) {
                    const element = error?.error?.formErrors[err];
                    addError(element)
                }
            }
        }
        if (!error?.error?.fieldErrors && !error?.error?.formErrors) {
            if (error.error) return addError(error.error)
            return addError(JSON.stringify(error))
        }
    }, [addError])


    const contextValues = {
        errors,
        addError,
        removeError,
        queryErrorHandler
    }

    return (
        <ErrorHandlerContext.Provider value={contextValues}>
            {children}
        </ErrorHandlerContext.Provider>
    )
}

export default ErrorHandlerProvider