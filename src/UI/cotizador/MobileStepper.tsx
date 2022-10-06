import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


interface DotsMobileStepperProps {
    numberSteps: number,
    currStep: number,
    onBack: () => void,
    onForward: () => void
}

export default function DotsMobileStepper(props: DotsMobileStepperProps) {

    const { currStep, onBack, onForward, numberSteps } = props

    const theme = useTheme();

    return (
        <MobileStepper
            variant="dots"
            steps={numberSteps}
            position="static"
            activeStep={currStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
                currStep !== (numberSteps - 1) ? (<Button size="small" onClick={() => { console.log('click'); onForward() }}  >
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