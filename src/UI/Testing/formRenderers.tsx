import Horizontal from "./Horizontal"
import Input from "./Input"
import Select from "./Select"
import Switch from "./Switch"
import Uploader from "./Uploader"
import Vertical from "./Vertical"

export const formRenderers = {
    'Vertical': Vertical,
    'Input': Input,
    'Horizontal': Horizontal,
    'Select': Select,
    'Switch': Switch,
    'Uploader': Uploader
}

export type Renderers = keyof typeof formRenderers