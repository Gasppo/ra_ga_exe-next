import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ArchivoFichaTecnica, ContenidoFichaTencica, FichaTecnica } from '@prisma/client';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchProcessStates, updateProcessState } from '@utils/queries/cotizador';
import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { processItemChangeLayout } from '../forms/processItemChange.layout';




const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Process = {
    estado: string;
    proceso: string;
    icon: string;
    id: string;
    ficha: FichaTecnica & {
        archivos: ArchivoFichaTecnica[];
        contenido: ContenidoFichaTencica;
    };
}

type Props = {
    process: Process
    open: boolean,
    onClose: () => void,
}

const OrderProcessItemChangeDialog = (props: Props) => {

    const queryClient = useQueryClient()

    const { addError } = useContext(ErrorHandlerContext)

    const { data } = useQuery(['processStates'], fetchProcessStates, {
        initialData: [],
        onError: (err) => addError(JSON.stringify(err))
    })

    const { mutateAsync, isLoading: isUpdatingState } = useMutation(updateProcessState, {
        onSuccess: () => { props.onClose(); queryClient.invalidateQueries(['order']) },
        onError: (err) => addError(JSON.stringify(err))
    })

    const states = data.map(el => ({ key: el.descripcion, text: el.descripcion }))

    const handleSubmit = async (data: Process) => {
        await mutateAsync({
            estado: data.estado,
            icon: data.icon,
            estimatedAt: data.ficha.estimatedAt.toLocaleString(),
            id: data.id,
            proceso: data.proceso
        })
    }

    const handleClose = () => props.onClose()

    return <div>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <HookForm defaultValues={props.process} onSubmit={handleSubmit} >
                <LoadingIndicator show={isUpdatingState}>
                    <div className="p-4" >
                        <DialogTitle>{"Cambiar el estado para el proceso?"}</DialogTitle>
                        <div className='my-4 mx-4'>
                            <FormItem layout={processItemChangeLayout} selectOptions={{ states }} />
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

export default OrderProcessItemChangeDialog