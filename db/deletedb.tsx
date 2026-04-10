import getDB from "./opendb";

export default async function clearData() {
    const db = await getDB()
  // Disables foreign keys briefly to avoid constraint errors during wipe
  await db.execAsync('PRAGMA foreign_keys = OFF;');
  
  // Get all table names and drop them
  await db.execAsync(`
    DELETE FROM accounts;
    DELETE FROM expensesCategories;
    DELETE FROM expenses;
    DELETE FROM customExpenses;
    DELETE FROM incomeCategories;
    DELETE FROM income;
    DELETE FROM customIncome; 
    DELETE FROM transfers; 
    DELETE FROM appconfig; 
  `);
  
  await db.execAsync('PRAGMA foreign_keys = ON;');
    console.log('runs')
};