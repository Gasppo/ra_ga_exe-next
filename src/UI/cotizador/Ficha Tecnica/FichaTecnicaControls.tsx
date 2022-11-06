import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import { Button } from '@mui/material';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import DotsMobileStepper from '../MobileStepper';

interface FichaTecnicaControlsProps {
    onBack: () => void;
    onForward: () => void;
    currStep: number
    numberSteps: number
}

const FichaTecnicaControls = (props: FichaTecnicaControlsProps) => {


    const { currStep, onBack, onForward, numberSteps } = props

    const formContext = useFormContext<OrderCreationData>()
    const data = formContext.watch()
    const backDisabled = currStep <= 0

    const isInvalid = (stepNumer: number, data: OrderCreationData) => {
        switch (stepNumer) {
            case 0:
                return !data.nombreProducto || !data.tipoPrenda.name || !data.complejidad || !data.atributosPrenda.material.observaciones
            case 1:
                return false
            case 2:
                return !data.atributosPrenda.genero.observaciones || !data.cantidad 
            case 3:
                return false
            default:
                return false
        }
    }

    const continueDisabled = useMemo(() => currStep === numberSteps - 1 || isInvalid(currStep, data), [currStep, numberSteps, data])

    return (
        <>
            <div className='hidden md:flex'>
                <div className="mx-4 " >
                    <Button variant="outlined" disabled={backDisabled} type="button" onClick={onBack}>Atrás</Button>
                </div>
                {currStep !== 4 && <div className="mx-4" >
                    <Button variant="outlined" disabled={continueDisabled} type="button" onClick={onForward}>Continuar</Button>
                </div>}
                {currStep === 4 && <div className="mx-4 md:flex" >
                    <Button variant="outlined" disabled={false} type="submit">Generar orden</Button>
                </div>}
                <div className="mx-4" />
            </div>
            <div className='flex md:hidden w-full'>
                <DotsMobileStepper {...props} />
                {currStep === (numberSteps - 1) && <Button size="small" type="submit">
                    Generar orden
                </Button>}
            </div>
        </>
    )
}

export default FichaTecnicaControls
