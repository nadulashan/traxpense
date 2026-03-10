import handleDBError from "../dbError";
import getDB from "../opendb";

export async function getIncomeBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge 
                            FROM incomeCategories
                            WHERE isActive=1 AND isRecurring=0;
                        `)
        return badges
    } catch (e){
        handleDBError(e,'Fetching income category badges failed')
    }
};

export async function getExpenseBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge 
                            FROM expensesCategories
                            WHERE isActive=1 AND isRecurring=0;
                        `)
        return badges
    } catch (e){
        handleDBError(e,'Fetching expense category badges failed')
    }
};

export async function getIncomeCategories(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{categoryId:number, name:string; badge:string; isActive:number}>(`
                            SELECT categoryId, name, badge, isActive
                            FROM incomeCategories
                            WHERE isRecurring=0;
                        `)
        return badges
    } catch (e){
        handleDBError(e,'Fetching income categories failed')
    }
};

export async function getExpenseCategories(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{categoryId:number, name:string; badge:string; isActive:number}>(`
                            SELECT categoryId, name, badge, isActive
                            FROM expensesCategories
                            WHERE isRecurring=0;
                        `)
        return badges
    } catch (e){
        handleDBError(e,'Fetching expense categories failed')
    }
};