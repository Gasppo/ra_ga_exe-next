import { ClothesCategory, Complexity } from "@prisma/client"

export type PriceCheckerModel = {
    cliente: string,
    tipoPrenda: ClothesCategory | '',
    complejidad: Complexity | ''
}

export type PriceCheckerDevelopmentForm = {
    molderiaBase: {
        selected: boolean
    },
    digitalizacionYProgresion: {
        selected: boolean,
        moldes: number,
        avios: number
    },
    impresionMolde: {
        selected: boolean,
        meters: number
    },
    geometral: {
        selected: boolean
    },
    corteMuestra: {
        selected: boolean,
        telaCorte: string
    },
    confeccionMuestrista: {
        selected: boolean
    },
    muestraProduccion: {
        selected: boolean
    },
    envios: {
        selected: boolean,
        viajes: number,
        total: number
    }
}

export type PriceCheckerProductionForm = {
    fichaTecnica: {
        selected: boolean,
        cantidad: number
    },
    muestraProduccion: {
        selected: boolean
    },
    programacionTizada: {
        selected: boolean,
        metros: number
    },
    impresionTizada: {
        selected: boolean,
        metros: number
    },
    corte: {
        selected: boolean,
        cantPrendas: number,
        precioPorPrenda: number
    },
    confeccion: {
        selected: boolean,
        cantPrendas: number,
        precioPorPrenda: number
    },
    envios: {
        selected: boolean,
        viajes: number
    }
}


export type CotizadorForm = PriceCheckerDevelopmentForm & PriceCheckerProductionForm & PriceCheckerModel & {
    user: {
        name?: string;
        email?: string;
        image?: string;
    }
    files?: File[];
}

//generate an empty object with the same structure as the type CotizadorForm
export const emptyCotizadorForm: CotizadorForm = {
    molderiaBase: {
        selected: false
    },
    digitalizacionYProgresion: {
        selected: false,
        moldes: 0,
        avios: 0
    },
    impresionMolde: {
        selected: false,
        meters: 0
    },
    geometral: {
        selected: false
    },
    corteMuestra: {
        selected: false,
        telaCorte: ''
    },
    confeccionMuestrista: {
        selected: false
    },
    muestraProduccion: {
        selected: false
    },
    envios: {
        selected: false,
        viajes: 0,
        total: 0
    },
    fichaTecnica: {
        selected: false,
        cantidad: 0
    },
    programacionTizada: {
        selected: false,
        metros: 0
    },
    impresionTizada: {
        selected: false,
        metros: 0
    },
    corte: {
        selected: false,
        cantPrendas: 0,
        precioPorPrenda: 0
    },
    confeccion: {
        selected: false,
        cantPrendas: 0,
        precioPorPrenda: 0
    },
    cliente: '',
    tipoPrenda: '',
    complejidad: '',
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