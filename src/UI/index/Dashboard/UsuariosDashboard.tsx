import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button, IconButton, Link } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Signin from '@UI/Generic/Signin/Signin';
import Signup from '@UI/Generic/Signup/Signup';
import EditUserAvailabilityDialog from '@UI/user/reset/EditUserAvaiabilityData';
import EditUserRoleDialog from '@UI/user/reset/EditUserRoleDialog';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { errorHandle } from '@utils/queries/cotizador';
import { signOut, useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { useIsMutating, useQuery, useQueryClient } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import ActionButton from './ActionButton';
import LaunchIcon from '@mui/icons-material/Launch';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const UsuariosDashboard = () => {

    const { data: sessionData } = useSession()
    const queryClient = useQueryClient()
    const isMutating = !!useIsMutating()
    const [confirmEditUserRoleOpen, setConfirmEditUserRoleOpen] = useState(false)
    const [confirmEditUserAvailabilityOpen, setConfirmEditUserAvailabilityOpen] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [focusedItem, setFocusedItem] = useState<ReducedUser>({ id: '', name: '', email: '', role: { name: '' }, available: false })

    const { addError } = useContext(ErrorHandlerContext);

    const handleCloseSignIn = () => {
        setOpenSignIn(false)
    }

    const handleCloseSignUp = () => {
        setOpenSignUp(false)
        queryClient.invalidateQueries(['usuarios'])
    }

    const handleOpenSignIn = async () => {
        handleCloseSignUp()
        await signOut()
    }

    const handleOpenSignUp = () => {
        handleCloseSignIn()
        setOpenSignUp(true)
    }

    const handleCloseEditUserRoleDialog = () => {
        setConfirmEditUserRoleOpen(false)
        queryClient.invalidateQueries(['usuarios'])
    }

    const handleEditUserRoleDialog = (data: ReducedUser) => {
        setFocusedItem(data)
        setConfirmEditUserRoleOpen(true)
    }

    const handleCloseEditUserAvailabilityDialog = () => {
        setConfirmEditUserAvailabilityOpen(false)
        queryClient.invalidateQueries(['usuarios'])
    }

    const handleEditUserAvailabilityDialog = (data: ReducedUser) => {
        setFocusedItem(data)
        setConfirmEditUserAvailabilityOpen(true)
    }

    interface ReducedUser {
        id: string;
        name: string,
        email: string,
        role: {
            name: string
        },
        available: boolean
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
        {
            field: '', headerName: '', flex: 1, maxWidth: 75, align: "center", disableColumnMenu: true, headerAlign: "center", filterable: false, sortable: false, renderCell: (params) =>
                <Link href={`/user/${params.row.id}`}><LaunchIcon /></Link>
        },
        { field: 'name', headerName: 'Nombre', minWidth: 200, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
        { field: 'role', headerName: 'Rol', maxWidth: 110, valueGetter: (params) => params.row.role.name },
        {
            field: 'switchPermissions', headerName: '', maxWidth: 80, align: 'center', headerAlign: 'center', disableColumnMenu: true, renderCell: (params) => EditRoleButton(params.row.id, params.row.email)
        },
        {
            field: 'available', headerName: 'Habilitada', minWidth: 110, headerAlign: 'center', align: 'center', renderCell: (params) =>
                params.row.available ? <CheckIcon style={{ color: '#2E7D32' }} /> : <CloseIcon style={{ color: '#C62828' }} />
        },
        {
            field: 'switchAvailable', headerName: '', disableColumnMenu: true, align: 'center', sortable: false, maxWidth: 80, renderCell: (params) => EditAvailableButton(params.row.id, params.row.email)
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const EditRoleButton = (id: string, email: string) => (
        <IconButton type="button" onClick={() => handleEditUserRoleDialog({ id, email, name: '', role: { name: '' }, available: false })}>
            <SupervisedUserCircleIcon color='primary' />
        </IconButton>
    )

    const EditAvailableButton = (id: string, email: string) => (
        <IconButton type="button" onClick={() => handleEditUserAvailabilityDialog({ id, email, name: '', role: { name: '' }, available: false })}>
            <PublishedWithChangesIcon color='primary' />
        </IconButton>
    )

    return (
        <div>
            <PageTitle title='Administración de usuarios' hasBack />
            <EditUserRoleDialog onClose={handleCloseEditUserRoleDialog} open={confirmEditUserRoleOpen} idToShow={focusedItem?.id} email={focusedItem?.email} />
            <EditUserAvailabilityDialog onClose={handleCloseEditUserAvailabilityDialog} open={confirmEditUserAvailabilityOpen} idToShow={focusedItem?.id} email={focusedItem?.email} />
            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <div className='flex flex-col justify-end items-end pr-4'>
                        <Button variant="outlined" startIcon={<PersonAddAltIcon />} onClick={handleOpenSignUp} >
                            Registrar nuevo usuario
                        </Button>
                    </div>
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
                    {openSignUp && <Signup open={openSignUp} onClose={handleCloseSignUp} onSignin={handleOpenSignIn} adminCreation={true} />}
                    {openSignIn && <Signin open={openSignIn} onClose={handleCloseSignIn} />}
                </div>
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
