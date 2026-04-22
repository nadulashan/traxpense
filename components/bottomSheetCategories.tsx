import CommonStyles from '@/styles/commonStyles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

type BottomSheetCategoriesProps = {
    valiedBadges:{ label: null; badge: string; }[];
    inputBadge:string;
    inputName:string;
    setInputBadge:React.Dispatch<React.SetStateAction<string>>;
    setInputName:React.Dispatch<React.SetStateAction<string>>;
    inputNameError:boolean;
    setInputNameError:React.Dispatch<React.SetStateAction<boolean>>;
    saveHandler:() => void;
    asyncDisabled:boolean;
    isSheetReady:boolean;
    focusedCategory:{categoryId:number, name:string; badge:string; isActive:number} | undefined;
    suspendHandler:() => void;
    updateHandler:() => void;
    showDangerText : boolean;
    setShowDangerText:React.Dispatch<React.SetStateAction<boolean>>;
    openBadgeScreen: () => void;
}

export default function BottomSheetCategories({
    valiedBadges,
    inputBadge,
    inputName,
    setInputName,
    setInputBadge,
    inputNameError,
    setInputNameError,
    saveHandler,
    asyncDisabled,
    isSheetReady,
    focusedCategory,
    suspendHandler,
    updateHandler,
    showDangerText,
    setShowDangerText,
    openBadgeScreen
}:BottomSheetCategoriesProps){
    
    
    const renderIcon = useCallback(() => (
        <View style= {{height:24, width:24,borderWidth:1, borderRadius:12, backgroundColor:inputBadge, borderColor:inputBadge}}></View>
    ),[inputBadge])
    
    return(
        <View style={CommonStyles.BottomSheetWrapper}>
            {
                isSheetReady?
                    valiedBadges.length != 0 || focusedCategory?
                    <>
                        {showDangerText? <Text style={CommonStyles.NoActionDangerText}>This action is irreversable. Long Press on the button to continue</Text>:null}
                        <View>
                            <Text style={CommonStyles.BottomSheetFieldText}>Category Name:</Text>
                            <BottomSheetTextInput 
                                style={CommonStyles.BottomSheetInput}
                                value={inputName}
                                readOnly={ focusedCategory?.isActive == 0? true : false}
                                onChangeText={name => {
                                    if ( name === '' || name.trim().length === 0 ) {
                                        setInputNameError(true)
                                    } else {
                                        setInputNameError(false)
                                    }
                                    setInputName(name)
                                }}
                            />
                            {
                                inputNameError?<Text style={CommonStyles.InvalidResponse}>Invalid response</Text> : null
                            }
                        </View>
                        {focusedCategory && focusedCategory.isActive === 0?
                        null    
                        :
                        <View style={CommonStyles.BottomSheetBadgeWrapper}>
                            <Text style={CommonStyles.BottomSheetFieldText}>Category Badge</Text>
                            
                            
                            <Pressable
                                style={CommonStyles.BottomSheetSelect}
                                onPress={openBadgeScreen}
                            >
                                <View style={[CommonStyles.badge, {backgroundColor:inputBadge, marginLeft:16, marginRight:16}]}></View>
                            </Pressable>
                        </View>
                        }
                        
                        <View style={CommonStyles.BottomSheetButtonWrapper}>
                        {focusedCategory?
                            focusedCategory.isActive == 1 ?
                            <>
                                <Pressable 
                                    style={[CommonStyles.BottomSheetSecondaryButton, CommonStyles.BottomSheetButton]}
                                    disabled={asyncDisabled}
                                    onPress={() => setShowDangerText(true)}
                                    onLongPress={() => {
                                        if (inputName == '') {
                                            setInputNameError(true)
                                        }
                                        if (!inputNameError && inputName !=='' && inputBadge !== ''){
                                            suspendHandler()
                                        }
                                    }}
                                >
                                    <Text style={CommonStyles.BottomSheetButtonText}>Suspend</Text>
                                </Pressable>
                                <Pressable 
                                    style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                                    disabled={asyncDisabled}
                                    onPress={() => {
                                        if (inputName == '') {
                                            setInputNameError(true)
                                        }
                                        if (!inputNameError && inputName !=='' && inputBadge !== ''){
                                            updateHandler()
                                        }
                                    }}
                                >
                                    <Text style={CommonStyles.BottomSheetButtonText}>Update</Text>
                                </Pressable>
                            </>
                            :
                            <Text style={CommonStyles.NoActionText}>This Category is suspended</Text>
                        :
                        <Pressable 
                            style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                            disabled={asyncDisabled}
                            onPress={() => {
                                if (inputName == '') {
                                    setInputNameError(true)
                                }
                                if (!inputNameError && inputName !=='' && inputBadge !== ''){
                                    saveHandler()
                                }
                            }}
                        >
                            <Text style={CommonStyles.BottomSheetButtonText}>Save</Text>
                        </Pressable>
                        }
                        </View>
                    </>
                :
                <View>
                    <Text style={CommonStyles.NoActionText}>You already have the maximum allowed Active Categories</Text>
                </View>
            :
            null
            }
        
        </View>
    )
}