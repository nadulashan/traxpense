import { ActiveAccountsProps } from "@/types/recordsTypeItemType.schema";
import { RecurringCategory } from "@/types/recurring.schema";
import handleDBError from "../dbError";
import getDB from "./opendb";

export async function getIncomeReccuringBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge 
                            FROM incomeCategories
                            WHERE isActive=1 AND isRecurring=1;
                        `)
        return badges
    } catch (e){
        handleDBError(e,'Fetching income reccuring badges failed')
    }
};

export async function getExpenseRecurringBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge 
                            FROM expensesCategories
                            WHERE isActive=1 AND isRecurring = 1;
                        `)
        return badges
    } catch (e){
        handleDBError(e,'Fetching expense reccuring badges failed')
    }
};

export async function getActiveAccounts(){
    try{
            const db = await getDB();
            const accounts = await db.getAllAsync<ActiveAccountsProps>(`
                                SELECT accountId, accountName, accountBadge, runningAmount
                                FROM accounts
                                WHERE isActive=1;
                            `)
            return accounts
    } catch (e){
        handleDBError(e,'Fetching active accounts for recurring failed')
    }
};

export async function getIncomeRecurringCategories(){
    try{
        const db = await getDB();
        const categories = await db.getAllAsync<RecurringCategory>(`
                            SELECT 
                                incomeCategories.categoryId, 
                                incomeCategories.name, 
                                incomeCategories.badge, 
                                incomeCategories.isActive,
                                incomeCategories.recurringFrequency, 
                                incomeCategories.amount,
                                incomeCategories.accountId ,
                                accounts.accountName, 
                                accounts.accountBadge, 
                                incomeCategories.lastOccurrence, 
                                incomeCategories.nextOccurrence
                            FROM incomeCategories, accounts
                            WHERE accounts.accountId = incomeCategories.accountId;
                        `)
        return categories
    } catch (e){
        handleDBError(e,'Fetching income recurring categories failed')
    }
};

export async function getExpenseRecurringCategories(){
    try{
        const db = await getDB();
        const categories = await db.getAllAsync<RecurringCategory>(`
                            SELECT 
                                expensesCategories.categoryId, 
                                expensesCategories.name, 
                                expensesCategories.badge, 
                                expensesCategories.isActive, 
                                expensesCategories.recurringFrequency, 
                                expensesCategories.amount,
                                expensesCategories.accountId ,
                                accounts.accountName, 
                                accounts.accountBadge , 
                                expensesCategories.lastOccurrence, 
                                expensesCategories.nextOccurrence
                            FROM expensesCategories, accounts
                            WHERE accounts.accountId = expensesCategories.accountId;
                        `)
        return categories
    } catch (e){
        handleDBError(e,'Fetching income recurring categories failed')
    }
};
