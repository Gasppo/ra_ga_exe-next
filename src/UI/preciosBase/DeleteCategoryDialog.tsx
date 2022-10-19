import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { errorHandle } from '@utils/queries/cotizador';
import { forwardRef, ReactElement, Ref, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDialogProps {
    open: boolean,
    onClose: () => void,
    idToDelete: string
}

export default function DeleteCategoryDialog(props: ConfirmDialogProps) {

    const queryClient = useQueryClient()
    const { addError } = useContext(ErrorHandlerContext)
    const { mutateAsync } = useMutation((id: string) => fetch('/api/clothes/delete/' + id).then(res => res.ok ? res.json() : errorHandle(res))
        .catch((error) => { throw error }), {
        onSuccess: () => queryClient.invalidateQueries(['clothes']),
        onError: (error) => addError(JSON.stringify(error))
    })


    const handleClose = () => {
        props.onClose()
    };

    const onSubmit = async () => {
        await mutateAsync(props.idToDelete)
        props.onClose()
    }


    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <div className="p-4" >
                    <DialogTitle>{"Eliminar la prenda?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Confirmar eliminación de prenda
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={onSubmit}>Confirmar</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}