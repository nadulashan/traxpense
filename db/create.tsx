import handleDBError from "./dbError";
import getDB from "./fundCreditAccounts/opendb";

export async function initDB(){
    try{
        const db = await getDB();
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS accounts(
                accountId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                badge TEXT DEFAULT NULL,
                amount INTEGER NOT NULL,
                isCredit BOOL NOT NULL,
                isActive BOOL NOT NULL
            );
            CREATE TABLE IF NOT EXISTS expensesCategories(
                categoryId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                badge TEXT NOT NULL,
                isActive BOOL NOT NULL,
                isRecurring BOOL NOT NULL,
                recurringInterval TEXT DEFAULT NULL,
                recurringTime INTEGER DEFUALT NULL
            );
            CREATE TABLE IF NOT EXISTS expenses(
                expenseId INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER NOT NULL  REFERENCES expensesCategories(categoryId),
                accountId INTEGER DEFAULT NULL  REFERENCES accounts(accountId),
                date INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                isRecurring BOOL NOT NULL,
                recurringInterval TEXT DEFAULT NULL,
                recurringTime INTEGER DEFUALT NULL
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
                badge TEXT NOT NULL,
                isActive BOOL NOT NULL,
                isRecurring BOOL NOT NULL,
                recurringInterval TEXT DEFAULT NULL,
                recurringTime INTEGER DEFUALT NULL
            );
            CREATE TABLE IF NOT EXISTS income(
                incomeId INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER NOT NULL REFERENCES incomeCategories(categoryId),
                accountId INTEGER DEFAULT NULL REFERENCES accounts(accountId),
                date INTEGER NOT NULL,
                amount INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS customincome(
                customincomeId INTEGER PRIMARY KEY AUTOINCREMENT,
                incomeId INTEGER NOT NULL REFERENCES income(incomeId),
                name TEXT NOT NULL,
                amount INTEGER NOT NULL,
                accountId INTEGER NOT NULL REFERENCES accounts(accountId)
            );
        `)
    } catch (e){
        handleDBError(e,'Table creating failed')
    }
};
