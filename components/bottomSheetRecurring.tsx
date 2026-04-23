import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { ActiveAccountsProps } from '@/types/recordsTypeItemType.schema';
import { RecurringCategory } from '@/types/recurring.schema';
import { Pressable, Text, TextInput, View } from 'react-native';

interface SelectionScreenHandlerProps{
    openFreq: () => void;
    openFreqMon: () => void;
    openFreqDate: () => void;
    openFreqDay: () => void;
    openFreqTime: () => void;
    openAccount: () => void;
    openBadge: () => void;
}

type BottomSheetRecurringProps = {
    badges:{ id:number, label: null; value: string; }[];
    inputName:string;
    setInputName:React.Dispatch<React.SetStateAction<string>>;
    inputAmount:string;
    setInputAmount:React.Dispatch<React.SetStateAction<string>>;
    inputBadge:string;
    frequency:{label:string, value:string}[];
    inputFrequency:string;
    inputFrequencyMonth:number
    inputFrequencyDate:number | undefined;
    inputFrequencyDay:number;
    inputFrequencyTime:string;
    saveHandler : () => void;
    checkTypes:(input:string) => boolean;
    accounts: ActiveAccountsProps[];
    inputAccount:ActiveAccountsProps | undefined;
    inputNameError:boolean;
    setInputNameError:React.Dispatch<React.SetStateAction<boolean>>
    inputAmountError:boolean;
    setInputAmountError:React.Dispatch<React.SetStateAction<boolean>>;
    focusedCategory: RecurringCategory | null;
    updateHandler: () => void;
    suspendHandler: () => void;
    suspendNotification: boolean;
    setSuspendNotification:React.Dispatch<React.SetStateAction<boolean>>;
    selectionScreenHandler: SelectionScreenHandlerProps;
}

