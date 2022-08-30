import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import ModalComponent from '../../Modal/ModalComponent'
import InputField from './InputField'

interface SignupProps {
    open: boolean
    onClose: () => void
}

type InputData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const postSignup = (data: InputData) => {
    return fetch(`/api/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}


const Signup = ({ open, onClose }: SignupProps) => {

    const { data, isLoading, mutateAsync } = useMutation(postSignup)

    const errors = data?.body?.fieldErrors

    const [inputData, setInputData] = useState<InputData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        try {
            const res = await mutateAsync(inputData)
            if (res?.statusCode === 400) throw new Error('Error al crear el usuario')

            const resSignin = await signIn("credentials", {
                username: inputData?.email,
                password: inputData?.password,
                redirect: false
            });

            if (resSignin.error) {
                throw new Error('Error al crear el usuario')
            }
            onClose()

        }

        catch (error) {
            console.log("Error", error)
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
                            <InputField name='name' label='Nombre' onChange={handleChange} errors={errors} />
                            <InputField name='email' label="Correo" onChange={handleChange} errors={errors} />
                            <InputField name='password' label='Contraseña' onChange={handleChange} errors={errors} type="password" />
                            <InputField name='confirmPassword' label='Confirmar contraseña' onChange={handleChange} errors={errors} type="password" />
                        </div>
                        <div className='flex justify-between'>
                            <div className='mt-4  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                                <button onClick={onClose}>Cancelar</button>
                            </div>
                            <div className='mt-4 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                                <button type='submit'>Crear Usuario</button>
                            </div>
                        </div>
                    </form>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signup
