import handleDBError from './dbError';
import getDB from "./opendb";

export async function insertAccounts(){
    try {
        const db = await getDB();
        await db.runAsync(`
                INSERT INTO test(name) VALUES ('hi')    
            `)
        const values = await db.getAllAsync(`
                            SELECT * FROM test
                        `)
        console.log(values)
    } catch (e){
        handleDBError(e,'')
    }
}