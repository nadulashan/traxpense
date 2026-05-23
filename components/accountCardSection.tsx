import { ActivityIndicator, ScrollView, View } from 'react-native';
import AccountCard from './accountCard';
import Header from './sectionHeader';

import colors from '@/constants/colors';
import { AccountProps } from '@/types/settingsProps';
import InfoText from './infoText';

interface AccountsCardSectionProps{
    accounts: AccountProps[] | undefined;
}

export default function AccountCardsSection({accounts}: AccountsCardSectionProps){


    return(
        <>
            <Header header='Active Accounts' button={undefined}/>
            {
            accounts?
                accounts.length !== 0 ?
                <>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                    {
                    accounts.map(account => (
                        <AccountCard key={ account.accountId } account={account} showRecent={true} isInitialBalance={ false }/>
                    ))
                    }
                    </ScrollView>
                </>
                :
                <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <InfoText text='No Account Found'/>
                </View>
            :
            <ActivityIndicator color={colors.light.primary} />

            }
        </>
    )
}