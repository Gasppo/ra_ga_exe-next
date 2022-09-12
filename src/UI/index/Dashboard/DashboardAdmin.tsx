import PeopleIcon from '@mui/icons-material/People';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LinkCard from './LinkCard';

const DashboardAdmin = () => {

    const sections = [
        { title: 'Ordenes', description: 'Acceso a ordenes de clientes', Icon: ReceiptIcon, href: '/usuarios' },
        { title: 'Usuarios', description: 'Acceso a manejo de usuarios', Icon: PeopleIcon, href: '/usuarios' },
        { title: 'Precios base', description: 'Acceso a la vista calendario', Icon: PriceChangeIcon, href: '/preciosBase' },
    ]

    return (
        <div className="md:mt-4 flex flex-col md:mx-10 lg:mx-0">
            <div>
                <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 md:ml-7">
                    Panel Administrador
                </h1>
            </div>
            {/* <div>
                <h1 className="text-5xl md:text-[1rem] leading-normal  text-gray-700" onClick={() => {
                    errorContext.addError('Error Prueba #1', 'error')
                    errorContext.addError('Nuevo Prueba #2', 'info')
                    errorContext.addError('Nuevo Prueba #3', 'success')
                    errorContext.addError('Nuevo Prueba #3', 'warning')
                }}>
                    goddddd
                </h1>
            </div> */}
            <div className={`flex flex-col justify-evenly transition-all duration-200 mt-32`} >
                <div className="flex flex-wrap my-8 -m-4 justify-evenly" >
                    {sections.map((section, i) => <LinkCard customSize='w-96 h-96  md:w-80 md:h-80 m-4' {...section} key={i} />)}
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin
