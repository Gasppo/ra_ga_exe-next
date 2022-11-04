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
        <div className='flex flex-col md:flex-row justify-between items-center'>
            {hasBack &&
                <div className='flex md:hidden mb-4'>
                    <Link href={"/"}>
                        <Button variant="outlined" startIcon={<AddHomeIcon />} >
                            Volver al Inicio
                        </Button>
                    </Link>
                </div>
            }

            <div>
                <h1 className={`${size === 'small' ?
                    'text-xl md:text-[1.5rem]' :
                    size === 'medium' ?
                        'text-xl md:text-[4rem]  md:ml-7' :
                        'text-5xl md:text-[4rem]  md:ml-7'
                    } leading-normal font-extrabold text-gray-700`} >
                    {title}
                </h1>
            </div>

            {hasBack &&
                <div className='hidden md:flex'>
                    <Link href={"/"}>
                        <Button variant="outlined" startIcon={<AddHomeIcon />} >
                            Volver al Inicio
                        </Button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default PageTitle 
