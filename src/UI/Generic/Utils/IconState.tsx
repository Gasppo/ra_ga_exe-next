import { Fade, Paper, Popper, PopperPlacementType, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface IconStateProps {
    icon: string
    alt: string
    state: string
}

const IconBorders = (estado: string) => {
    switch (estado) {
        case "pedido":
            return "border-yellow-500";
        case "traido por cliente":
            return "border-violet-500";
        case "no pedido":
            return "border-gray-500";
        case "iniciado":
            return "border-orange-500";
        case "en proceso":
            return "border-yellow-500";
        case "terminado":
            return "border-green-500";
        case "en pausa":
            return "border-teal-500";
        case "cancelado":
            return "border-red-500";
    }
}

const IconState = (props: IconStateProps) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);

                setTimeout(() => {
                    setOpen(false);
                }, 3000);
            };


    return (
        <>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition keepMounted={false} >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={550}>
                        <Paper className="rounded-full bg-slate-200">
                            <Typography sx={{ p: 2 }}>{props.alt}: {props.state}</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>

            <div className={`flex items-center justify-center border-b-4 m-1 h-full  ${IconBorders(props.state)} `} onClick={() => handleClick("bottom")}>
                <Image src={props.icon} width={30} height={30} alt={props.alt} />
            </div>
        </>
    )
}

export default IconState
