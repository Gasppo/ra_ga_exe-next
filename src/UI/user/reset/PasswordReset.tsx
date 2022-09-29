import { PasswordUpdateSchema, PasswordUpdateSchemaType } from '@backend/schemas/PasswordUpdateSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import DoneIcon from '@mui/icons-material/Done'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import { PasswordResetResponse, updatePasssword, UserHandlerError } from '../../../utils/queries/user'
import FormItem from '../../Forms/FormItem'
import { passwordResetLayout } from './form/passwordReset.layout'

interface PasswordResetProps {
    token: string
}

const PasswordReset = (props: PasswordResetProps) => {

    const { token: resetToken } = props
    const { addError, queryErrorHandler } = useContext(ErrorHandlerContext)
    const { data: passwordResetData, isLoading, mutateAsync } = useMutation<PasswordResetResponse, UserHandlerError, PasswordUpdateSchemaType>(updatePasssword, {
        onSuccess: () => { addError('Clave cambiada exitosamente', 'success') }
    })

    const completedReset = passwordResetData?.statusCode === 200

    const formContext = useForm<PasswordUpdateSchemaType>({
        defaultValues: {
            token: resetToken,
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(PasswordUpdateSchema)
    })


    const handleSubmit = async (data: PasswordUpdateSchemaType) => {
        try {
            await mutateAsync(data)
        }
        catch (error) {
            queryErrorHandler(error)
        }
    }

    useEffect(() => {
        if (formContext.formState.errors[""]) addError(formContext.formState.errors[""].message)
    }, [formContext.formState.errors, addError]);

    return (
        <div className='w-auto h-auto flex flex-col place-items-center border-8 border-double rounded-lg shadow-2xl border-gray-800 m-auto p-20'>
            <h1 className="text-2xl md:text-[1.5rem] leading-normal font-extrabold text-gray-700">
                Restablecer Contraseña
            </h1>
            <div className='flex md:flex-row flex-col md:justify-center md:space-x-10 mt-10'>
                <LoadingIndicator show={isLoading}>
                    <FormProvider  {...formContext}>
                        <form onSubmit={formContext.handleSubmit(handleSubmit)} className="flex flex-col items-center justify-center">
                            {!completedReset && <>
                                <div className="flex flex-col items-center" >
                                    <FormItem layout={passwordResetLayout} />
                                </div>
                                <div className="flex flex-col items-center" >
                                    <div className='flex justify-between'>
                                        <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                                            <button type='submit'>{'Restablecer Contraseña'}</button>
                                        </div>
                                    </div>
                                </div>
                            </>}
                            {completedReset && (
                                <div className="w-auto" >
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='mt-6  mx-4'>
                                            <DoneIcon className="text-green-500 rounded-full border-4 border-green-500" style={{ width: 100, height: 100 }} />
                                        </div>
                                        <div className='mt-4 mx-4 text-green-500 text-base'>
                                            <p>{'Cambio de contraseña exitoso!'}</p>
                                        </div>
                                        <div className='mt-10  mx-4 bg-gray-700 text-white p-2 rounded-lg hover:animate-pulse text-sm'>
                                            <Link href={'/'}>Volver al inicio</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </FormProvider>
                </LoadingIndicator>
            </div>
        </div>
    )
}

export default PasswordReset
