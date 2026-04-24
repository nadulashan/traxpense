import colors from '@/constants/colors';
import CommonStyles from '@/styles/commonStyles';
import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { AccountProps } from '@/types/settingsProps';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import AccountCard from './accountCard';

type ContentWrapperProps = {
    openBottomSheet: () => void;
    isAccountsReady:boolean;
    fetchedAccounts:AccountProps[];
    focusedAccount:{ accountId: number; accountName: string; accountBadge: string; amount: number; isActive: number; } | null;
    setFocusedAccount:React.Dispatch<React.SetStateAction<{ accountId: number; accountName: string; accountBadge: string; amount: number; isActive: number; } | null>>;
    setInputName:React.Dispatch<React.SetStateAction<string>>;
    setInputBalance:React.Dispatch<React.SetStateAction<string>>;
    setInputBadge:React.Dispatch<React.SetStateAction<string>>;
}

export default function FundCreditAccountsContentWrapper({
    openBottomSheet,
    isAccountsReady,
    fetchedAccounts,
    focusedAccount,
    setFocusedAccount,
    setInputName,
    setInputBalance,
    setInputBadge,
    }:ContentWrapperProps) {

    // Update the states of the inputs when focused accout is updated
    useEffect(() => {
        if(focusedAccount){
            setInputName(focusedAccount.accountName)
            setInputBalance((focusedAccount.amount/100).toString())
            setInputBadge(focusedAccount.accountBadge)
        } else {
            setInputName('')
            setInputBalance('')
            setInputBadge('')
        }
    }, [focusedAccount])

    return(
        <>
        {isAccountsReady? 
        <View style={FundCreditAccountsStyles.AccountContentWrapper}>
            {fetchedAccounts.length !== 0?
            <>
                {
                    fetchedAccounts.map(account => (
                        <View key={account.accountId} style={FundCreditAccountsStyles.AccountButtonWrapper}>
                            <AccountCard account={account} showRecent={false} isInitialBalance={true}/>
                            <Pressable 
                                style={FundCreditAccountsStyles.ManageButtonWrapper}
                                onPress={() => {
                                    setFocusedAccount(account)
                                    openBottomSheet()
                                }}
                            >
                                <Text style={FundCreditAccountsStyles.ManageButtonText}>Manage</Text>
                            </Pressable>
                        </View>
                    ))
                }
            </>
            :
            <Text style={CommonStyles.NoActionText}>Looks like you don't have any accounts. Create one to start spending on expenses</Text>
            }
        </View>
        :
        <View style={CommonStyles.ActivityIndicatorWrapper}>
                <ActivityIndicator 
                    size='large'
                    color={colors.light.primary}
                />
        </View>
        }
        </>
    )
}