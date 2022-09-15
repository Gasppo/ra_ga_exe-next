import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Link from 'next/link'
import React from 'react'

interface ActionButtonProps {
    Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">>
    label: string,
    href: string
}

const ActionButton = ({ Icon, label, href }: ActionButtonProps) => {
    return (
        <div className="flex flex-col items-center w-1/5 mx-2 mb-4"  >
            <Link href={href}>
                <a className="active:bg-gray-100 rounded-full">
                    <div className="rounded-full bg-white text-gray-500 shadow-2xl shadow-gray-400 border-2 border-gray-100  text-5xl flex items-center active:bg-gray-100" >
                        <Icon fontSize='inherit' className="m-2" />
                    </div>
                </a>
            </Link>
            <p className="text-xs text-gray-500 mt-1 text-center" >{label}</p>
        </div>
    )
}

export default ActionButton
