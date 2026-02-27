export interface RecurringCategory {    
    categoryId:number, 
    name:string; 
    badge:string; 
    isActive:number, 
    recurringFrequency:string, 
    amount:number,
    accountId:number, 
    accountName:string, 
    accountBadge:string,
    lastOccurrence:string, 
    nextOccurrence:string
}