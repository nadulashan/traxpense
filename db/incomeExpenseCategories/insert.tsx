import handleDBError from '../dbError';
import getDB from "../opendb";

export async function addNewIncomeCategory(name:string,badge:string){
    try {
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO incomeCategories(name,badge,isActive,isRecurring) VALUES (?,?,?,?)    
            `, name,badge,1,0)
    } catch (e){
        handleDBError(e,'Inserting income category failed')
    }
}
export async function addNewExpenseCategory(name:string,badge:string){
    try {
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO expensesCategories(name,badge,isActive,isRecurring) VALUES (?,?,?,?)    
            `, name,badge,1,0)
    } catch (e){
        handleDBError(e,'Inserting expense category failed')
    }
}
