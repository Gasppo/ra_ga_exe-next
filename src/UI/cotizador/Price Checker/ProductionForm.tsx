import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";

const ProductionForm = () => {

    const { data } = useSession()

    return (
        <div className="grid w-6/12 md:flex-col justify-items-center">
            <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Produccion" defaultValue={data?.user?.name} /></div>
            <div className="w-3/6"><TextField disabled fullWidth id="outlined-disabled" label="Produccion" defaultValue={data?.user?.name} /></div>
        </div>
    )
}

export default ProductionForm
