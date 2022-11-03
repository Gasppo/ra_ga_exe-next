import React from 'react'


const Footer = () => {
    return (
        <div className='flex flex-row justify-between items-center w-full  m-0 transition-all duration-200 px-10 py-4 mt-10 bg-zinc-800' >
            <div className='text-white hidden md:flex'>
                <p>Servicios para el desarrollo y fabricación de indumentaria y productos textiles</p>
            </div>
            <div className='flex flex-row items-center text-white text-xs'>
                <div>
                    Desarrollado por:
                </div>
                <div className="flex flex-col md:flex-row" >
                    <div className="ml-4 mb-2 md:mb-0 underline" >
                        <a href={"https://github.com/RamaOnate"} target="_blank" rel="noreferrer">{"@RamaOnate"}</a>
                    </div>
                    <div className="ml-4 mb-2 md:mb-0 underline" >
                        <a href={"https://github.com/Gasppo"} target="_blank" rel="noreferrer">{"@Gasppo"}</a>
                    </div>
                    <div className="ml-4 mb-2 md:mb-0 underline" >
                        <a href={"https://github.com/tutividela"} target="_blank" rel="noreferrer">{"@TutiVidela"}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
