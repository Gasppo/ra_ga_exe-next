import { OrderMessageSchema, OrderMessageSchemaType } from '@backend/schemas/OrderMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import SendIcon from '@mui/icons-material/Send'
import { IconButton } from '@mui/material'
import { Mensaje } from '@prisma/client'
import FormItem from '@UI/Forms/FormItem'
import HookForm from '@UI/Forms/HookForm'
import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData'
import { errorHandle } from '@utils/queries/cotizador'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import OrderMessageItem from './OrderMessageItem'

type Props = {
    orderData: ExtendedOrdenData
    selectedProcess: string
}

type ShownMessage = { id: string, message: string, timestamp: string, user: { email: string, name: string }, section: string }

const createMessage = async (data: OrderMessageSchemaType): Promise<Mensaje> => {
    return fetch(
        '/api/order/post-message',
        { method: 'POST', headers: { "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify(data) },
    )
        .then(res => res.ok ? res.json() : errorHandle(res))
        .catch((error) => { throw error });
}

const getOrderMessages = async (orderID: string): Promise<ShownMessage[]> => {
    return fetch(`/api/order/get-messages?orderID=${orderID}`)
        .then(res => res.ok ? res.json() : errorHandle(res))
        .catch((error) => { throw error });
}


const OrderMessagesTab = ({ orderData, selectedProcess }: Props) => {

    const [loadingMessage, setLoadingMessage] = useState<ShownMessage>({ id: 'temp', message: '', timestamp: '', user: { email: '', name: '' }, section: 'general' })
    const queryClient = useQueryClient()
    const orderID = orderData?.id || ''

    const { data: messages } = useQuery(['orderMessages', orderID], () => orderID ? getOrderMessages(orderID) : [] as ShownMessage[], { initialData: [], refetchOnWindowFocus: false })

    const { mutateAsync, isLoading: creatingMessage } = useMutation(createMessage, {
        onSuccess: () => {
            queryClient.invalidateQueries(['orderMessages'])
        }
    })
    const { data: sessionData } = useSession()

    const handleSendMessage = async (messageData: OrderMessageSchemaType) => {
        setLoadingMessage({
            id: 'temp',
            message: messageData.message,
            timestamp: new Date().toLocaleDateString(),
            user: { email: sessionData.user.email, name: sessionData.user.name },
            section: selectedProcess
        })
        const mensaje = await mutateAsync({ ...messageData, orderId: orderData.id, section: selectedProcess })
        console.log(mensaje)
    }


    return (
        <div className='flex flex-col mt-4'>
            <div className='m-4 border-4 shadow-lg min-h-[16rem] max-h-[20rem] overflow-y-scroll flex p-4 flex-col space-y-2'>
                {messages.filter(mess => mess.section === selectedProcess).map(mess => <OrderMessageItem key={mess.id} message={mess} userEmail={sessionData?.user?.email || ''} />)}
                {creatingMessage && <OrderMessageItem message={loadingMessage} userEmail={sessionData?.user?.email || ''} loading={creatingMessage} />}
            </div>
            <div className='mx-4'>
                <HookForm defaultValues={{ message: '', userEmail: sessionData?.user?.email || '', orderId: orderData?.id || '', section: selectedProcess }} onSubmit={handleSendMessage} formOptions={{ resolver: zodResolver(OrderMessageSchema) }} resetOnSubmit>
                    <div className='flex flex-row items-center'>
                        <div className='w-11/12'>
                            <FormItem layout={{ type: 'Input', scope: 'message', options: { placeholderText: 'Escriba su mensaje...', disabled: creatingMessage } }} />
                        </div>
                        <div className='flex justify-center items-center w-1/12 ml-2'>
                            <div>
                                <IconButton type='submit' disabled={creatingMessage}>
                                    <SendIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </HookForm>
            </div>
        </div>
    )
}

export default OrderMessagesTab