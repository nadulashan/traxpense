import FundCreditAccountsStyles from '@/styles/fundCreditAccountsStyles';
import { useCallback, useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type BottomSheetWrapperProps = {
    valiedBadges:{ label: null; badge: string; }[];
    inputName:string;
    inputBalance:string;
    inputBadge:string;
    setInputName:React.Dispatch<React.SetStateAction<string>>;
    setInputBalance:React.Dispatch<React.SetStateAction<string>>;
    setInputBadge:React.Dispatch<React.SetStateAction<string>>;
    renderBottomSheet:boolean;
    checkTypes:(balance:string) => boolean;
    addAccountCaller:(name:string, badge:string, balance:number) => void;
    resetInputs:() => void;
    closeBottomSheet:() => void;
    refreshValiedBadges:() => void;
    inputNameError:boolean;
    setInputNameError:React.Dispatch<React.SetStateAction<boolean>>;
    inputBalanceError:boolean;
    setInputBalanceError:React.Dispatch<React.SetStateAction<boolean>>;
    resetRenderBottomSheet:() => void;
    type:string;
    resetIsAccountsReady:() => void;
    refreshAccounts:() => void;
    focusedAccount:{ accountId: number; name: string; badge: string; amount: number; isActive: number; } | null;
    suspendAccountCaller:(id:number) => void;
    updateAccountCaller:(id:number, name:string, balance:number, badge:string) => void;
    suspendNotification:boolean;
    setSuspendNotification:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomSheetWrapper({
    valiedBadges,
    inputName,
    inputBalance,
    inputBadge,
    setInputName,
    setInputBalance,
    setInputBadge,
    renderBottomSheet,
    checkTypes,
    addAccountCaller,
    resetInputs,
    closeBottomSheet,
    refreshValiedBadges,
    inputNameError,
    setInputNameError,
    inputBalanceError,
    setInputBalanceError,
    resetRenderBottomSheet,
    type,
    resetIsAccountsReady,
    refreshAccounts,
    focusedAccount,
    suspendAccountCaller,
    updateAccountCaller,
    suspendNotification,
    setSuspendNotification
    }:BottomSheetWrapperProps){


    useEffect(() => {
        if (!focusedAccount && renderBottomSheet && valiedBadges.length !== 0) {
            setInputBadge(valiedBadges[0].badge)
        }
    },[renderBottomSheet, focusedAccount])

    const renderIcon = useCallback(() => (
        <View style= {{height:24, width:24,borderWidth:1, borderRadius:12, backgroundColor:inputBadge, borderColor:inputBadge}}></View>
    ),[inputBadge])

    return(
        <View style={FundCreditAccountsStyles.BottomSheetWrapper}>
            {renderBottomSheet?
            <>
                {valiedBadges.length == 0 && !focusedAccount?
                <View>
                    <Text style={FundCreditAccountsStyles.NoActionText}>You already have the maximum allowed Active Accounts</Text>
                </View>
                :
                <>
                    <View>                        
                        {suspendNotification? <Text style={FundCreditAccountsStyles.NoActionDangerText}>This action is IRREVERSIBLE. Long Press on the button to continue</Text>:null}
                        <Text style={FundCreditAccountsStyles.BottomSheetFieldText}>Account Name:</Text>
                        <TextInput
                            value={inputName}
                            onChangeText={name => {
                                if (name == '') {
                                    setInputNameError(true)
                                } else {
                                    setInputNameError(false)
                                }
                                setInputName(name)
                            }}
                            style={FundCreditAccountsStyles.BottomSheetInput}
                            readOnly={focusedAccount?.isActive == 0}
                        />
                        {
                            inputNameError?<Text style={FundCreditAccountsStyles.InvalidResponse}>Invalid response</Text> : null
                        }
                    </View>
                    <View>
                        {type == 'fund'? <Text  style={FundCreditAccountsStyles.BottomSheetFieldText}>Initial Balance:</Text>: <Text  style={FundCreditAccountsStyles.BottomSheetFieldText}>Credit limit</Text>}
                        
                        <TextInput
                            value={inputBalance}
                            onChangeText={balance => {                            
                                if (checkTypes(balance)){
                                    setInputBalanceError(false)
                                } else {
                                    setInputBalanceError(true)
                                }
                                setInputBalance(balance)
                            }}
                            style={FundCreditAccountsStyles.BottomSheetInput}
                            keyboardType='numeric'
                            readOnly={focusedAccount?.isActive == 0}
                        />
                        {
                            inputBalanceError?
                                <Text style={FundCreditAccountsStyles.InvalidResponse}>Invalid response</Text> 
                            :
                                null
                        }
                    </View>
                    {focusedAccount?.isActive == 0? 
                        null
                    :                    
                    <View style={FundCreditAccountsStyles.BottomSheetBadgeWrapper}>
                        <Text  style={FundCreditAccountsStyles.BottomSheetFieldText}>Account Badge:</Text>
                        <Dropdown
                            data= {valiedBadges}
                            labelField={'label'}
                            valueField={'value'}
                            value={inputBadge}
                            placeholder=''
                            onChange={badge => setInputBadge(badge.badge)}
                            showsVerticalScrollIndicator={false}
                            renderLeftIcon={renderIcon}
                            renderItem={item => (
                                <View style={{width:24, height:24, borderRadius:12, margin:8, backgroundColor:item.badge}}></View>
                            )}
                        />
                    </View>}
                    <View style={FundCreditAccountsStyles.BottomSheetButtonWrapper}>
                        {focusedAccount?
                        <>               
                            { focusedAccount.isActive == 0? 
                            <Text style={FundCreditAccountsStyles.NoActionText}>This Account is suspended</Text>
                            :
                            <>
                                <Pressable 
                                    style={[FundCreditAccountsStyles.BottomSheetSuspendButton, FundCreditAccountsStyles.BottomSheetButton]}
                                    onPress={() => setSuspendNotification(true)}
                                    onLongPress={() => {
                                        if (!inputNameError && !inputBalanceError){
                                            suspendAccountCaller(focusedAccount.accountId)
                                            resetInputs()
                                            refreshValiedBadges()
                                            refreshAccounts()
                                            closeBottomSheet()
                                            resetRenderBottomSheet()
                                            resetIsAccountsReady()
                                        }
                                    }}
                                >
                                    <Text style={FundCreditAccountsStyles.BottomSheetButtonText}>Suspend</Text>
                                </Pressable>
                                <Pressable 
                                    style={[FundCreditAccountsStyles.BottomSheetUpdateButton, FundCreditAccountsStyles.BottomSheetButton]}
                                    onPress={() => {
                                        if (!inputNameError && !inputBalanceError){
                                            updateAccountCaller(focusedAccount.accountId, inputName,Number(inputBalance), inputBadge)
                                            resetInputs()
                                            refreshValiedBadges()
                                            refreshAccounts()
                                            closeBottomSheet()
                                            resetRenderBottomSheet()
                                            resetIsAccountsReady()
                                        }
                                    }}
                                >
                                    <Text style={FundCreditAccountsStyles.BottomSheetButtonText}>Update</Text>
                                </Pressable>
                            </>
                            }        
                            
                        </>
                        :                        
                        <Pressable 
                            style={[FundCreditAccountsStyles.BottomSheetSaveButton, FundCreditAccountsStyles.BottomSheetButton]}
                            onPress={() => {
                                if (inputName != '' && inputBalance != '' && !inputNameError && !inputBalanceError){
                                    addAccountCaller(inputName,inputBadge,Number(inputBalance))
                                    resetInputs()
                                    refreshValiedBadges()
                                    refreshAccounts()
                                    closeBottomSheet()
                                    resetRenderBottomSheet()
                                    resetIsAccountsReady()
                                }
                            }}
                        >
                            <Text style={FundCreditAccountsStyles.BottomSheetButtonText}>Save</Text>
                        </Pressable>
                        
                        }
                    </View>
                </>
                }
            </>:
            <Text>Loading</Text>
            }
        </View>
    )
}