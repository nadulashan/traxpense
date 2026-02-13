import { getAccount } from '@/db/select';
import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { Pressable, Text, View } from 'react-native';
import AccountCard from './accountCard';
import FundCreditAddButton from './fundCreditAddButton';

type ContentWrapperProps = {
    openBottomSheet:() => void;
    accounts:{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}[];
    setBalance:React.Dispatch<React.SetStateAction<string>>;
    setAccountName:React.Dispatch<React.SetStateAction<string>>;
    setBadge:React.Dispatch<React.SetStateAction<string>>;
    refreashFields:() => Promise<void>;
    setIsNew:React.Dispatch<React.SetStateAction<boolean>>;
    setFocusedAccount:any;
}

export default function FundCreditAccountsContentWrapper({
    openBottomSheet, 
    accounts, 
    setAccountName, 
    setBalance, 
    setBadge,
    refreashFields, 
    setIsNew,
    setFocusedAccount }:ContentWrapperProps) {
    // console.log(accounts)
    async function handleManage(id:number){
        const account = await getAccount(id)
        if (!account){
            console.error('Could fetch account data')
            return
        }
        setAccountName(account.name)
        setBalance(account.initialBalance.toString())
        setBadge(account.badge)
        openBottomSheet()
    }
    return(
        <View style={FundCreditAccountsStyles.ContentWrapper}>
            {accounts.length!==0?
                accounts.map((account:{accountId: number;name:string; badge:string;initialBalance:number;isActive:number;}) => (
                    <View key={account.accountId} style={FundCreditAccountsStyles.CardManageButtonWrapper}>
                        <AccountCard name={account.name} balance={account.initialBalance.toString()} color={account.badge? account.badge:'#ffffff'} category={null}/>
                        <Pressable 
                            onPress={() => {
                                handleManage(account.accountId)
                                setIsNew(false)
                                setFocusedAccount(account)
                            }}
                            style={FundCreditAccountsStyles.ManageButton}>
                                <Text style={FundCreditAccountsStyles.ManageButtonText}>Manage</Text>
                        </Pressable>
                    </View>
                ))
                : 
                <View>
                    <Text style={FundCreditAccountsStyles.ConditionalText}>Looks like you don't have any fund account. Create New fund account to spend on expenses</Text>
                </View>
            }
            <FundCreditAddButton 
                handlePress={openBottomSheet}
                refreashFields={refreashFields}
            />
        </View>
    )
}