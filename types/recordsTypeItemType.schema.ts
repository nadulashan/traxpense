export interface IncomeTypes{
    typeId:number, 
    accountName:string, 
    accountId:number,
    isCustom:number, 
    accountBadge:string, 
    categoryId:number,
    name:string, 
    badge:string,
    comment:string | null, 
    amount:number, 
    createdDateTime:string, 
    date:string 
}

export interface ExpenseTypes{
    typeId:number, 
    accountName:string, 
    accountId:number,
    isCustom:number, 
    accountBadge:string, 
    categoryId:number,
    name:string, 
    badge:string,
    comment:string | null, 
    amount:number, 
    createdDateTime:string, 
    date:string 
}

export interface CustomTypeProps{
    customTypeId:number, 
    accountName:string,
    accountBadge:string, 
    accountId:number,
    name:string, 
    comment:string | null, 
    createdDateTime:string, 
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