import colors from '@/constants/colors';
import { addNewFundAccount } from '@/db/insert';
import { suspendAccount, updateAccount } from '@/db/update';
import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type BottomSheetWrapperProps = {
    ref:any;
    badges:{label:null; badge:string}[];
    refreashFields:() => Promise<void>;
    setNotificationMessage:React.Dispatch<React.SetStateAction<string>>;
    setNotificationType:React.Dispatch<React.SetStateAction<"success" | "error" | "info" | null>>;
    badge:string;
    setBadge:React.Dispatch<React.SetStateAction<string>>;
    accountName:string;
    setAccountName:React.Dispatch<React.SetStateAction<string>>;
    balance: string;
    setBalance:React.Dispatch<React.SetStateAction<string>>;
    fetchAccounts:() => void;
    isNew:boolean;
    focusedAccount:any;
}

export default function BottomSheetWrapepr({
    ref, 
    badges, 
    refreashFields, 
    setNotificationMessage, 
    setNotificationType, 
    badge, 
    setBadge, 
    accountName, 
    setAccountName,
    balance,
    setBalance,
    fetchAccounts,
    isNew,
    focusedAccount
    }:BottomSheetWrapperProps){

    useEffect(()=> {
        if (badges.length !== 0) {
            setBadge(badges[0].badge)
        }
    }, [badges])

    function addAccountCaller(){
        if (accountName !== '' && balance !==''){
            const number = Number(balance)
            addNewFundAccount(accountName,badge,number)
            setNotificationMessage('Account Successfully Added')
            setNotificationType('success')
            return
        }
        hideBottomSheet()
        setNotificationMessage('Invalied Inputs')
        setNotificationType('error')

    }

    async function suspendAccountCaller(id:number){
        const result = await suspendAccount(id)
        refreashFields()
    }

    async function updateAccountCaller(
        id:number, 
        accountName:string, 
        accountBalance:number, 
        accountBadge:string){
        const result = await updateAccount(id,accountName,accountBalance,accountBadge)
        refreashFields()
    }

    function hideBottomSheet(){
        ref.current?.close()
    }

    function isValidNumber(input: string): boolean {
        if (input.trim() === "") return false;
        return Number.isFinite(Number(input));
    }

    function isDisabled(){
        if (focusedAccount && focusedAccount.isActive == 0 && !isNew){
            return true
        } else {
            return false
        }
    }
   
    return(
        <View style={FundCreditAccountsStyles.BottomSheetWrapper}>
            {badges.length == 0 && focusedAccount == undefined? 
                <Text style={FundCreditAccountsStyles.MaxAccountText}>You already have maximum allowed active accounts</Text>:
                <>
                    <View style={FundCreditAccountsStyles.BottomSheetNameBadgeWrapper}>
                    <TextInput
                        placeholder='Account Name'
                        style={[FundCreditAccountsStyles.BottomSheetNameBalance, FundCreditAccountsStyles.BottomSheetName]}
                        placeholderTextColor={colors.light.primary}
                        onChangeText={text => setAccountName(text)}
                        value={accountName}
                        readOnly={isDisabled()}
                    />
                    <Dropdown 
                        style={FundCreditAccountsStyles.BottomSheetDropdown}
                        data={badges}
                        value={badge}
                        labelField='label'
                        valueField='badge'
                        onChange={item =>
                            setBadge(item.badge)}
                        renderItem={item => (
                            <View style={{width:24, height:24, borderRadius:12, margin:8, backgroundColor:item.badge}}></View>
                        )}
                        renderLeftIcon={() => (
                            <View style={{width:24, height:24, borderRadius:100, margin:8, backgroundColor:badge}}></View>
                        )}
                    />
                    </View>
                    <TextInput
                        placeholder='Initial Balance'
                        keyboardType='numeric'
                        style={FundCreditAccountsStyles.BottomSheetNameBalance}
                        placeholderTextColor={colors.light.primary}
                        onChangeText={balance => {
                            const isValied = isValidNumber(balance)
                            if (isValied) {
                                setBalance(balance)
                            } else {
                                hideBottomSheet()
                                setNotificationMessage('Invalied Account Balance')
                                setNotificationType('error')
                            }
                        }}
                        value={balance}
                        readOnly={isDisabled()}
                    />
                    <View style={FundCreditAccountsStyles.BottomSheetButtonWrapper}>
                        {isNew?
                        <Pressable 
                            style={[FundCreditAccountsStyles.BottomSheetButtons, FundCreditAccountsStyles.BottomSheetSave]}
                            onPress={() => {
                                addAccountCaller()
                                refreashFields()
                                hideBottomSheet()
                                fetchAccounts()
                            }}
                            >
                                <Text style={[FundCreditAccountsStyles.BottomSheetButtonText,  FundCreditAccountsStyles.BottomSheetSaveText]}>Save</Text>
                        </Pressable>
                         :
                        <>
                            {isDisabled()?
                                <View>
                                    <Text style={FundCreditAccountsStyles.ConditionalText}>This account is suspended</Text>
                                </View>
                            :
                            <>
                            <Pressable 
                                style={[FundCreditAccountsStyles.BottomSheetButtons, FundCreditAccountsStyles.BottomSheetSuspend]}
                                onPress={() => {
                                    refreashFields()
                                    hideBottomSheet()
                                    fetchAccounts()
                                    suspendAccountCaller(focusedAccount.accountId)
                                }}
                                >
                                    <Text style={[FundCreditAccountsStyles.BottomSheetButtonText,  FundCreditAccountsStyles.BottomSheetSaveText]}>Suspend</Text>
                            </Pressable>
                            <Pressable 
                                style={[FundCreditAccountsStyles.BottomSheetButtons, FundCreditAccountsStyles.BottomSheetSave]}
                                onPress={() => {
                                    updateAccountCaller(focusedAccount.accountId,focusedAccount.name,focusedAccount.initialBalance,focusedAccount.badge)
                                    refreashFields()
                                    hideBottomSheet()
                                    fetchAccounts()
                                }}
                                >
                                    <Text style={[FundCreditAccountsStyles.BottomSheetButtonText,  FundCreditAccountsStyles.BottomSheetSaveText]}>Update</Text>
                            </Pressable>
                            </>
                        }
                            
                        </>
                        }
                    </View> 
                </>    
            }
            
        </View>
    )
}