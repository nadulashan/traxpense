import { SafeAreaView } from 'react-native-safe-area-context';

import AccountCardsSection from '../../components/accountCardSection';
import User from '../../components/user';

import RecentTransactionSection from '@/components/recentTransactionSection';
import { getAccountDetails, getRecords, getRecordsExpenses, getRecordsIncome, getRecordsTransfer } from '@/db/home/select';
import { RecordsProps } from '@/types/homeProps';
import { AccountProps } from '@/types/settingsProps';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

export default function Home(){
    
    // Accounts
    const [ accounts, setAccounts ] = useState< AccountProps[] | undefined>()
    
    async function fetchAccounts() {
        const accounts = await getAccountDetails()
        setAccounts(accounts)
    }

    // Recents
    const [ records, setRecords ] = useState<RecordsProps[] | undefined >(undefined)
    const fetchRecordsAgainRef = useRef(() => fetchRecords(getRecordsIncome))
    const isBusyRef = useRef(false)
    const isAllRef = useRef(false)
    const offset = useRef(0)

    async function fetchRecords( typeFunction:(offset: number) => Promise<RecordsProps[]> ) {
        if ( isBusyRef.current ) return
        if ( isAllRef.current ) return
        isBusyRef.current  = true
        const records = await typeFunction(offset.current)
        if ( records.length !== 0 ) {
            setRecords(prev => [ ...( prev?? [] ), ...records ])
            offset.current = offset.current + 10
        } else {
            isAllRef.current = true
        }
        isBusyRef.current  = false
    }

    // Filters
    const [ filterItems, setFilterItems ] = useState([
        {
            key:1,
            name:'All',
            isActive: true,
            onPress:fetchAll
        },
        {
            key:2,
            name:'Income',
            isActive: false,
            onPress:fetchIncome
        },
        {
            key:3,
            name:'Expense',
            isActive: false,
            onPress:fetchExpense
        },
        {
            key:4,
            name:'Transfer',
            isActive: false,
            onPress:fetchTransfer
        },
    ])

    async function fetchAll(){
        withdrawFocus()
        const updatedItems = [...filterItems]
        updatedItems.forEach( item => {
            if ( item.key === 1 ) {
                item.isActive = true
            } else {
                item.isActive = false
            }
        })

        await fetchRecords(getRecords)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecords)

        setFilterItems(updatedItems)
    }

    async function fetchIncome(){
        withdrawFocus()
        const updatedItems = [...filterItems]
        updatedItems.forEach( item => {
            if ( item.key === 2 ) {
                item.isActive = true
            } else {
                item.isActive = false
            }
        })

        await fetchRecords(getRecordsIncome)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecordsIncome)

        setFilterItems(updatedItems)

    }

    async function fetchExpense(){
        withdrawFocus()
        const updatedItems = [...filterItems]
        updatedItems.forEach( item => {
            if ( item.key === 3 ) {
                item.isActive = true
            } else {
                item.isActive = false
            }
        })

        await fetchRecords(getRecordsExpenses)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecordsExpenses)

        setFilterItems(updatedItems)

    }

    async function fetchTransfer(){
        withdrawFocus()
        const updatedItems = [...filterItems]
        updatedItems.forEach( item => {
            if ( item.key === 4 ) {
                item.isActive = true
            } else {
                item.isActive = false
            }
        })

        await fetchRecords(getRecordsTransfer)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecordsTransfer)

        setFilterItems(updatedItems)

    }

    

    
    async function initialFetch(){
        await fetchAccounts()
        await fetchAll()
    }

    function withdrawFocus() {
        setRecords(undefined)
        isAllRef.current = false
        offset.current = 0
    }

    useEffect(() => {
        initialFetch()
    }, [])

    useFocusEffect(
        useCallback(() => {
            initialFetch() 
            
            return () =>{
                withdrawFocus()
            }
        },[])
    )

    return (
        <SafeAreaView style={{backgroundColor:'#ffffff', minHeight:'100%'}} edges={['top', 'left', 'right']}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <User />
                < AccountCardsSection accounts={accounts}/>
                <RecentTransactionSection records={records} fetchRecords={fetchRecordsAgainRef.current} filterItems={filterItems}/>
            </ScrollView>
        </SafeAreaView>
    )
}