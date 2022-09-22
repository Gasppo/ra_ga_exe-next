export type Paths<T> = T extends object
    ? { [K in keyof T]-?: K extends string ?
        T[K] extends Array<infer U> ?
        `${K}` | `${K}[${number}].${Paths<U>}` :
        `${K}` | `${K}.${Paths<T[K]>}` : never

    }[keyof T]
    : never;