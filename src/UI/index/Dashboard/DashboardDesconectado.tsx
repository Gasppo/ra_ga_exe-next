
import { Button } from '@mui/material'
import { useState } from 'react'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'

const DashboardDesconectado = () => {

    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(false)


    const handleCloseSignIn = () => {
        setOpenSignIn(false)
    }

    const handleCloseSignUp = () => {
        setOpenSignUp(false)
    }

    const handleOpenSignIn = () => {
        handleCloseSignUp()
        setOpenSignIn(true)
    }


    const handleOpenSignUp = () => {
        handleCloseSignIn()
        setOpenSignUp(true)
    }

    return (

        <div className='w-auto h-auto flex flex-col place-items-center border-8 border-double rounded-lg shadow-2xl border-gray-800 m-auto p-20'>
            <h1 className="text-3xl md:text-[3rem] leading-normal font-extrabold text-gray-700">
                HS-Taller
            </h1>
            <p className='text-gray-700'>Bienvenidos</p>
            <div className='flex md:flex-row flex-col md:justify-center md:space-x-10 mt-20'>
                <div className='my-2'>
                    <Button variant="outlined" onClick={handleOpenSignIn}>Iniciar Sesión</Button>
                </div>
                <div className='my-2'>
                    <Button variant="outlined" onClick={handleOpenSignUp}>Registrarse</Button>
                </div>
                {openSignUp && <Signup open={openSignUp} onClose={handleCloseSignUp} onSignin={handleOpenSignIn} />}
                {openSignIn && <Signin open={openSignIn} onClose={handleCloseSignIn} />}
            </div>
        </div>

    )
}

export default DashboardDesconectado
