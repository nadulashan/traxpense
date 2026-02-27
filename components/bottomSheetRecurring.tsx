import CommonStyles from '@/styles/commonStyles';
import RecurringStyles from '@/styles/recurringStyles';
import { RecurringCategory } from '@/types/recurring.schema';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type BottomSheetRecurringProps = {
    badges:{ label: null; badge: string; }[];
    inputName:string;
    setInputName:React.Dispatch<React.SetStateAction<string>>;
    inputAmount:string;
    setInputAmount:React.Dispatch<React.SetStateAction<string>>;
    inputBadge:string;
    setInputBadge:React.Dispatch<React.SetStateAction<string>>;
    frequency:{label:string, value:string}[];
    frequencyMonth:{label:string, value:number}[];
    frequencyDate:{label:string, value:number}[];
    frequencyDay:{label:string, value:number}[];
    frequencyTime:{label:string, value:string}[];
    inputFrequency:string;
    setInputFrequency:React.Dispatch<React.SetStateAction<string>>;
    inputFrequencyMonth:number
    setInputFrequencyMonth:React.Dispatch<React.SetStateAction<number>>;
    inputFrequencyDate:number | undefined;
    setInputFrequencyDate:React.Dispatch<React.SetStateAction<number>>
    inputFrequencyDay:number;
    setInputFrequencyDay:React.Dispatch<React.SetStateAction<number>>;
    inputFrequencyTime:string;
    setInputFrequencyTime:React.Dispatch<React.SetStateAction<string>>;
    setAllowedDates:React.Dispatch<React.SetStateAction<31 | 30 | 28>>;
    saveHandler : () => void;
    checkTypes:(input:string) => boolean;
    accountsArray: {label:string, value:number}[];
    inputAccount:number | undefined;
    setInputAccount:React.Dispatch<React.SetStateAction<number>>
    inputNameError:boolean;
    setInputNameError:React.Dispatch<React.SetStateAction<boolean>>
    inputAmountError:boolean;
    setInputAmountError:React.Dispatch<React.SetStateAction<boolean>>;
    focusedCategory: RecurringCategory | null;
    updateHandler: () => void;
    suspendHandler: () => void;
    suspendNotification: boolean;
    setSuspendNotification:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomSheetRecurring({
    badges,
    inputName,
    setInputName,
    inputAmount,
    setInputAmount,
    inputBadge,
    setInputBadge,
    frequency,
    frequencyMonth,
    frequencyDate,
    frequencyDay,
    frequencyTime,
    inputFrequency,
    setInputFrequency,
    inputFrequencyMonth,
    setInputFrequencyMonth,
    inputFrequencyDate,
    setInputFrequencyDate,
    inputFrequencyDay,
    setInputFrequencyDay,
    inputFrequencyTime,
    setInputFrequencyTime,
    setAllowedDates,
    saveHandler,
    checkTypes,
    accountsArray,
    inputAccount,
    setInputAccount,
    inputNameError,
    setInputNameError,
    inputAmountError,
    setInputAmountError,
    focusedCategory,
    updateHandler,
    suspendHandler,
    suspendNotification,
    setSuspendNotification
}:BottomSheetRecurringProps ) {
    return (
        <View style={CommonStyles.BottomSheetWrapper}>
            {
                badges.length === 0?
                <View>
                    <Text style={CommonStyles.NoActionText}>You already have the maximum allowed Active Categories</Text>
                </View>
                : accountsArray.length === 0?
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
                        if ( value === '' ) {
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
                    <Dropdown
                        style={RecurringStyles.Dropdown}
                        selectedTextStyle={RecurringStyles.DropdownSelected}
                        itemTextStyle={RecurringStyles.DropdownList}
                        data={frequency}
                        value = {inputFrequency}
                        valueField='value'
                        labelField='label'
                        // placeholder=''
                        onChange={selection => setInputFrequency(selection.value)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                {
                    inputFrequency === frequency[0].value || inputFrequency === frequency[1].value|| inputFrequency === frequency[2].value|| inputFrequency === frequency[3].value ?
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Month: </Text>
                        <Dropdown
                            style={RecurringStyles.Dropdown}
                            selectedTextStyle={RecurringStyles.DropdownSelected}
                            itemTextStyle={RecurringStyles.DropdownList}
                            data={frequencyMonth}
                            value = {inputFrequencyMonth}
                            valueField='value'
                            labelField='label'
                            // placeholder=''
                            onChange={selection => {
                                setInputFrequencyMonth(selection.value)
                                if (selection.value === 'april' || selection.value === 'june' || selection.value === 'september' || selection.value === 'november'){
                                    setAllowedDates(30)
                                } else if (selection.value === 'february'){
                                    setAllowedDates(28)
                                } else {
                                    setAllowedDates(31)
                                }
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    :
                    null
                }
                {
                    inputFrequency === frequency[5].value ?
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Day: </Text>
                        <Dropdown
                            style={RecurringStyles.Dropdown}
                            selectedTextStyle={RecurringStyles.DropdownSelected}
                            itemTextStyle={RecurringStyles.DropdownList}
                            data={frequencyDay}
                            value = {inputFrequencyDay}
                            valueField='value'
                            labelField='label'
                            // placeholder=''
                            onChange={selection => setInputFrequencyDay(selection.value)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    :
                    null
                }
                {
                    inputFrequency === frequency[0].value || inputFrequency === frequency[1].value|| inputFrequency === frequency[2].value|| inputFrequency === frequency[3].value  || inputFrequency === frequency[4].value ?
                    <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Date: </Text>
                        <Dropdown
                            style={RecurringStyles.Dropdown}
                            selectedTextStyle={RecurringStyles.DropdownSelected}
                            itemTextStyle={RecurringStyles.DropdownList}
                            data={frequencyDate}
                            value = {inputFrequencyDate}
                            valueField='value'
                            labelField='label'
                            // placeholder=''
                            onChange={selection => setInputFrequencyDate(selection.value)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    :
                    null
                }
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Time: </Text>
                        <Dropdown
                            style={RecurringStyles.Dropdown}
                            selectedTextStyle={RecurringStyles.DropdownSelected}
                            itemTextStyle={RecurringStyles.DropdownList}
                            data={frequencyTime}
                            value = {inputFrequencyTime}
                            valueField='value'
                            labelField='label'
                            // placeholder=''
                            onChange={selection => setInputFrequencyTime(selection.value)}
                            showsVerticalScrollIndicator={false}
                        />
                </View>
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                        <Text  style={CommonStyles.BottomSheetFieldText}>Account: </Text>
                        <Dropdown
                            style={RecurringStyles.Dropdown}
                            selectedTextStyle={RecurringStyles.DropdownSelected}
                            itemTextStyle={RecurringStyles.DropdownList}
                            data={accountsArray}
                            value = {inputAccount}
                            valueField='value'
                            labelField='label'
                            // placeholder=''
                            onChange={selection => setInputAccount(selection.value)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                <View style={CommonStyles.BottomSheetBadgeWrapper}>
                    <Text  style={CommonStyles.BottomSheetFieldText}>Badge: </Text>
                    <Dropdown
                        data={badges}
                        value = {inputBadge}
                        valueField={'badge'}
                        labelField={'label'}
                        placeholder=''
                        onChange={badge => setInputBadge(badge.badge)}
                        showsVerticalScrollIndicator={false}
                        renderLeftIcon={() => <View style= {{height:24, width:24,borderWidth:1, borderRadius:12, backgroundColor:inputBadge, borderColor:inputBadge}}></View>}
                        renderItem={item => (
                            <View style={{width:24, height:24, borderRadius:12, margin:8, backgroundColor:item.badge}}></View>
                        )}
                    />
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