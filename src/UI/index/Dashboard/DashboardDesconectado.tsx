
import React, { useState } from 'react'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'
import Image from 'next/image'
import BackGroundImage from './LandingBackground.jpg'
import { Button, TextField } from '@mui/material'

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

        <div className='w-auto h-auto flex flex-col place-items-center border-8 border-double border-gray-800 m-auto p-20'>
            <h1 className="text-3xl md:text-[3rem] leading-normal font-extrabold text-gray-700">
                HS-Taller
            </h1>
            <div className='w-4/5 mt-8'>
                <TextField id="standard-search" label="Email" type="search" variant="standard" className='w-full' />
            </div>
            <div className='w-4/5 mt-12'>
                <TextField id="standard-password-input" label="Contraseña" type="password" autoComplete="current-password" variant="standard" className='w-full' />
            </div>

            <div className='flex md:flex-row flex-col md:space-x-10 mt-20'>
                <div className='my-2'>
                    <Button variant="outlined" onClick={handleOpenSignIn} className="w-36">Iniciar Sesión</Button>
                </div>
                <div className='my-2'>
                    <Button variant="outlined" onClick={handleOpenSignIn} className="w-36">Registrarse</Button>
                </div>
                {openSignUp && <Signup open={openSignUp} onClose={handleCloseSignUp} onSignin={handleOpenSignIn} />}
                {openSignIn && <Signin open={openSignIn} onClose={handleCloseSignIn} />}
            </div>
        </div>

    )
}

export default DashboardDesconectado
