import { zodResolver } from "@hookform/resolvers/zod"
import DoneIcon from '@mui/icons-material/Done'
import React, { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from "zod"
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import { postSignup, SignupData, SignupResponse, UserHandlerError } from '../../../utils/queries/user'
import ModalComponent from '../../Modal/ModalComponent'
import FormItem from '../../Testing/FormItem'
import { signupLayout } from "./form/signup.layout"
interface SignupProps {
    open: boolean
    onClose: () => void
    onSignin: () => void
}


const minCharErrorMessage = (min: number) => `Se requiere un mínimo de ${min} ${min === 1 ? "caracter" : "caracteres"}`;
const maxCharErrorMessage = (max: number) => `Se tiene un máximo de ${max} ${max === 1 ? "caracter" : "caracteres"}`;
const emailErrorMessage = () => `Formato de correo electrónico inválido`;

const UserSchema = z.object({
    name: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    email: z.string().email({ message: emailErrorMessage() }),
    password: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    confirmPassword: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
}).refine(data => data.password === data.confirmPassword, "Las contraseñas deben ser iguales");



const Signup = ({ open, onClose, onSignin }: SignupProps) => {

    const { isLoading, mutateAsync, error } = useMutation<SignupResponse, UserHandlerError, SignupData>(postSignup)
    const { addError } = useContext(ErrorHandlerContext)

    const errors = error?.error ? (typeof error.error === 'string' ? {} : error?.error.fieldErrors) : {}
    const [completedSignUp, setCompletedSignUp] = useState(false)

    const formContext = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(UserSchema)
    })

    const handleFormSubmit = async (data: SignupData) => {

        try {
            const res = await mutateAsync(data)
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

    useEffect(() => {
        if (formContext.formState.errors[""]) addError(formContext.formState.errors[""].message)
    }, [formContext.formState.errors, addError]);

    const Item = FormItem<SignupData>

    return (
        <ModalComponent open={open} onClose={onClose} size='small'>
            <LoadingIndicator show={isLoading} className="container mx-auto flex flex-col items-center bg-white rounded-none md:rounded-3xl">
                <div>
                    <h1 className="text-xl md:text-[1.5rem] leading-normal font-extrabold text-gray-700">
                        Crear Cuenta
                    </h1>
                </div>
                <div className="mt-10" >¨
                    <FormProvider  {...formContext}>
                        <form onSubmit={formContext.handleSubmit(handleFormSubmit)} className="flex flex-col items-center justify-center">
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
                                        <Item layout={signupLayout} />
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
                                    <button onClick={onClose} type='button'>Cancelar</button>
                                </div>
                                {!completedSignUp && <div className='mt-4 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                                    <button type='submit'>Crear Usuario</button>
                                </div>}
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signup
