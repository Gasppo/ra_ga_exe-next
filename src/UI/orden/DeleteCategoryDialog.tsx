import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

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
    onDeleteConfirm: (data: { orderState: number }) => void
    idToDelete: string
}

export default function DeleteCategoryDialog(props: ConfirmDialogProps) {

    const handleClose = () => {
        props.onClose()
    };

    const onSubmit = () => {
        console.log('deleted nashe')
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