import Input from '../../Generic/Inputs/Input'
import Select from '../../Generic/Inputs/Select'
import Switch from '../../Generic/Inputs/Switch'
import { CotizadorForm } from '../../Types/cotizadorTypes'
import { Paths } from '../../Types/nestedObjTypes'

interface CotizadorSelectProps<T> {
    scope: Paths<CotizadorForm>
    variant?: "outlined" | "standard" | "filled"
    label: string
    required?: boolean
    disabled?: boolean,
    options?: T[] | { key: string, text: string, disabled?: boolean }[]
    optionKey?: keyof T
    optionText?: keyof T
    helperText?: string
}

interface CotizadorSwitchProps {
    scope: Paths<CotizadorForm>
    required?: boolean
    disabled?: boolean
    label: string,
    labelPlacement?: "end" | "bottom" | "top" | "start"
}

interface CotizadorInputProps {
    scope: Paths<CotizadorForm>
    size?: "small" | "medium"
    labelClassName?: string
    variant?: "outlined" | "standard" | "filled"
    label: string
    disabled?: boolean
    type?: string
}

type Sel<T> = CotizadorSelectProps<T> & { renderer: 'Select' }
type Swi = CotizadorSwitchProps & { renderer: 'Switch' }
type Inp = CotizadorInputProps & { renderer: 'Input' }

type CotizadorFormItemProps<T> = Sel<T> | Swi | Inp


export function CotizadorSelect<T>(props: CotizadorSelectProps<T>) {
    return Select(props)
}


export function CotizadorSwitch(props: CotizadorSwitchProps) {
    return Switch(props)
}

export function CotizadorInput(props: CotizadorInputProps) {
    return Input(props)
}



export function CotizadorFormItem<T>(props: CotizadorFormItemProps<T>) {
    const formRenderers = {
        Input: CotizadorInput,
        Select: CotizadorSelect,
        Switch: CotizadorSwitch
    }
    return formRenderers[props.renderer](props)
}