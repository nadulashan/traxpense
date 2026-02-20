import CommonStyles from '@/styles/commonStyles';
import RecurringStyles from '@/styles/recurringStyles';
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
    frequencyMonth:{label:string, value:string}[];
    frequencyDate:{label:string, value:number}[];
    frequencyDay:{label:string, value:string}[];
    frequencyTime:{label:string, value:string}[];
    inputFrequency:string;
    setInputFrequency:React.Dispatch<React.SetStateAction<string>>;
    inputFrequencyMonth:string
    setInputFrequencyMonth:React.Dispatch<React.SetStateAction<string>>;
    inputFrequencyDate:number | undefined;
    setInputFrequencyDate:React.Dispatch<React.SetStateAction<number | undefined>>
    inputFrequencyDay:string;
    setInputFrequencyDay:React.Dispatch<React.SetStateAction<string>>;
    inputFrequencyTime:string;
    setInputFrequencyTime:React.Dispatch<React.SetStateAction<string>>;
    setAllowedDates:React.Dispatch<React.SetStateAction<31 | 30 | 28>>;
    saveHandler : () => void;
    checkTypes:(input:string) => void;
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
    checkTypes
}:BottomSheetRecurringProps ) {
    return (
        <View style={CommonStyles.BottomSheetWrapper}>
            <View>
                <Text style={CommonStyles.BottomSheetFieldText}>Name: </Text>
                <TextInput
                    style={CommonStyles.BottomSheetInput}
                    value={inputName}
                    onChangeText={value => setInputName(value)}
                />
            </View>
            <View>
                <Text style={CommonStyles.BottomSheetFieldText}>Amount: </Text>
                <TextInput
                    style={CommonStyles.BottomSheetInput}
                    value={inputAmount}
                    onChangeText={value => setInputAmount(value)}
                    keyboardType='numeric'
                />
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
                inputFrequency === 'yearly' || inputFrequency === '6months'|| inputFrequency === '4months'|| inputFrequency === '3months' ?
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
                inputFrequency === 'weekly' ?
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
                inputFrequency == 'yearly' || inputFrequency === '6months' || inputFrequency === '4months' || inputFrequency === '3months' || inputFrequency === 'monthly' ?
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
                <Pressable
                    style={[CommonStyles.BottomSheetButton, CommonStyles.BottomSheetPrimaryButton]}
                    onPress={() => {
                        if ( inputName !== '' && checkTypes(inputAmount)){
                            saveHandler()
                        }
                    }}
                >
                    <Text style={CommonStyles.BottomSheetButtonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    )
}