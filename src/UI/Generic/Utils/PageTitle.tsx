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
            <h1 className={`${size === 'small' ?
                'text-xl md:text-[1.5rem]' :
                size === 'medium' ?
                    'text-xl md:text-[4rem]  md:ml-7' :
                    'text-5xl md:text-[4rem]  md:ml-7'
                } leading-normal font-extrabold text-gray-700`} >
                {title}
            </h1>
            {hasBack && <div className='leading-normal font-extralight italic'>
                <Link href='/'>
                    Volver al inicio
                </Link>
            </div>}
        </div>
    )
}

export default PageTitle
