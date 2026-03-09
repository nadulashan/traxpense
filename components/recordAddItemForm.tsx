import { checkTypes } from '@/func/bottomSheetfunc';
import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { Pressable, Text, TextInput, View } from 'react-native';

interface AddItemFormTypes {
    onPressHandler: () => void;
    category:{ categoryId:number, name:string, badge:string } | null;
    setCategory:React.Dispatch<React.SetStateAction<{ categoryId:number, name:string, badge:string } | null>>;
    account:{ accountId:number, accountName:string, accountBadge:string } | null;
    setAccount:React.Dispatch<React.SetStateAction<{ accountId:number, accountName:string, accountBadge:string } | null>>;
    amount:string;
    setAmount:React.Dispatch<React.SetStateAction<string>>;
    comment:string;
    setComment:React.Dispatch<React.SetStateAction<string>>;
    amountError:boolean;
    setAmountError:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddItemForm({
    onPressHandler,
    category,
    setCategory,
    account,
    setAccount,
    amount,
    setAmount,
    comment,
    setComment,
    amountError,
    setAmountError
}:AddItemFormTypes) {
    return  (
        <View style={RecordStyles.AddItemWrapper}>
            <Pressable style={RecordStyles.AddItemSelect}><Text style={RecordStyles.AddItemSelectText}>Select Category</Text></Pressable>
            <View style={RecordStyles.AddItemAmountAccountWrapper}>
                <View style={RecordStyles.AddItemSelectAmountWrapper}>
                <TextInput 
                    style={[CommonStyles.BottomSheetInput, RecordStyles.AddItemSelectAmount]}
                    placeholder='Enter Amount'
                    value={amount}
                    onChangeText={(input) => {
                        if ( input === '' ) {
                            setAmountError(true)
                            setAmount( input )
                        }
                        if ( checkTypes(input) ) {
                            setAmount( input )
                            setAmountError(false)
                        } else {
                            setAmountError(true)
                        }
                    }}
                />
                { amountError? <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text> : null}
                </View>
                <Pressable style={[RecordStyles.AddItemSelect, RecordStyles.AddItemSelectAccount]}><Text style={RecordStyles.AddItemSelectText}>Select Account</Text></Pressable>
            </View>
                <TextInput 
                    style={[CommonStyles.BottomSheetInput, RecordStyles.AddItemSelectAmount]}
                    placeholder='Comment (optional)'
                    value={comment}
                    multiline={true}
                    onChangeText={(input) => {
                        setComment( input )
                    }}
                />
            <Pressable 
                onPress={onPressHandler}
                style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}>
                <Text style={CommonStyles.BottomSheetButtonText}>ADD</Text>
            </Pressable>
        </View>
    )
}