import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { OrderViewContext } from '@utils/Order/OrderViewContext';
import { getAllClothesPrices, updateOrderFields } from '@utils/queries/cotizador';
import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { generalOrderChangelayout } from '../forms/generalOrderChange.layout';




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


type Props = {
    open: boolean,
    onClose: () => void,
}

const OrderGeneralChangeDialog = (props: Props) => {


    const { orderData } = useContext(OrderViewContext)
    const queryClient = useQueryClient()

    const { addError } = useContext(ErrorHandlerContext)

    const { data } = useQuery(['clothesPrices'], getAllClothesPrices, {
        initialData: [],
        onError: (err) => addError(JSON.stringify(err))
    })

    const { mutateAsync, isLoading: isUpdatingState } = useMutation(updateOrderFields, {
        onSuccess: () => { props.onClose(); queryClient.invalidateQueries(['order']) },
        onError: (err) => addError(JSON.stringify(err))
    })

    const states = data.filter(el => el.tipo.name === orderData?.prenda.tipo.name).map(el => ({ key: el.id, text: el.complejidad.name }))

    const handleSubmit = async (data: { prendaID: string }) => {
        await mutateAsync({ orderId: orderData.id, precioPrendaId: data.prendaID })
    }

    const handleClose = () => props.onClose()

    return <div>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <HookForm defaultValues={{ prendaID: orderData.prenda.id }} onSubmit={handleSubmit} resetOnDialogClose={{ dialogStatus: props.open }}>
                <LoadingIndicator show={isUpdatingState}>
                    <div className="p-4" >
                        <DialogTitle>{"Editar detalles generales de la orden"}</DialogTitle>
                        <div className='my-4 mx-4'>
                            <FormItem layout={generalOrderChangelayout} selectOptions={{ states }} />
                        </div>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Confirmar que desea cambiar los detalles de la orden
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions >
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button type="submit">Confirmar</Button>
                        </DialogActions>
                    </div>
                </LoadingIndicator>
            </HookForm>
        </Dialog>
    </div >
}

export default OrderGeneralChangeDialog