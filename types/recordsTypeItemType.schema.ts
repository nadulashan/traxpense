export interface IncomeTypes{
    incomeId:number, 
    accountName:string, 
    isCustom:number, 
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
    time:string, 
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
    time:string, 
    date:string 
}

export interface CustomIncomeTypes{
    customIncomeId:number, 
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
}

export interface CustomExpenseTypes{
    customExpenseId:number, 
    accountBadge:string, 
    name:string, 
    comment:string | null, 
    amount:number, 
}