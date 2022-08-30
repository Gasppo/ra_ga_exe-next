import { Step, StepLabel, Stepper, Typography } from "@mui/material";

const PriceCheckerSteps = ({ step, steps, price, isStepOptional }) => {
    return (
        <div className="flex flex-row mt-10 justify-between">
            <div className="hidden md:flex md:displ md:pr-4 md:ml-10 md:w-4/5 items-center justify-start">
                <Stepper activeStep={step} orientation='horizontal' alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">(Optional)</Typography>
                            );
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            <div className="ml-4 text-5xl md:text-[2rem]" >
                ${price}
            </div>
            <div className="w-0" />
        </div>
    )
}

export default PriceCheckerSteps
