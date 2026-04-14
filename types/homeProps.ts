export interface AccountDetailsProps{
    accountId:number;
    accountName:string;
    accountBadge:string;
    runningAmount:number;
}

export interface RecordsProps {
    id: number;
    primaryAccountId: number;
    secondaryAccountId: number | null;
    primaryAccountName: string;
    primaryAccountBadge: string;
    secondaryAccountName: string | null;
    secondaryAccountBadge: string | null;
    isCustom: number | null;
    name: string | null;
    badge: string | null;
    comment: string;
    amount:number;
    date: string;
    createdDateTime: string;
    type: 'income' | 'expense' | 'transfer';
}

export interface RecentAccountRecordsProps {
    primaryAccountId: number;
    secondaryAccountId: number | null;
    primaryAccountName: string;
    secondaryAccountName: string | null;
    amount: number;
    createdDateTime: string;
    id: number;
    name: string;
    type: 'income' | 'expense' | 'transfer'
}

export interface PriceWithCommaProps{
    currency: string,
    value: string, 
    decimal: string
}


export interface onPressFunctionsProps {
    openTypeItem: ( tr: RecordsProps ) => void;
    openCustomTypeItem: ( tr: RecordsProps, isIncome: boolean ) => void;
    openTransferTypeItem: ( tr: RecordsProps ) => void;
}
