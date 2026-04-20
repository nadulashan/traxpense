import { SafeAreaView } from 'react-native-safe-area-context';

import AccountCardsSection from '../../components/accountCardSection';
import User from '../../components/user';

import RecentTransactionSection from '@/components/recentTransactionSection';
import FormAccountWrapper from '@/components/recordFormAccountWrapper';
import CustomIncomeExpenseDetails from '@/components/recordsCustomIncomeExpenseDetails';
import ItemDetails from '@/components/recordsItemDetails';
import TransferDetails from '@/components/recordsTransferDetails';
import { getAccountDetails, getRecords, getRecordsExpenses, getRecordsIncome, getRecordsTransfer } from '@/db/home/select';
import { getActiveAccounts, getCustomExpenses, getCustomIncomes } from '@/db/records/select';
import { closeBottomSheet, openBottomSheet, sheetNavigationDuplicationIdentify } from '@/func/bottomSheetfunc';
import Octicons from '@expo/vector-icons/Octicons';

import UniversalSheetWrapper from '@/components/bottomSheetWrapper';
import { RecordsProps } from '@/types/homeProps';
import { ActiveAccountsProps, CustomTypeProps } from '@/types/recordsTypeItemType.schema';
import { AccountProps } from '@/types/settingsProps';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

// Filteration
// I have two recent transactions filters. by account and by type
// each type has its own db fetch method
// fetching of records is always done by 'fetchRecords' function which always stores them in a Ref
// after storing 'fetchRecords' run 'accountFilteration'. 
// 'accountFilteration' looks if theres any 'selectedAccounts' filter transactions and update the records state accordingly.
// code also maintains a 'isInitialFetch' to either add transactions to the ref or rewrite it. each type selection will trigger 'isInitialFetch' = true

