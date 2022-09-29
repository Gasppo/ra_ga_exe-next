import { useContext, useEffect } from "react";
import { FieldErrorsImpl } from "react-hook-form";
import { ErrorHandlerContext } from "./error";

export function useFormErrorHandler<T>(formErrors: FieldErrorsImpl<T>) {
    const { addError } = useContext(ErrorHandlerContext)

    useEffect(() => {
        const errorKeys = Object.keys(formErrors) as Array<keyof T>

        errorKeys.forEach(errType => {
            const error = formErrors?.[errType]
            if (!error.ref && typeof error.message === 'string') addError(error.message)
        })

    }, [formErrors, addError]);
}