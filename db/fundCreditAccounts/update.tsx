import handleDBError from "../dbError";
import getDB from "../opendb";
import { getRunningAmount } from "./select";

export async function suspendAccount(id:number){
    try{
        const db = await getDB();
        const badges = await db.runAsync(`
                                UPDATE accounts 
                                SET isActive=0, accountBadge=NULL 
                                WHERE accountId=?
                        `, id)
        return badges.changes
    } catch (e){
        handleDBError(e,'Updating account failed - suspend')
    }
};

export async function updateAccount(
    id:number,
    name:string,
    balance:number,
    prevBalance: number,
    badge:string){

    const store = balance*100; 
    const changeInAmount = store - prevBalance
    try{
        const db = await getDB();
        db.withTransactionAsync( async () => {
            const runningAmount = await getRunningAmount(id)
            const updateRunningAmount = runningAmount + changeInAmount
            await db.runAsync(`
                                    UPDATE accounts 
                                    SET accountName=?, accountBadge=?, amount=?, runningAmount=?
                                    WHERE accountId=?
                            `, name, badge, store, updateRunningAmount, id)
        })
    } catch (e){
        handleDBError(e,'Updating account failed - update')
    }
};