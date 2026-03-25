import { CustomTypeProps, ExpenseTypes, IncomeTypes, TransferTypes } from "@/types/recordsTypeItemType.schema";
import handleDBError from "../dbError";
import getDB from "../opendb";

export async function getActiveAccounts(){
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<{ accountId:number, accountName:string, accountBadge:string }>(`
                            SELECT accountId, accountName, accountBadge
                            FROM accounts
                            WHERE isActive=1;
                        `)
        return accounts
    } catch (e){
        handleDBError(e,'Fetching active accounts for records failed')
    }
};

export async function getActiveIncomeCategories(){
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<{ categoryId:number, name:string, badge:string }>(`
                            SELECT categoryId, name, badge
                            FROM incomeCategories
                            WHERE isActive=1 AND isRecurring=0;
                        `)
        return accounts
    } catch (e){
        handleDBError(e,'Fetching active income categories for records failed')
    }
};

export async function getActiveExpenseCategories(){
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<{ categoryId:number, name:string, badge:string }>(`
                            SELECT categoryId, name, badge
                            FROM expensesCategories
                            WHERE isActive=1 AND isRecurring=0;
                        `)
        return accounts
    } catch (e){
        handleDBError(e,'Fetching active expense categories for records failed')
    }
};

export async function getIncomes(date:string) {
    try{ 
        const db = await getDB();
        const incomes = await db.getAllAsync<IncomeTypes>(`
                            SELECT  typeId,
                                    accountName,
                                    accounts.accountId,
                                    isCustom,
                                    accountBadge,
                                    incomeCategories.categoryId,
                                    incomeCategories.name,
                                    incomeCategories.badge,
                                    comment,
                                    income.amount,
                                    createdDateTime,
                                    date
                            FROM    income
                            LEFT JOIN incomeCategories ON income.categoryId =  incomeCategories.categoryId
                            LEFT JOIN accounts ON income.accountId  = accounts.accountId
                            WHERE date = ?
                        `, date)
        return incomes
    } catch (e) {
        handleDBError( e, 'Fetching incomes failed' )
    }
}

export async function getExpense(date:string) {
    try{ 
        const db = await getDB();
        const expenses = await db.getAllAsync<ExpenseTypes>(`
                            SELECT  typeId,
                                    accountName,
                                    accounts.accountId,
                                    isCustom,
                                    accountBadge,
                                    expensesCategories.categoryId,
                                    expensesCategories.name,
                                    expensesCategories.badge,
                                    comment,
                                    expenses.amount,
                                    createdDateTime,
                                    date
                            FROM    expenses
                            LEFT JOIN expensesCategories ON expenses.categoryId =  expensesCategories.categoryId
                            LEFT JOIN accounts ON expenses.accountId  = accounts.accountId
                            WHERE date = ?
                        `, date)
        return expenses
    } catch (e) {
        handleDBError( e, 'Fetching expenses failed' )
    }
}

export async function getCustomIncomes(date:string) {
    try{ 
        const db = await getDB();
        const incomes = await db.getAllAsync<CustomTypeProps>(`
                            SELECT  customTypeId, 
                                    accountName,
                                    accountBadge, 
                                    accounts.accountId,
                                    customIncome.name, 
                                    comment, 
                                    customIncome.amount,
                                    createdDateTime
                            FROM    customIncome, accounts
                            WHERE   accounts.accountId = customIncome.accountId AND 
                                    date = ?
                        `, date)
        return incomes
    } catch (e) {
        handleDBError( e, 'Fetching custom income failed' )
    }
}

export async function getCustomExpenses(date:string) {
    try{ 
        const db = await getDB();
        const expenses = await db.getAllAsync<CustomTypeProps>(`
                            SELECT  customTypeId, 
                                    accountName,
                                    accountBadge, 
                                    accounts.accountId,
                                    customExpenses.name, 
                                    comment, 
                                    customExpenses.amount,
                                    createdDateTime
                            FROM    customExpenses, accounts
                            WHERE   accounts.accountId = customExpenses.accountId AND 
                                    date = ?
                        `, date)
        return expenses
    } catch (e) {
        handleDBError( e, 'Fetching custom expenses failed' )
    }
}

export async function checkCustomIncome(date:string) {
    try{ 
        const db = await getDB();
        const id = await db.getFirstAsync< {typeId: number}>(`
                            SELECT  typeId
                            FROM    income
                            WHERE   isCustom = 1 AND 
                                    date = ?
                        `, date)
        return id
    } catch (e) {
        handleDBError( e, 'Checking for custom income relation failed' )
    }
}

export async function checkCustomExpense(date:string) {
    try{ 
        const db = await getDB();
        const id = await db.getFirstAsync< {typeId: number}>(`
                            SELECT  typeId
                            FROM    expenses
                            WHERE   isCustom = 1 AND 
                                    date = ?
                        `, date)
        return id
    } catch (e) {
        handleDBError( e, 'Checking for custom expense relation failed' )
    }
}

export async function check() {
    try{ 
        const db = await getDB();
        const id = await db.getAllAsync(`
                            SELECT  *
                            FROM    expenses
                            WHERE   isCustom = 1
                        `)
        console.log( id )
    } catch (e) {
        handleDBError( e, 'Checking for custom expense relation failed' )
    }
}

export async function getTransfer(date:string) {
    try{ 
        const db = await getDB();
        const transfers = await db.getAllAsync<TransferTypes>(`
                            SELECT  tr.transferId,
                                    tr.transferFrom,
                                    tr.transferTo,
                                    tr.comment,
                                    tr.amount,
                                    tr.createdDateTime,
                                    tr.date,
                                    fr.accountName AS from_account_name,
                                    fr.accountBadge AS from_account_badge,
                                    t.accountName AS to_account_name,
                                    t.accountBadge AS to_account_badge
                            FROM    transfers tr
                            JOIN    accounts fr ON tr.transferFrom = fr.accountId
                            JOIN    accounts t ON tr.transferTo = t.accountId
                            WHERE   date = ?
                        `, date)
        return transfers
    } catch (e) {
        handleDBError( e, 'Fetching transfers failed' )
    }
}