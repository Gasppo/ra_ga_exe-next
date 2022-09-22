import Link from 'next/link'
import React from 'react'

interface PageTitleProps {
    title: string
    hasBack?: boolean
    size?: 'small' | 'medium' | 'large'
}

const PageTitle = ({ title, hasBack, size }: PageTitleProps) => {
    return (
        <div>
            <h1 className={`${size === 'small' ? 'text-xl md:text-[1.5rem]' : 'text-5xl md:text-[4rem]  md:ml-7'} leading-normal font-extrabold text-gray-700`} >
                {title}
            </h1>
            {hasBack && <Link href='/' className='md:ml-7'>
                Volver al inicio
            </Link>}
        </div>
    )
}

export default PageTitle
