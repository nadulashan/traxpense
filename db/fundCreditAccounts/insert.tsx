import handleDBError from '../dbError';
import getDB from "./opendb";

export async function addNewFundAccount(name:string,badge:string,initialBalance:number){
    try {
        const toBeStored = initialBalance*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO accounts(name,badge,amount, isCredit, isActive) VALUES (?,?,?,?,?)    
            `, name,badge,toBeStored,0,1)
    } catch (e){
        handleDBError(e,'Inserting Fund account failed')
    }
}

export async function addNewCreditAccount(name:string,badge:string,initialBalance:number){
    try {
        const toBeStored = initialBalance*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO accounts(name,badge,amount, isCredit, isActive) VALUES (?,?,?,?,?)    
            `, name,badge,toBeStored,1,1)
    } catch (e){
        handleDBError(e,'Inserting Credit account failed')
    }
}