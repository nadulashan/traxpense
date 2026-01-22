import RecentTransactionSectionStyles from '@/styles/recentTransactionSectionStyles';
import { ScrollView, View } from 'react-native';
import RecentTransaction from './recentTransaction';
import RecentTransactionFilter from "./recentTransactionFilter";
import SectionHeader from "./sectionHeader";

export default function RecentTransactionSection(){
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
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
                <RecentTransaction category="Fees" date='25th Jan 2025' amount='Rs. 800' />
            </View>
        </>
    )
}