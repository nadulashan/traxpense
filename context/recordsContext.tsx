import { ExpenseTypes, IncomeTypes } from "@/types/recordsTypeItemType.schema";
import { createContext, useContext } from "react";

interface ContextType {
  focusedDate:string;
  updateFocusedDate:(date:string) => void;
  closeSheetCaller: () => void;
  recordsRefreshTrigger:number,
  setRecordsRefreshTrigger:React.Dispatch<React.SetStateAction<number>>;
  switchItemDetail:(item: IncomeTypes | ExpenseTypes) => Promise<void>;
}

export const FocusedDateProviderContext = createContext<ContextType | undefined>(undefined)

export function useCheckContext() {
    const context = useContext(FocusedDateProviderContext)

    if (!context) {
        throw new Error('Records Context is missing')
    }
    return context
}

