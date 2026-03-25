import handleDBError from "../dbError";
import getDB from "../opendb";

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
        db.runAsync(`
            UPDATE income
            SET categoryId = ?, accountId = ?, comment = ?, amount = ?
            WHERE typeId = ?
            `, [ categoryId, accountId, comment, store, id] )
    } catch (e) {
        handleDBError(e, 'Updating type failed - income')
    }
}

export async function updateExpenseItem(categoryId:number, accountId:number, comment:string | null, amount:number, id:number) {
    try {
        const store = amount * 100
        const db = await getDB();
        db.runAsync(`
            UPDATE expenses
            SET categoryId = ?, accountId = ?, comment = ?, amount = ?
            WHERE typeId = ?
            `, [ categoryId, accountId, comment, store, id] )
    } catch (e) {
        handleDBError(e, 'Updating type failed - expense')
    }
}

export async function updateTransfer( transferFrom: number, transferTo: number, amount: number, comment: string | null, id: number) {
    try {
        const store = amount*100
        const db = await getDB()
        db.runAsync(`
            UPDATE transfers
            SET transferFrom = ?, transferTo = ?, amount = ?, comment = ?
            WHERE transferId = ?
            `, [ transferFrom, transferTo, store, comment, id])
    } catch (e) {
        handleDBError(e,'Updating Transfer Failed')
    }
}

export async function updateCustomIncome( name:string, accountId:number, comment:string | null, amount:number, id:number ) {
    try {
        const store = amount * 100
        const db = await getDB();
        db.runAsync(`
            UPDATE customIncome
            SET name = ?, accountId = ?, comment = ?, amount = ?
            WHERE customTypeId = ?
            `, [ name, accountId, comment, store, id] )
    } catch (e) {
        handleDBError(e, 'Updating custom type failed - income')
    }
}

export async function updateCustomExpense( name:string, accountId:number, comment:string | null, amount:number, id:number ) {
    try {
        const store = amount * 100
        const db = await getDB();
        db.runAsync(`
            UPDATE customExpenses
            SET name = ?, accountId = ?, comment = ?, amount = ?
            WHERE customTypeId = ?
            `, [ name, accountId, comment, store, id] )
    } catch (e) {
        handleDBError(e, 'Updating custom type failed - expense')
    }
}