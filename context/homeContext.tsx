import { RecordsProps } from "@/types/homeProps";
import { TransferTypes } from "@/types/recordsTypeItemType.schema";
import { createContext } from "react";

interface RecentContextProps{
    openTypeItem: ( tr: RecordsProps ) => void;
    openCustomTypeItem: ( tr: RecordsProps, isIncome: boolean ) => void;
    openTransferTypeItem: ( tr: TransferTypes ) => void;
}

// context
export const RecentFunctionContextProvider = createContext< RecentContextProps | {} >({})