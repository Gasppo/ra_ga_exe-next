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
                    {image && <Image src={image} height='200px' width={'200px'} alt="Seleccione prenda.." />}
                </div>
                {currStep === 4 && <div className='flex flex-col space-y-2'>
                    <div className='mt-4'>Precio Estimado: ${data?.price?.toFixed(0) || '0.00'}</div>
                    <div className="flex flex-col list-disc" >
                        {data?.preciosIndividuales?.map(el => <li className="text-xs" key={el.servicio}> {el.servicio}: ${el.precioTotal?.toFixed(0)} </li>)}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default ClothingImage
