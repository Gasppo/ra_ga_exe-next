import { useFormErrorHandler } from '@utils/ErrorHandler/react-hook-errors'
import React, { useEffect } from 'react'
import { DefaultValues, FormProvider, useForm, UseFormProps } from 'react-hook-form'

interface HookFormProps<TFieldValues, TContext> {
    defaultValues: DefaultValues<TFieldValues>
    formOptions?: UseFormProps<TFieldValues, TContext>
    onSubmit: (data: TFieldValues) => void
    children?: React.ReactNode
    resetOnSubmit?: boolean
    resetOnDialogClose?: { dialogStatus: boolean }
}

export default function HookForm<TFieldValues, TContext = any>(props: HookFormProps<TFieldValues, TContext>) {

    const { onSubmit, defaultValues, formOptions, children, resetOnSubmit, resetOnDialogClose } = props

    const formContext = useForm({ defaultValues, ...formOptions })
    const formState = formContext.formState
    const reset = formContext.reset

    useFormErrorHandler(formContext.formState.errors)

    useEffect(() => {
        if (resetOnSubmit && formState.isSubmitSuccessful) { reset() }
    }, [resetOnSubmit, formState.isSubmitSuccessful, reset]);

    useEffect(() => {
        if (resetOnDialogClose && resetOnDialogClose.dialogStatus === false) { reset() }
    }, [resetOnDialogClose, reset])

    return (
        <FormProvider {...formContext} >
            <form onSubmit={formContext.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}

