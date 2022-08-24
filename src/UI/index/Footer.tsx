import React from 'react'


const Footer = () => {
    return (
        <div className='flex justify-between items-center w-full  m-0 transition-all duration-200 text-slate-800 px-10 py-4 mt-10' >
            <div className='flex flex-row items-center'>
                <div>
                    Desarrollado por:
                </div>
                <div className="ml-4 underline" >
                    <a href={"https://github.com/RamaOnate"} target="_blank" rel="noreferrer">{"@RamaOnate"}</a>
                </div>
                <div className="ml-4 underline" >
                    <a href={"https://github.com/Gasppo"} target="_blank" rel="noreferrer">{"@Gasppo"}</a>
                </div>
                <div className="ml-4 underline" >
                    <a href={"https://github.com/tutividela"} target="_blank" rel="noreferrer">{"@TutiVidela"}</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
