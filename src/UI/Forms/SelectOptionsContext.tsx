import { createContext } from "react"

export type SelectOptionsContextType = { [key: string]: { key: string | number, text: string, disabled?: boolean }[] } | null

export const SelectOptionsContext = createContext<SelectOptionsContextType>(null)

export const SelectOptionsProvider = (props: { value: SelectOptionsContextType, children: JSX.Element }) => (
    <SelectOptionsContext.Provider value={props.value}>
        {props.children}
    </SelectOptionsContext.Provider>
)