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