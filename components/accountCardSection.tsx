import { ScrollView } from 'react-native';
import AccountCard from './accountCard';
import Header from './sectionHeader';

import colors from '@/constants/colors';
import AddAccountCard from './addAccountCard';

export default function AccountCardsSection(){

    const badge = colors.light.badge;

    const recent = [
        {
            type:'spend',
            amount:800,
            category:'Fees'
        },
        {
            type:'spend',
            amount:50,
            category:'Transport'
        },
        {
            type:'income',
            amount:1200,
            category:'Bank'
        }
    ]

    return(
        <>
            <Header header='Active Accounts'/>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <AccountCard name='Wallet' color={badge.blue} balance="Rs. 3,745.00" category={recent}/>
                <AccountCard name='Bank' color={badge.yellow} balance="Rs. 45,600.00" category={recent} />
                <AccountCard name='Payoneer' color={badge.red} balance="Rs. 185,600.00" category={recent} />
                <AddAccountCard />
            </ScrollView>
        </>
    )
}