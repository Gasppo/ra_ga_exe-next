import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { useFormContext } from "react-hook-form";

const ClothingConfirmationForm = () => {

    const { watch } = useFormContext<OrderCreationData>()
    const cotizadorData = watch()

    return (
        <div className="flex w-full md:w-6/12 flex-col justify-center items-center mt-10 md:mt-0 font-semibold">
            <div className="w-full md:w-2/4">
                <div>Cliente: {cotizadorData.user.name ? cotizadorData.user.name : 'No esta logeado'}</div>
            </div>

            <div className="border-gray-300 border-2 w-full md:w-2/4 mt-3"></div>

            <div className="mt-3 w-full md:w-2/4">
                <div>Nombre del producto: {cotizadorData.nombreProducto ? cotizadorData.nombreProducto : ''}</div>
                <div>Tipo prenda: {cotizadorData.tipoPrenda ? cotizadorData.tipoPrenda.name : 'No selecciono tipo prenda'}</div>
                <div>Complejidad: {cotizadorData.complejidad ? cotizadorData.complejidad : 'No selecciono complejidad'}</div>
                <div>Material: {cotizadorData.atributosPrenda?.material?.observaciones ? cotizadorData.atributosPrenda.material.observaciones : 'No anotó el material'}</div>
            </div>

            <div className="border-gray-300 border-2 w-full md:w-2/4 mt-3"></div>

            <div className="mt-3 w-full md:w-2/4">
                <div>{cotizadorData.orderFiles.files?.length > 0 ? "✔️" : "❌"} Archivos {cotizadorData.orderFiles?.files?.length > 0 ? ' - ' + cotizadorData.orderFiles?.files?.length + ' archivos seleccionados' : ''}</div>
                <div>Observaciones: {cotizadorData.orderFiles?.observaciones ? cotizadorData.orderFiles?.observaciones : ' - '}</div>
            </div>

            <div className="border-gray-300 border-2 w-full md:w-2/4 mt-3"></div>

            <div className="mt-3 w-full md:w-2/4">
                <div>Genero: {cotizadorData.atributosPrenda?.genero?.observaciones ? cotizadorData.atributosPrenda.genero.observaciones : ' - '}</div>
                <div>Cantidad: {cotizadorData.cantidad ? cotizadorData.cantidad : ' - '}</div>
                <div>Talles: {cotizadorData.talles ? cotizadorData.talles : ' - '}</div>
            </div>

            <div className="border-gray-300 border-2 w-full md:w-2/4 mt-3"></div>

            <div className="mt-3 w-full md:w-2/4">
                <div>{cotizadorData["Moldería Base"]?.selected ? "✔️ " : "❌ "} Moldería Base </div>
                <div>{cotizadorData["Digitalización y Progresiones"]?.selected ? "✔️ " : "❌ "} Digitalización y Progresiones </div>
                <div>{cotizadorData["Impresión Moldertía Base"] ? "✔️ " : "❌ "} Impresión Moldertía Base </div>
                <div>{cotizadorData["Ficha Técnica de Consumos"] ? "✔️ " : "❌ "} Ficha Técnica (Geometral + Guía de Armado) </div>
                <div>{cotizadorData["Corte Muestra"] ? "✔️ " : "❌ "} Corte Muestra </div>
                <div>{cotizadorData["Confección Muestra"] ? "✔️ " : "❌ "} Confección Muestra </div>
                <div>{cotizadorData.Terminación ? "✔️ " : "❌ "} Terminación (Ojal, Botón, Plancha, etc) </div>
                <div>{cotizadorData.Cotización ? "✔️ " : "❌ "} Cotización </div>
            </div>

            <div className="border-gray-300 border-2 w-full md:w-2/4 mt-3"></div>



        </div>
    )
}

export default ClothingConfirmationForm
