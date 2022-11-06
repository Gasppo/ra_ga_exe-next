import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Role } from '@prisma/client';
import FormItem from '@UI/Forms/FormItem';
import HookForm from '@UI/Forms/HookForm';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage } from '@utils/queries/cotizador';
import { getRole, getRoleNames, updateUserRole } from '@utils/queries/user';
import * as React from 'react';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editUserRoleLayout } from './form/roleEdit.layout';


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

export default function EditCategoryPricesDialog(props: ConfirmDialogProps) {

    const { addError } = React.useContext(ErrorHandlerContext)
    const queryClient = useQueryClient()

    const placeHolderArrayData: Role[] = [{
        id: 0,
        name: '',
        description: '',
    }]

    const placeHolderData: Role = {
        id: 0,
        name: '',
        description: '',
    }

    const { data: allRolesData, isFetching: isFetchingAllRoles } = useQuery<Role[], ErrorMessage>(['allRoles'], getRoleNames, {
        refetchOnWindowFocus: false,
        onError: (error: any) => addError(error),
        initialData: placeHolderArrayData
    });

    const roles = useMemo(() => allRolesData?.map(el => ({ key: el.name, text: el.name })) || [], [allRolesData])

    const { data: roleData, isFetching: isFetchingRoleData } = useQuery<Role, ErrorMessage>(['userRole', props.idToShow], () => props?.email ? getRole(props?.email) : null, {
        refetchOnWindowFocus: false,
        onError: (error) => addError(JSON.stringify(error)),
        initialData: placeHolderData
    })

    const handleClose = () => {
        props.onClose()
    };

    const handleSubmit = async (data: Role) => {
        await modifyRoleMutation(data)
        props.onClose()
    }

    const { mutateAsync: modifyRoleMutation } = useMutation<Role, ErrorMessage, Role>(
        (data) => updateUserRole(props?.idToShow, data.name), {
        onError: (error) => addError(JSON.stringify(error)),
        onSuccess: () => {
            addError('Rol modificado exitosamente', 'success')
            queryClient.invalidateQueries(['userRole'])
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
                    <DialogTitle>{"Modificación del rol a: " + props?.email || ''}</DialogTitle>
                    <LoadingIndicator show={isFetchingAllRoles || isFetchingRoleData} >
                        {!isFetchingAllRoles && !isFetchingRoleData &&
                            <HookForm defaultValues={roleData} onSubmit={handleSubmit}>
                                <DialogContent className='space-y-5'>
                                    <FormItem layout={editUserRoleLayout} selectOptions={{ 'roles': roles }} />
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