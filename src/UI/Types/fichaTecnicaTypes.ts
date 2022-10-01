import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";

export const fichaTecnicaVaciaForm: OrderCreationData = {

    // Paso 1: Seleccion de prenda
    cliente: '',
    tipoPrenda: {
        name: '',
        picture: ''
    },
    // Paso 2: Moldería
    molderiaBase: {
        selected: false,
        observaciones: ''
    },
    geometral: {
        selected: false,
        observaciones: ''
    },

    // Paso 3: Especificaciones
    logoMarca: {
        selected: false,
        observaciones: ''
    },
    bolsillos: {
        selected: false,
        cantidad: 0,
        observaciones: ''
    },
    elastico: {
        selected: false,
        metros: 0,
        observaciones: ''
    },
    botones: {
        selected: false,
        cantidad: 0,
        observaciones: ''
    },
    cierre: {
        selected: false,
        observaciones: ''
    },
    manga: {
        selected: false,
        observaciones: ''
    },

    // Paso 4: Talles
    talles: {
        selected: false,
        talle: []
    },
    cantidad: '',


    user: {
        name: '',
        email: '',
        image: ''
    },
    files: []
}
