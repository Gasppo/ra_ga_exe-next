import { OrderCreationData } from '@backend/schemas/OrderCreationSchema'
import { Button } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface FichaTecnicaControlsProps {
    onBack: () => void;
    onForward: () => void;
    currStep: number
    numberSteps: number
}

const FichaTecnicaControls = (props: FichaTecnicaControlsProps) => {


    const { currStep, onBack, onForward, numberSteps } = props

    const formContext = useFormContext<OrderCreationData>()

    const disableContinueSeleccionPrenda = !formContext.watch('tipoPrenda.name')

    const backDisabled = currStep <= 0
    const continueDisabled = currStep === numberSteps - 1 || (disableContinueSeleccionPrenda /*|| disableContinueProduction*/)

    return (
        <>
            <div className="mx-4" >
                <Button variant="outlined" disabled={backDisabled} type="button" onClick={onBack}>Atrás</Button>
            </div>
            {currStep !== 4 && <div className="mx-4" >
                <Button variant="outlined" disabled={continueDisabled} type="button" onClick={onForward}>Continuar</Button>
            </div>}
            {currStep === 4 && <div className="mx-4 md:flex" >
                <Button variant="outlined" disabled={false} type="submit">Submit </Button>
            </div>}
            <div className="mx-4" />
        </>
    )
}

export default FichaTecnicaControls
