import { createContext } from "react";

interface ContextType {
  focusedDate:string;
  updateFocusedDate:(date:string) => void;
  updateReadyToFetch:() => void;
}

export const FocusedDateProviderContext = createContext<ContextType | undefined>(undefined)
