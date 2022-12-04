import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useFormContext } from 'react-hook-form';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDialogProps {
    open: boolean,
    onClose: () => void,
    formSubmit:  (data: { orderState: number }) => void
}

export default function ConfirmStateChangeDialog(props: ConfirmDialogProps) {

    const {handleSubmit} = useFormContext<{ orderState: number }>()

    const handleClose = () => {
        props.onClose()
    };

    const onSubmit = () => {
        handleSubmit(props.formSubmit)()
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
                    <DialogTitle>{"Cambiar el estado para la orden?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Confirmar que desea cambiar el estado a la orden
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