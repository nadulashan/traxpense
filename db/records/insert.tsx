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

