import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import EditUserRoleDialog from '@UI/user/reset/EditUserRoleDialog';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { errorHandle } from '@utils/queries/cotizador';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { useIsMutating, useQuery, useQueryClient } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import ActionButton from './ActionButton';

const UsuariosDashboard = () => {

    const { data: sessionData } = useSession()
    const queryClient = useQueryClient()
    const isMutating = !!useIsMutating()
    const [confirmEditUserRoleOpen, setConfirmEditUserRoleOpen] = useState(false)
    const [focusedItem, setFocusedItem] = useState<ReducedUser>({ id: '', name: '', email: '', role: { name: '' } })

    const { addError } = useContext(ErrorHandlerContext);

    interface ReducedUser {
        id: string;
        name: string,
        email: string,
        role: {
            name: string
        }
    }

    const fetchUsers = (): Promise<ReducedUser[]> =>
        fetch(`/api/users/obtainAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke here");
                throw error;
            });


    const { data: usersData, isLoading: isFetchingUsers } = useQuery(['usuarios', sessionData?.user?.email], fetchUsers, {
        onError: () => addError('Error al traer usuarios')
    })

    const columns: GridColumns = [
        { field: 'name', headerName: 'Nombre', minWidth: 250, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
        { field: 'role', headerName: 'Rol', minWidth: 150, valueGetter: (params) => params.row.role.name, flex: 1 },
        {
            field: 'switchPermissions', headerName: 'Cambiar permisos', minWidth: 150, renderCell: (params) => EditButton(params.row.id, params.row.email)
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const handleCloseEditUserRoleDialog = () => {
        setConfirmEditUserRoleOpen(false)
        queryClient.invalidateQueries(['usuarios'])
    }

    const handleEditUserRoleDialog = (data: ReducedUser) => {
        setFocusedItem(data)
        console.log('Edit user: ', JSON.stringify(data))
        setConfirmEditUserRoleOpen(true)
    }

    const EditButton = (id: string, email: string) => (
        <IconButton type="button" onClick={() => handleEditUserRoleDialog({ id, email, name: '', role: { name: '' } })}>
            <EditIcon color='primary' />
        </IconButton>
    )

    return (
        <div>
            <PageTitle title='Administración de usuarios' hasBack />
            <EditUserRoleDialog onClose={handleCloseEditUserRoleDialog} open={confirmEditUserRoleOpen} idToShow={focusedItem?.id} email={focusedItem?.email} />
            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <div className="p-4" >
                        <LoadingIndicator show={isFetchingUsers || isMutating} >
                            <div style={{ height: 510, width: '100%' }}>
                                <DataGrid
                                    rows={usersData || []}
                                    columns={columns || []}
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    pageSize={7}
                                />
                            </div>
                        </LoadingIndicator>
                    </div>
                </div>
                {/*                 <div className="hidden lg:flex lg:flex-col p-4 lg:w-1/3 xl:w-1/4 shadow-2xl rounded-3xl bg-gray-100  mr-10">
                    <div className="text-xl my-8 flex justify-between" >
                        <div>
                            Mis datos
                        </div>
                        <div className="cursor-pointer" >
                            <EditIcon onClick={() => console.log('adios')} />
                        </div>
                    </div>
                    <div className="my-2">
                        <TextField variant="standard" disabled={!editEnabled} label='Nombre' value={sessionData?.user.name || 'Chau'} InputProps={{ disableUnderline: !editEnabled }} />
                    </div>
                    <div className="my-2">
                        <TextField variant="standard" disabled label='Correo' value={sessionData?.user.email || 'Hola'} InputProps={{ disableUnderline: true }} />
                    </div>
                    <div className="my-10 flex justify-center">
                        <div className="rounded-full flex items-center hover:opacity-25 transition-all duration-300" >
                            <Image src={sessionData?.user?.image || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'} alt="" width={128} height={128} className="rounded-full hover:b" />
                        </div>
                    </div>
                </div> */}
                <div className="flex flex-col  md:hidden w-full" >
                    <div className='bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 p-4 my-4'>
                        <div className="text-xl font-bold" >
                            <div>
                                Mis pedidos
                            </div>
                        </div>
                        <div>
                            detalles de pedidos abiertos aca...
                        </div>
                    </div>

                    <div className='bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 p-4'>
                        <div className="flex flex-row flex-wrap items-center justify-start mt-2" >
                            <ActionButton Icon={AddIcon} label="Nueva Cotizacion" href='/fichaTecnicaNueva' />
                            <ActionButton Icon={ManageAccountsIcon} label="Editar mi Perfil" href='/fichaTecnicaNueva' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UsuariosDashboard
