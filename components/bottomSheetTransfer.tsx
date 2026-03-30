import { useCheckContext } from '@/context/recordsContext';
import { deleteTransfer } from '@/db/records/delete';
import { addTransfer } from '@/db/records/insert';
import { getActiveAccounts } from '@/db/records/select';
import { updateTransfer } from '@/db/records/update';
import { checkTypes } from '@/func/bottomSheetfunc';
import { checkNegativeBalance } from '@/func/general';
import { getLocalTime } from '@/func/time';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { TransferTypes } from '@/types/recordsTypeItemType.schema';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import FormAccountWrapper from './recordFormAccountWrapper';

interface Accounts{
    accountId:number;
    accountName:string;
    accountBadge:string;
}

interface TransferFormTypes{
    handleFromAccountSelector:() => void;
    handleToAccountSelector:() => void;
    transferFromAccount:Accounts | undefined;
    transferToAccount:Accounts | undefined;
    amount:string;
    accountError:boolean;
    amountError:boolean;
    transferFromError: boolean;
    transferToError:boolean;
    onTransferPress:() => void;
    comment:string;
    setComment:React.Dispatch<React.SetStateAction<string>>;
    isEdit:boolean;
    handleDelete:() => void;
    onPressWarn:boolean;
    setOnPressWarn:React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdate: () => void;
    onChangeAmountText: ( value: string ) => void;
    negativeBalanceError: boolean;
}

function TransferFrom({ 
    handleFromAccountSelector, 
    handleToAccountSelector,
    transferFromAccount, 
    transferToAccount, 
    amount,
    accountError,
    amountError,
    transferFromError,
    transferToError,
    onTransferPress,
    comment,
    setComment,
    isEdit,
    handleDelete,
    onPressWarn,
    setOnPressWarn,
    handleUpdate,
    onChangeAmountText,
    negativeBalanceError
} : TransferFormTypes) {
    return (
        <View style={{gap:16}}>   
            {
                onPressWarn?
                <Text style={[CommonStyles.NoActionDangerText, {textAlign:'center'}]}>This Action is irreversible. Long Press to continue</Text>
                :
                null
            }
            <View>   
                <View style={RecordStyles.AccountSelectWrapper}>
                    <View style={{flex:7}}>
                        <Text style={CommonStyles.BottomSheetFieldText}>From :</Text>
                        <Pressable 
                        onPress={handleFromAccountSelector}
                        style={[RecordStyles.AddItemSelect, RecordStyles.AddItemSelectAccount]}>
                            {
                                transferFromAccount? 
                                <View style={RecordStyles.CategoryElement}>
                                    <View style={[CommonStyles.badge, {backgroundColor:transferFromAccount.accountBadge}]}></View>
                                    <Text style={RecordStyles.CategoryElementText}>{transferFromAccount.accountName}</Text>
                                </View>
                                :
                                <Text style={RecordStyles.AddItemSelectText}>Select Account</Text>
                            }
                        </Pressable>
                        {
                            transferFromError?
                            <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text>
                            :
                            null
                        }
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Feather name="chevron-right" size={24} color="black" />
                    </View>
                    <View style={{flex:7}}>
                        <Text style={CommonStyles.BottomSheetFieldText}>To :</Text>
                        <Pressable 
                        onPress={handleToAccountSelector}
                        style={[RecordStyles.AddItemSelect, RecordStyles.AddItemSelectAccount]}>
                            {
                                transferToAccount? 
                                <View style={RecordStyles.CategoryElement}>
                                    <View style={[CommonStyles.badge, {backgroundColor:transferToAccount.accountBadge}]}></View>
                                    <Text style={RecordStyles.CategoryElementText}>{transferToAccount.accountName}</Text>
                                </View>
                                :
                                <Text style={RecordStyles.AddItemSelectText}>Select Account</Text>
                            }
                        </Pressable>
                        {
                            transferToError?
                            <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text>
                            :
                            null
                        }
                    </View>
                </View>
                {
                    accountError?
                    <Text style={CommonStyles.NoActionDangerText}>Cannot Transfer to the same account</Text>
                    :
                    null
                }
            </View>  
            <View>
                <TextInput
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={value => {
                        onChangeAmountText( value )
                    }}
                    style={CommonStyles.BottomSheetInput}
                    placeholder='Enter Amount'
                />  
                {
                    amountError?
                    <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text>
                    :
                    null
                }
            </View>      
            <TextInput
                multiline={true}
                value={comment}
                onChangeText={value => setComment(value)}
                style={CommonStyles.BottomSheetInput}
                placeholder='Comment ( optional )'
            /> 
            {
                negativeBalanceError?
                <Text style={[CommonStyles.NoActionDangerText, {textAlign:'center'}]}>Not Enough Balance</Text>
                :
                null
            }    
            {
                !isEdit?
                <Pressable
                onPress={onTransferPress}
                style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                >
                    <Text style={CommonStyles.BottomSheetButtonText}>Transfer</Text>
                </Pressable>
                :
                <View style={CommonStyles.BottomSheetButtonWrapper}>
                    <Pressable
                        onPress={() => setOnPressWarn(true)}
                        onLongPress={handleDelete}
                        style={[CommonStyles.BottomSheetSecondaryButton, CommonStyles.BottomSheetButton]}
                        >
                        <Text style={CommonStyles.BottomSheetButtonText}>DELETE</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleUpdate}
                        style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                        >
                        <Text style={CommonStyles.BottomSheetButtonText}>UPDATE</Text>
                    </Pressable>
                </View>    
            }
        </View>
    )
}

