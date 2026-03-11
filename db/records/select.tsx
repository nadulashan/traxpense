import { ExpenseTypes, IncomeTypes } from "@/types/recordsTypeItemType.schema";
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
                            SELECT  incomeId,
                                    accountName,
                                    isCustom,
                                    accountBadge,
                                    name,
                                    comment,
                                    income.amount,
                                    createdDateTime,
                                    date
                            FROM    income, accounts, incomeCategories
                            WHERE   accounts.accountId = income.accountId AND 
                                    incomeCategories.categoryId = income.categoryId AND
                                    date = ?
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
                            SELECT  expenseId,
                                    accountName,
                                    isCustom,
                                    accountBadge,
                                    name,
                                    comment,
                                    expenses.amount,
                                    createdDateTime,
                                    date
                            FROM    expenses, accounts, expensesCategories
                            WHERE   accounts.accountId = expenses.accountId AND 
                                    expensesCategories.categoryId = expenses.categoryId AND
                                    date = ?
                        `, date)
        return expenses
    } catch (e) {
        handleDBError( e, 'Fetching expenses failed' )
    }
}