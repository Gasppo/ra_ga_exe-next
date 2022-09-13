import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Link } from '@mui/material';
import BasicOrderTable from '../../../utils/Examples/BasicOrderTable';

const UsuariosDashboard = () => {

    return (
        <div>
            <div>
                <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 md:ml-7">
                    Ordenes
                </h1>
                <Link href='/' className='md:ml-7'>
                    Volver al inicio
                </Link>
            </div>
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
                        <BasicOrderTable />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default UsuariosDashboard
