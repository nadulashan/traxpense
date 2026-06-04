import handleDBError from "../dbError";
import { addRunningAmount } from "../fundCreditAccounts/insert";
import { getRunningAmount } from "../fundCreditAccounts/select";
import getDB from "../opendb";
import { getCustomExpenseAmount, getCustomIncomeAmount, getExpenseAmount, getIncomeAmount, getTransferDetails } from "./select";

export async function updateCustomIncomeRelation( amount: number, id: number ) {
    try {
        const db = await getDB();
        db.runAsync(`
            UPDATE income
            SET amount = ?
            WHERE typeId = ?
            `, [ amount, id] )
    } catch (e) {
        handleDBError(e, 'Updating custom relation on income failed')
    }
}

export async function updateCustomExpenseRelation( amount: number, id: number ) {
    try {
        const db = await getDB();
        db.runAsync(`
            UPDATE expenses
            SET amount = ?
            WHERE typeId = ?
            `, [ amount, id] )
    } catch (e) {
        handleDBError(e, 'Updating custom relation on expense failed')
    }
}

export async function updateIncomeItem(categoryId:number, accountId:number, comment:string | null, amount:number, id:number) {
    try {
        const store = amount * 100
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount = await getIncomeAmount( id )
            const diff = store - amount
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount + diff
            db.runAsync(`
                UPDATE income
                SET categoryId = ?, accountId = ?, comment = ?, amount = ?
                WHERE typeId = ?
                `, [ categoryId, accountId, comment, store, id] )
            await addRunningAmount( accountId, newRunningAmount )
        })
    } catch (e) {
        handleDBError(e, 'Updating type failed - income')
    }
}

export async function updateExpenseItem(categoryId:number, accountId:number, comment:string | null, amount:number, id:number) {
    try {
        const store = amount * 100
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount = await getExpenseAmount( id )
            const diff = store - amount
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount - diff
            db.runAsync(`
                UPDATE expenses
                SET categoryId = ?, accountId = ?, comment = ?, amount = ?
                WHERE typeId = ?
                `, [ categoryId, accountId, comment, store, id] )
            await addRunningAmount( accountId, newRunningAmount )
        })
    } catch (e) {
        handleDBError(e, 'Updating type failed - expense')
    }
}

export async function updateTransfer( transferFrom: number, transferTo: number, amount: number, comment: string | null, id: number) {
    try {
        const store = amount*100
        const db = await getDB()
        await db.withTransactionAsync( async () => {
            // Treat Running Amounts as if transaction is deleted - incase new accounts are used in edit
            const details = await getTransferDetails( id )
            if ( !details ) {
                return
            }
            const fromRunning = await getRunningAmount( details.transferFrom )
            const toRunning = await getRunningAmount( details.transferTo )
            await addRunningAmount( details.transferFrom, fromRunning + details.amount )
            await addRunningAmount( details.transferTo, toRunning - details.amount )

            // Treat Running Amounts as if another transaction is created
            const newFromRunning = await getRunningAmount( transferFrom )
            const newToRunning = await getRunningAmount( transferTo )
            db.runAsync(`
                UPDATE transfers
                SET transferFrom = ?, transferTo = ?, amount = ?, comment = ?
                WHERE transferId = ?
                `, [ transferFrom, transferTo, store, comment, id])
            await addRunningAmount( transferFrom, newFromRunning - store )
            await addRunningAmount( transferTo, newToRunning + store)

        })
    } catch (e) {
        handleDBError(e,'Updating Transfer Failed')
    }
}

export async function updateCustomIncome( name:string, accountId:number, comment:string | null, amount:number, id:number ) {
    try {
        const store = amount * 100
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount = await getCustomIncomeAmount( id )
            const diff = store - amount
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount + diff
            db.runAsync(`
                UPDATE customIncome
                SET name = ?, accountId = ?, comment = ?, amount = ?
                WHERE customTypeId = ?
                `, [ name, accountId, comment, store, id] )
            await addRunningAmount( accountId, newRunningAmount)
        })
    } catch (e) {
        handleDBError(e, 'Updating custom type failed - income')
    }
}

export async function updateCustomExpense( name:string, accountId:number, comment:string | null, amount:number, id:number ) {
    try {
        const store = amount * 100
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const amount = await getCustomExpenseAmount( id )
            const diff = store - amount
            const runningAmount = await getRunningAmount( accountId )
            const newRunningAmount = runningAmount - diff
            db.runAsync(`
                UPDATE customExpenses
                SET name = ?, accountId = ?, comment = ?, amount = ?
                WHERE customTypeId = ?
                `, [ name, accountId, comment, store, id] )
            await addRunningAmount( accountId, newRunningAmount)
        })
    } catch (e) {
        handleDBError(e, 'Updating custom type failed - expense')
    }
}