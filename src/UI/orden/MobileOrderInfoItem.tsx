import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface MobileOrderInfoItemProps {
    orden: ExtendedOrdenData
}

const MobileOrderInfoItem = ({ orden }: MobileOrderInfoItemProps) => {
    const date = new Date(orden.updatedAt)
    
    return (
        <Link href={'/orden/' + orden.id}>
            <div className="mx-4 my-2 flex flex-row active:bg-gray-100">
                <div id="picture" className='flex '>
                    <Image src={orden?.prenda?.tipo?.picture || ''} width="80px" height="80px" alt="Seleccione prenda.." />
                </div>
                <div className="flex flex-col text-sm justify-evenly ml-4">
                    <div>
                        Producto: {orden.nombre}
                    </div>
                    <div>
                        Estado:  {orden.estado.nombre}
                    </div>
                    <div>
                        Ultima Modificacion: {date.toLocaleDateString('es-AR')}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MobileOrderInfoItem
