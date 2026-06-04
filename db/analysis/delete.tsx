import handleDBError from '../dbError';
import { addRunningAmount } from '../fundCreditAccounts/insert';
import { getRunningAmount } from '../fundCreditAccounts/select';
import getDB from "../opendb";
import { getCustomExpenseAmount, getCustomIncomeAmount, getExpenseAmount, getIncomeAmount, getTransferDetails } from './select';

export async function deleteIncome( id: number, accountId: number ){ 
    try {
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount = await getIncomeAmount( id )
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount - amount
            await db.runAsync(`
                    DELETE 
                    FROM income
                    WHERE typeId = ?
                `, id)  
            await addRunningAmount( accountId, newRunningAmount)

        })
    } catch (e) {
        handleDBError(e, 'Deleting income failed')
    }
}

export async function deleteExpense( id: number, accountId: number ){ 
    try {
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount = await getExpenseAmount( id )
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount + amount
            await db.runAsync(`
                DELETE 
                FROM expenses
                WHERE typeId = ?
            `, id)  
            await addRunningAmount( accountId, newRunningAmount)

        })
    } catch (e) {
        handleDBError(e, 'Deleting expense failed')
    }
}

export async function deleteTransfer( id: number ){ 
    try {
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const transferDetails = await getTransferDetails( id )
            if ( !transferDetails ) {
                return
            }
            const fromRunning = await getRunningAmount( transferDetails.transferFrom )
            const toRunning = await getRunningAmount( transferDetails.transferTo )
            const amount = transferDetails.amount
            const newFromRunning = fromRunning + amount
            const newToRunning = toRunning - amount
            await db.runAsync(`
                    DELETE 
                    FROM transfers
                    WHERE transferId = ?
                `, id)  
            await addRunningAmount( transferDetails.transferFrom, newFromRunning)
            await addRunningAmount( transferDetails.transferTo, newToRunning)
        })
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

export async function deleteCustomIncome( id: number, accountId: number ){ 
    try {
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount  = await getCustomIncomeAmount( id )
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount - amount
            await db.runAsync(`
                    DELETE 
                    FROM customIncome
                    WHERE customTypeId = ?
                `, id)  
            await addRunningAmount( accountId, newRunningAmount)
        })
    } catch (e) {
        handleDBError(e, 'Deleting custom income failed')
    }
}

export async function deleteCustomExpense( id: number, accountId: number ){ 
    try {
         const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount  = await getCustomExpenseAmount( id )
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount + amount
            await db.runAsync(`
                    DELETE 
                    FROM customExpenses
                    WHERE customTypeId = ?
                `, id) 
            await addRunningAmount( accountId, newRunningAmount)
        }) 
    } catch (e) {
        handleDBError(e, 'Deleting custom expense failed')
    }
}