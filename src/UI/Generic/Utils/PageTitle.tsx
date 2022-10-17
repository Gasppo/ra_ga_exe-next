import { Button } from '@mui/material'
import AddHomeIcon from '@mui/icons-material/AddHome';
import Link from 'next/link'
import React from 'react'

interface PageTitleProps {
    title: string
    hasBack?: boolean
    size?: 'small' | 'medium' | 'large'
}

const PageTitle = ({ title, hasBack, size }: PageTitleProps) => {
    return (
        <div className='flex justify-between'>
            <h1 className={`${size === 'small' ?
                'text-xl md:text-[1.5rem]' :
                size === 'medium' ?
                    'text-xl md:text-[4rem]  md:ml-7' :
                    'text-5xl md:text-[4rem]  md:ml-7'
                } leading-normal font-extrabold text-gray-700`} >
                {title}
            </h1>
            {hasBack &&
                <Link href={"/"}>
                    <Button variant="outlined" startIcon={<AddHomeIcon />} className="font-extrabold text-gray-700 border-gray-600 border-2 rounded-lg my-8">
                        Volver al Inicio
                    </Button>
                </Link>}
        </div>
    )
}

export default PageTitle
