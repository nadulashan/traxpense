import CommonStyles from '@/styles/commonStyles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

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
    inputNameError:boolean;
    setInputNameError:React.Dispatch<React.SetStateAction<boolean>>;
    inputBalanceError:boolean;
    setInputBalanceError:React.Dispatch<React.SetStateAction<boolean>>;
    type:string;
    focusedAccount:{ accountId: number; accountName: string; accountBadge: string; amount: number; isActive: number; } | null;
    updateAccountHandler:() => void;
    suspendNotification:boolean;
    setSuspendNotification:React.Dispatch<React.SetStateAction<boolean>>;
    saveAccountHandler:() => void;
    suspendAccountHandler:() => void;
    areDependentsPresent: boolean;
    openBadgeScreen: () => void;
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
    inputNameError,
    setInputNameError,
    inputBalanceError,
    setInputBalanceError,
    type,
    focusedAccount,
    updateAccountHandler,
    suspendNotification,
    setSuspendNotification,
    saveAccountHandler,
    suspendAccountHandler,
    areDependentsPresent,
    openBadgeScreen
    }:BottomSheetWrapperProps){



    const renderIcon = useCallback(() => (
        <View style= {{height:24, width:24,borderWidth:1, borderRadius:12, backgroundColor:inputBadge, borderColor:inputBadge}}></View>
    ),[inputBadge])

    return(
        <View style={CommonStyles.BottomSheetWrapper}>
            {renderBottomSheet?
            <>
                {valiedBadges.length == 0 && !focusedAccount?
                <View>
                    <Text style={CommonStyles.NoActionText}>You already have the maximum allowed Active Accounts</Text>
                </View>
                :
                <>
                    <View>                        
                        {suspendNotification? <Text style={CommonStyles.NoActionDangerText}>This action is irreversable. Long Press on the button to continue</Text>:null}
                        {areDependentsPresent? <Text style={CommonStyles.NoActionDangerText}>Cannot suspend because there are one or more dependent Recurring Item(s). Update them to another Active account or suspend them first.</Text>:null}
                        <Text style={CommonStyles.BottomSheetFieldText}>Account Name:</Text>
                        <BottomSheetTextInput
                            value={inputName}
                            onChangeText={name => {
                                if ( name === '' || name.trim().length === 0 ) {
                                    setInputNameError(true)
                                } else {
                                    setInputNameError(false)
                                }
                                setInputName(name)
                            }}
                            style={CommonStyles.BottomSheetInput}
                            readOnly={focusedAccount?.isActive == 0}
                        />
                        {
                            inputNameError?<Text style={CommonStyles.InvalidResponse}>Invalid response</Text> : null
                        }
                    </View>
                    <View>
                        {type == 'fund'? <Text  style={CommonStyles.BottomSheetFieldText}>Initial Balance:</Text>: <Text  style={CommonStyles.BottomSheetFieldText}>Credit limit</Text>}
                        
                        <BottomSheetTextInput
                            value={inputBalance}
                            onChangeText={balance => {                            
                                if (checkTypes(balance)){
                                    setInputBalanceError(false)
                                } else {
                                    setInputBalanceError(true)
                                }
                                setInputBalance(balance)
                            }}
                            style={CommonStyles.BottomSheetInput}
                            keyboardType='numeric'
                            readOnly={focusedAccount?.isActive == 0}
                        />
                        {
                            inputBalanceError?
                                <Text style={CommonStyles.InvalidResponse}>Invalid response</Text> 
                            :
                                null
                        }
                    </View>
                    {focusedAccount?.isActive == 0? 
                        null
                    :                    
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Account Badge:</Text>
                        {/* <Dropdown
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
                        /> */}
                        <Pressable
                            style={CommonStyles.BottomSheetSelect}
                            onPress={openBadgeScreen}
                        >
                            {
                                inputBadge !== ''?
                                <View style={[CommonStyles.badge, {backgroundColor:inputBadge, marginLeft:16, marginRight:16}]}></View>
                                :
                                <Text>Select a badge</Text>
                            }
                        </Pressable>
                    </View>}
                    <View style={CommonStyles.BottomSheetButtonWrapper}>
                        {focusedAccount?
                        <>               
                            { focusedAccount.isActive == 0? 
                            <Text style={CommonStyles.NoActionText}>This Account is suspended</Text>
                            :
                            <>
                                <Pressable 
                                    style={[CommonStyles.BottomSheetSecondaryButton, CommonStyles.BottomSheetButton]}
                                    onPress={() => setSuspendNotification(true)}
                                    onLongPress={() => {
                                        if (!inputNameError && !inputBalanceError){
                                            suspendAccountHandler()
                                        }
                                    }}
                                >
                                    <Text style={CommonStyles.BottomSheetButtonText}>Suspend</Text>
                                </Pressable>
                                <Pressable 
                                    style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                                    onPress={() => {
                                        if (!inputNameError && !inputBalanceError){
                                            updateAccountHandler()
                                        }
                                    }}
                                >
                                    <Text style={CommonStyles.BottomSheetButtonText}>Update</Text>
                                </Pressable>
                            </>
                            }        
                            
                        </>
                        :                        
                        <Pressable 
                            style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                            onPress={() => {
                                if (inputName != '' && inputBalance != '' && !inputNameError && !inputBalanceError){
                                    saveAccountHandler()
                                }
                            }}
                        >
                            <Text style={CommonStyles.BottomSheetButtonText}>Save</Text>
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