import handleDBError from "../dbError";
import getDB from "../opendb";

export async function getFundAccountBadges(){
    try{
        const db = await getDB();
        const badges = await db.getAllAsync<{accountBadge:string}>(`
                            SELECT accountBadge 
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
        const badges = await db.getAllAsync<{accountBadge:string}>(`
                            SELECT accountBadge
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
        const accounts = await db.getAllAsync<{accountId: number;accountName:string; accountBadge:string;amount:number;isActive:number;}>(`
                            SELECT accountId,accountName,accountBadge,amount,isActive 
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
        const accounts = await db.getAllAsync<{accountId: number;accountName:string; accountBadge:string;amount:number;isActive:number;}>(`
                            SELECT accountId,accountName,accountBadge,amount,isActive 
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
        const accountJson = await db.getFirstAsync<{accountId: number;name:string; accountBadge:string;amount:number;isActive:number;}>(`
                            SELECT accountId,name,accountBadge,amount,isActive FROM accounts WHERE accountId=?;
                        `,id)
        return await accountJson
    } catch (e){
        handleDBError(e,'Fetching account(1) details failed')
    }
}

export async function checkDependents(id:number){
    try{
        let data:any;
        const db = await getDB();
        await db.withTransactionAsync( async () => {
            const fromIncomeCategories = await db.getAllAsync(`
                            SELECT categoryId
                            FROM incomeCategories
                            WHERE accountId=? AND isActive=1;
                        `,id)
            const fromExpensesCategories = await db.getAllAsync(`
                            SELECT categoryId
                            FROM expensesCategories
                            WHERE accountId=? AND isActive=1;
                        `,id)
            
            data = [...fromIncomeCategories, ...fromExpensesCategories]
        })
        if ( data.length !== 0 ){
            return true
        } else {
            return false
        }
    } catch (e){
        handleDBError(e,'Fetching account(1) details failed')
    }
}