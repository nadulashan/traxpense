import handleDBError from '../dbError';
import getDB from "../opendb";

export async function addNewFundAccount(name:string,badge:string,amount:number){
    try {
        const toBeStored = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO accounts(accountName,accountBadge,amount, runningAmount, isCredit, isActive) VALUES (?,?,?,?,?,?)    
            `, [name,badge,toBeStored,toBeStored,0,1])
    } catch (e){
        handleDBError(e,'Inserting Fund account failed')
    }
}

export async function addNewCreditAccount(name:string,badge:string,amount:number){
    try {
        const toBeStored = amount*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO accounts(accountName,accountBadge,amount, runningAmount, isCredit, isActive) VALUES (?,?,?,?,?,?)    
            `, [name,badge,toBeStored,0,1,1])
    } catch (e){
        handleDBError(e,'Inserting Credit account failed')
    }
}

export async function addRunningAmount( id: number, amount:number ){
    try {
        const db = await getDB();
        await db.runAsync(`
                UPDATE accounts
                SET runningAmount = ?    
                WHERE accountId = ?
            `, [amount, id])
    } catch (e){
        handleDBError(e,'Inserting Running Amount failed')
    }
}