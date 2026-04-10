import { AccountProps } from "@/types/settingsProps";
import handleDBError from "../dbError";
import getDB from "../opendb";

export async function getAccountDetails() {
    try {
        const db = await getDB()
        const fetch = await db.getAllAsync<AccountProps>(`
                SELECT accountId, accountName, accountBadge, runningAmount
                FROM accounts
                WHERE isActive = 1
            `)
        return fetch
    } catch ( e ) {
        handleDBError(e, 'Fetching accounts for home screen failed')
    }
}

export async function getRecords( offset: number ) {
    try {
        const db = await getDB()
        const fetch = await db.getAllAsync<any>(`
                SELECT  typeId AS id,
                        accountName AS primaryAccountName,
                        NULL AS secondaryAccountName,
                        isCustom,
                        accountBadge AS primaryAccountBadge,
                        NULL AS secondaryAccountBadge,
                        incomeCategories.name,
                        incomeCategories.badge,
                        comment,
                        income.amount,
                        createdDateTime,
                        date,
                        'income' AS type
                FROM    income
                LEFT JOIN incomeCategories ON income.categoryId =  incomeCategories.categoryId
                LEFT JOIN accounts ON income.accountId  = accounts.accountId
                
                UNION ALL

                SELECT  typeId AS id,
                        accountName AS primaryAccountName,
                        NULL AS secondaryAccountName,
                        isCustom,
                        accountBadge AS primaryAccountBadge,
                        NULL AS secondaryAccountBadge,
                        expensesCategories.name,
                        expensesCategories.badge,
                        comment,
                        expenses.amount,
                        createdDateTime,
                        date,
                        'expense' AS type
                FROM    expenses
                LEFT JOIN expensesCategories ON expenses.categoryId =  expensesCategories.categoryId
                LEFT JOIN accounts ON expenses.accountId  = accounts.accountId

                UNION ALL

                SELECT  tr.transferId AS id,
                        fr.accountName AS primaryAccountName,
                        t.accountName AS secondaryAccountName,
                        NULL AS isCustom,
                        fr.accountBadge AS primaryAccountBadge,
                        t.accountBadge AS secondaryAccountBadge,
                        'Transfer' AS name,
                        NULL AS badge,
                        tr.comment,
                        tr.amount,
                        tr.createdDateTime,
                        tr.date,
                        'transfer' AS type
                FROM    transfers tr
                JOIN    accounts fr ON tr.transferFrom = fr.accountId
                JOIN    accounts t ON tr.transferTo = t.accountId

                ORDER BY createdDateTime DESC
                LIMIT 10 OFFSET ?

            `, [ offset ] ) 
        return fetch
    } catch ( e ) {
        handleDBError(e, 'Fetching records for home screen failed')
    }
}

export async function getRecentAccountRecords( accountId: number ) {
    try {
        const db = await getDB()
        const fetch = await db.getAllAsync<any>(`
                SELECT  typeId AS id,
                        incomeCategories.name AS primaryAccountName,
                        NULL AS secondaryAccountName,
                        income.amount,
                        createdDateTime,
                        income.accountId AS primaryAccountId,
                        NULL AS secondaryAccountId,
                        'income' AS type
                FROM    income
                LEFT JOIN incomeCategories ON income.categoryId =  incomeCategories.categoryId
                LEFT JOIN accounts ON income.accountId  = accounts.accountId
                WHERE primaryAccountId = ?
                
                UNION ALL

                SELECT  typeId AS id,
                        expensesCategories.name AS primaryAccountName,
                        NULL AS secondaryAccountName,
                        expenses.amount,
                        createdDateTime,
                        expenses.accountId AS primaryAccountId,
                        NULL AS secondaryAccountId,
                        'expense' AS type
                FROM    expenses
                LEFT JOIN expensesCategories ON expenses.categoryId =  expensesCategories.categoryId
                LEFT JOIN accounts ON expenses.accountId  = accounts.accountId
                WHERE primaryAccountId = ?

                UNION ALL

                SELECT  tr.transferId AS id,
                        fr.accountName AS primaryAccountName,
                        t.accountName AS secondaryAccountName,
                        tr.amount,
                        tr.createdDateTime,
                        tr.transferFrom AS primaryAccountId,
                        tr.transferTo AS secondaryAccountId,
                        'transfer' AS type
                FROM    transfers tr
                JOIN    accounts fr ON tr.transferFrom = fr.accountId
                JOIN    accounts t ON tr.transferTo = t.accountId
                WHERE   primaryAccountId = ? OR secondaryAccountId = ?

                ORDER BY createdDateTime DESC
                LIMIT 3

            `, [ accountId,accountId,accountId,accountId,accountId ] ) 
        return fetch
    } catch ( e ) {
        handleDBError(e, 'Fetching records for cards failed')
    }
}