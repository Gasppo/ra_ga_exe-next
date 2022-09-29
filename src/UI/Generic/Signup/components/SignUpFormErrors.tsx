import React from 'react'

interface SignUpFormErrorsProps {
    errors: {
        [key: string]: string[];
    }
}

const SignUpFormErrors = (props: SignUpFormErrorsProps) => {

    const { errors } = props

    return (
        Object?.keys(errors)?.length === 0 && errors?.formErrors?.length > 0 && (
            <div className="w-3/4 " >
                <div className='text-red-600 text-sm mx-4'>
                    <p>{errors?.formErrors?.[0] || 'Error al registrar usuario'}</p>
                </div>
            </div>
        )
    )
}

export default SignUpFormErrors
