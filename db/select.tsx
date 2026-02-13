import handleDBError from "./dbError";
import getDB from "./opendb";

export async function getAccountBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge FROM accounts;
                        `)
        return await badges
    } catch (e){
        handleDBError(e,'Fetching account badges failed')
    }
};

export async function getAccounts() {
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}>(`
                            SELECT accountId,name,badge,initialBalance,isActive FROM accounts;
                        `)
        return await accounts
    } catch (e){
        handleDBError(e,'Fetching accounts failed')
    }
};

export async function getAccount(id:number){
    try{
        const db = await getDB();
        const accounts = await db.getFirstAsync<{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}>(`
                            SELECT accountId,name,badge,initialBalance,isActive FROM accounts WHERE accountId=?;
                        `,id)
        return await accounts
    } catch (e){
        handleDBError(e,'Fetching account(1) details failed')
    }
}