import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Divider } from '@mui/material';
import MobileOrderInfoItem from '@UI/orden/MobileOrderInfoItem';
import MobileOrderInfoSkeleton from '@UI/orden/MobileOrderInfoSkeleton';
import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import ActionButton from './ActionButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface mobileOrderDashboardProps {
    orderData: ExtendedOrdenData[],
    isFetchingOrders: boolean,
    userId: string,
}

const MobileOrderDashboard = (props: mobileOrderDashboardProps) => {

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
                <div className="text-xl font-bold m-4">
                    <div>Mis Ordenes</div>
                </div>
                <Divider />
                <div className="flex flex-col">
                    {props.isFetchingOrders ? (
                        <>
                            <MobileOrderInfoSkeleton />
                            <MobileOrderInfoSkeleton />
                            <MobileOrderInfoSkeleton />
                        </>
                    ) : props.orderData?.length > 0 ? props.orderData?.slice(0, 3).map(el => <MobileOrderInfoItem orden={el} key={el.id} />) :
                        <div className="m-4 text-xs">
                            No se registran ordenes al momento
                        </div>
                    }
                </div>
                <Divider />
                {props.orderData?.length > 0 && <div className="flex flex-row mx-4 my-2 items-center justify-between text-blue-500 font-semibold text-xs">
                    <div className="">
                        Ver todas mis ordenes
                    </div>
                    <div className="">
                        <ArrowForwardIosIcon fontSize='inherit' />
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default MobileOrderDashboard
