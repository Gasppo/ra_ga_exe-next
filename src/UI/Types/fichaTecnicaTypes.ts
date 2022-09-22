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

//generate an empty object with the same structure as the type CotizadorForm
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

//generate a an array of strings with all the paths to the properties of an object
export function objectPaths<T>(obj: T, path = '') {
    const paths = Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') {
            return objectPaths(obj[key], path + key + '.')
        } else {
            return path + key
        }
    })
    return paths.flat()
}


//transform array of strings, with the following format '#\properties\${key}\${key}\${key}...' to an object with the same structure
export const transform = (arr: string[]): string[] => {
    const newArr = arr.map((path) => {
        const pathArr = path.split('.')
        //join pathArr elements with a '\properties\' string
        const newPath = pathArr.join('/properties')
        return `#/properties/${newPath}`
    })
    return newArr
}


const cotizadorFormPaths = [
    "#/properties/molderiaBase/propertiesselected",
    "#/properties/digitalizacionYProgresion/propertiesselected",
    "#/properties/digitalizacionYProgresion/propertiesmoldes",
    "#/properties/digitalizacionYProgresion/propertiesavios",
    "#/properties/impresionMolde/propertiesselected",
    "#/properties/impresionMolde/propertiesmeters",
    "#/properties/geometral/propertiesselected",
    "#/properties/corteMuestra/propertiesselected",
    "#/properties/corteMuestra/propertiestelaCorte",
    "#/properties/confeccionMuestrista/propertiesselected",
    "#/properties/muestraProduccion/propertiesselected",
    "#/properties/envios/propertiesselected",
    "#/properties/envios/propertiesviajes",
    "#/properties/envios/propertiestotal",
    "#/properties/fichaTecnica/propertiesselected",
    "#/properties/fichaTecnica/propertiescantidad",
    "#/properties/programacionTizada/propertiesselected",
    "#/properties/programacionTizada/propertiesmetros",
    "#/properties/impresionTizada/propertiesselected",
    "#/properties/impresionTizada/propertiesmetros",
    "#/properties/corte/propertiesselected",
    "#/properties/corte/propertiescantPrendas",
    "#/properties/corte/propertiesprecioPorPrenda",
    "#/properties/confeccion/propertiesselected",
    "#/properties/confeccion/propertiescantPrendas",
    "#/properties/confeccion/propertiesprecioPorPrenda",
    "#/properties/cliente",
    "#/properties/tipoPrenda",
    "#/properties/complejidad"
] as const

export type CotizadorFormPaths = typeof cotizadorFormPaths[number]