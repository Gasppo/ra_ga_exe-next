import { useFormErrorHandler } from '@utils/ErrorHandler/react-hook-errors'
import React from 'react'
import { DefaultValues, FormProvider, useForm, UseFormProps } from 'react-hook-form'

interface HookFormProps<TFieldValues, TContext> {
    defaultValues: DefaultValues<TFieldValues>
    formOptions?: UseFormProps<TFieldValues, TContext>
    onSubmit: (data: TFieldValues) => void
    children?: React.ReactNode
}

export default function HookForm<TFieldValues, TContext = any>(props: HookFormProps<TFieldValues, TContext>) {

    const { onSubmit, defaultValues, formOptions, children } = props

    const formContext = useForm({ defaultValues, ...formOptions })

    useFormErrorHandler(formContext.formState.errors)


    return (
        <FormProvider {...formContext} >
            <form onSubmit={formContext.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}

