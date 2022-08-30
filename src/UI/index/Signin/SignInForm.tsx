import React from 'react'
import InputField from '../Signup/InputField'

interface SignInFormProps {
    onClose: () => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.SyntheticEvent) => void
    onRecovery: () => void
    errorFlag: boolean
}

const SignInForm = (props: SignInFormProps) => {

    const { onClose, onChange, onSubmit, onRecovery, errorFlag } = props

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
            <div className="flex flex-row flex-wrap justify-center w-3/4" >
                <InputField name='email' label="Correo" onChange={onChange} errorFlag={errorFlag} />
                <InputField name='password' label='Contraseña' onChange={onChange} type="password" errorFlag={errorFlag} />
                {errorFlag && <div className='text-xs -mt-2 text-red-600'>
                    <p>Inicio de sesion incorrecto</p>
                </div>}
                <div className='mt-3 text-xs text-cyan-600'>
                    <button type='button' onClick={onRecovery} >{'Olvidó su contraseña?'}</button>
                </div>
            </div>
            <div className="flex flex-col items-center" >
                <div className='flex justify-between'>
                    <div className='mt-10  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                    <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                        <button type='submit'>{'Iniciar Sesion'}</button>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default SignInForm
