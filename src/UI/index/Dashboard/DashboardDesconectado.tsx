import React, { useState } from 'react'
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
        <div className="md:mt-9 flex flex-col items-center justify-center md:mx-10 lg:mx-0">
            <div>
                <h1 className="text-xl md:text-[2rem] leading-normal font-extrabold text-gray-700">
                    Pagina en desarrollo
                </h1>
            </div>
            <div className="text-lg md:text-[1rem] leading-normal  text-gray-700">
                <button type='button' onClick={handleOpenSignIn}>Iniciar session</button>
            </div>
            <div className="text-lg md:text-[1rem] leading-normal  text-gray-700">
                <button type='button' onClick={handleOpenSignUp}>Registrarse</button>
            </div>
            {openSignUp && <Signup open={openSignUp} onClose={handleCloseSignUp} onSignin={handleOpenSignIn} />}
            {openSignIn && <Signin open={openSignIn} onClose={handleCloseSignIn} />}
        </div>
    )
}

export default DashboardDesconectado
