import handleDBError from "./dbError";
import getDB from "./opendb";

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
                typeId INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER DEFAULT NULL  REFERENCES expensesCategories(categoryId),
                isCustom BOOL NOT NULL,
                accountId INTEGER DEFAULT NULL  REFERENCES accounts(accountId),
                comment TEXT DEFAULT NULL,
                date TEXT NOT NULL,
                createdDateTime TEXT NOT NULL,
                amount INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS customExpenses(
                customExpenseId INTEGER PRIMARY KEY AUTOINCREMENT,
                expenseId INTEGER DEFAULT NULL REFERENCES expenses(expenseId),
                name TEXT NOT NULL,
                comment TEXT DEFAULT NULL,
                amount INTEGER NOT NULL,
                accountId INTEGER NOT NULL REFERENCES accounts(accountId),
                date TEXT NOT NULL,
                createdDateTime TEXT NOT NULL
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
                typeId INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER DEFAULT NULL REFERENCES incomeCategories(categoryId),
                isCustom BOOL NOT NULL,
                accountId INTEGER DEFAULT NULL REFERENCES accounts(accountId),
                comment TEXT DEFAULT NULL,
                date TEXT NOT NULL,
                createdDateTime TEXT NOT NULL,
                amount INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS customIncome(
                customIncomeId INTEGER PRIMARY KEY AUTOINCREMENT,
                incomeId INTEGER DEFAULT NULL REFERENCES income(incomeId),
                name TEXT NOT NULL,
                comment TEXT DEFAULT NULL,
                amount INTEGER NOT NULL,
                accountId INTEGER NOT NULL REFERENCES accounts(accountId),
                date TEXT NOT NULL,
                createdDateTime TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS transfers(
                transferId INTEGER PRIMARY KEY AUTOINCREMENT,
                transferFrom INTEGER NOT NULL REFERENCES accounts(accountId),
                transferTo INTEGER NOT NULL REFERENCES accounts(accountId),
                comment TEXT DEFAULT NULL,
                amount INTEGER NOT NULL,
                createdDateTime TEXT NOT NULL,
                date TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS appconfig(
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );
        `)
    } catch (e){
        handleDBError(e,'Table creating failed')
    }
};
