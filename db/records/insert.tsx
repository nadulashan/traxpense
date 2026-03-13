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

export async function addNewCustomIncome(name:string, comment:string | null, amount:number, accountId:number, date:string){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO customIncome(name, comment, amount, accountId, date) 
                VALUES (?,?,?,?,?)    
            `, name, comment, store, accountId, date)
    } catch (e){
        handleDBError(e,'Inserting custom income failed')
    }
}
export async function addNewCustomExpense(name:string, comment:string | null, amount:number, accountId:number, date:string){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO customExpenses(name, comment, amount, accountId, date) 
                VALUES (?,?,?,?,?)    
            `, name, comment, store, accountId, date)
    } catch (e){
        handleDBError(e,'Inserting custom expense failed')
    }
}

export async function createCustomRecordOnIncome( date:string,createdDateTime:string, amount:number ){
    try {
        const store = amount*100
        const db = await getDB();
        const res = await db.runAsync(`
                INSERT 
                INTO income(isCustom, date, createdDateTime, amount) 
                VALUES (?,?,?,?)    
            `, 1, date, createdDateTime, store )
    } catch (e){
        handleDBError(e,'Inserting custom record on income failed')
    }
}