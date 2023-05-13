import { OrderCreationData } from '@backend/schemas/OrderCreationSchema'
import { TipoPrenda } from '@prisma/client'
import { fetchPrice } from '@utils/queries/cotizador'
import Image from 'next/image'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'

interface ClothingImageProps {
    clothesData: TipoPrenda[]
    currStep: number
}

const ClothingImage = ({ clothesData, currStep }: ClothingImageProps) => {

    const formContext = useFormContext<OrderCreationData>()

    const clothesName = formContext.watch('tipoPrenda.name')
    const formData = formContext.watch()
    const image = useMemo(() => clothesData?.find(el => el.name === clothesName), [clothesData, clothesName])?.picture

    const { data } = useQuery([formData, currStep], () => currStep === 4 ? fetchPrice(formData) : null, { refetchOnWindowFocus: false })

    return (
        <>
            <div className="hidden md:flex flex-col w-2/12 items-center justify-center">
                <div className='p-4'>
                    {image && <Image src={image} height={200} width={200} alt="Seleccione prenda.." />}
                </div>
                {currStep === 4 && <div className='flex flex-col space-y-2'>
                    <div className="flex flex-col list-disc" >
                        {data?.preciosIndividuales?.map(el =>
                            <>
                                <li className="text-xs mt-1" key={el.servicio}> {el.servicio}: </li>
                                <div className="text-xs">${el.precioTotal?.toFixed(0)}</div>
                            </>
                        )}
                        <li className="text-xs font-bold mt-1">Terminaciones y otros procesos se cotizan durante el desarrollo</li>
                    </div>
                    <div className='mt-4 text-sm font-extrabold'>Precio total estimado: ${data?.price?.toFixed(0) || '0.00'}</div>
                </div>}
            </div>
        </>
    )
}

export default ClothingImage
