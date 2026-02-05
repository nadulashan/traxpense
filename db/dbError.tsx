export default function handleDBError(e:unknown, context:string):never{
    console.error(`[DB Error] ${context}: ${e}`)

    if (e instanceof Error){
        throw new Error(`${context}: ${e.message}`)
    }

    throw new Error(`${context}: unknown Error`)
}