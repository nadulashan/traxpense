import handleDBError from '../dbError';
import getDB from "../opendb";

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

export async function deleteCustomIncomeRelationOnIncome( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM income
                WHERE typeId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting custom income relation on income failed')
    }
}
export async function deleteCustomExpenseRelationOnExpense( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM expenses
                WHERE typeId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting custom expnese relation on expnese failed')
    }
}

export async function deleteCustomIncome( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM customIncome
                WHERE customTypeId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting custom income failed')
    }
}

export async function deleteCustomExpense( id: number ){ 
    try {
        const db = await getDB();
        await db.runAsync(`
                DELETE 
                FROM customExpenses
                WHERE customTypeId = ?
            `, id)  
    } catch (e) {
        handleDBError(e, 'Deleting custom expense failed')
    }
}