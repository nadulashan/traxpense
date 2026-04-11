import RecentTransactionSectionStyles from '@/styles/recentTransactionSectionStyles';
import { RecordsProps } from '@/types/homeProps';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import InfoText from './infoText';
import RecentTransaction from './recentTransaction';
import RecentTransactionFilter from "./recentTransactionFilter";
import SectionHeader from "./sectionHeader";

interface RecentTransactionSectionProps{
    records:RecordsProps[] | undefined;
    fetchRecords: () => void;
    filterItems: {key:number, name: string, isActive: boolean, onPress: () => void }[]
}

export default function RecentTransactionSection({
    records,
    fetchRecords,
    filterItems
}: RecentTransactionSectionProps){
    return(
        <>
            <SectionHeader header="Recent Transactions" />
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
                            renderItem={ ({ item }) => <RecentTransaction key={item.id} transaction={item} /> }
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