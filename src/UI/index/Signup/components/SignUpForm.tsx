import React from 'react'
import { SignupData } from '../../../../utils/queries/user'
import FormItem from '../../../Testing/FormItem'
import { signupLayout } from '../form/signup.layout'


const SignUpForm = () => {

    const Item = FormItem<SignupData>

    return (
        <div className="flex flex-row flex-wrap justify-center items-center">
            <Item layout={signupLayout} />
        </div>
    )
}

export default SignUpForm
