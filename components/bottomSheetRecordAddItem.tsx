import { useCheckContext } from '@/context/recordsContext';
import RecordStyles from '@/styles/recordsStyles';
import { useState } from 'react';
import { View } from 'react-native';
import AddItemForm from './recordAddItemForm';
import FormCategoryWrapper from './recordFormCategoryWrapper';


export default function BottomSheetRecordAddItem() {

    const { type } = useCheckContext()

    let fetchTypeCategories;
    let insertTypeItem;
    if ( type.current === 'income' ){
        fetchTypeCategories = 's'
        insertTypeItem = 's'
        console.log('income')
    } else {
        fetchTypeCategories = 's'
        insertTypeItem = 's'
        console.log('expense')
    }

    const [ category, setCategory ] = useState<{ categoryId:number, name:string, badge:string } | null>(null)
    const [ amount, setAmount ] = useState<string>('')
    const [ account, setAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ comment, setComment ] = useState<string>('')
    const [ ammountError, setAmountError ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | null>(null)
    const [ categories, setCategories ]

    const [ currentScreen, setCurrentScreen ] = useState<'Form'>('Form')

    function onPressHandler() {
        console.log('Pressed')
    }

    const SCREEN = {
        Form:() => <AddItemForm 
                category={category}
                setCategory={setCategory}
                amount={amount}
                setAmount={setAmount}
                account={account}
                setAccount={setAccount}
                onPressHandler={onPressHandler}
                comment={comment}
                setComment={setComment}
                amountError={ammountError}
                setAmountError={setAmountError}
            />,
        Category: () => <FormCategoryWrapper/>
    }

    const ScreenContent = SCREEN[currentScreen]

    return (
        <View style={RecordStyles.MenuSheetWrapper}>
            {ScreenContent()}
        </View>
    )
}