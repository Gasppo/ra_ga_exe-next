import Horizontal from "./Horizontal"
import Input from "./Input"
import Select from "./Select"
import Vertical from "./Vertical"

export const formRenderers = {
    'Vertical': Vertical,
    'Input': Input,
    'Horizontal': Horizontal,
    'Select': Select
}

export type Renderers = keyof typeof formRenderers