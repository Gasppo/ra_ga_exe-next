import DoneIcon from '@mui/icons-material/Done'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import { postSignup, SignupData, SignupResponse, UserHandlerError } from '../../../utils/queries/user'
import ModalComponent from '../../Modal/ModalComponent'
import InputField from './InputField'

interface SignupProps {
    open: boolean
    onClose: () => void
    onSignin: () => void
}



const Signup = ({ open, onClose, onSignin }: SignupProps) => {

    const {isLoading, mutateAsync, error } = useMutation<SignupResponse, UserHandlerError, SignupData>(postSignup)
    const { addError } = useContext(ErrorHandlerContext)

    const errors = error?.error ? (typeof error.error === 'string' ? {} : error?.error.fieldErrors) : {}

    const [inputData, setInputData] = useState<SignupData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [completedSignUp, setCompletedSignUp] = useState(false)

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        try {
            const res = await mutateAsync(inputData)
            if (res.statusCode === 200) setCompletedSignUp(true)
        }
        catch (error) {
            if (error?.error?.formErrors?.length > 0) {
                for (const err in error?.error?.formErrors) {
                    if (Object.prototype.hasOwnProperty.call(error?.error?.formErrors, err)) {
                        const element = error?.error?.formErrors[err];
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
        <ModalComponent open={open} onClose={onClose} size='small'>
            <LoadingIndicator show={isLoading} className="container mx-auto flex flex-col items-center bg-white rounded-none md:rounded-3xl">
                <div>
                    <h1 className="text-xl md:text-[1.5rem] leading-normal font-extrabold text-gray-700">
                        Crear Cuenta
                    </h1>
                </div>
                <div className="mt-10" >
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <div className="flex flex-row flex-wrap justify-center w-3/4">
                            {completedSignUp && (
                                <div className="w-auto" >
                                    <div className='flex flex-row flex-wrap justify-center items-center'>
                                        <div className='mt-6  mx-4'>
                                            <DoneIcon className="text-green-500 rounded-full border-4 border-green-500" style={{ width: 100, height: 100 }} />
                                        </div>
                                        <div className='mt-4 mx-4 text-green-500 text-base'>
                                            <p>{'Creacion de cuenta exitosa!'}</p>
                                        </div>
                                        <div className='mt-6  mx-4 bg-gray-700 text-white p-2 rounded-lg hover:animate-pulse text-sm'>
                                            <button type='button' onClick={onSignin}>Proceder a Inicio de sesión</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!completedSignUp && (
                                <div className="flex flex-row flex-wrap justify-center items-center">
                                    <InputField name='name' label='Nombre' onChange={handleChange} errors={errors} />
                                    <InputField name='email' label="Correo" onChange={handleChange} errors={errors} />
                                    <InputField name='password' label='Contraseña' onChange={handleChange} errors={errors} type="password" />
                                    <InputField name='confirmPassword' label='Confirmar contraseña' onChange={handleChange} errors={errors} type="password" />
                                </div>
                            )}
                        </div>
                        {!!completedSignUp && errors && Object?.keys(errors)?.length === 0 && errors?.formErrors?.length > 0 && (
                            <div className="w-3/4 " >
                                <div className='text-red-600 text-sm mx-4'>
                                    <p>{errors?.formErrors?.[0] || 'Error al registrar usuario'}</p>
                                </div>
                            </div>
                        )}
                        <div className='flex justify-between'>
                            <div className='mt-4  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                                <button onClick={onClose}>Cancelar</button>
                            </div>
                            {!completedSignUp && <div className='mt-4 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                                <button type='submit'>Crear Usuario</button>
                            </div>}
                        </div>
                    </form>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signup
