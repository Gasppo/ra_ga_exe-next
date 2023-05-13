import React from 'react'


const Footer = () => {
    return (
        <div className='flex flex-row justify-between items-center w-full  m-0 transition-all duration-200 px-10 py-4 mt-10 bg-zinc-800' >
            <div className='text-white hidden md:flex'>
                <p>Servicios para el desarrollo y fabricación de indumentaria y productos textiles</p>
            </div>
            <div className='flex flex-row items-center text-white text-xs'>
                <div>
                    HS - Soluciones Textiles
                </div>
            </div>
        </div>
    )
}

export default Footer
