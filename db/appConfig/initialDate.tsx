import handleDBError from '../dbError';
import getDB from "../opendb";

export async function handleInitialLaunch() {
    const today = new Date().toISOString().split('T')[0]; // Formats as YYYY-MM-DD

    try {
        const db = await getDB()

        const result = await db.getFirstAsync(
            "SELECT value FROM appconfig WHERE key = 'launch_date';"
        );

        if ( !result ) {
            db.runAsync(`
                    INSERT INTO appconfig (key, value)
                    VALUES ('launch_date', ?)
                `, today)
        } 
    } catch (error) {
        handleDBError(error, "Error handling initial launch:");
    }
}