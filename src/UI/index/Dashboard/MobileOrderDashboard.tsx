import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from '@mui/material';
import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import LoadingIndicator from "@utils/LoadingIndicator/LoadingIndicator";
import { useMemo } from "react";
import ActionButton from './ActionButton';
import LaunchIcon from '@mui/icons-material/Launch';

interface mobileOrderDashboardProps {
    orderData: ExtendedOrdenData[],
    isFetchingOrders: boolean,
    userId: string,
}

const MobileOrderDashboard = (props: mobileOrderDashboardProps) => {

    const clienteColumns = useMemo((): GridColumns<ExtendedOrdenData> => ([
        { field: 'link', headerName: 'Ver', maxWidth: 50, disableColumnMenu: true, filterable: false, sortable: false, renderCell: (params) => <Link href={`/orden/${params.row.id}`}><LaunchIcon /></Link>, },
        { field: 'nombre', headerName: 'Nombre', maxWidth: 180, minWidth: 100 },
        { field: 'id', headerName: 'Orden', minWidth: 200 },
    ]), []);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <div className="flex flex-col  md:hidden w-full">

            <div className=" bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 p-4">
                <div className="flex flex-row flex-wrap items-center justify-start mt-2">
                    <ActionButton
                        Icon={AddIcon}
                        label="Nuevo Producto"
                        href="/fichaTecnicaForm"
                    />
                    <ActionButton
                        Icon={ManageAccountsIcon}
                        label="Editar mi Perfil"
                        href={"/user/" + props.userId}
                    />
                </div>
            </div>

            <div className="bg-white border-2 border-gray-100 w-full rounded-md shadow-lg shadow-gray-400 my-4">
                <div className="md:hidden flex flex-col shadow-2xl rounded-3xl bg-gray-100">
                    <LoadingIndicator show={props?.isFetchingOrders}>
                        <div className="w-full h-[510px]">
                            <DataGrid
                                rows={props?.orderData || []}
                                columns={clienteColumns || []}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                                autoPageSize
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            id: true
                                        }
                                    }
                                }}
                            />
                        </div>
                    </LoadingIndicator>
                </div>
            </div>

        </div>
    )
}

export default MobileOrderDashboard
