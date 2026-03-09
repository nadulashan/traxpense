import { useCheckContext } from '@/context/recordsContext';
import { getActiveExpenseCategories, getActiveIncomeCategories } from '@/db/records/select';
import RecordStyles from '@/styles/recordsStyles';
import { useState } from 'react';
import { View } from 'react-native';
import AddItemForm from './recordAddItemForm';
import FormCategoryWrapper from './recordFormCategoryWrapper';


export default function BottomSheetRecordAddItem() {

    const { type } = useCheckContext()

    let getActiveTypeCategories:() => Promise<{ categoryId:number, name:string, badge:string }[]>;
    let insertTypeItem;
    if ( type.current === 'income' ){
        getActiveTypeCategories = getActiveIncomeCategories
        insertTypeItem = 's'
        console.log('income')
    } else {
        getActiveTypeCategories = getActiveExpenseCategories
        insertTypeItem = 's'
        console.log('expense')
    }

    const [ categories, setCategories ] = useState<{ categoryId:number, name:string, badge:string }[] | null>(null)
    const [ amount, setAmount ] = useState<string>('')
    const [ account, setAccount ] = useState<{ accountId:number, accountName:string, accountBadge:string } | null>(null)
    const [ comment, setComment ] = useState<string>('')
    const [ ammountError, setAmountError ] = useState(false)
    const [ selectedCategory, setSelectedCategory ] = useState<{ categoryId:number, name:string, badge:string } | null>(null)
    const [ isCategoriesReady, setIsCategoriesReady ] = useState(false)

    const [ currentScreen, setCurrentScreen ] = useState<'Form' | 'Category'>('Form')

    // DB Fetching
    async function refreshCategories() {
        const fetchedCategories = await getActiveTypeCategories()
        setCategories(fetchedCategories)
    }

    // Button Click handler
    function onPressHandler() {
        console.log('Pressed')
    }

    function handleCateogorySelector() {
        setCurrentScreen('Category')
        refreshCategories()
    }

    function onCategoryPress(category:{ categoryId:number, name:string, badge:string }) {
        setSelectedCategory(category)
        setCurrentScreen('Form')
    }

    const SCREEN = {
        Form:() => <AddItemForm 
                amount={amount}
                setAmount={setAmount}
                onPressHandler={onPressHandler}
                comment={comment}
                setComment={setComment}
                amountError={ammountError}
                setAmountError={setAmountError}
                handleCateogorySelector={handleCateogorySelector}
                selectedCategory={selectedCategory}
            />,
        Category: () => <FormCategoryWrapper 
                        categories={categories}
                        onCategoryPress={onCategoryPress}
                        />
    }

    const ScreenContent = SCREEN[currentScreen]

    return (
        <View style={RecordStyles.MenuSheetWrapper}>
            {ScreenContent()}
        </View>
    )
}