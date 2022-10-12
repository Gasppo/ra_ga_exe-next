import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { useFormContext } from "react-hook-form";
import NumbersIcon from '@mui/icons-material/Numbers';

const ClothingConfirmationForm = () => {

    const { watch } = useFormContext<OrderCreationData>()
    const cotizadorData = watch()

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-center mt-10 md:mt-0 font-semibold">

            <div className="w-2/4">
                <div>Cliente: {cotizadorData.user.name ? cotizadorData.user.name : 'No esta logeado'}</div>
                <div>Tipo prenda: {cotizadorData.tipoPrenda ? cotizadorData.tipoPrenda.name : 'No selecciono tipo prenda'}</div>
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.molderiaBase.selected ? "✔️" : "❌"} Moldería base {cotizadorData.molderiaBase?.files?.length ? ' - ' + cotizadorData.molderiaBase?.files?.length + ' archivos seleccionados' : ''}</div>
                {cotizadorData.molderiaBase.observaciones && <div className="ml-3">Observaciones: {cotizadorData.molderiaBase.observaciones}</div>}
                <div>{cotizadorData.geometral.selected ? "✔️" : "❌"} Geometral {cotizadorData.geometral?.files?.length ? ' - ' + cotizadorData.geometral?.files?.length + ' archivos seleccionados' : ''}</div>
                {cotizadorData.geometral.observaciones && <div className="ml-3">Observaciones: {cotizadorData.geometral.observaciones}</div>}
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.logoMarca.selected ? "✔️" : "❌"} Logo Marca {cotizadorData.logoMarca?.files?.length ? ' - ' + cotizadorData.logoMarca?.files?.length + ' archivos seleccionados' : ''}</div>
                {cotizadorData.logoMarca.observaciones && <div className="ml-3">Observaciones logo: {cotizadorData.logoMarca.observaciones}</div>}
                <div>{cotizadorData.atributosPrenda?.bolsillos.selected ? "✔️" : "❌"} Bolsillos {cotizadorData.atributosPrenda?.bolsillos.selected ? ' - ' + cotizadorData.atributosPrenda?.bolsillos.cantidad + ' bolsillos y observaciones: ' + cotizadorData.atributosPrenda?.bolsillos.observaciones : ""} </div>
                <div>{cotizadorData.atributosPrenda?.elastico.selected ? "✔️" : "❌"} Elástico {cotizadorData.atributosPrenda?.elastico.selected ? ' - ' + cotizadorData.atributosPrenda?.elastico.cantidad + ' metros y observaciones: ' + cotizadorData.atributosPrenda?.elastico.observaciones : ""} </div>
                <div>{cotizadorData.atributosPrenda?.botones.selected ? "✔️" : "❌"} Botones {cotizadorData.atributosPrenda?.botones.selected ? ' - ' + cotizadorData.atributosPrenda?.botones.cantidad + ' totales y observaciones: ' + cotizadorData.atributosPrenda?.botones.observaciones : ""} </div>
                <div>{cotizadorData.atributosPrenda?.cierre.selected ? "✔️" : "❌"} Cierre {cotizadorData.atributosPrenda?.cierre.selected ? ' - ' + cotizadorData.atributosPrenda?.cierre.observaciones : ""} </div>
                <div>{cotizadorData.atributosPrenda?.manga.selected ? "✔️" : "❌"} Manga {cotizadorData.atributosPrenda?.manga.selected ? ' - ' + cotizadorData.atributosPrenda?.manga.observaciones : ""} </div>
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.talles.selected ? "✔️" : "❌"} Talles</div>
                <div>{cotizadorData.talles.selected ? cotizadorData.talles.talle.map((talle, index) => {
                    return <div className="ml-3" key={index}>Nombre: {' ' + talle.nombre} - Medidas: {' ' + talle.medidas} </div>
                }) : ""}</div>
                <div><NumbersIcon /> Cantidad: {cotizadorData.cantidad}</div>
            </div>

        </div>
    )
}

export default ClothingConfirmationForm
