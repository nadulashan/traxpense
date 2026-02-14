import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export default async function getDB(){
    if (!db){
        db = await SQLite.openDatabaseAsync('traxpense.db')
    }
    return db;
}


