import Horizontal from "./renderers/Horizontal"
import Input from "./renderers/Input"
import Select from "./renderers/Select"
import Switch from "./renderers/Switch"
import Uploader from "./renderers/Uploader"
import Vertical from "./renderers/Vertical"


export const formRenderers = {
    'Vertical': Vertical,
    'Input': Input,
    'Horizontal': Horizontal,
    'Select': Select,
    'Switch': Switch,
    'Uploader': Uploader
}

export type Renderers = keyof typeof formRenderers