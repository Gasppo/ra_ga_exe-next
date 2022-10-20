import { ComplejidadConfeccion } from "@prisma/client";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getComplexity } from "@utils/queries/cotizador";
import { useContext } from "react";
import { useIsMutating, useQuery } from "react-query";


const ComplexitiesTab = () => {
    const { addError } = useContext(ErrorHandlerContext)

    const isMutating = !!useIsMutating()
    const { data: complexityData, isFetching: isFetchingComplexityData } = useQuery<ComplejidadConfeccion[], ErrorMessage>(['complexities'], getComplexity, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(error.error)
    });

    return (
        <LoadingIndicator show={isFetchingComplexityData || isMutating}>
            <div className="flex justify-center items-center text-4xl font-bold mt-5">
                Complejidades
            </div>
            <div className="mt-6">
                {complexityData?.map((complexity) => (
                    <div key={complexity.id} className="text-2xl flex flex-row items-center justify-center">
                        <div className='w-1/2'>- {complexity.name}</div>
                    </div>
                ))}
            </div>
        </LoadingIndicator>
    )
}

export default ComplexitiesTab