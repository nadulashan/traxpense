import CommonStyles from '@/styles/commonStyles';
import { useCallback } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type BottomSheetCategoriesProps = {
    valiedBadges:{ label: null; badge: string; }[];
    inputBadge:string;
    inputName:string;
    setInputBadge:React.Dispatch<React.SetStateAction<string>>;
    setInputName:React.Dispatch<React.SetStateAction<string>>;
    inputNameError:boolean;
    setInputNameError:React.Dispatch<React.SetStateAction<boolean>>;
    saveHandler:() => void;
    saveDisabled:boolean;
    isSheetReady:boolean;
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
    saveDisabled,
    isSheetReady
}:BottomSheetCategoriesProps){
    
    
    const renderIcon = useCallback(() => (
        <View style= {{height:24, width:24,borderWidth:1, borderRadius:12, backgroundColor:inputBadge, borderColor:inputBadge}}></View>
    ),[inputBadge])
    
    return(
        <View style={CommonStyles.BottomSheetWrapper}>
            {
                isSheetReady?
                    valiedBadges.length != 0?
                    <>
                        <View>
                            <Text style={CommonStyles.BottomSheetFieldText}>Category Name:</Text>
                            <TextInput 
                                style={CommonStyles.BottomSheetInput}
                                value={inputName}
                                onChangeText={name => {
                                    if (name == '') {
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

                        <View style={CommonStyles.BottomSheetBadgeWrapper}>
                            <Text style={CommonStyles.BottomSheetFieldText}>Category Badge</Text>
                            <Dropdown
                                data={valiedBadges}
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
                        </View>
                                            
                        <Pressable 
                            style={[CommonStyles.BottomSheetPrimaryButton, CommonStyles.BottomSheetButton]}
                            disabled={saveDisabled}
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