import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import { addClothes } from '@utils/queries/cotizador';
import { useRouter } from "next/router";
import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { newCategoryLayout } from './forms/newCategory.layout';

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
}

export default function AddNewCategoryDialog(props: ConfirmDialogProps) {

    const queryClient = useQueryClient()

    const { addError } = React.useContext(ErrorHandlerContext)
    const router = useRouter()

    const handleClose = () => {
        props.onClose()
    };

    const { mutateAsync: createPrendaMutation } = useMutation(addClothes, {
        onSuccess: () => {
            router.replace('/preciosBase')
            queryClient.invalidateQueries(['clothes'])
        },
        onError: (error) => addError(JSON.stringify(error))
    })

    const handleNewClothingSubmit = (data: any) => {
        createPrendaMutation(data)
        router.replace('/preciosBase')
        props.onClose()
    }

    const defaultValues = { name: '', picture: '', precioBasico: 0, precioMedio: 0, precioComplejo: 0, precioMuyComplejo: 0, precioUltraComplejo: 0, precioExtremadamenteComplejo: 0 }

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth={true}
            >
                <div className="p-4">
                    <DialogTitle>{"Creación nueva prenda"}</DialogTitle>
                    <HookForm defaultValues={defaultValues} onSubmit={handleNewClothingSubmit} >
                        <DialogContent className='space-y-5'>
                            <FormItem layout={newCategoryLayout} />
                        </DialogContent>
                        <DialogActions>
                            <Button type='button' onClick={handleClose}>Cancelar</Button>
                            <Button type="submit" >Confirmar</Button>
                        </DialogActions>
                    </HookForm>
                </div>
            </Dialog >
        </div >
    );
}