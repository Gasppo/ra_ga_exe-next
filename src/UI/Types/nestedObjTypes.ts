export type Paths<T> = T extends object
    ? { [K in keyof T]-?: K extends string ? `${K}` | `${K}.${Paths<T[K]>}` : never }[keyof T]
    : never;