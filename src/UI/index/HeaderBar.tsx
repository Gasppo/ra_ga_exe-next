import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';


const HeaderBar = () => {

    const { data, status } = useSession({ required: false });
    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(false)

    const handleOpenSignUp = () => {
        setOpenSignUp(true)
    }

    const handleCloseSignUp = () => {
        setOpenSignUp(false)
    }

    const handleOpenSignIn = () => {
        setOpenSignIn(true)
    }

    const handleCloseSignIn = () => {
        setOpenSignIn(false)
    }

    return (
        <div className='flex justify-center md:justify-between items-center w-full h-14 transition-all duration-200 bg-zinc-800 text-white px-2 md:px-10 py-4' >
            <div className='hidden md:flex md:flex-row'>
                <div className='font-bold'>Contacto:</div>
                <div className='ml-4 text-cyan-600 font-bold'>+123 466 777</div>
            </div>
            <div className='md:hidden' />
            <div>
                {status !== 'authenticated' && (
                    <div className="text-xs md:text-base flex flex-row" >
                        <div className="flex flex-row">
                            <div>Iniciar sesion:</div>
                            <button onClick={() => signIn("google")} className="text-cyan-600 ml-2 " >
                                Google
                            </button>
                            <p className='mx-1'></p>
                            <button onClick={handleOpenSignIn} className="text-cyan-600" >
                                Usuario
                            </button>
                        </div>
                        <div className='border-l-2 border-opacity-50 border-slate-700 pl-2 ml-2'>
                            <button className="text-cyan-600" onClick={handleOpenSignUp}>
                                Registrarse
                            </button>
                        </div>
                    </div>
                )}
                {status === 'authenticated' && (
                    <div className='flex flex-row items-center text-xs md:text-base'>
                        {data.user?.image && <div className="flex" >
                            <Image src={data.user?.image || ''} width="32" height="32" className='rounded-full' alt=""></Image>
                        </div>}
                        <div className='ml-2 mr-5'>
                            <div className='font-bold'>{data.user?.name}</div>
                        </div>
                        <div className='border-l-2 border-opacity-25 border-slate-400'>
                            <button className='ml-5 px-2 py-1 underline' onClick={() => signOut()}>
                                Cerrar Sesion
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {openSignUp && <Signup open={openSignUp} onClose={handleCloseSignUp} />}
            {openSignIn && <Signin open={openSignIn} onClose={handleCloseSignIn} />}
        </div>
    )
}

export default HeaderBar
