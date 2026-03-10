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