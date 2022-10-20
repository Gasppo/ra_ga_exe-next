import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputBase, TextField } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { errorHandle } from '@utils/queries/cotizador';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import ActionButton from './ActionButton';

const UsuariosDashboard = () => {

    const { data: sessionData } = useSession()
    const editEnabled = false

    const { addError } = useContext(ErrorHandlerContext);

    interface ReducedUser {
        id: string;
        name: string,
        email: string,
        role: {
            name: string
        }
    }

    const fetchOrders = (): Promise<ReducedUser[]> =>
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


    const { data: usersData, isLoading: isFetchingUsers } = useQuery(
        ['ordenes', sessionData?.user?.email],
        () => fetchOrders(), {
        onError: () => addError('Error al traer ordenes')
    })

    const updateUserRole = (id: string): Promise<string> => {
        return fetch(`/api/user/updateRole`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({ id })
        })
            .then((res) => (res.ok ? res.json() : errorHandle(res)))
            .catch((error) => {
                console.log("Broke here");
                throw error;
            });
    }


    const columns: GridColumns = [
        { field: 'name', headerName: 'Nombre', minWidth: 250, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
        { field: 'role', headerName: 'Rol', minWidth: 150, valueGetter: (params) => params.row.role.name, flex: 1 },
        {
            field: 'switchPermissions', headerName: 'Cambiar permisos', minWidth: 150, renderCell: (params) => (
                <Button onClick={() =>
                    confirm('Desea modificar el rol al usuario?') ? updateUserRole(params.row.id) : ''}><CachedIcon /></Button>)
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }


    return (
        <div>
            <PageTitle title='Usuarios' hasBack />
            <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
                <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                    <div className="text-xl my-8 flex flex-row justify-between" >
                        <div className='border-gray-400 border-2 rounded-xl w-2/3 p-2 flex items-center shadow-md'>
                            <SearchIcon className='w-1/12' />
                            <div className='ml-2 w-8/12'>
                                <InputBase placeholder="Busqueda por # orden, prenda..." className='w-full' />
                            </div>
                        </div>
                        <div className='flex justify-end items-center w-1/12 mr-1'>
                            <DownloadIcon fontSize='large' />
                        </div>
                    </div>
                    <div>
                        <LoadingIndicator show={isFetchingUsers} >
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
                <div className="hidden lg:flex lg:flex-col p-4 lg:w-1/3 xl:w-1/4 shadow-2xl rounded-3xl bg-gray-100  mr-10">
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
