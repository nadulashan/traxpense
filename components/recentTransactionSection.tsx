import RecentTransactionSectionStyles from '@/styles/recentTransactionSectionStyles';
import { RecordsProps } from '@/types/homeProps';
import { FlashList } from '@shopify/flash-list';
import { ScrollView, View } from 'react-native';
import InfoText from './infoText';
import RecentTransaction from './recentTransaction';
import RecentTransactionFilter from "./recentTransactionFilter";
import SectionHeader from "./sectionHeader";

interface RecentTransactionSectionProps{
    records:RecordsProps[];
    fetchRecords: () => void;
}

export default function RecentTransactionSection({
    records,
    fetchRecords,
}: RecentTransactionSectionProps){
    return(
        <>
            <SectionHeader header="Recent Transactions" />
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <RecentTransactionFilter name="All" />
                <RecentTransactionFilter name="Income" />
                <RecentTransactionFilter name="Expenses" />
                <RecentTransactionFilter name="Transfer" />
            </ScrollView>
            <View style={RecentTransactionSectionStyles.RecentTransactionsWrapper}>
                {
                    records.length !== 0 ?
                    <FlashList
                        data={records}
                        renderItem={ ({ item }) => <RecentTransaction key={item.id} transaction={item} /> }
                        onEndReached={fetchRecords} // The Trigger
                        onEndReachedThreshold={0.3} // Trigger when 30% from the bottom
                    />
                    :
                    <InfoText text='No recent Transactions' />
                }
            </View>
        </>
    )
}