import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import { useFormContext } from 'react-hook-form';


interface DotsMobileStepperProps {
    numberSteps: number,
    currStep: number,
    onBack: () => void,
    onForward: () => void
}

export default function DotsMobileStepper(props: DotsMobileStepperProps) {

    const { currStep, onBack, onForward, numberSteps } = props

    const theme = useTheme();

    const formContext = useFormContext<OrderCreationData>()
    const data = formContext.watch()
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
        <MobileStepper
            variant="dots"
            steps={numberSteps}
            position="static"
            activeStep={currStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
                currStep !== (numberSteps - 1) ? (<Button size="small" onClick={() => { onForward() }} disabled={continueDisabled} >
                    Next
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>) :
                    <div />

            }
            backButton={
                < Button size="small" onClick={onBack} disabled={currStep === 0}>
                    {
                        theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )
                    }
                    Back
                </Button >
            }

        />
    );
}