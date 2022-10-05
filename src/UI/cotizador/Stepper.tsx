import { Step, StepLabel, Stepper, Typography } from "@mui/material";


interface PriceCheckerStepsProps {
    step: number
    steps: string[]
    price: number
    isStepOptional: (index: number) => boolean
    orientation?: 'horizontal' | 'vertical'
}

const PriceCheckerSteps = (props: PriceCheckerStepsProps) => {

    const { step, steps, isStepOptional, orientation = 'horizontal' } = props

    return (
        <div className="flex flex-col md:flex-row mt-10 items-center md:justify-between">
            <div className=" md:flex md:displ md:pr-4 md:ml-10 md:w-4/5">
                <Stepper activeStep={step} orientation={orientation} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepOptional(index)) labelProps.optional = <Typography variant="caption">(Optional)</Typography>
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            <div className="w-0" />
        </div>
    )
}

export default PriceCheckerSteps
