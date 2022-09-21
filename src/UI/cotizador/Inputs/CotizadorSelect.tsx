import Input, { InputProps } from '../../Generic/Inputs/Input'
import Select, { SelectProps } from '../../Generic/Inputs/Select'
import Switch, { SwitchProps } from '../../Generic/Inputs/Switch'
import { FichaTecnicaForm } from '../../Types/fichaTecnicaTypes'

type Sel<T> = SelectProps<FichaTecnicaForm, T> & { renderer: 'Select' }
type Swi = SwitchProps<FichaTecnicaForm> & { renderer: 'Switch' }
type Inp = InputProps<FichaTecnicaForm> & { renderer: 'Input' }

type CotizadorFormItemProps<T> = Sel<T> | Swi | Inp

export function CotizadorFormItem<T>(props: CotizadorFormItemProps<T>) {
    const formRenderers = {
        Input: Input<FichaTecnicaForm>,
        Select: Select<FichaTecnicaForm, T>,
        Switch: Switch<FichaTecnicaForm>
    }
    return formRenderers[props.renderer](props)
}