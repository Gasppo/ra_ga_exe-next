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
import { ErrorMessage } from '@utils/queries/cotizador';
import { getAvailability, updateUserAvailability } from '@utils/queries/user';
import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editUserAvailabilityLayout } from './form/availabilityEdit.layout';


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
    idToShow: string,
    email: string
}

export default function EditUserAvailabilityDialog(props: ConfirmDialogProps) {

    const { addError } = React.useContext(ErrorHandlerContext)
    const queryClient = useQueryClient()


    const placeHolderData = {
        available: false
    }

    const { data: availabilityData, isFetching: isFetchingAvailabilityData } = useQuery<{ available: boolean }, ErrorMessage>(['userAvailability', props.idToShow], () => props?.email ? getAvailability(props?.email) : null, {
        refetchOnWindowFocus: false,
        onError: (error) => addError(JSON.stringify(error)),
        initialData: placeHolderData
    })

    const handleClose = () => {
        props.onClose()
    };

    const handleSubmit = async (data: { available: string }) => {
        const dataParaCargar = {
            available: data.available === 'verdadero' ? true : false
        }
        await modifyAvailabilityMutation(dataParaCargar)
        props.onClose()
    }

    const { mutateAsync: modifyAvailabilityMutation } = useMutation<{ available: boolean }, ErrorMessage, { available: boolean }>(
        (data) => updateUserAvailability(props?.idToShow, data?.available), {
        onError: (error) => addError(JSON.stringify(error)),
        onSuccess: () => {
            addError('Cuenta modificada exitosamente', 'success')
            queryClient.invalidateQueries(['userRole'])
        }
    })

    const defaultFormValues = {
        available: availabilityData?.available ? 'verdadero' : 'falso'
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
                    <DialogTitle>{"Activar o desactivar: " + props?.email || ''}</DialogTitle>
                    <LoadingIndicator show={isFetchingAvailabilityData} >
                        {!isFetchingAvailabilityData &&
                            <HookForm defaultValues={defaultFormValues} onSubmit={handleSubmit}>
                                <DialogContent className='space-y-5'>
                                    <FormItem layout={editUserAvailabilityLayout} selectOptions={{
                                        'availabilities':
                                            [
                                                { key: 'verdadero', text: 'Activo' },
                                                { key: 'falso', text: 'Inactivo' }
                                            ]
                                    }} />
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