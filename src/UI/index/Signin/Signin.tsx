import { Slide } from '@mui/material'
import { signIn } from 'next-auth/react'
import React, { useContext, useRef, useState } from 'react'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import ModalComponent from '../../Modal/ModalComponent'
import RecoveryForm from './RecoveryForm'
import SignInForm from './SignInForm'

interface SigninProps {
    open: boolean,
    onClose: () => void

}

type InputData = {
    email: string,
    password: string,
}

const Signin = ({ onClose, open }: SigninProps) => {

    const { addError } = useContext(ErrorHandlerContext)

    const [loading, setLoading] = useState(false)
    const [errorFlag, setErrorFlag] = useState(false)
    const [emailRecovery, setEmailRecovery] = useState(false)
    const [inputData, setInputData] = useState<InputData>({
        email: '',
        password: '',
    })

    const containerRef = useRef(null)

    const loginSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            setLoading(true)
            const res = await signIn("credentials", {
                username: inputData?.email,
                password: inputData?.password,
                redirect: false
            });

            if (res.error) {
                const errorMessage = JSON.parse(res.error)?.error as string || 'Login Invalido'
                addError(errorMessage)
                throw new Error(errorMessage)
            }
            onClose()
        }

        catch (error) {
            console.log(error)
            setErrorFlag(true)
            setLoading(false)
        }
    }

    const emailRecoverySubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        console.log(`TODO: Recuperar contraseña para ${inputData.email}`)
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (errorFlag) setErrorFlag(false)
        setInputData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangeToRecovery = () => {
        setEmailRecovery(prev => !prev)
    }

    return (
        <ModalComponent open={open} onClose={onClose} size='small' ref={containerRef}>
            <LoadingIndicator show={loading} >
                <div className="container mx-auto flex flex-col items-center rounded-none">
                    <div>
                        <h1 className="text-xl md:text-[1.5rem] leading-normal font-extrabold text-gray-700">
                            {emailRecovery ? 'Recuperar contraseña' : 'Iniciar sesión'}
                        </h1>
                    </div>
                    <div className="mt-10" ref={containerRef}>
                        <Slide in={emailRecovery} direction="left" container={containerRef.current}>
                            <div>
                                {emailRecovery && <RecoveryForm errorFlag={errorFlag} onClose={onClose} onRecovery={handleChangeToRecovery} onChange={handleChange} onSubmit={emailRecoverySubmit} />}
                            </div>
                        </Slide>
                        <Slide in={!emailRecovery} direction="right" container={containerRef.current}>
                            <div>
                                {!emailRecovery && <SignInForm errorFlag={errorFlag} onClose={onClose} onRecovery={handleChangeToRecovery} onChange={handleChange} onSubmit={loginSubmit} />}
                            </div>
                        </Slide>
                    </div>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signin
