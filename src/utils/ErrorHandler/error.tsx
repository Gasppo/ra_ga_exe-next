import React, { useCallback, useState } from 'react';

type Props = {
    children: React.ReactNode
}

export const ErrorHandlerContext = React.createContext<{
    errors: { message: string, id: string }[],
    addError: (message: string) => void;
    removeError: (uuid: string) => void
}>({
    errors: [],
    addError: (message: string) => { console.log(message) },
    removeError: (uuid: string) => { console.log(uuid) },
})


const ErrorHandlerProvider = ({ children }: Props) => {

    const [errors, setErrors] = useState<{ message: string, id: string }[]>([])

    const addError = useCallback((message: string) => setErrors(prev => [...prev, { id: crypto.randomUUID(), message }]), [])
    const removeError = useCallback((uuid: string) => setErrors(prev => prev.filter(err => err.id !== uuid)), [])

    const contextValues = {
        errors,
        addError,
        removeError
    }

    return (
        <ErrorHandlerContext.Provider value={contextValues}>
            {children}
        </ErrorHandlerContext.Provider>
    )
}

export default ErrorHandlerProvider