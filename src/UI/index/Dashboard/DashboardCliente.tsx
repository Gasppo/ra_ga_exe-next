import React, { useState } from 'react'
import BasicTable from '../../../utils/Examples/BasicTable'
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


const DashboardCliente = () => {

    const [editEnabled, setEditEnabled] = useState(false)
    const { data } = useSession()

    const handleEnableEdit = () => {
        setEditEnabled(prev => !prev)
    }

    return (
        <div className="md:mt-9 flex justify-center md:justify-evenly md:mx-10 lg:mx-0">
            <div className="hidden md:flex flex-col p-4 md:w-full lg:w-2/3 xl:w-3/4 shadow-2xl rounded-3xl bg-gray-100 mx-10">
                <div className="text-xl my-8" >
                    <div>
                        Mis pedidos
                    </div>

                </div>
                <div>
                    <BasicTable />
                </div>
            </div>
            <div className="hidden lg:flex lg:flex-col p-4 lg:w-1/3 xl:w-1/4 shadow-2xl rounded-3xl bg-gray-100  mr-10">
                <div className="text-xl my-8 flex justify-between" >
                    <div>
                        Mis datos
                    </div>
                    <div className="cursor-pointer" >
                        <EditIcon onClick={handleEnableEdit} />
                    </div>
                </div>
                <div className="my-2">
                    <TextField variant="standard" disabled={!editEnabled} label='Nombre' value={data.user.name} InputProps={{ disableUnderline: !editEnabled }} />
                </div>
                <div className="my-2">
                    <TextField variant="standard" disabled label='Correo' value={data.user.email} InputProps={{ disableUnderline: true }} />
                </div>
                <div className="my-10 flex justify-center">
                    <div className="rounded-full flex items-center hover:opacity-25 transition-all duration-300" >
                        <Image src={data?.user?.image || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'} alt="" width={128} height={128} className="rounded-full hover:b" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCliente
