import { getActiveAccounts } from '@/db/records/select';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import FormAccountWrapper from './recordFormAccountWrapper';

interface Accounts{
    accountId:number;
    accountName:string;
    accountBadge:string;
}

interface TransferFormTypes{
    handleAccountSelector:() => void;
    transferFromAccount:Accounts | undefined;
    transferToAccount:Accounts | undefined;
    amount:string;
    setAmount:React.Dispatch<React.SetStateAction<string>>
}

function TransferFrom({ 
    handleAccountSelector, 
    transferFromAccount, 
    transferToAccount, 
    amount,
    setAmount} : TransferFormTypes) {
    return (
        <>        
            <View style={RecordStyles.AccountSelectWrapper}>
                <View style={{flex:2}}>
                    <Text style={CommonStyles.BottomSheetFieldText}>From :</Text>
                    <Pressable 
                    onPress={handleAccountSelector}
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
                <View style={{flex:1}}></View>
                <View style={{flex:2}}>
                    <Text style={CommonStyles.BottomSheetFieldText}>From :</Text>
                    <Pressable 
                    onPress={handleAccountSelector}
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
            </View>
            <TextInput/>            
        </>
    )
}

export default function Transfers() {

    const [ transferFromAccount, setTransferFromAccount ] = useState<Accounts | undefined>(undefined)
    const [ transferToAccount, setTransferToAccount ] = useState<Accounts | undefined>(undefined)
    const [ amount, setAmount ] = useState<string>('')

    const [ accounts, setAccounts ] = useState<Accounts[] | null>(null)

    async function refreashAccounts() {
        const fetchedAccounts = await getActiveAccounts()
        setAccounts(fetchedAccounts)
    }

    function handleAccountSelector() {
        setCurrentScreen('ACCOUNT_SELECT')
        refreashAccounts()
    }

    function handleAccountPress(acc:Accounts) {
        console.log(acc)
    }

    const [ currentScreen, setCurrentScreen ] = useState<'DEFAULT' | 'ACCOUNT_SELECT'>('DEFAULT')

    const SCREENS = {
        DEFAULT: () => <TransferFrom
                            handleAccountSelector={handleAccountSelector}
                            transferFromAccount={transferFromAccount}
                            transferToAccount={transferToAccount}
                            amount={amount}
                            setAmount={setAmount}
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