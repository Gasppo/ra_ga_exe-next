import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import { postSignup, SignupData, SignupResponse, UserHandlerError } from '../../../utils/queries/user'
import PageTitle from "../../Generic/Utils/PageTitle"
import ModalComponent from '../../Modal/ModalComponent'
import SignUpButtons from "./components/SignUpButtons"
import SignUpCompleted from "./components/SignUpCompleted"
import SignUpForm from "./components/SignUpForm"
import SignUpFormErrors from "./components/SignUpFormErrors"
import { SignUpSchema } from "./form/signupSchema"


interface SignupProps {
    open: boolean
    onClose: () => void
    onSignin: () => void
}

const Signup = ({ open, onClose, onSignin }: SignupProps) => {

    const { isLoading, mutateAsync, error } = useMutation<SignupResponse, UserHandlerError, SignupData>(postSignup)
    const { addError, queryErrorHandler } = useContext(ErrorHandlerContext)

    const errors = error?.error ? (typeof error.error === 'string' ? {} : error?.error.fieldErrors) : {}
    const [completedSignUp, setCompletedSignUp] = useState(false)

    const formContext = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(SignUpSchema)
    })

    const handleFormSubmit = async (data: SignupData) => {
        try {
            const res = await mutateAsync(data)
            if (res.statusCode === 200) setCompletedSignUp(true)
        }
        catch (error) {
            queryErrorHandler(error)
        }
    }

    useEffect(() => {
        if (formContext.formState.errors[""]) addError(formContext.formState.errors[""].message)
    }, [formContext.formState.errors, addError]);

    return (
        <ModalComponent open={open} onClose={onClose} size='small'>
            <LoadingIndicator show={isLoading}>
                <div className="container mx-auto flex flex-col items-center bg-white rounded-none md:rounded-3xl">
                    <PageTitle title="Crear Cuenta" size="small" />
                    <div className="mt-10" >
                        <FormProvider  {...formContext}>
                            <form onSubmit={formContext.handleSubmit(handleFormSubmit)} className="flex flex-col items-center justify-center">
                                <div className="flex flex-row flex-wrap justify-center w-3/4">
                                    {completedSignUp && <SignUpCompleted onSignin={onSignin} />}
                                    {!completedSignUp && <SignUpForm />}
                                </div>
                                {completedSignUp && errors && <SignUpFormErrors errors={errors} />}
                                <SignUpButtons onClose={onClose} showCreate={!completedSignUp} />
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signup
