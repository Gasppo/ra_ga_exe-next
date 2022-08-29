import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import ModalComponent from '../../Modal/ModalComponent'
import InputField from '../Signup/InputField'

interface SigninProps {
    open: boolean,
    onClose: () => void

}

type InputData = {
    email: string,
    password: string,
}

const Signin = ({ onClose, open }: SigninProps) => {

    const [loading, setLoading] = useState(false)
    const [errorFlag, setErrorFlag] = useState(false)
    const [inputData, setInputData] = useState<InputData>({
        email: '',
        password: '',
    })


    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        try {
            setLoading(true)
            const res = await signIn("credentials", {
                username: inputData?.email,
                password: inputData?.password,
                redirect: false
            });

            if (res.error) {
                throw new Error('Error al iniciar sesion')
            }
            onClose()
        }

        catch (error) {
            console.log(error)
            setErrorFlag(true)
            setLoading(false)
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (errorFlag) setErrorFlag(false)
        setInputData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <ModalComponent open={open} onClose={onClose} size='small'>
            <LoadingIndicator show={loading} className="container mx-auto flex flex-col items-center bg-white rounded-none md:rounded-3xl">
                <div>
                    <h1 className="text-5xl md:text-[3rem] leading-normal font-extrabold text-gray-700">
                        Crear Cuenta
                    </h1>
                </div>
                <div className="mt-10" >
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <div className="flex flex-row flex-wrap justify-center w-3/4" >
                            <InputField name='email' label="Correo" onChange={handleChange} errorFlag={errorFlag} />
                            <InputField name='password' label='Contraseña' onChange={handleChange} type="password" errorFlag={errorFlag} />
                            {errorFlag && <div className='text-xs -mt-4 text-red-600'>
                                <p>Inicio de sesion incorrecto</p>
                            </div>}
                        </div>
                        <div className='flex justify-between'>
                            <div className='mt-10  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                                <button onClick={onClose}>Cancelar</button>
                            </div>
                            <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                                <button type='submit'>Iniciar Sesion</button>
                            </div>
                        </div>
                    </form>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signin
