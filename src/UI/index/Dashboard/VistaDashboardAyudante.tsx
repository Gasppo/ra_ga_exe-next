import { DataGrid, GridColumns, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import { ExtendedOrdenData } from '@utils/Examples/ExtendedOrdenData';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { fetchAllOrders } from "@utils/queries/order";
import { useContext } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../Generic/Utils/PageTitle';
import MobileOrderDashboard from './MobileOrderDashboard';

interface props {
    emailToFetchOrders,
    columns: GridColumns<ExtendedOrdenData>,
}

const VistaDashboardAyudante = (props: props) => {

    const { addError } = useContext(ErrorHandlerContext);

    const { data: allOrdersData, isLoading: isFetchingAllOrders } = useQuery(['allOrdenes'], () => fetchAllOrders(), {
        onError: () => addError('Error al traer ordenes')
    })

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <div className="md:mt-4 flex flex-col md:mx-10 lg:mx-0">

                <div className="flex justify-between">
                    <PageTitle title="Administrar ordenes" hasBack={false} />
                </div>

            </div>

            <div className="hidden md:flex flex-col p-4 shadow-2xl rounded-3xl bg-gray-100 mx-10 mt-10">
                <LoadingIndicator show={isFetchingAllOrders}>
                    <div className="w-full h-[510px] p-4">
                        <DataGrid
                            rows={allOrdersData || []}
                            columns={props.columns || []}
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

            <MobileOrderDashboard isFetchingOrders={isFetchingAllOrders} orderData={allOrdersData} />

        </>
    )
}

export default VistaDashboardAyudante
