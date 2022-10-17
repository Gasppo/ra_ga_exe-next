import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TipoPrenda } from '@prisma/client';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getClothingAndPrices } from '@utils/queries/cotizador';
import * as React from 'react';
import { useQuery } from 'react-query';
import { editCategoryLayout } from './forms/editCategory.layout';

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
    idToShow: string
}

export interface ClothingAndPrices {
    id: string,
    name: string,
    picture: string,
    precios: {
        precioBase: number,
        complejidad: {
            name: string
        }
    }[]
}



export default function EditCategoryDialog(props: ConfirmDialogProps) {

    const { addError } = React.useContext(ErrorHandlerContext)

    const handleClose = () => {
        props.onClose()
    };

    const handleNewClothingSubmit = (data: ClothingAndPrices) => {
        console.log(data)
    }

    const { data: clothingAndPriceData, isFetching: isFetchingClothingAndPriceData } = useQuery<TipoPrenda, ErrorMessage>(
        ['clothingAndPriceData'], () => getClothingAndPrices('cl9d13a9t15665wwaiozxdddm'), {
        refetchOnWindowFocus: false,
        onSuccess: () => { console.log('se mando re nashe: ', clothingAndPriceData) },
        onError: (error: any) => addError(error)
    });

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
                    <LoadingIndicator show={isFetchingClothingAndPriceData} >
                        <HookForm defaultValues={clothingAndPriceData} onSubmit={handleNewClothingSubmit} >
                            <DialogContent className='space-y-5'>
                                <FormItem layout={editCategoryLayout} />
                            </DialogContent>
                            <DialogActions>
                                <Button type='button' onClick={handleClose}>Cancelar</Button>
                                <Button type="submit">Confirmar</Button>
                            </DialogActions>
                        </HookForm>
                    </LoadingIndicator>
                </div>
            </Dialog >
        </div >
    );
}