import RecentTransactionSectionStyles from '@/styles/recentTransactionSectionStyles';
import { onPressFunctionsProps, RecordsProps } from '@/types/homeProps';
import Feather from '@expo/vector-icons/Feather';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import InfoText from './infoText';
import RecentTransaction from './recentTransaction';
import RecentTransactionFilter from "./recentTransactionFilter";
import SectionHeader from "./sectionHeader";

interface RecentTransactionSectionProps{
    records:RecordsProps[] | undefined;
    fetchRecords: () => void;
    filterItems: {key:number, name: string, isActive: boolean, onPress: () => void }[];
    onPressFunctions: onPressFunctionsProps,
    filterButtonPress: () => void;
}

export default function RecentTransactionSection({
    records,
    fetchRecords,
    filterItems,
    onPressFunctions,
    filterButtonPress
}: RecentTransactionSectionProps){
    return(
        <>
            <SectionHeader header="Recent Transactions" button={{ icon:<Feather name="filter" size={20} color="black" />, onPress: filterButtonPress}} />
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    filterItems.map( item => (
                        <RecentTransactionFilter key={item.key} name={item.name} isActive={item.isActive} onPress={item.onPress}  />
                    ))
                }
            </ScrollView>
            <View style={RecentTransactionSectionStyles.RecentTransactionsWrapper}>
                {
                    records?
                        records.length !== 0 ?
                        <FlashList
                            data={records}
                            renderItem={ ({ item }) => <RecentTransaction 
                                                            key={item.id} transaction={item} 
                                                            onPressFunctions={onPressFunctions}/> }
                            onEndReached={fetchRecords} // The Trigger
                            onEndReachedThreshold={0.3} // Trigger when 30% from the bottom
                        />
                        :
                        <InfoText text='No recent Transactions' />
                    :
                    <ActivityIndicator />
                }
            </View>
        </>
    )
}