import React, { useContext } from 'react'
import { ErrorHandlerContext } from '../../../utils/ErrorHandler/error'



const DashboardAdmin = () => {

    const errorContext = useContext(ErrorHandlerContext)

    return (
        <div className="md:mt-9 flex flex-col items-center justify-center md:mx-10 lg:mx-0">
            <div>
                <h1 className="text-xl md:text-[2rem] leading-normal font-extrabold text-gray-700">
                    SOS ADMIN!
                </h1>
            </div>
            <div>
                <h1 className="text-5xl md:text-[1rem] leading-normal  text-gray-700" onClick={() => {
                    errorContext.addError('Error Prueba #1')
                    errorContext.addError('Nuevo Prueba #2')
                    errorContext.addError('Nuevo Prueba #3')
                    }}>
                    goddddd
                </h1>
            </div>
        </div>
    )
}

export default DashboardAdmin
