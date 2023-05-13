import { ModifyClothingPriceSchema } from '@backend/schemas/ModifyClothingPriceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { editCategoryPriceLayout } from '@UI/preciosBase/forms/editCategoryPrice.layout';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getSinglePrice, modifySinglePrice, PrecioPrendaExtended } from '@utils/queries/cotizador';
import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';


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

export default function EditCategoryPricesDialog(props: ConfirmDialogProps) {

    const { addError } = React.useContext(ErrorHandlerContext)

    const queryClient = useQueryClient()

    const handleClose = () => {
        props.onClose()
    };

    const handleNewClothingSubmit = async (data: PrecioPrendaExtended) => {
        await modifyPriceMutation(data)
        props.onClose()
    }

    const placeHolderData: PrecioPrendaExtended = {
        id: '',
        precioBase: 0,
        complejidad: { name: '' },
        tipo: { name: '' }
    }

    const { data: singleClothingPriceData, isFetching: isFetchingSingleClothingPriceData } = useQuery<PrecioPrendaExtended, ErrorMessage>(
        ['singlePriceData', props.idToShow], () => props.idToShow ? getSinglePrice(props.idToShow) : placeHolderData, {
        refetchOnWindowFocus: false,
        onError: (error: any) => addError(error),
        initialData: placeHolderData
    });

    const { mutateAsync: modifyPriceMutation } = useMutation<PrecioPrendaExtended, ErrorMessage, PrecioPrendaExtended>(
        (data) => modifySinglePrice(data), {
        onSuccess: () => {
            addError('Precio modificado exitosamente', 'success')
            queryClient.invalidateQueries('singlePriceData')
            queryClient.invalidateQueries('clothesAndPrices')
        }
    })

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
                    <DialogTitle>{("Modificación precio " + singleClothingPriceData.tipo.name + ' ' + singleClothingPriceData.complejidad.name) || ''}</DialogTitle>
                    <LoadingIndicator show={isFetchingSingleClothingPriceData} >
                        {!isFetchingSingleClothingPriceData &&
                            <HookForm defaultValues={singleClothingPriceData} onSubmit={handleNewClothingSubmit} formOptions={{ resolver: zodResolver(ModifyClothingPriceSchema) }} >
                                <DialogContent className='space-y-5'>
                                    <FormItem layout={editCategoryPriceLayout} />
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button' onClick={handleClose}>Cancelar</Button>
                                    <Button type="submit">Confirmar</Button>
                                </DialogActions>
                            </HookForm>
                        }
                    </LoadingIndicator>
                </div>
            </Dialog >
        </div >
    );
}