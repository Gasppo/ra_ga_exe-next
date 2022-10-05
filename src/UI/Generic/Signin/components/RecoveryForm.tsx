import { SendResetEmailSchema } from '@backend/schemas/SendResetEmailSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import HookForm from '@UI/Forms/HookForm'
import FormItem from '../../../Forms/FormItem'
import { recoveryLayout } from '../forms/recovery.layout'

interface RecoveryFormProps {
    onClose: () => void
    onSubmit: (data: { email: string }) => void
    onRecovery: () => void
    sent?: boolean
}

const RecoveryForm = (props: RecoveryFormProps) => {

    const { onClose, onRecovery, sent, onSubmit } = props

    return (
        <HookForm defaultValues={{ email: '' }} onSubmit={onSubmit} formOptions={{ resolver: zodResolver(SendResetEmailSchema) }} >
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row flex-wrap justify-center w-3/4" >
                    {!sent && <>
                        <FormItem layout={recoveryLayout} />
                        <div className='mt-3 text-xs text-cyan-600'>
                            <button type='button' onClick={onRecovery} >{'Volver al inicio de sesión'}</button>
                        </div>
                    </>}
                    {sent && <div>Correo Enviado!</div>}

                </div>
                <div className="flex flex-col items-center" >
                    {!sent && <div className='flex justify-between'>
                        <div className='mt-10  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                            <button type='button' onClick={onClose}>Cancelar</button>
                        </div>
                        <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                            <button type='submit'>{'Enviar correo'}</button>
                        </div>
                    </div>}
                </div>
            </div>
        </HookForm>
    )
}

export default RecoveryForm
