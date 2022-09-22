import React from 'react'
import InputField from '../Signup/InputField'

interface RecoveryFormProps {
    onClose: () => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.SyntheticEvent) => void
    onRecovery: () => void
    errorFlag: boolean
    errors?: {
        [key: string]: string[]
    }
    sent?: boolean
}

const RecoveryForm = (props: RecoveryFormProps) => {

    const { onClose, onChange, onSubmit, onRecovery, errorFlag, errors, sent } = props

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
            <div className="flex flex-row flex-wrap justify-center w-3/4" >
                {!sent && <>
                    <InputField name='email' label="Correo" onChange={onChange} errorFlag={errorFlag} errors={errors} />
                    <div className='mt-3 text-xs text-cyan-600'>
                        <button type='button' onClick={onRecovery} >{'Volver al inicio de sesión'}</button>
                    </div>
                </>}
                {sent && <div>Correo Enviado!</div>}

            </div>
            <div className="flex flex-col items-center" >
                {!sent && <div className='flex justify-between'>
                    <div className='mt-10  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                        <button type='button' onClick={onClose}>Cancelar</button>
                    </div>
                    <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                        <button type='submit'>{'Enviar correo'}</button>
                    </div>
                </div>}
            </div>
        </form>
    )
}

export default RecoveryForm
