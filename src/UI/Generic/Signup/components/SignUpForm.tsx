import FormItem from '../../../Forms/FormItem'
import { signupLayout } from '../form/signup.layout'


const SignUpForm = () => {


    return (
        <div className="flex flex-row flex-wrap justify-center items-center">
            <div className='md:w-64'>
                <FormItem layout={signupLayout} />
            </div>
        </div>
    )
}

export default SignUpForm
