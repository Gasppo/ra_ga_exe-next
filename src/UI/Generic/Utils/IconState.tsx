import { Fade, Paper, Popper, PopperPlacementType, Slide, Tooltip, Typography, Zoom } from "@mui/material";
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
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    return (
        <div className="group" >
            <Tooltip open={open} onClose={handleClose} onOpen={handleOpen} title={`${props.alt}: ${props.state}`} TransitionComponent={Zoom} componentsProps={{
                tooltip: {
                    className: 'bg-gray-700 text-white text-xs font-bold'
                }
            }}>
                <div className={`flex items-center justify-center border-b-4 m-1 h-full  ${IconBorders(props.state)} cursor-pointer`} >
                    <div>
                        <Image src={props.icon} width={30} height={30} alt={props.alt} />
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}

export default IconState
