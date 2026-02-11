import colors from '@/constants/colors';
import { addNewFundAccount } from '@/db/insert';
import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function BottomSheetWrapepr({ref, badges, refreashBadges, setNotificationMessage, setNotificationType}:any){
    const [ badge, setBadge] = useState<string>('')
    const [ accountName, setAccountName ] = useState<string>('')
    const [ balance, setBalance ] = useState<string>('')

    useEffect(()=> {
        if (badges.length !== 0) {
            setBadge(badges[0].badge)
        }
    }, [badges])

    function addAccount(){
        console.log('addAccount function is runnning')
        if (accountName !== '' && balance !==''){
            const number = Number(balance)
            addNewFundAccount(accountName,badge,number)
            setNotificationMessage('Account Successfully Added')
            setNotificationType('success')
        }
    }

    function clearFields(){
        setAccountName('')
        setBalance('')
    }

    function hideBottomSheet(){
        ref.current?.close()
    }

    function isValidNumber(input: string): boolean {
        if (input.trim() === "") return false;
        return Number.isFinite(Number(input));
    }


    return(
        <View style={FundCreditAccountsStyles.BottomSheetWrapper}>
            {badges.length == 0? 
                <Text style={FundCreditAccountsStyles.MaxAccountText}>You already have maximum allowed active fund accounts</Text>:
                <>
                    <View style={FundCreditAccountsStyles.BottomSheetNameBadgeWrapper}>
                    <TextInput
                        placeholder='Account Name'
                        style={[FundCreditAccountsStyles.BottomSheetNameBalance, FundCreditAccountsStyles.BottomSheetName]}
                        placeholderTextColor={colors.light.primary}
                        onChangeText={text => setAccountName(text)}
                        value={accountName}
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
                            <View style={{width:24, height:24, borderRadius:12, margin:8, backgroundColor:badge}}></View>
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
                    />
                    <View style={FundCreditAccountsStyles.BottomSheetButtonWrapper}>
                        <Pressable 
                            style={[FundCreditAccountsStyles.BottomSheetButtons, FundCreditAccountsStyles.BottomSheetSave]}
                            onPress={() => {
                                addAccount()
                                refreashBadges()
                                clearFields()
                                hideBottomSheet()
                            }}
                            >
                                <Text style={[FundCreditAccountsStyles.BottomSheetButtonText,  FundCreditAccountsStyles.BottomSheetSaveText]}>Save</Text>
                        </Pressable>
                    </View> 
                </>    
            }
            
        </View>
    )
}