import { useContext } from "react"
import { FocusedDateProviderContext } from "./recordsContext"

export function checkContext() {
    const context = useContext(FocusedDateProviderContext)

    if (!context) {
        throw new Error('Records Context is missing')
    }
    return context
}

