import handleDBError from '../dbError';
import getDB from "../opendb";

export async function addNewIncome(categoryId:number, accountId:number, comment:string | null, date:string, createdDateTime:string,amount:number){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO income(categoryId,accountId,isCustom,comment,date,createdDateTime,amount) 
                VALUES (?,?,?,?,?,?,?)    
            `, categoryId,accountId, 0, comment, date,createdDateTime, store)
    } catch (e){
        handleDBError(e,'Inserting income failed')
    }
}
export async function addNewExpense(categoryId:number, accountId:number, comment:string | null, date:string, createdDateTime:string, amount:number){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO expenses(categoryId,accountId,isCustom,comment,date,createdDateTime,amount) 
                VALUES (?,?,?,?,?,?,?)    
            `, categoryId,accountId, 0, comment, date,createdDateTime, store)
    } catch (e){
        handleDBError(e,'Inserting expense failed')
    }
}

export async function addNewCustomIncome(name:string, comment:string | null, amount:number, accountId:number, date:string, createdDateTime:string){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO customIncome(name, comment, amount, accountId, date, createdDateTime) 
                VALUES (?,?,?,?,?,?)    
            `, name, comment, store, accountId, date, createdDateTime)
    } catch (e){
        handleDBError(e,'Inserting custom income failed')
    }
}
export async function addNewCustomExpense(name:string, comment:string | null, amount:number, accountId:number, date:string, createdDateTime:string){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO customExpenses(name, comment, amount, accountId, date, createdDateTime) 
                VALUES (?,?,?,?,?,?)    
            `, name, comment, store, accountId, date, createdDateTime)
    } catch (e){
        handleDBError(e,'Inserting custom expense failed')
    }
}

export async function createCustomRecordOnIncome( date:string,createdDateTime:string, amount:number ){
    try {
        const db = await getDB();
        const incomeId = await db.runAsync(`
                INSERT 
                INTO income(isCustom, date, createdDateTime, amount) 
                VALUES (?,?,?,?)    
            `, 1, date, createdDateTime, amount )
        return incomeId.lastInsertRowId
    } catch (e){
        handleDBError(e,'Inserting custom record on income failed')
    }
}
export async function createRelationOnIncome( date:string,incomeId:number ){
    try {
        const db = await getDB();
        await db.runAsync(`
                UPDATE customIncome
                SET incomeId = ?
                WHERE date = ?    
            `, incomeId, date)
    } catch (e){
        handleDBError(e,'Inserting relation on custom record on income failed')
    }
}

export async function createCustomRecordOnExpense( date:string,createdDateTime:string, amount:number ){
    try {
        const db = await getDB();
        const expenseId = await db.runAsync(`
                INSERT 
                INTO expenses(isCustom, date, createdDateTime, amount) 
                VALUES (?,?,?,?)    
            `, 1, date, createdDateTime, amount )
        return expenseId.lastInsertRowId
    } catch (e){
        handleDBError(e,'Inserting custom record on expense failed')
    }
}
export async function createRelationOnExpense( date:string,expenseId:number ){
    try {
        const db = await getDB();
        await db.runAsync(`
                UPDATE customExpenses
                SET expenseId = ?
                WHERE date = ?    
            `, expenseId, date)
    } catch (e){
        handleDBError(e,'Inserting relation on custom record on expense failed')
    }
}

export async function addTransfer(transferFrom:number, transferTo:number, comment:string | null, date:string, createdDateTime:string, amount:number){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO transfers(transferFrom,transferTo,comment,amount,createdDateTime,date) 
                VALUES (?,?,?,?,?,?)    
            `, [transferFrom,transferTo, comment, store,createdDateTime, date])
    } catch (e){
        handleDBError(e,'Inserting transfer failed')
    }
}