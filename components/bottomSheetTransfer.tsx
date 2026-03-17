import { useCheckContext } from '@/context/recordsContext';
import { addTransfer } from '@/db/records/insert';
import { getActiveAccounts } from '@/db/records/select';
import { checkTypes } from '@/func/bottomSheetfunc';
import { getLocalTime } from '@/func/time';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import Feather from '@expo/vector-icons/Feather';
import { useRef, useState } from 'react';
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
    setAmount:React.Dispatch<React.SetStateAction<string>>;
    accountError:boolean;
    amountError:boolean;
    setAmountError:React.Dispatch<React.SetStateAction<boolean>>;
    onTransferPress:() => void;
    comment:string;
    setComment:React.Dispatch<React.SetStateAction<string>>;
}

function TransferFrom({ 
    handleFromAccountSelector, 
    handleToAccountSelector,
    transferFromAccount, 
    transferToAccount, 
    amount,
    setAmount,
    accountError,
    amountError,
    setAmountError,
    onTransferPress,
    comment,
    setComment
} : TransferFormTypes) {
    return (
        <View style={{gap:16}}>   
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
                        setAmount(value.trim())
                        if ( !checkTypes(value) ) {
                            setAmountError(true)
                        } else {
                            setAmountError(false)
                        }
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
            <Pressable
                onPress={onTransferPress}
                style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
            >
                <Text style={CommonStyles.BottomSheetButtonText}>Transfer</Text>
            </Pressable>
        </View>
    )
}

export default function Transfers() {
    const { focusedDate, closeSheetCaller, setRecordsRefreshTrigger } = useCheckContext()

    const type = useRef< 'to' | 'from' | undefined >(undefined)
    const [ transferFromAccount, setTransferFromAccount ] = useState<Accounts | undefined>(undefined)
    const transferFromRef = useRef< number | undefined >(undefined)
    const [ transferToAccount, setTransferToAccount ] = useState<Accounts | undefined>(undefined)
    const transferToRef = useRef< number | undefined >(undefined)
    const [ amount, setAmount ] = useState<string>('')
    const [ comment, setComment ] = useState< string >('')
    const [ accountError, setAccountError ] = useState(false)
    const [ amountError, setAmountError ] = useState(false)

    const [ accounts, setAccounts ] = useState<Accounts[] | null>(null)

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

    function onTransferPress() {
        if ( amount === '' ) {
            setAmountError(true)
        }

        if ( !amountError && transferFromAccount && transferToAccount ) {
            const todayDateTime = getLocalTime().toISOString()
            addTransfer(transferFromAccount.accountId, transferToAccount.accountId, comment, focusedDate, todayDateTime, Number(amount) )
            setRecordsRefreshTrigger(inc => inc+1)
            closeSheetCaller()
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
                            setAmount={setAmount}
                            accountError={accountError}
                            amountError={amountError}
                            setAmountError={setAmountError}
                            onTransferPress={onTransferPress}
                            comment={comment}
                            setComment={setComment}
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