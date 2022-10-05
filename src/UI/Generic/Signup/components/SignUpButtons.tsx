import React from 'react'

interface SignUpButtonsProps {
    onClose: () => void
    showCreate: boolean
}

const SignUpButtons = (props: SignUpButtonsProps) => {

    const { onClose, showCreate } = props

    return (
        <div className='flex justify-between'>
            <div className='mt-4  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                <button onClick={onClose} type='button'>Cancelar</button>
            </div>
            {showCreate && <div className='mt-4 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                <button type='submit'>Crear Usuario</button>
            </div>}
        </div>
    )
}

export default SignUpButtons
