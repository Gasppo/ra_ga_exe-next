import React from 'react'
import DoneIcon from '@mui/icons-material/Done'

interface SignUpCompletedProps {
    onSignin: () => void
}

const SignUpCompleted = (props: SignUpCompletedProps) => {

    const { onSignin } = props

    return (
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
    )
}

export default SignUpCompleted
