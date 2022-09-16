import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorHandlerContext } from '../utils/ErrorHandler/error'
import LoadingIndicator from '../utils/LoadingIndicator/LoadingIndicator'
import { PasswordResetData, UserHandlerError, PasswordResetResponse, updatePasssword } from '../utils/queries/user'
import InputField from './index/Signup/InputField'
import DoneIcon from '@mui/icons-material/Done'
import Link from 'next/link'

interface PasswordResetProps {
    token: string
}

const PasswordReset = (props: PasswordResetProps) => {

    const { token: resetToken } = props
    const { addError } = useContext(ErrorHandlerContext)
    const { data: passwordResetData, isLoading, mutateAsync, error } = useMutation<PasswordResetResponse, UserHandlerError, PasswordResetData>(updatePasssword, {})

    const errors = error?.error ? (typeof error.error === 'string' ? {} : error?.error.fieldErrors) : {}
    const completedReset = passwordResetData?.statusCode === 200
    const [inputData, setInputData] = useState({
        password: '',
        confirmPassword: ''
    })


    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        try {
            const res = await mutateAsync({ ...inputData, token: resetToken })
            console.log(res)
        }
        catch (error) {
            console.log('Error', error)
            if (error?.body?.formErrors?.length > 0) {
                for (const err in error?.body?.formErrors) {
                    if (Object.prototype.hasOwnProperty.call(error?.body?.formErrors, err)) {
                        const element = error?.body?.formErrors[err];
                        addError(element)
                    }
                }
            }
            if (!error?.error?.fieldErrors && !error?.error?.formErrors) {
                addError(error.error)
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className='w-auto h-auto flex flex-col place-items-center border-8 border-double rounded-lg shadow-2xl border-gray-800 m-auto p-20'>
            <h1 className="text-2xl md:text-[1.5rem] leading-normal font-extrabold text-gray-700">
                Restablecer Contraseña
            </h1>
            <div className='flex md:flex-row flex-col md:justify-center md:space-x-10 mt-10'>
                <LoadingIndicator show={isLoading}>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        {!completedReset && <><div className="flex flex-col items-center" >
                            <InputField name='password' label='Contraseña' onChange={handleChange} errors={errors} type="password" />
                            <InputField name='confirmPassword' label='Confirmar contraseña' onChange={handleChange} errors={errors} type="password" />
                        </div>
                            <div className="flex flex-col items-center" >
                                <div className='flex justify-between'>
                                    <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                                        <button type='submit'>{'Restablecer Contraseña'}</button>
                                    </div>
                                </div>
                            </div></>}
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
                </LoadingIndicator>
            </div>
        </div>
    )
}

export default PasswordReset
