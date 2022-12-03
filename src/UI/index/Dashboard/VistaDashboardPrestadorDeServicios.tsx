import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { fetchAllOrders } from "@utils/queries/order";
import { useContext } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import MobileOrderDashboard from './MobileOrderDashboard';



const VistaDashboardPrestadorDeServicios = () => {

    const { addError } = useContext(ErrorHandlerContext);

    const { data: allOrdersData, isLoading: isFetchingAllOrders } = useQuery(['allOrdenes'], () => fetchAllOrders(), {
        onError: () => addError('Error al traer ordenes')
    })


    return (
        <>
            <div className="md:mt-4 flex flex-col md:mx-10 lg:mx-0">

                <div className="flex justify-between">
                    <PageTitle title="Mis trabajos" hasBack={false} />
                </div>

            </div>

            <div className='flex m-auto'> Aca viene un listado de los servicios que tiene asociado el proveedor de servicios </div>

            <MobileOrderDashboard isFetchingOrders={isFetchingAllOrders} orderData={allOrdersData} />

        </>
    )
}

export default VistaDashboardPrestadorDeServicios
