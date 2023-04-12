import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import IconState from "@UI/Generic/Utils/IconState";
import { ayudanteRole, clienteRole, prestadorDeServiciosRole } from "@utils/roles/SiteRoles";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ExtendedOrdenData } from "../../../utils/Examples/ExtendedOrdenData";
import VistaDashboardAyudante from "./VistaDashboardAyudante";
import VistaDashboardCliente from "./VistaDashboardCliente";
import VistaDashboardPrestadorDeServicios from './VistaDashboardPrestadorDeServicios';
type Props = {
    roleName: string
}

const DashboardNoAdmin = ({ roleName }: Props) => {

    const { data: sessionData } = useSession();

    const emailToFetchOrders = useMemo(() => {
        if (roleName === clienteRole || roleName === prestadorDeServiciosRole) {
            return { email: sessionData?.user?.email };
        }
        return '';
    }, [roleName, sessionData]);


    const orderColumns = useMemo((): GridColumns<ExtendedOrdenData> => ([
        { field: 'nombre', headerName: 'Nombre', maxWidth: 180, minWidth: 100, flex: 1 },
        { field: 'id', headerName: 'Orden', maxWidth: 200, minWidth: 100, flex: 1 },
        { field: 'createdAt', headerName: 'Fecha', flex: 1, maxWidth: 100, align: "center", headerAlign: "center", valueFormatter: (params) => params.value.slice(0, 10) },
        {
            field: 'procesos', headerName: 'Diseño', flex: 1, disableColumnMenu: true, filterable: false, sortable: false, renderCell: (params) =>
                <>
                    {params.row?.procesos?.map(proceso =>
                        proceso.estado === 'No Pedido' ?
                            <button disabled={true} className={'opacity-30'}>
                                <IconState key={proceso.proceso} state={proceso.estado} alt={proceso.proceso} icon={proceso.icon} />
                            </button> :
                            <IconState key={proceso.proceso} state={proceso.estado} alt={proceso.proceso} icon={proceso.icon} />
                    )}
                </>
        },
        { field: 'link', headerName: 'Ver', maxWidth: 75, disableColumnMenu: true, filterable: false, sortable: false, renderCell: (params) => <Link href={`/orden/${params.row.id}`}><LaunchIcon /></Link>, minWidth: 75, flex: 1 }
    ]), []);

    return (
        <div>

            {sessionData?.user && roleName === clienteRole && <VistaDashboardCliente columns={orderColumns} emailToFetchOrders={emailToFetchOrders} />}
            {sessionData?.user && roleName === ayudanteRole && <VistaDashboardAyudante columns={orderColumns} emailToFetchOrders={emailToFetchOrders} />}
            {sessionData?.user && roleName === prestadorDeServiciosRole && <VistaDashboardPrestadorDeServicios emailToFetchOrders={emailToFetchOrders} />}

        </div>

    );
};

export default DashboardNoAdmin;


