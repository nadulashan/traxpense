import handleDBError from "../dbError";
import getDB from "./opendb";

export async function suspendRecurringIncomeCategory(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE incomeCategories 
                                SET isActive=0, 
                                    badge=NULL, 
                                    nextOccurrence=NULL
                                WHERE categoryId=?
                        `, id)
        return badges.changes
    } catch (e){
        handleDBError(e,'Updating income recurring category failed - suspend')
    }
};

export async function suspendRecurringExpenseCategory(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE expensesCategories 
                                SET isActive=0, 
                                    badge=NULL, 
                                    nextOccurrence=NULL
                                WHERE categoryId=?
                        `, id)
        return badges.changes
    } catch (e){
        handleDBError(e,'Updating expense recurring category failed - suspend')
    }
};

export async function updateRecurringIncomeCategory(
    id:number,
    name:string,
    badge:string,
    amount:number,
    recurringFrequency:string,
    accountId:number,
    nextOccurance:string){
    try{
        const store = amount*100
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE incomeCategories
                                SET name=?, badge=?, amount=?, recurringFrequency=?, accountId=?, nextOccurrence=?
                                WHERE categoryId=?;
                        `,name,badge,store,recurringFrequency,accountId,nextOccurance,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating recurring income category failed - update')
    }
};

export async function updateRecurringExpenseCategory(
    id:number,
    name:string,
    badge:string,
    amount:number,
    recurringFrequency:string,
    accountId:number,
    nextOccurance:string){
    try{
        const store = amount*100
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE expensesCategories 
                                SET name=?, badge=?, amount=?, recurringFrequency=?, accountId=?, nextOccurrence=?
                                WHERE categoryId=?;
                        `,name,badge,store,recurringFrequency,accountId,nextOccurance,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating recurring expense category failed - update')
    }
};