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
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getServicePrice, modifyServicePrice, PrecioServicioExtended } from '@utils/queries/cotizador';
import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editServicePriceLayout } from './form/EditServicePriceLayout';
import { ModifyPreciosServiciosSchema } from '@backend/schemas/ModifyPreciosServiciosSchema';
import { ModifyClothingPriceSchema } from '@backend/schemas/ModifyClothingPriceSchema';
import { editCategoryPriceLayout } from '@UI/preciosBase/forms/editCategoryPrice.layout';


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

export default function EditServicePriceDialog(props: ConfirmDialogProps) {

    const { addError } = React.useContext(ErrorHandlerContext)

    const queryClient = useQueryClient()

    const handleClose = () => {
        props.onClose()
    };

    const handleNewClothingSubmit = async (data: PrecioServicioExtended) => {
        await modifyPriceMutation(data)
        props.onClose()
    }

    const placeHolderData: PrecioServicioExtended = {
        id: '',
        name: '',
        precioBase: 0,
        factorMultiplicador: 0,
    }

    const { data: servicePriceData, isFetching: isFetchingServicePriceData } = useQuery<PrecioServicioExtended, ErrorMessage>(
        ['servicePriceData', props.idToShow], () => props.idToShow ? getServicePrice(props.idToShow) : placeHolderData, {
        refetchOnWindowFocus: false,
        onError: (error: any) => addError(error),
        initialData: placeHolderData
    });

    const { mutateAsync: modifyPriceMutation } = useMutation<PrecioServicioExtended, ErrorMessage, PrecioServicioExtended>(
        (data) => modifyServicePrice(data), {
        onSuccess: () => {
            addError('Precio modificado exitosamente', 'success')
            queryClient.invalidateQueries('servicePriceData')
            queryClient.invalidateQueries('services')
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
                {servicePriceData?.name === 'Precio del Dolar' ?
                    <div className="p-4">
                        <DialogTitle>{("Modificación precio " + servicePriceData.name) || ''}</DialogTitle>
                        <LoadingIndicator show={isFetchingServicePriceData} >
                            {!isFetchingServicePriceData &&
                                <HookForm defaultValues={servicePriceData} onSubmit={handleNewClothingSubmit} formOptions={{ resolver: zodResolver(ModifyClothingPriceSchema) }} >
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
                    :
                    <div className="p-4">
                        <DialogTitle>{("Modificación " + servicePriceData?.name) || ''}</DialogTitle>
                        <LoadingIndicator show={isFetchingServicePriceData} >
                            {!isFetchingServicePriceData &&
                                <HookForm defaultValues={servicePriceData} onSubmit={handleNewClothingSubmit} formOptions={{ resolver: zodResolver(ModifyPreciosServiciosSchema) }} >
                                    <DialogContent className='space-y-5'>
                                        <FormItem layout={editServicePriceLayout} />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='button' onClick={handleClose}>Cancelar</Button>
                                        <Button type="submit">Confirmar</Button>
                                    </DialogActions>
                                </HookForm>
                            }
                        </LoadingIndicator>
                    </div>}
            </Dialog >
        </div >
    );
}