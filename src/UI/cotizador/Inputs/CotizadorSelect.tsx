import { OrderCreationData } from '@backend/schemas/OrderCreationSchema'
import Input, { InputProps } from '../../Generic/Inputs/Input'
import Select, { SelectProps } from '../../Generic/Inputs/Select'
import Switch, { SwitchProps } from '../../Generic/Inputs/Switch'

type Sel<T> = SelectProps<OrderCreationData, T> & { renderer: 'Select' }
type Swi = SwitchProps<OrderCreationData> & { renderer: 'Switch' }
type Inp = InputProps<OrderCreationData> & { renderer: 'Input' }

type CotizadorFormItemProps<T> = Sel<T> | Swi | Inp

export function CotizadorFormItem<T>(props: CotizadorFormItemProps<T>) {
    const formRenderers = {
        Input: Input<OrderCreationData>,
        Select: Select<OrderCreationData, T>,
        Switch: Switch<OrderCreationData>
    }
    return formRenderers[props.renderer](props)
}