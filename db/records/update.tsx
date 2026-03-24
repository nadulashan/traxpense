import handleDBError from "../dbError";
import getDB from "../opendb";

export async function suspendRecurringIncomeCategory(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE incomeCategories 
                                SET isActive=0, 
                                    badge=NULL, 
                                    nextOccurrence=NULL
                                WHERE categoryId=?
                        `, id)
        return badges.changes
    } catch (e){
        handleDBError(e,'Updating income recurring category failed - suspend')
    }
};

export async function suspendRecurringExpenseCategory(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE expensesCategories 
                                SET isActive=0, 
                                    badge=NULL, 
                                    nextOccurrence=NULL
                                WHERE categoryId=?
                        `, id)
        return badges.changes
    } catch (e){
        handleDBError(e,'Updating expense recurring category failed - suspend')
    }
};

export async function updateRecurringIncomeCategory(
    id:number,
    name:string,
    badge:string,
    amount:number,
    recurringFrequency:string,
    accountId:number,
    nextOccurance:string){
    try{
        const store = amount*100
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE incomeCategories
                                SET name=?, badge=?, amount=?, recurringFrequency=?, accountId=?, nextOccurrence=?
                                WHERE categoryId=?;
                        `,name,badge,store,recurringFrequency,accountId,nextOccurance,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating recurring income category failed - update')
    }
};

export async function updateRecurringExpenseCategory(
    id:number,
    name:string,
    badge:string,
    amount:number,
    recurringFrequency:string,
    accountId:number,
    nextOccurance:string){
    try{
        const store = amount*100
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE expensesCategories 
                                SET name=?, badge=?, amount=?, recurringFrequency=?, accountId=?, nextOccurrence=?
                                WHERE categoryId=?;
                        `,name,badge,store,recurringFrequency,accountId,nextOccurance,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating recurring expense category failed - update')
    }
};

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