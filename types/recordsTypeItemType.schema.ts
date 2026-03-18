export interface IncomeTypes{
    incomeId:number, 
    accountName:string, 
    isCustom:number, 
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
    createdDateTime:string, 
    date:string 
}

export interface ExpenseTypes{
    expenseId:number, 
    accountName:string, 
    isCustom:number, 
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
    createdDateTime:string, 
    date:string 
}

export interface CustomIncomeTypes{
    customIncomeId:number, 
    accountName:string,
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
}

export interface CustomExpenseTypes{
    customExpenseId:number, 
    accountName:string,
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
}

export interface TransferTypes{
    transferId:number;
    transferFrom:number;
    transferTo:number;
    comment:string | null;
    amount:number;
    createdDateTime:string,
    date:string;
    from_account_name:string;
    from_account_badge:string;
    to_account_name:string;
    to_account_badge:string;
}