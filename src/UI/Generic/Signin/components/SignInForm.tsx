import { SignInSchema, SignInSchemaType } from '@backend/schemas/SignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import HookForm from '@UI/Forms/HookForm'
import { signIn } from 'next-auth/react'
import { useContext, useState } from 'react'
import { ErrorHandlerContext } from '../../../../utils/ErrorHandler/error'
import FormItem from '../../../Forms/FormItem'
import { signInLayout } from '../forms/signin.layout'
import SignInButtons from './SignInButtons'

interface SignInFormProps {
    onClose: () => void
    onRecovery: () => void
    onLoading: (value: boolean) => void
}


const SignInForm = (props: SignInFormProps) => {

    const { onClose, onRecovery, onLoading } = props
    const { addError } = useContext(ErrorHandlerContext)
    const [errorFlag, setErrorFlag] = useState(false)


    const defaultFormValues = {
        email: '',
        password: '',
    }


    const loginSubmit = async (data: SignInSchemaType) => {
        try {
            // verify if account availability is enabled
            const availableData = await fetch('/api/user/obtainAvailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data?.email
                })
            }).then(res => res.json())

            if (availableData?.available) {
                onLoading(true)
                const res = await signIn("credentials", {
                    username: data?.email,
                    password: data?.password,
                    redirect: false
                });

                if (res.error) {
                    const errorMessage = JSON.parse(res.error)?.error as string || 'Login Invalido'
                    const message = typeof errorMessage === 'object' ? 'Login Invalido' : errorMessage

                    addError(message)
                    throw new Error(message)
                }
                onClose()
            } else {
                addError('Cuenta bloqueada, por favor contactese para desbloquear')
            }
        }

        catch (error) {
            setErrorFlag(true)
            onLoading(false)
        }
    }

    return (
        <HookForm defaultValues={defaultFormValues} onSubmit={loginSubmit} formOptions={{ resolver: zodResolver(SignInSchema) }}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center" >
                    <div className='w-64 mx-4'>
                        <FormItem layout={signInLayout} />
                    </div>
                    {errorFlag && <div className='text-xs mt-2 text-red-600'>
                        <p>Inicio de sesion incorrecto</p>
                    </div>}
                    <div className='mt-3 text-xs text-cyan-600'>
                        <button type='button' onClick={onRecovery} >{'Olvidó su contraseña?'}</button>
                    </div>
                </div>
                <SignInButtons onClose={onClose} />
            </div>
        </HookForm>
    )
}


export default SignInForm
