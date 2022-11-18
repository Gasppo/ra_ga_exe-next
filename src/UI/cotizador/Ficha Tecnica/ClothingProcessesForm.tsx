import { Alert } from "@mui/material";
import FormItem from '@UI/Forms/FormItem';
import { clothingProcessesLayout } from './forms/clothingProcessesForm.layout';

const ClothingProcessesForm = () => {



    return (
        <div className="flex md:w-6/12 flex-col justify-center items-baseline mt-10 md:mt-0">
            <Alert severity='info'>Seleccione los procesos que quiere adicionar a su orden</Alert>
            <div className="form-input-section">
                <FormItem layout={clothingProcessesLayout} selectOptions={{
                    cantidades: [
                        { key: 'none', text: 'Sólo Desarrollo' },
                        { key: 'Muestra', text: 'Muestrario ( 1 a 5 prendas )' },
                        { key: 'Nano', text: 'Nano Producción ( 5 a 20 prendas )' },
                        { key: 'Micro', text: 'Micro Producción ( 20 a 80 prendas )' },
                        { key: 'Mini', text: 'Mini Producción ( 80 a 250 prendas )' },
                        { key: 'Medio', text: 'Producción Media ( 250 a 1000 prendas )' },
                        { key: 'Alto', text: 'Gran Producción ( 1000 o más prendas )' }
                    ]
                }} />

            </div>

        </div>
    )
}

export default ClothingProcessesForm