export default function BottomSheetRecurring({
    badges,
    inputName,
    setInputName,
    inputAmount,
    setInputAmount,
    inputBadge,
    frequency,
    inputFrequency,
    inputFrequencyMonth,
    inputFrequencyDate,
    inputFrequencyDay,
    inputFrequencyTime,
    saveHandler,
    checkTypes,
    accounts,
    inputAccount,
    inputNameError,
    setInputNameError,
    inputAmountError,
    setInputAmountError,
    focusedCategory,
    updateHandler,
    suspendHandler,
    suspendNotification,
    setSuspendNotification,
    selectionScreenHandler
}:BottomSheetRecurringProps ) {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saterday'
    ]
    
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    return (
        <View style={CommonStyles.BottomSheetWrapper}>
            {
                badges.length === 0?
                <View>
                    <Text style={CommonStyles.NoActionText}>You already have the maximum allowed Active Categories</Text>
                </View>
                : accounts.length === 0?
                <View>
                    <Text style={CommonStyles.NoActionText}>Unable to fetch Active Accounts to create a recurring category</Text>
                </View>
                :    
                <>
                <View>
                    {
                        suspendNotification ? <Text style={CommonStyles.NoActionDangerText}>This action is irreversable. Long Press on the button to continue</Text> : null
                    }
                <Text style={CommonStyles.BottomSheetFieldText}>Name: </Text>
                <TextInput
                    style={CommonStyles.BottomSheetInput}
                    value={inputName}
                    onChangeText={value => {
                        setInputName(value)
                        if ( value === '' || value.trim().length === 0 ) {
                            setInputNameError(true)
                        } else {
                            setInputNameError(false)
                        }
                    }}
                />
                {
                    inputNameError?<Text style={CommonStyles.InvalidResponse}>Invalid response</Text> : null
                }
                </View>
                <View>
                    <Text style={CommonStyles.BottomSheetFieldText}>Amount: </Text>
                    <TextInput
                        style={CommonStyles.BottomSheetInput}
                        value={inputAmount}
                        onChangeText={value => {
                            setInputAmount(value)
                            setInputAmountError(!checkTypes(value))
                            if ( value === '' ) {
                                setInputAmountError(true)
                            }
                        }}
                        keyboardType='numeric'
                    />
                    {
                        inputAmountError?<Text style={CommonStyles.InvalidResponse}>Invalid response</Text> : null
                    }
                </View>
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                    <Text  style={CommonStyles.BottomSheetFieldText}>Frequency: </Text>
                    <Pressable
                            style={CommonStyles.BottomSheetSelectRecurring}
                            onPress={selectionScreenHandler.openFreq}
                        >
                        <Text style={CommonStyles.BottomSheetSelectTextRecurring}>{inputFrequency}</Text>
                    </Pressable>
                </View>
                {
                    inputFrequency === frequency[0].value || inputFrequency === frequency[1].value|| inputFrequency === frequency[2].value|| inputFrequency === frequency[3].value ?
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Month: </Text>
                        <Pressable
                            style={CommonStyles.BottomSheetSelectRecurring}
                            onPress={selectionScreenHandler.openFreqMon}
                        >
                        <Text style={CommonStyles.BottomSheetSelectTextRecurring}>{month[inputFrequencyMonth]}</Text>
                    </Pressable>
                    </View>
                    :
                    null
                }
                {
                    inputFrequency === frequency[5].value ?
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Day: </Text>
                        <Pressable
                            style={CommonStyles.BottomSheetSelectRecurring}
                            onPress={selectionScreenHandler.openFreqDay}
                        >
                        <Text style={CommonStyles.BottomSheetSelectTextRecurring}>{days[inputFrequencyDay]}</Text>
                    </Pressable>
                    </View>
                    :
                    null
                }
                {
                    inputFrequency === frequency[0].value || inputFrequency === frequency[1].value|| inputFrequency === frequency[2].value|| inputFrequency === frequency[3].value  || inputFrequency === frequency[4].value ?
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Date: </Text>
                        <Pressable
                            style={CommonStyles.BottomSheetSelectRecurring}
                            onPress={selectionScreenHandler.openFreqDate}
                        >
                        <Text style={CommonStyles.BottomSheetSelectTextRecurring}>{inputFrequencyDate}</Text>
                    </Pressable>
                    </View>
                    :
                    null
                }
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Time: </Text>
                        <Pressable
                            style={CommonStyles.BottomSheetSelectRecurring}
                            onPress={selectionScreenHandler.openFreqTime}
                        >
                        <Text style={CommonStyles.BottomSheetSelectTextRecurring}>{inputFrequencyTime}</Text>
                    </Pressable>
                </View>
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Account: </Text>
                        <Pressable
                            style={CommonStyles.BottomSheetSelectRecurring}
                            onPress={selectionScreenHandler.openAccount}
                        >
                        { inputAccount?
                            <View style={RecordStyles.CategoryElement}>
                                <View style={[CommonStyles.badge, {backgroundColor:inputAccount.accountBadge}]}></View>
                                <Text style={RecordStyles.CategoryElementText}>{inputAccount.accountName}</Text>
                            </View>
                            :
                            <Text style={CommonStyles.BottomSheetSelectTextRecurring}>Select an Account</Text>
                        }
                    </Pressable>
                    </View>
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                    <Text  style={CommonStyles.BottomSheetFieldText}>Badge: </Text>
                    <Pressable
                            style={[CommonStyles.BottomSheetSelectRecurring, {alignItems:'center'}]}
                            onPress={selectionScreenHandler.openBadge}
                        >
                        <View style={[CommonStyles.badge, {backgroundColor:inputBadge}]}></View>
                    </Pressable>
                </View>
                <View style={CommonStyles.BottomSheetButtonWrapper}>
                    {
                        focusedCategory ?
                        <>
                            <Pressable
                                style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetSecondaryButton]}
                                onPress={() => setSuspendNotification(true)}
                                onLongPress={() => {
                                    if ( inputName === '' ) {
                                        setInputNameError(true)
                                    }
                                    if ( inputAmount === '' ) {
                                        setInputAmountError(true)
                                    }
                                    if ( inputName !== '' && checkTypes(inputAmount)){
                                        suspendHandler()
                                    }
                                }}
                            >
                                <Text style={CommonStyles.BottomSheetButtonText}>Suspend</Text>
                            </Pressable>
                            <Pressable
                                style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton]}
                                onPress={() => {
                                    if ( inputName === '' ) {
                                        setInputNameError(true)
                                    }
                                    if ( inputAmount === '' ) {
                                        setInputAmountError(true)
                                    }
                                    if ( inputName !== '' && checkTypes(inputAmount)){
                                        updateHandler()
                                    }
                                }}
                            >
                                <Text style={CommonStyles.BottomSheetButtonText}>Update</Text>
                            </Pressable>
                        </>
                        :
                        
                            <Pressable
                                style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton]}
                                onPress={() => {
                                    if ( inputName === '' ) {
                                        setInputNameError(true)
                                    }
                                    if ( inputAmount === '' ) {
                                        setInputAmountError(true)
                                    }
                                    if ( inputName !== '' && checkTypes(inputAmount)){
                                        saveHandler()
                                    }
                                }}
                            >
                                <Text style={CommonStyles.BottomSheetButtonText}>Save</Text>
                            </Pressable>
                    }
                </View>
                </>
        }
            
        </View>
    )
}