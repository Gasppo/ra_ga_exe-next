import { OrderCreationData } from '@backend/schemas/OrderCreationSchema'
import { TipoPrenda } from '@prisma/client'
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

    const fetchPrice = async (data: OrderCreationData): Promise<{ price: number }> => {
        return await fetch(`/api/order/calculate-price`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        }).then(res => res.json())
    }

    const { data } = useQuery([formData, currStep], () => currStep === 4 ? fetchPrice(formData) : ({ price: 0 }), {
        initialData: { price: 0 },
        refetchOnWindowFocus: false
    })

    return (
        <>
            <div className="hidden md:flex flex-col w-2/12 items-center justify-center">
                <div className='p-4'>
                    {image && <Image src={image} height='200px' width={'200px'} alt="Seleccione prenda.." />}
                </div>
                {currStep === 4 && <div className='mt-4'>Precio Estimado: ${data?.price?.toFixed(2) || '0.00'}</div>}
            </div>
        </>
    )
}

export default ClothingImage
