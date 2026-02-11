import handleDBError from './dbError';
import getDB from "./opendb";

export async function addNewFundAccount(name:string,badge:string,initialBalance:number){
    try {
        const toBeStored = initialBalance*100
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO accounts(name,badge,initialBalance, isCredit, isActive) VALUES (?,?,?,?,?)    
            `, name,badge,toBeStored,0,1)

        const r = await db.getAllAsync(`
                        SELECT * FROM accounts
                    `)
        // console.log(r)
    } catch (e){
        handleDBError(e,'')
    }
}