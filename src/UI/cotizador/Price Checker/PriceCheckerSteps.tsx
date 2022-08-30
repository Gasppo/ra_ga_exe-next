import { Step, StepLabel, Stepper, Typography } from "@mui/material";


interface PriceCheckerStepsProps {
    step: number
    steps: string[]
    price: number
    isStepOptional: (index: number) => boolean
}

const PriceCheckerSteps = (props: PriceCheckerStepsProps) => {

    const { step, steps, price, isStepOptional } = props

    return (
        <div className="flex flex-row mt-10 justify-between">
            <div className="hidden md:flex md:displ md:pr-4 md:ml-10 md:w-4/5 items-center justify-start">
                <Stepper activeStep={step} orientation='horizontal' alternativeLabel>
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
            <div className="ml-4 text-2xl md:text-[2rem]" >
                ${price}
            </div>
            <div className="w-0" />
        </div>
    )
}

export default PriceCheckerSteps
