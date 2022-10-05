import { OrderCreationData } from '@backend/schemas/OrderCreationSchema'
import { Prenda } from '@prisma/client'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

interface ClothingImageProps {
    clothesData: Prenda[]
}

const ClothingImage = ({ clothesData }: ClothingImageProps) => {

    const formContext = useFormContext<OrderCreationData>()

    const clothesName = formContext.watch('tipoPrenda.name')

    const image = useMemo(() => clothesData?.find(el => el.name === clothesName), [clothesData, clothesName])?.picture


    return (
        <div className="hidden md:flex w-2/12 justify-center place-content-center relative">
            {image && <Image src={image} layout="fill" objectFit="contain" alt="Seleccione prenda.." />}
        </div>
    )
}

export default ClothingImage
