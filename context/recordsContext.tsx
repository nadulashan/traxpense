import { createContext, useContext } from "react";

interface ContextType {
  focusedDate:string;
  updateFocusedDate:(date:string) => void;
  updateReadyToFetch:() => void;
  navigateToAddItem: () => void;
  type: React.RefObject<"income" | "expense" | null>;
  closeSheetCaller: () => void;
}

export const FocusedDateProviderContext = createContext<ContextType | undefined>(undefined)

export function useCheckContext() {
    const context = useContext(FocusedDateProviderContext)

    if (!context) {
        throw new Error('Records Context is missing')
    }
    return context
}

