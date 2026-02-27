import handleDBError from '../dbError';
import getDB from "./opendb";

export async function addNewIncomeRecurringCategory(name:string,badge:string,recurringFrequency:string,amount:number,accountId:number,nextOccurrence:string){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO incomeCategories(name,badge,isActive,isRecurring,recurringFrequency,amount,accountId,nextOccurrence) VALUES (?,?,?,?,?,?,?,?)    
            `, name,badge,1,1,recurringFrequency,store,accountId,nextOccurrence)
    } catch (e){
        handleDBError(e,'Inserting recurring income category failed')
    }
}
export async function addNewExpenseRecurringCategory(name:string,badge:string,recurringFrequency:string,amount:number,accountId:number,nextOccurrence:string){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO expensesCategories(name,badge,isActive,isRecurring,recurringFrequency,amount,accountId,nextOccurrence) VALUES (?,?,?,?,?,?,?,?)  
            `, name,badge,1,1,recurringFrequency,store,accountId,nextOccurrence)
    } catch (e){
        handleDBError(e,'Inserting recurring expense category failed')
    }
}
