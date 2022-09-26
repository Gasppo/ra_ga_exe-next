import { Slide } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import { sendEmail } from '../../../utils/queries/user'
import PageTitle from '../../Generic/Utils/PageTitle'
import ModalComponent from '../../Modal/ModalComponent'
import RecoveryForm from './components/RecoveryForm'
import SignInForm from './components/SignInForm'

interface SigninProps {
    open: boolean,
    onClose: () => void

}


const Signin = ({ onClose, open }: SigninProps) => {

    const { addError } = useContext(ErrorHandlerContext)

    const [loading, setLoading] = useState(false)
    const [emailRecovery, setEmailRecovery] = useState(false)

    const containerRef = useRef(null)

    const { data: emailData, mutateAsync, isLoading: loadingRecovery } = useMutation<{ message?: string }, { error?: string | { formErrors?: string[], fieldErrors?: { [key: string]: string[] } } }, { email: string }>(sendEmail, {
        onError: (error) => {
            if (typeof error.error === 'string') addError(error.error)
            if (Object.keys(error).length === 0) addError('Error al enviar el correo')
        },
        onSuccess: () => { addError('Correo enviado!', 'success'), onClose() }
    })


    const emailRecoverySubmit = async (data: { email: string }) => {
        mutateAsync({
            email: data.email
        })
    }

    const handleChangeToRecovery = () => {
        setEmailRecovery(prev => !prev)
    }

    return (
        <ModalComponent open={open} onClose={onClose} size='small' ref={containerRef}>
            <LoadingIndicator show={loading || loadingRecovery} >
                <div className="container mx-auto flex flex-col items-center rounded-none">
                    <PageTitle title={emailRecovery ? 'Recuperar contraseña' : 'Iniciar sesión'} size='small' />
                    <div className="mt-10" ref={containerRef}>
                        <Slide in={emailRecovery} direction="left" container={containerRef.current}>
                            <div>
                                {emailRecovery && <RecoveryForm sent={!!emailData?.message} onClose={onClose} onRecovery={handleChangeToRecovery} onSubmit={emailRecoverySubmit} />}
                            </div>
                        </Slide>
                        <Slide in={!emailRecovery} direction="right" container={containerRef.current}>
                            <div>
                                {!emailRecovery && <SignInForm onLoading={setLoading} onClose={onClose} onRecovery={handleChangeToRecovery} />}
                            </div>
                        </Slide>
                    </div>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signin
