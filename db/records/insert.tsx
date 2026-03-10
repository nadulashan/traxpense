import handleDBError from '../dbError';
import getDB from "../opendb";

export async function addNewIncome(categoryId:number, accountId:number, comment:string | null, date:string, time:string,amount:number){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO income(categoryId,accountId,comment,date,time,amount) 
                VALUES (?,?,?,?,?,?)    
            `, categoryId,accountId, comment, date,time, store)
    } catch (e){
        handleDBError(e,'Inserting income failed')
    }
}
export async function addNewExpense(categoryId:number, accountId:number, comment:string | null, date:string, time:string, amount:number){
    try {
        const store = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT 
                INTO expenses(categoryId,accountId,comment,date,time,amount) 
                VALUES (?,?,?,?,?,?)    
            `, categoryId,accountId, comment, date,time, store)
    } catch (e){
        handleDBError(e,'Inserting expense failed')
    }
}

