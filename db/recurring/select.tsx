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
        const accounts = await db.getAllAsync<{accountId:number,name:string}>(`
                            SELECT accountId, name 
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
        const categories = await db.getAllAsync<{categoryId:number, name:string; badge:string; isActive:number, recurringFrequency:string, amount:number, lastOccurrence:string, nextOccurrence:string}>(`
                            SELECT categoryId, name, badge, isActive, recurringFrequency, amount, lastOccurrence, nextOccurrence
                            FROM incomeCategories
                            WHERE isRecurring=1;
                        `)
        return categories
    } catch (e){
        handleDBError(e,'Fetching income recurring categories failed')
    }
};

export async function getExpenseRecurringCategories(){
    try{
        const db = await getDB();
        const categories = await db.getAllAsync<{categoryId:number, name:string; badge:string; isActive:number, recurringFrequency:string, amount:number, lastOccurrence:string, nextOccurrence:string}>(`
                            SELECT categoryId, name, badge, isActive, recurringFrequency, amount, lastOccurrence, nextOccurrence
                            FROM expensesCategories
                            WHERE isRecurring=1;
                        `)
        return categories
    } catch (e){
        handleDBError(e,'Fetching income recurring categories failed')
    }
};