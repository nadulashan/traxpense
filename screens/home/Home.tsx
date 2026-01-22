import { SafeAreaView } from 'react-native-safe-area-context';

import QuickActionsSection from '@/components/quickActionsSection';
import AccountCardsSection from '../../components/accountCardSection';
import User from '../../components/user';

import RecentTransactionSection from '@/components/recentTransactionSecion';
import { ScrollView } from 'react-native';

export default function Home(){

    return (
        <SafeAreaView style={{backgroundColor:'#ffffff'}} edges={['top', 'left', 'right']}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <User />
                < AccountCardsSection />
                <QuickActionsSection/>
                <RecentTransactionSection />
            </ScrollView>
        </SafeAreaView>
    )
}