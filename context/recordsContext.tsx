import { TransferTypes } from "@/types/recordsTypeItemType.schema";
import { createContext, useContext } from "react";

interface ContextType {
  focusedDate:string;
  updateFocusedDate:(date:string) => void;
  closeStateSheetCaller: () => void;
  recordsRefreshTrigger:number,
  setRecordsRefreshTrigger:React.Dispatch<React.SetStateAction<number>>;
  switchItemDetail:(item: any, focusedType: 'income' | 'expense' ) => Promise<void>;
  switchCustom:( type:'income' | 'expense') => void;
  switchTransferDetails: (item:TransferTypes) => void;
}

export const FocusedDateProviderContext = createContext<ContextType | undefined>(undefined)

export function useCheckContext() {
    const context = useContext(FocusedDateProviderContext)

    if (!context) {
        throw new Error('Records Context is missing')
    }
    return context
}

