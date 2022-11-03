import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";

export const fichaTecnicaVaciaForm: OrderCreationData = {

    // Paso 1: Seleccion de prenda
    atributosPrenda: {
        material: { observaciones: '', selected: true },
        genero: {
            selected: true,
            observaciones: "",
            values: [{ key: 'woman', text: 'Mujer' }]
        },
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
    talles: '',
    cantidad: '',

    user: {
        name: '',
        email: '',
    },
    files: [],
    "Confección Muestra": { selected: false },
    "Corte Muestra": { selected: false },
    "Ficha Técnica de Consumos": { selected: false },
    "Digitalización y Progresiones": { selected: false },
    complejidad: '',
    nombreProducto: '',
    "Impresión Moldertía Base": { selected: false },
    "Moldería Base": { selected: false },
    "Cotización": { selected: false },
    "Terminación": { selected: false },
}
