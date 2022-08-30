import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";

const DevelopmentForm = () => {


    const { data } = useSession()

    return (
        <div className="grid w-6/12 md:flex-col justify-items-center">
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={data?.user?.name} /></div>
        </div>
    )
}

export default DevelopmentForm
