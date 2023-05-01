import PeopleIcon from '@mui/icons-material/People';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PageTitle from '../../Generic/Utils/PageTitle';
import LinkCard from './LinkCard';

const DashboardAdmin = () => {

    const sections = [
        { title: 'Ordenes', description: 'Acceso a ordenes de clientes', Icon: ReceiptIcon, href: '/ordenes' },
        { title: 'Usuarios', description: 'Acceso a manejo de usuarios', Icon: PeopleIcon, href: '/usuarios' },
        { title: 'Precios base', description: 'Modificación precios base', Icon: PriceChangeIcon, href: '/preciosBase' },
    ]

    return (
        <div className="md:mt-4 flex flex-col md:mx-10 lg:mx-0">
            <PageTitle title='Panel Administrador' />
            <div className={`flex flex-col justify-evenly transition-all duration-200 md:mt-32`} >
                <div className="flex flex-wrap my-8 -m-4 justify-evenly" >
                    {sections.map((section, i) => <LinkCard customSize='w-60 h-80 md:w-80 md:h-80 m-2' {...section} key={i} />)}
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin
