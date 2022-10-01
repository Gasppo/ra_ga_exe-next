import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { ErrorHandlerContext } from '@utils/ErrorHandler/error';
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { errorHandle } from '@utils/queries/cotizador';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useQuery } from 'react-query';
import BasicOrderTable, { ExtendedOrdenData } from '../../../utils/Examples/BasicOrderTable';
import PageTitle from '../../Generic/Utils/PageTitle';


const UsuariosDashboard = () => {

    const { data: sessionData } = useSession();
    const { addError } = React.useContext(ErrorHandlerContext);

    const fetchOrders = (): Promise<ExtendedOrdenData[]> =>
        fetch(`/api/orders/obtainAll`, {
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


    const { data: allOrderData, isLoading: isFetchingAllOrders } = useQuery(
        ['ordenes', sessionData?.user?.email],
        () => fetchOrders(), {
        onError: () => addError('Error al traer ordenes')
    })

    return (
        <div>
            <PageTitle title='Ordenes' hasBack />
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
                        <LoadingIndicator show={isFetchingAllOrders}>
                            <BasicOrderTable rows={allOrderData || []} />
                        </LoadingIndicator>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default UsuariosDashboard
