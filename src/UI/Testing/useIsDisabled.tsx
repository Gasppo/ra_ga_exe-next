import { useFormContext } from "react-hook-form"
import { Rule } from "./types"


export function useIsDisabled<Model>(rules: Rule<Model>[]) {
    const { watch } = useFormContext()

    const isDisabled = rules?.length > 0 ? rules?.some(el => !watch(el.scope)) : false

    return isDisabled
}