import { AnalysisActiveAccountsProps } from "@/types/analysis";
import handleDBError from "../dbError";
import getDB from "../opendb";

export async function getAnalysisActiveAccounts(){
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<AnalysisActiveAccountsProps>(`
                            SELECT accountId, accountName, accountBadge AS color, runningAmount AS value
                            FROM accounts
                            WHERE isActive=1 AND isCredit=0;
                        `)
        return accounts
    } catch (e){
        handleDBError(e,'Fetching active accounts for analysis - overview failed')
    }
};

export async function getAnalysisActiveCreitAccounts(){
    try{
        const db = await getDB();
        const accounts = await db.getAllAsync<AnalysisActiveAccountsProps>(`
                            SELECT accountId, accountName, accountBadge AS color, runningAmount AS value
                            FROM accounts
                            WHERE isActive=1 AND isCredit=1;
                        `)
        return accounts
    } catch (e){
        handleDBError(e,'Fetching active credit accounts for analysis - overview failed')
    }
};
