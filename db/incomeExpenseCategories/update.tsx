import handleDBError from "../dbError";
import getDB from "../opendb";

export async function suspendIncomeCategory(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE incomeCategories 
                                SET isActive=0, badge=NULL 
                                WHERE categoryId=?
                        `, id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating income category failed - suspend')
    }
};

export async function suspendExpenseCategory(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE expensesCategories 
                                SET isActive=0, badge=NULL 
                                WHERE categoryId=?
                        `, id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating expense category failed - suspend')
    }
};

export async function updateIncomeCategory(
    id:number,
    name:string,
    badge:string){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE incomeCategories
                                SET name=?, badge=?
                                WHERE categoryId=?;
                        `,name,badge,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating income category failed - update')
    }
};

export async function updateExpenseCategory(
    id:number,
    name:string,
    badge:string){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE expensesCategories 
                                SET name=?, badge=?
                                WHERE categoryId=?
                        `,name,badge,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating expense category failed - update')
    }
};