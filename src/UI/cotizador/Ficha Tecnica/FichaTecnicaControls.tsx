import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import { Button } from '@mui/material';
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

    const disableContinueSeleccionPrenda = !formContext.watch('tipoPrenda.name')

    const backDisabled = currStep <= 0
    const continueDisabled = currStep === numberSteps - 1 || (disableContinueSeleccionPrenda /*|| disableContinueProduction*/)

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
                    <Button variant="outlined" disabled={false} type="submit">Submit </Button>
                </div>}
                <div className="mx-4" />
            </div>
            <div className='flex md:hidden w-full'>
                <DotsMobileStepper {...props} />
                {currStep === (numberSteps - 1) && <Button size="small" type="submit">
                    Submit
                </Button>}
            </div>
        </>
    )
}

export default FichaTecnicaControls
