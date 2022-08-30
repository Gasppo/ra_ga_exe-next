import { MenuItem, TextField } from "@mui/material";

const DevelopmentForm = ({ sessionData }) => {


    return (
        <div className="grid w-6/12 md:flex-col justify-items-center">
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>
            <div className="w-1/6"><TextField disabled fullWidth id="outlined-disabled" label="Cliente" defaultValue={sessionData?.user?.name} /></div>

        </div>
    )
}

export default DevelopmentForm
