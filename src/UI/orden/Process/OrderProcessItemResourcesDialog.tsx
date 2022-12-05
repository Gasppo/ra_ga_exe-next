import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchServiceUsers, updateProcessResources } from '@utils/queries/cotizador';
import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { processItemResourceChangeLayout } from '../forms/processItemResourceChange.layout';
import { ProcesoFicha } from '../SelectableOrderProcessItem';




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    process: ProcesoFicha
    open: boolean,
    onClose: () => void,
}

const OrderProcessItemResourcesDialog = (props: Props) => {

    const queryClient = useQueryClient()

    const { addError } = useContext(ErrorHandlerContext)

    const { data, isFetching: isFetchingUsers } = useQuery(['serviceUsers'], fetchServiceUsers, {
        initialData: [],
        refetchOnWindowFocus: false,
        onError: (err) => addError(JSON.stringify(err))
    })

    const { mutateAsync, isLoading: isUpdatingState } = useMutation(updateProcessResources, {
        onSuccess: () => { props.onClose(); queryClient.invalidateQueries(['order']) },
        onError: (err) => addError(JSON.stringify(err))
    })

    const serviceUsers = data.map(el => ({ key: el.email, text: el.name }))

    const handleSubmit = async (data: ProcesoFicha) => {
        await mutateAsync(data)
    }

    const handleClose = () => props.onClose()

    return <div>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            onClose={handleClose}
        >
            <HookForm defaultValues={props.process} onSubmit={handleSubmit} resetOnDialogClose={{ dialogStatus: props.open }}>
                <LoadingIndicator show={isUpdatingState || isFetchingUsers}>
                    <div className="p-4" >
                        <DialogTitle>{"Modificar recursos asignados al proceso"}</DialogTitle>
                        <div className='my-4 mx-4'>
                            <FormItem layout={processItemResourceChangeLayout} selectOptions={{ serviceUsers }} />
                        </div>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Confirmar que desea cambiar el estado del proceso
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

export default OrderProcessItemResourcesDialog