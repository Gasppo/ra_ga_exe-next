import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";

export const fichaTecnicaVaciaForm: OrderCreationData = {

    // Paso 1: Seleccion de prenda
    atributosPrenda: {

        bolsillos: {
            selected: false,
            cantidad: 0,
            observaciones: ''
        },
        elastico: {
            selected: false,
            cantidad: 0,
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
    },
    cliente: '',
    tipoPrenda: {
        name: '',
        picture: ''
    },
    // Paso 2: Moldería
    molderiaBase: {
        selected: false,
        observaciones: '',
        files: []
    },
    geometral: {
        selected: false,
        observaciones: '',
        files: []
    },

    // Paso 3: Especificaciones
    logoMarca: {
        selected: false,
        observaciones: '',
        files: []
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
    },
    files: []
}
