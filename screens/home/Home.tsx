import { SafeAreaView } from 'react-native-safe-area-context';

import AccountCardsSection from '../../components/accountCardSection';
import User from '../../components/user';

import RecentTransactionSection from '@/components/recentTransactionSection';
import { getAccountDetails, getRecords } from '@/db/home/select';
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
        const fetch = await getRecords( 0 )
        // console.log(fetch)
    }

    
    // Recents
    const [ records, setRecords ] = useState<RecordsProps[] >([])
    const isBusyRef = useRef(false)
    const isAllRef = useRef(false)
    const offset = useRef(0)
    async function fetchRecords() {
        if ( isBusyRef.current ) return
        if ( isAllRef.current ) return
        isBusyRef.current  = true
        const records = await getRecords(offset.current)
        if ( records.length !== 0 ) {
            setRecords(prev => [ ...prev, ...records ])
            offset.current = offset.current + 10
        } else {
            isAllRef.current = true
        }
        isBusyRef.current  = false
    }

    
    async function initialFetch(){
        await fetchAccounts()
        await fetchRecords()
    }

    useEffect(() => {
        initialFetch()
    }, [])

    useFocusEffect(
        useCallback(() => {
            initialFetch() 
            
            return () =>{
                setRecords([])
                isAllRef.current = false
                offset.current = 0
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
                <RecentTransactionSection records={records} fetchRecords={fetchRecords} />
            </ScrollView>
        </SafeAreaView>
    )
}