import { MenuItem, TextField } from "@mui/material";

const ProductionForm = ({ sessionData }) => {


    return (
        <div className="grid w-6/12 md:flex-col justify-items-center">
            <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Produccion" defaultValue={sessionData?.user?.name} /></div>
            <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Produccion" defaultValue={sessionData?.user?.name} /></div>
        </div>
    )
}

export default ProductionForm
