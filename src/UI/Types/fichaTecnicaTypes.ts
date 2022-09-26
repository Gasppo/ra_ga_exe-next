import { ClothesCategory } from "@prisma/client"

export type SeleccionPrendaForm = {
    cliente: string,
    tipoPrenda: ClothesCategory | ''
}

export type MolderiaForm = {
    molderiaBase: {
        selected: boolean,
        observaciones: string
    },
    geometral: {
        selected: boolean,
        observaciones: string
    }
}

export type EspecificacionesForm = {
    logoMarca: {
        selected: boolean,
        observaciones: string
    },
    bolsillos: {
        selected: boolean,
        cantidad: number,
        observaciones: string
    },
    elastico: {
        selected: boolean,
        metros: number,
        observaciones: string
    },
    botones: {
        selected: boolean,
        cantidad: number,
        observaciones: string
    },
    cierre: {
        selected: boolean,
        observaciones: string
    },
    manga: {
        selected: boolean,
        observaciones: string
    }
}

export type TallesForm = {
    talles: {
        selected: boolean,
        talle: Array <{
            nombre: string,
            medidas: string
        }>
    }
}


export type FichaTecnicaForm = SeleccionPrendaForm & MolderiaForm & EspecificacionesForm & TallesForm & {
    user: {
        name?: string;
        email?: string;
        image?: string;
    }
    files?: File[];
}

export const fichaTecnicaVaciaForm: FichaTecnicaForm = {
    
    // Paso 1: Seleccion de prenda
    cliente: '',
    tipoPrenda: '',

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


    user: {
        name: '',
        email: '',
        image: ''
    },
    files: []
}
