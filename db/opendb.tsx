import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export default async function getDB() {
    // 1. If DB is already fully loaded, return it
    if (db) return db;

    // 2. If an initialization is ALREADY in progress, return THAT same promise
    // This prevents "Double Opening" which causes the Android NPE
    if (initPromise) return initPromise;

    // 3. Otherwise, start the initialization and store the promise
    initPromise = (async () => {
        const instance = await SQLite.openDatabaseAsync('traxpense.db');
        await instance.execAsync('PRAGMA journal_mode = WAL');
        db = instance;
        return db;
    })();

    return initPromise;
}