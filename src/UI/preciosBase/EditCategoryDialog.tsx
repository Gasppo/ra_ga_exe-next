import { ModifyClothingCategorySchema } from '@backend/schemas/ModifyClothingCategorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getClothingAndPrices, modifyClothes, TipoPrendaExtended } from '@utils/queries/cotizador';
import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
    precioBasico: number,
    precioMedio: number,
    precioComplejo: number,
    precioMuyComplejo: number,
    precioUltraComplejo: number,
    precioExtremadamenteComplejo: number,
}

export default function EditCategoryDialog(props: ConfirmDialogProps) {

    const { addError } = React.useContext(ErrorHandlerContext)

    const queryClient = useQueryClient()

    const placeHolderData: TipoPrendaExtended = {
        id: '',
        name: '',
        picture: '',
        precios: []
    }

    const handleClose = () => {
        props.onClose()
    };


    const { data: clothingAndPriceData, isFetching: isFetchingClothingAndPriceData } = useQuery<TipoPrendaExtended, ErrorMessage>(
        ['clothingAndPriceData', props.idToShow], () => getClothingAndPrices(props.idToShow), {
        refetchOnWindowFocus: false,
        onSuccess: () => { console.log('se mando impresionante: ', clothingAndPriceData) },
        onError: (error: any) => addError(error),
        placeholderData: placeHolderData
    });


    const { mutateAsync } = useMutation(modifyClothes, {
        onSuccess: () => {
            addError('Prenda cambiada exitosamente', 'success')
            queryClient.invalidateQueries(['clothesAndPrices'])
            queryClient.invalidateQueries(['clothes'])
        },
        onError: (error) => addError(JSON.stringify(error))
    })

    const handleNewClothingSubmit = async (data: TipoPrendaExtended) => {
        await mutateAsync(data)
        props.onClose()
    }

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
                    <DialogTitle>{"Modificar Prenda"}</DialogTitle>
                    <LoadingIndicator show={isFetchingClothingAndPriceData} >
                        {!isFetchingClothingAndPriceData &&
                            <HookForm defaultValues={clothingAndPriceData} onSubmit={handleNewClothingSubmit} formOptions={{ resolver: zodResolver(ModifyClothingCategorySchema) }} >
                                <DialogContent className='space-y-5'>
                                    <FormItem layout={editCategoryLayout} />
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button' onClick={handleClose}>Cancelar</Button>
                                    <Button type="submit">Confirmar</Button>
                                </DialogActions>
                            </HookForm>
                        }
                        {isFetchingClothingAndPriceData &&
                            <div className='h-56 flex flex-col items-center'>
                                <Skeleton width={'90%'} height={'80px'} />
                                <Skeleton width={'90%'} height={'80px'} />
                            </div>
                        }
                    </LoadingIndicator>
                </div>
            </Dialog >
        </div >
    );
}