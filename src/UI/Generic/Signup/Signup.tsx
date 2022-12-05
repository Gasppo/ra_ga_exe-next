import { UserCreationSchema, UserCreationSchemaType } from "@backend/schemas/UserCreationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import HookForm from "@UI/Forms/HookForm"
import { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'
import LoadingIndicator from '../../../utils/LoadingIndicator/LoadingIndicator'
import { postSignup, SignupResponse, UserHandlerError } from '../../../utils/queries/user'
import PageTitle from "../../Generic/Utils/PageTitle"
import ModalComponent from '../../Modal/ModalComponent'
import SignUpButtons from "./components/SignUpButtons"
import SignUpCompleted from "./components/SignUpCompleted"
import SignUpForm from "./components/SignUpForm"
import SignUpFormErrors from "./components/SignUpFormErrors"


interface SignupProps {
    open: boolean
    onClose: () => void
    onSignin: () => void
    adminCreation: boolean
}

const Signup = ({ open, onClose, onSignin, adminCreation }: SignupProps) => {

    const { isLoading, mutateAsync, error } = useMutation<SignupResponse, UserHandlerError, UserCreationSchemaType>(postSignup)
    const { queryErrorHandler } = useContext(ErrorHandlerContext)

    const errors = error?.error ? (typeof error.error === 'string' ? {} : error?.error.fieldErrors) : {}
    const [completedSignUp, setCompletedSignUp] = useState(false)

    const defaultFormValues = { name: '', email: '', password: '', confirmPassword: '' }

    const handleFormSubmit = async (data: UserCreationSchemaType) => {
        try {
            const res = await mutateAsync(data)
            if (res.statusCode === 200) setCompletedSignUp(true)
        }
        catch (error) {
            queryErrorHandler(error)
        }
    }

    return (
        <ModalComponent open={open} onClose={onClose} size='small'>
            <LoadingIndicator show={isLoading}>
                <div className="container mx-auto flex flex-col items-center bg-white rounded-none md:rounded-3xl">
                    <PageTitle title="Crear Cuenta" size="small" />
                    <div className="mt-10" >
                        <HookForm defaultValues={defaultFormValues} formOptions={{ resolver: zodResolver(UserCreationSchema) }} onSubmit={handleFormSubmit}>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-row flex-wrap justify-center w-3/4">
                                    {completedSignUp && <SignUpCompleted onSignin={onSignin} adminCreation={adminCreation} />}
                                    {!completedSignUp && <SignUpForm />}
                                </div>
                                {completedSignUp && errors && <SignUpFormErrors errors={errors} />}
                                <SignUpButtons onClose={onClose} showCreate={!completedSignUp} />
                            </div>
                        </HookForm>
                    </div>
                </div>
            </LoadingIndicator>
        </ModalComponent>
    )
}

export default Signup
