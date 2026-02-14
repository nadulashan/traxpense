import handleDBError from "../dbError";
import getDB from "./opendb";

export async function getFundAccountBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge 
                            FROM accounts
                            WHERE isActive=1 AND isCredit=0;
                        `)
        return await badges
    } catch (e){
        handleDBError(e,'Fetching account badges failed - fund')
    }
};

export async function getCreditAccountBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{badge:string}>(`
                            SELECT badge
                            FROM accounts
                            WHERE isActive=1 AND isCredit=1;
                        `)
        return await badges
    } catch (e){
        handleDBError(e,'Fetching account badges failed - credit')
    }
};

export async function getFundAccounts() {
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}>(`
                            SELECT accountId,name,badge,initialBalance,isActive 
                            FROM accounts
                            WHERE isCredit=0;
                        `)
        return await accounts
    } catch (e){
        handleDBError(e,'Fetching fund accounts failed')
    }
};

export async function getCreditAccounts() {
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}>(`
                            SELECT accountId,name,badge,initialBalance,isActive 
                            FROM accounts
                            WHERE isCredit=1;
                        `)
        return await accounts
    } catch (e){
        handleDBError(e,'Fetching credit accounts failed')
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