interface TransferFormType{
    focusedItem: React.RefObject<TransferTypes | undefined>;
}

export default function Transfers({ focusedItem } : TransferFormType) {
    const { focusedDate, closeStateSheetCaller, setRecordsRefreshTrigger } = useCheckContext()

    const type = useRef< 'to' | 'from' | undefined >(undefined)
    const [ transferFromAccount, setTransferFromAccount ] = useState<Accounts | undefined>(undefined)
    const transferFromRef = useRef< number | undefined >(undefined)
    const [ transferToAccount, setTransferToAccount ] = useState<Accounts | undefined>(undefined)
    const transferToRef = useRef< number | undefined >(undefined)
    const [ amount, setAmount ] = useState<string>('')
    const [ comment, setComment ] = useState< string >('')
    const [ accountError, setAccountError ] = useState(false)
    const [ amountError, setAmountError ] = useState(false)
    const amountErrorRef = useRef(false)
    const [ transferFromError, setTransferFromError ] = useState(false)
    const [ transferToError, setTransferToError ] = useState(false)


    const [ accounts, setAccounts ] = useState<Accounts[] | null>(null)

    const [ isEdit, setIsEdit ] = useState(false)
    const [ onPressWarn, setOnPressWarn ] = useState(false)
    const [ negativeBalanceError, setNegativeBalanceError ] = useState(false)
    const negativeBalanceErrorRef = useRef(false)

    async function refreashAccounts() {
        const fetchedAccounts = await getActiveAccounts()
        setAccounts(fetchedAccounts)
    }

    function handleAccountSelector() {
        setCurrentScreen('ACCOUNT_SELECT')
        refreashAccounts()
    }onTransferPress

    function handleFromAccountSelector() {
        type.current = 'from'
        handleAccountSelector()
    }

    function handleToAccountSelector() {
        type.current = 'to'
        handleAccountSelector()
    }

    function handleAccountPress(acc:Accounts) {

        if ( type.current ===  'from' ) {
            transferFromRef.current = acc.accountId
            setTransferFromAccount(acc)
        } else {
            transferToRef.current = acc.accountId
            setTransferToAccount(acc)
        }
        setCurrentScreen('DEFAULT')


        if ( transferFromRef.current === transferToRef.current ) {
            setAccountError(true)
            setTransferFromAccount(undefined)
            transferFromRef.current = undefined
            setTransferToAccount(undefined)
            transferToRef.current = undefined
            return
        } else {
            setAccountError(false)
        }
    }

    async function checkValidity() {
        if ( amount === '' || amount.trim().length === 0 ) {
            setAmountError(true)
        } else {
            setAmountError(false)
        }

        if ( !transferFromAccount ) {
            setTransferFromError(true)
        } else {
            setTransferFromError(false)
        }

        if ( !transferToAccount ) {
            setTransferToError(true)
        } else {
            setTransferToError(false)
        }

        if ( transferFromAccount && !amountErrorRef.current ) {

            const error = await checkNegativeBalance( transferFromAccount.accountId, amount, focusedItem)

            setNegativeBalanceError(error)
            negativeBalanceErrorRef.current = error
        }
    }

    function onChangeAmountText( value: string ) {
        setAmount(value.trim())
        setNegativeBalanceError(false)
        negativeBalanceErrorRef.current = false

        if ( !checkTypes(value) ) {
            setAmountError(true)
            amountErrorRef.current = true
        } else {
            setAmountError(false)
            amountErrorRef.current = false
        }
    }

    async function onTransferPress() {

        await checkValidity()

        if ( !amountErrorRef.current && transferFromAccount && transferToAccount && !negativeBalanceErrorRef.current) {
            const todayDateTime = getLocalTime().toISOString()
            await addTransfer(transferFromAccount.accountId, transferToAccount.accountId, comment, focusedDate, todayDateTime, Number(amount) )
            setRecordsRefreshTrigger(inc => inc+1)
            closeStateSheetCaller()
        }
    }
    
    // Edit
    function updateStatesUnderFocused() {
        if ( focusedItem.current ) {
            setIsEdit(true)
            setTransferFromAccount({accountId:focusedItem.current.transferFrom, accountName:focusedItem.current.from_account_name, accountBadge:focusedItem.current.from_account_badge})
            transferFromRef.current = focusedItem.current.transferFrom
            setTransferToAccount({accountId:focusedItem.current.transferTo, accountName:focusedItem.current.to_account_name, accountBadge:focusedItem.current.to_account_badge})
            transferToRef.current = focusedItem.current.transferTo
            setAmount((focusedItem.current.amount / 100).toString())
            if ( focusedItem.current.comment ) {
                setComment(focusedItem.current.comment)
            }
            setCurrentScreen('DEFAULT')
        }
    }

    useEffect(() => {
        updateStatesUnderFocused()
    }, [ focusedItem.current ])

    // Delete
    async function handleDelete() {
        if ( focusedItem.current ) {
            await deleteTransfer(focusedItem.current.transferId)
        }
        setRecordsRefreshTrigger(inc => inc + 1)
        closeStateSheetCaller()
    }

    // update
    async function handleUpdate() {
        await checkValidity()        

        if ( !amountErrorRef.current && transferFromAccount && transferToAccount && focusedItem.current && !negativeBalanceErrorRef.current ) {
            await updateTransfer(transferFromAccount.accountId, transferToAccount.accountId, Number(amount), comment, focusedItem.current.transferId)
            setRecordsRefreshTrigger(inc => inc + 1)
            closeStateSheetCaller()
        }

    }

    const [ currentScreen, setCurrentScreen ] = useState<'DEFAULT' | 'ACCOUNT_SELECT'>('DEFAULT')

    const SCREENS = {
        DEFAULT: () => <TransferFrom
                            handleFromAccountSelector={handleFromAccountSelector}
                            handleToAccountSelector={handleToAccountSelector}
                            transferFromAccount={transferFromAccount}
                            transferToAccount={transferToAccount}
                            amount={amount}
                            accountError={accountError}
                            amountError={amountError}
                            transferFromError={transferFromError}
                            transferToError={transferToError}
                            onTransferPress={onTransferPress}
                            comment={comment}
                            setComment={setComment}
                            isEdit={isEdit}
                            onPressWarn={onPressWarn}
                            setOnPressWarn={setOnPressWarn}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                            onChangeAmountText={onChangeAmountText}
                            negativeBalanceError={negativeBalanceError}
                        />,

        ACCOUNT_SELECT: () => <FormAccountWrapper
                                    accounts={accounts}
                                    onAccountPress={handleAccountPress}
                            />
    }

    const renderScreen = SCREENS[currentScreen]

    return (
        <View style={{padding:16}}>
            {renderScreen()}
        </View>
    )
}