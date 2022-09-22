import { Paths } from "../Types/nestedObjTypes";
import { Renderers } from "./formRenderers";

export interface LayoutElement<Model> {
    type: Renderers;
    spacing?: number;
    elements?: LayoutElement<Model>[];
    label?: string;
    scope?: Paths<Model>;
    width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    textStyle?: string;
    options?: Options;
    className?: string;
    labelClassName?: string;
    title?: string;
    titleClassName?: string;
    alignItems?: string;
    divider?: string;
    wrap?: boolean;
    justifyContent?: string;

}

export interface Options {
    shrinkLabel?: boolean;
    numeric?: boolean;
    size?: 'small' | 'medium'
    variant?: 'standard' | 'outlined' | 'filled';
    disabled?: boolean,
    helperText?: string
    name?: string
}