export default function Home(){
    
    // Accounts
    const [ accounts, setAccounts ] = useState< AccountProps[] | undefined>()
    
    async function fetchAccountsDetails() {
        const accounts = await getAccountDetails()
        setAccounts(accounts)
    }

    // Recents
    const [ records, setRecords ] = useState<RecordsProps[] | undefined >(undefined)
    const recordsRef = useRef< RecordsProps[]  >([])
    const isInitialFetch = useRef(true)
    const fetchRecordsAgainRef = useRef(() => fetchRecords(getRecordsIncome))
    const isBusyRef = useRef(false)
    const isAllRef = useRef(false)
    const offset = useRef(0)

    async function fetchRecords( typeFunction:(offset: number) => Promise<RecordsProps[]> ) {
        // console.log('fetching')
        if ( isBusyRef.current ) return
        if ( isAllRef.current ) return
        isBusyRef.current  = true
        const records = await typeFunction(offset.current)
        if ( records.length !== 0 ) {
            if ( isInitialFetch.current ) {
                recordsRef.current =  [ ...records ]
                isInitialFetch.current = false
            } else {
                recordsRef.current =  [ ...recordsRef.current, ...records ]
            }
            offset.current = offset.current + 10
        } else {
            isAllRef.current = true
        }     
        accountFilteration()
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

    function updateFilterTypeList( id: number ) {
        // Modify Filter Items
        const updatedItems = [...filterItems]
        updatedItems.forEach( item => {
            if ( item.key === id ) {
                item.isActive = true
            } else {
                item.isActive = false
            }
        })
        setFilterItems(updatedItems)
    }

    async function fetchAll(){
        isInitialFetch.current = true
        withdrawFocus()
        updateFilterTypeList(1)

        // Fetch Records and store in ref
        await fetchRecords(getRecords)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecords)

    }

    async function fetchIncome(){
        isInitialFetch.current = true
        withdrawFocus()
        updateFilterTypeList(2)

        // Fetch amd store in ref
        await fetchRecords(getRecordsIncome)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecordsIncome)
    }

    async function fetchExpense(){
        isInitialFetch.current = true
        withdrawFocus()
        updateFilterTypeList(3)


        await fetchRecords(getRecordsExpenses)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecordsExpenses)
    }

    async function fetchTransfer(){
        isInitialFetch.current = true
        withdrawFocus()
        updateFilterTypeList(4)

        await fetchRecords(getRecordsTransfer)
        fetchRecordsAgainRef.current = () => fetchRecords(getRecordsTransfer)

    }
    
    async function initialFetch(){
        await fetchAccountsDetails()
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

    // Account Filter
    const [ activeAccounts, setActiveAccounts ] = useState< ActiveAccountsProps[] | null >(null) 
    const [ headerIcon, setHeaderIcon ] = useState< ReactElement> (<Octicons name="filter-remove" size={20} color="black" />)
    const selectedAccounts = useRef<number[]>([])

    async function fetchAccounts() {
        const fetch = await getActiveAccounts()
        setActiveAccounts(fetch)
    }

    function openActiveAccountSheet() {
        fetchAccounts()
        goToActiveAccountSheet()
        openSheetCaller()
    }

    function updateFilterAccountList( acc: ActiveAccountsProps ){
        let found = false
        let index = 0
        selectedAccounts.current.forEach( id => {
            if ( id === acc.accountId ) {
                found = true
                selectedAccounts.current.splice(index,1)
            }
            index ++
        })
        if ( !found ) {
            selectedAccounts.current.push(acc.accountId)
        }
    }

    function performAccountsFilter( toBeFilterd: RecordsProps[] ) {
        if ( selectedAccounts.current.length === 0 ){ 
            setHeaderIcon(<Octicons name="filter-remove" size={20} color="black" />)
            return toBeFilterd
        }
        setHeaderIcon(<Octicons name="filter" size={20} color="black" />)
        const filteredList = toBeFilterd.filter( item => {
            let found = false
            selectedAccounts.current.forEach( accId => {
                if ( item.primaryAccountId === accId || item.secondaryAccountId === accId ) {
                    found = true
                }
            })
            return found
        })
        return filteredList
    }

    function accountFilteration() {
        const filtered = performAccountsFilter( recordsRef.current )
        setRecords(filtered)
        closeSheetCaller()
    }


    // BottomSheet
    const [ focusedTypeItem, setFocusedTypeItem ] = useState<RecordsProps | undefined>(undefined)

    const [ focusedCustomTypeItem, setFocusedCustomTypeItem ] = useState<CustomTypeProps[] | null>(null)
    const [ isIncome, setIsIncome ] = useState(true)

    const [ focusedTransferTypeItem, setFocusedTransferTypeItem ] = useState<RecordsProps | undefined>(undefined)

    const [ showGoBack, setShowGoBack ] = useState(false)

    const SHEETS = {
        TypeItemDetails: () => <ItemDetails passedItem={undefined} passedItemFromRecent={focusedTypeItem} nonEditablePassedItem={nonEditablePassedItemRef.current} onEditPress={undefined}/>,
        CustomTypeItemDetails: () => <CustomIncomeExpenseDetails onCustomItemPress={openNonEditableTypeItem} customTypeItem={focusedCustomTypeItem} isCustomIncome={isIncome}/>,
        TransferItemDetails: () => <TransferDetails passedItem={undefined} itemFromRecent={focusedTransferTypeItem} onEditPress={undefined} />,
        ActiveAccountSheet: () => <FormAccountWrapper accounts={activeAccounts} onAccountPress={updateFilterAccountList} multiSelect={{available: true, primaryButtonFunction: accountFilteration, secondaryButtonFunction: closeSheetCaller }}/>
    }

    const  [ currentSheet, setCurrentSheet] = useState< 'TypeItemDetails' | 'CustomTypeItemDetails' | 'TransferItemDetails' | 'ActiveAccountSheet' >('TypeItemDetails')
    const [ title, setTitle ] = useState('')
    const prevStates = useRef< ( () => void )[] >([])
    const Type = useRef< 'Income' | 'Expense' >('Income')

    const SheetContent = SHEETS[currentSheet]

    //
    function setIncomeRef( isIncome: boolean ) {
        if ( isIncome ) {
            Type.current = "Income"
        } else {
            Type.current = "Expense"
        }
    }

    // navigation
    function goToTypeItem() {
        setCurrentSheet('TypeItemDetails')
        setTitle(`${Type.current}`)
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToTypeItem)
    }
    function goToCustomTypeItemDetail() {
        setCurrentSheet('CustomTypeItemDetails')
        setTitle(`Custom ${Type.current}`)
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToCustomTypeItemDetail)
    }
    function goToTransferItemDetails() {
        setCurrentSheet('TransferItemDetails')
        setTitle('Transfer')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToTransferItemDetails)
    }
    function goToActiveAccountSheet() {
        setCurrentSheet('ActiveAccountSheet')
        setTitle('Select Filter Accounts')
        prevStates.current = sheetNavigationDuplicationIdentify( prevStates.current, goToActiveAccountSheet)
    }
    function goBack() {
        prevStates.current.pop()
        prevStates.current[prevStates.current.length - 1]()
    }

    // TypeItem
    function openTypeItem( tr:RecordsProps ) {
        setIncomeRef( tr.type === 'income' )
        goToTypeItem()
        setFocusedTypeItem( tr )
        openSheetCaller()
    }

    // Type Item for custom
    const nonEditablePassedItemRef = useRef< CustomTypeProps | undefined >(undefined) 
 
    function openNonEditableTypeItem( item: CustomTypeProps ) {
        goToTypeItem()
        setShowGoBack(true)
        setFocusedTypeItem(undefined)
        nonEditablePassedItemRef.current = item
        openSheetCaller()
    }

    // CustomTypeItem
    async function openCustomTypeItem( tr:RecordsProps, isIncome: boolean ) {
        setIncomeRef(isIncome)
        goToCustomTypeItemDetail()

        let fetchedItems: CustomTypeProps[];
        if ( isIncome ) {
            fetchedItems = await getCustomIncomes( tr.date )
        } else {
            fetchedItems = await getCustomExpenses( tr.date )
        }
        setIsIncome(isIncome)
        setFocusedCustomTypeItem(fetchedItems)
        openSheetCaller()
    }

    // TransferTypeItem
    function openTransferTypeItem( tr:RecordsProps ) {
        goToTransferItemDetails()

        setFocusedTransferTypeItem( tr )
        openSheetCaller()
    }

    // Bottom Sheet things including backdrop - Ref
    const sheetRef = useRef<BottomSheet>(null);
    const backDrop = useCallback(( props:BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
            onPress={() => {
                closeSheetCaller()
            }}  
        />
    ),[])

    function openSheetCaller() {
        openBottomSheet(sheetRef)
    }
    
    function closeSheetCaller(){
        setShowGoBack(false)
        closeBottomSheet(sheetRef)
        prevStates.current = []
    }

    return (
        <SafeAreaView style={{backgroundColor:'#ffffff', minHeight:'100%'}} edges={['top', 'left', 'right']}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <User />
                < AccountCardsSection accounts={accounts}/>
                <RecentTransactionSection 
                    records={records} 
                    fetchRecords={fetchRecordsAgainRef.current} 
                    filterItems={filterItems}
                    onPressFunctions={{
                        openTypeItem: openTypeItem,
                        openCustomTypeItem: openCustomTypeItem,
                        openTransferTypeItem: openTransferTypeItem
                    }}
                    filterButtonPress={openActiveAccountSheet}
                    icon={headerIcon}
                    />
            </ScrollView>
          <BottomSheet 
              index={-1} 
              enableDynamicSizing={true}
              enablePanDownToClose={true}
              ref={sheetRef}
              backdropComponent={backDrop}
              >
              <BottomSheetView>
                <UniversalSheetWrapper title={title} onBackPress={goBack} goBackavailable={prevStates.current.length > 1} onCrossPress={closeSheetCaller}  >
                    {SheetContent()}
                </UniversalSheetWrapper>
              </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
    )
}