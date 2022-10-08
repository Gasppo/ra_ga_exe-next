import { Paths } from "../Types/nestedObjTypes";
import { Renderers } from "./formRenderers";

type UpToTwelve = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface LayoutElement<Model> {
    type: Renderers;
    spacing?: number;
    elements?: LayoutElement<Model>[];
    label?: string;
    scope?: Paths<Model>;
    width?: UpToTwelve | { xs?: UpToTwelve, sm?: UpToTwelve, md?: UpToTwelve, lg?: UpToTwelve, xl?: UpToTwelve };
    textStyle?: string;
    options?: Options<Model>;
    className?: string;
    labelClassName?: string;
    title?: string;
    titleClassName?: string;
    alignItems?: string;
    divider?: string;
    wrap?: boolean;
    justifyContent?: string;
    rules?: Rule<Model>[];

}


export interface Rule<Model> {
    type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'validate';
    scope?: Paths<Model>;
}

export interface Options<Model> {
    shrinkLabel?: boolean;
    numeric?: boolean;
    size?: 'small' | 'medium'
    variant?: 'standard' | 'outlined' | 'filled';
    disabled?: boolean,
    required?: boolean,
    helperText?: string
    optionsName?: string
    labelPlacement?: 'start' | 'end' | 'top' | 'bottom'
    multiline?: number
    multifile?: boolean
    textType?: string
    fileSection?: Paths<Model>
}