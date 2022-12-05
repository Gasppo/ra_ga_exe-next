import { EstadoProcesoDesarrollo, Orden, ProcesoDesarrollo, ProcesoDesarrolloOrden } from "@prisma/client";
import { errorHandle } from "./cotizador";

// Fetch services based on email from body
export const fetchServicesFromEmail = (emailToFetchServices): Promise<(ProcesoDesarrolloOrden & {
    proceso: ProcesoDesarrollo;
    estado: EstadoProcesoDesarrollo;
    orden: Orden;
})[]> => {
    return fetch("/api/services/obtain", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: emailToFetchServices,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            errorHandle(error);
        });
}