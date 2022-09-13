import { useFormContext } from "react-hook-form";
import { CotizadorForm } from "../../Types/cotizadorTypes";

const ConfirmationForm = () => {

    const { watch } = useFormContext<CotizadorForm>()
    const cotizadorData = watch()

    return (
        <div className="flex md:w-6/12 flex-col justify-center items-center mt-10 md:mt-0 font-semibold">

            <div className="w-2/4">
                <div>Cliente: {cotizadorData.user.name ? cotizadorData.user.name : 'No esta logeado'}</div>
                <div>Tipo prenda: {cotizadorData.tipoPrenda ? cotizadorData.tipoPrenda.name : 'No selecciono tipo prenda'}</div>
                <div>Complejidad: {cotizadorData.complejidad ? cotizadorData.complejidad.name : 'No selecciono complejidad'}</div>
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.molderiaBase.selected ? "✔️" : "❌"} Moldería base {cotizadorData.files?.length ? ' - ' + cotizadorData.files.length + ' archivos seleccionados' : ''}</div>
                <div>{cotizadorData.digitalizacionYProgresion.selected ? "✔️" : "❌"} Digitalización y progresión{cotizadorData.digitalizacionYProgresion.selected ? cotizadorData.digitalizacionYProgresion.moldes + ' -  moldes y ' + cotizadorData.digitalizacionYProgresion.avios + ' avios' : ""} </div>
                <div>{cotizadorData.impresionMolde.selected ? "✔️" : "❌"} Impresión Moldes{cotizadorData.impresionMolde.selected ? ' - ' + cotizadorData.impresionMolde.meters + ' metros' : ""} </div>
                <div>{cotizadorData.geometral.selected ? "✔️" : "❌"} Geometral </div>
                <div>{cotizadorData.corteMuestra.selected ? "✔️" : "❌"} Corte Muestra{cotizadorData.corteMuestra.selected ? ' - Complejidad: ' + cotizadorData.corteMuestra.telaCorte : ""} </div>
                <div>{cotizadorData.confeccionMuestrista.selected ? "✔️" : "❌"} Confección Muestrista </div>
                <div>{cotizadorData.muestraProduccion.selected ? "✔️" : "❌"} Muestra Producción</div>
                <div>{cotizadorData.envios.selected ? "✔️" : "❌"} Envíos{cotizadorData.envios.selected ? ' - ' + cotizadorData.envios.viajes + ' viajes y ' + cotizadorData.envios.total + ' total' : ""} </div>
            </div>

            <div className="border-gray-300 border-2 w-2/4 mt-3"></div>

            <div className="mt-3 w-2/4">
                <div>{cotizadorData.fichaTecnica.selected ? "✔️" : "❌"} Ficha Técnica{cotizadorData.fichaTecnica.selected ? ' - Cantidad: ' + cotizadorData.fichaTecnica.cantidad : ""} </div>
                <div>{cotizadorData.muestraProduccion ? "✔️" : "❌"} Muestra Producción</div>
                <div>{cotizadorData.programacionTizada.selected ? "✔️" : "❌"} Programación Tizada{cotizadorData.programacionTizada.selected ? ' - ' + cotizadorData.programacionTizada.metros + ' metros' : ''}</div>
                <div>{cotizadorData.impresionTizada.selected ? "✔️" : "❌"} Impresión Tizada{cotizadorData.impresionTizada.selected ? ' - ' + cotizadorData.impresionTizada.metros + ' metros' : ''}</div>
                <div>{cotizadorData.corte.selected ? "✔️" : "❌"} Corte{cotizadorData.corte.selected ? ' - ' + cotizadorData.corte.cantPrendas + ' prendas y ' + cotizadorData.corte.precioPorPrenda + '$ por prenda' : ""} </div>
                <div>{cotizadorData.confeccion.selected ? "✔️" : "❌"} Confección {cotizadorData.confeccion.selected ? ' - ' + cotizadorData.confeccion.cantPrendas + ' prendas y ' + cotizadorData.confeccion.precioPorPrenda + '$ por prenda' : ""} </div>
            </div>
        </div>
    )
}

export default ConfirmationForm
