import handleDBError from '../dbError';
import getDB from "../opendb";

export async function deleteCustomIncomeOnIncome( date:string ){
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM income
                WHERE  date = ?  AND isCustom = 1 
            `, date )
    } catch (e){
        handleDBError(e,'Deleting custom income on income failed')
    }
}
export async function deleteCustomExepenseOnExepense( date:string ){
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM expenses
                WHERE  date = ?  AND isCustom = 1 
            `, date )
    } catch (e){
        handleDBError(e,'Deleting custom expense on income failed')
    }
}

export async function deleteIncome( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM income
                WHERE typeId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting income failed')
    }
}

export async function deleteExpense( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM expenses
                WHERE typeId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting expense failed')
    }
}

export async function deleteTransfer( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM transfers
                WHERE transferId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting transfer failed')
    }
}