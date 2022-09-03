import Input, { InputProps } from '../../Generic/Inputs/Input'
import Select, { SelectProps } from '../../Generic/Inputs/Select'
import Switch, { SwitchProps } from '../../Generic/Inputs/Switch'
import { CotizadorForm } from '../../Types/cotizadorTypes'

type Sel<T> = SelectProps<CotizadorForm, T> & { renderer: 'Select' }
type Swi = SwitchProps<CotizadorForm> & { renderer: 'Switch' }
type Inp = InputProps<CotizadorForm> & { renderer: 'Input' }

type CotizadorFormItemProps<T> = Sel<T> | Swi | Inp

export function CotizadorFormItem<T>(props: CotizadorFormItemProps<T>) {
    const formRenderers = {
        Input: Input<CotizadorForm>,
        Select: Select<CotizadorForm, T>,
        Switch: Switch<CotizadorForm>
    }
    return formRenderers[props.renderer](props)
}