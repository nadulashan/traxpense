import CommonStyles from '@/styles/commonStyles';
import RecordStyles from '@/styles/recordsStyles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Pressable, Text, View } from 'react-native';

interface AddItemFormTypes {
    onAddPressHandler: () => void;
    amount:string;
    comment:string;
    setComment:React.Dispatch<React.SetStateAction<string>>;
    amountError:boolean;
    handleCategorySelector:(() => void) | null;
    selectedCategory:{ categoryId: number; name: string; badge: string; } | undefined;
    handleAccountSelector: () => void;
    selectedAccount:{ accountId:number, accountName:string, accountBadge:string } | null;
    isCustomForm:boolean;
    customName:string | undefined;
    setCustomName:React.Dispatch<React.SetStateAction<string>> | undefined;
    customTypeNameError:boolean | undefined;
    accountError:boolean;
    categoryError:boolean | undefined,
    isEdit:boolean;
    handleDeletion: undefined | ( () => void );
    longPressWarn: boolean | undefined;
    setLongPressWarn:React.Dispatch<React.SetStateAction<boolean>> | undefined;
    handleUpdate: ( () => void ) | undefined;
    negativeBalanceError: boolean;
    onAmountTextChange: (value: string ) => void
}

export default function AddItemForm({
    onAddPressHandler,
    amount,
    comment,
    setComment,
    amountError,
    handleCategorySelector,
    selectedCategory,
    handleAccountSelector,
    selectedAccount,
    isCustomForm,
    customName,
    setCustomName,
    customTypeNameError,
    accountError,
    categoryError,
    isEdit,
    handleDeletion,
    longPressWarn,
    setLongPressWarn,
    handleUpdate,
    negativeBalanceError,
    onAmountTextChange
}:AddItemFormTypes) {
    return  (
        <View style={RecordStyles.AddItemWrapper}>
            {
                longPressWarn?
                <Text style={[CommonStyles.NoActionDangerText, {textAlign:'center'}]}>This Action is irreversible. Long Press to continue</Text>
                :
                null
            }
            {
                isCustomForm && setCustomName?
                <>
                <BottomSheetTextInput 
                    style={CommonStyles.BottomSheetInput} 
                    placeholder='Enter Name'
                    placeholderTextColor={'grey'}
                    value={customName}
                    onChangeText={name => setCustomName(name)}
                />
                {customTypeNameError? <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text> : null}
                </>
                :
                <View>
                    <Pressable 
                        onPress={handleCategorySelector}
                        style={RecordStyles.AddItemSelect}>
                            {
                                selectedCategory? 
                                <View style={RecordStyles.CategoryElement}>
                                    <View style={[CommonStyles.badge, {backgroundColor:selectedCategory.badge}]}></View>
                                    <Text style={RecordStyles.CategoryElementText}>{selectedCategory.name}</Text>
                                </View>
                                :
                                <>
                                <Text style={RecordStyles.AddItemSelectText}>Select Category</Text>   
                                </>
                            }
                    </Pressable>
                    {
                        categoryError===true?
                        <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text>
                        :
                        null

                    }
                </View>
            }
            <View style={RecordStyles.AddItemAmountAccountWrapper}>
                <View style={RecordStyles.AddItemSelectAmountWrapper}>
                <BottomSheetTextInput 
                    style={[CommonStyles.BottomSheetInput, RecordStyles.AddItemSelectAmount]}
                    placeholder='Enter Amount'
                    placeholderTextColor={'grey'}
                    value={amount}
                    keyboardType='numeric'
                    onChangeText={(input) => {
                        onAmountTextChange(input)
                    }}
                />
                { amountError? <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text> : null}
                </View>
                <View style={RecordStyles.AddItemSelectAccount}>
                    <Pressable 
                    onPress={handleAccountSelector}
                    style={RecordStyles.AddItemSelect}>
                        {
                            selectedAccount? 
                            <View style={RecordStyles.CategoryElement}>
                                <View style={[CommonStyles.badge, {backgroundColor:selectedAccount.accountBadge}]}></View>
                                <Text style={RecordStyles.CategoryElementText}>{selectedAccount.accountName}</Text>
                            </View>
                            :
                            <Text style={RecordStyles.AddItemSelectText}>Select Account</Text>
                        }
                    </Pressable>
                    {
                        accountError?
                        <Text style={CommonStyles.NoActionDangerText}>Invalied Response</Text>
                        :
                        null
                    }
                </View>
            </View>
                <BottomSheetTextInput 
                    style={[CommonStyles.BottomSheetInput, RecordStyles.AddItemSelectAmount, {minHeight:50}]}
                    placeholder='Comment (optional)'
                    placeholderTextColor={'grey'}
                    value={comment}
                    multiline={true}
                    onChangeText={(input) => {
                        setComment( input )
                    }}
                />                
                
            {
                negativeBalanceError?
                <Text style={[CommonStyles.NoActionDangerText, {textAlign:'center'}]}>Not Enough Balance</Text>
                :
                null
            }
            {
                !isEdit?
                <Pressable 
                    onPress={onAddPressHandler}
                    style={!isCustomForm? [CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton] : [CommonStyles.BottomSheetButton, CommonStyles.SecondaryButton]}>
                    <Text style={!isCustomForm? CommonStyles.BottomSheetButtonText : CommonStyles.SecondaryButtonText}>ADD</Text>
                </Pressable> 
                :
                <View style={CommonStyles.BottomSheetButtonWrapper}>                
                    <Pressable 
                        onPress={() => { if ( setLongPressWarn ) { setLongPressWarn(true) }} }
                        onLongPress={handleDeletion}
                        style={[CommonStyles.BottomSheetSecondaryButton, CommonStyles.BottomSheetButton]}>
                        <Text style={CommonStyles.BottomSheetButtonText}>DELETE</Text>
                    </Pressable> 
                    <Pressable 
                        onPress={handleUpdate}
                        style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}>
                        <Text style={CommonStyles.BottomSheetButtonText}>UPDATE</Text>
                    </Pressable> 
                </View>
                }
        </View>
    )
}