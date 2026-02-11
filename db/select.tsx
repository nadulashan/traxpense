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

export async function getAccounts(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync(`
                            SELECT * FROM accounts;
                        `)
        return await badges
    } catch (e){
        handleDBError(e,'Fetching accounts failed')
    }
};
