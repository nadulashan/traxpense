import handleDBError from "../dbError";
import getDB from "./opendb";

export async function suspendAccount(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE accounts 
                                SET isActive=0, badge=NULL 
                                WHERE accountId=?
                        `, id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating account failed - suspend')
    }
};

export async function updateAccount(
    id:number,
    name:string,
    balance:number,
    badge:string){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE accounts 
                                SET name=?, badge=?, initialBalance=? 
                                WHERE accountId=?
                        `,name,badge,balance,id)
        return await badges.changes
    } catch (e){
        handleDBError(e,'Updating account failed - update')
    }
};