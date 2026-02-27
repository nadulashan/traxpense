import handleDBError from "./dbError";
import getDB from "./fundCreditAccounts/opendb";

export async function initDB(){
    try{
        const db = await getDB();
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS accounts(
                accountId INTEGER PRIMARY KEY AUTOINCREMENT,
                accountName TEXT NOT NULL,
                accountBadge TEXT DEFAULT NULL,
                amount INTEGER NOT NULL,
                isCredit BOOL NOT NULL,
                isActive BOOL NOT NULL
            );
            CREATE TABLE IF NOT EXISTS expensesCategories(
                categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                badge TEXT DEFAULT NULL,
                isActive BOOL NOT NULL,
                isRecurring BOOL NOT NULL,
                recurringFrequency TEXT DEFAULT NULL,
                amount INTEGER DEFAULT NULL,
                accountId INTEGER REFERENCES accounts(accountId) DEFAULT NULL,
                lastOccurrence TEXT DEFAULT NULL,
                nextOccurrence TEXT DEFAULT NULL
            );
            CREATE TABLE IF NOT EXISTS expenses(
                expenseId INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER NOT NULL  REFERENCES expensesCategories(categoryId),
                accountId INTEGER DEFAULT NULL  REFERENCES accounts(accountId),
                date TEXT NOT NULL,
                amount INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS customExpenses(
                customExpenseId INTEGER PRIMARY KEY AUTOINCREMENT,
                expenseId INTEGER NOT NULL REFERENCES expenses(expenseId),
                name TEXT NOT NULL,
                amount INTEGER NOT NULL,
                accountId INTEGER NOT NULL REFERENCES accounts(accountId)
            );
            CREATE TABLE IF NOT EXISTS incomeCategories(
                categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                badge TEXT DEFAULT NULL,
                isActive BOOL NOT NULL,
                isRecurring BOOL NOT NULL,
                recurringFrequency TEXT DEFAULT NULL,
                amount INTEGER DEFAULT NULL,
                accountId INTEGER REFERENCES accounts(accountId) DEFAULT NULL,
                lastOccurrence TEXT DEFAULT NULL,
                nextOccurrence TEXT DEFAULT NULL
            );
            CREATE TABLE IF NOT EXISTS income(
                incomeId INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER NOT NULL REFERENCES incomeCategories(categoryId),
                accountId INTEGER DEFAULT NULL REFERENCES accounts(accountId),
                date TEXT NOT NULL,
                amount INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS customincome(
                customincomeId INTEGER PRIMARY KEY AUTOINCREMENT,
                incomeId INTEGER NOT NULL REFERENCES income(incomeId),
                name TEXT NOT NULL,
                amount INTEGER NOT NULL,
                accountId INTEGER NOT NULL REFERENCES accounts(accountId)
            );
            CREATE TABLE IF NOT EXISTS general(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT NOT NULL,
                value TEXT NOT NULL
            );
        `)
    } catch (e){
        handleDBError(e,'Table creating failed')
    }
};
