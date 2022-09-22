import { useFormContext } from "react-hook-form";
import { FichaTecnicaForm } from "../../Types/fichaTecnicaTypes";

const ClothingConfirmationForm = () => {

    const { watch } = useFormContext<FichaTecnicaForm>()
    const cotizadorData = watch()

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-center mt-10 md:mt-0 font-semibold">

            <div className="w-2/4">
                <div>Cliente: {cotizadorData.user.name ? cotizadorData.user.name : 'No esta logeado'}</div>
                <div>Tipo prenda: {cotizadorData.tipoPrenda ? cotizadorData.tipoPrenda.name : 'No selecciono tipo prenda'}</div>
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.molderiaBase.selected ? "✔️" : "❌"} Moldería base {cotizadorData.files?.length ? ' - ' + cotizadorData.files.length + ' archivos seleccionados' : ''}</div>
                {cotizadorData.molderiaBase.observaciones && <div className="ml-3">Observaciones: {cotizadorData.molderiaBase.observaciones}</div>}
                <div>{cotizadorData.geometral.selected ? "✔️" : "❌"} Geometral {cotizadorData.files?.length ? ' - ' + cotizadorData.files.length + ' archivos seleccionados' : ''}</div>
                {cotizadorData.geometral.observaciones && <div className="ml-3">Observaciones: {cotizadorData.geometral.observaciones}</div>}
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.logoMarca.selected ? "✔️" : "❌"} Logo Marca {cotizadorData.files?.length ? ' - ' + cotizadorData.files.length + ' archivos seleccionados' : ''}</div>
                {cotizadorData.logoMarca.observaciones && <div className="ml-3">Observaciones logo: {cotizadorData.logoMarca.observaciones}</div>}
                <div>{cotizadorData.bolsillos.selected ? "✔️" : "❌"} Bolsillos {cotizadorData.bolsillos.selected ? ' - ' + cotizadorData.bolsillos.cantidad + ' bolsillos y observaciones: ' + cotizadorData.bolsillos.observaciones : ""} </div>
                <div>{cotizadorData.elastico.selected ? "✔️" : "❌"} Elástico {cotizadorData.elastico.selected ? ' - ' + cotizadorData.elastico.metros + ' metros y observaciones: ' + cotizadorData.elastico.observaciones : ""} </div>
                <div>{cotizadorData.botones.selected ? "✔️" : "❌"} Botones {cotizadorData.botones.selected ? ' - ' + cotizadorData.botones.cantidad + ' totales y observaciones: ' + cotizadorData.botones.observaciones : ""} </div>
                <div>{cotizadorData.cierre.selected ? "✔️" : "❌"} Cierre {cotizadorData.cierre.selected ? ' - ' + cotizadorData.cierre.observaciones : ""} </div>
                <div>{cotizadorData.manga.selected ? "✔️" : "❌"} Manga {cotizadorData.manga.selected ? ' - ' + cotizadorData.manga.observaciones : ""} </div>
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.talles.selected ? "✔️" : "❌"} Talles</div>
                <div>{cotizadorData.talles.selected ? cotizadorData.talles.talle.map((talle, index) => {
                    return <div className="ml-3" key={index}>Nombre: {' ' + talle.nombre} - Medidas: {' ' + talle.medidas} </div>
                }) : ""}</div>
            </div>

        </div>
    )
}

export default ClothingConfirmationForm
