import { getRecentAccountRecords } from '@/db/home/select';
import { priceWithComma } from '@/func/general';
import { RecentAccountRecordsProps } from '@/types/homeProps';
import { AccountProps } from '@/types/settingsProps';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native';
import AccountSectionStyles from '../styles/accountsSectionStyles';
import RecentOverview from './recentOverview';

interface Category {
    type:string,
    amount:number,
    category:string
}

type CardTypes = {
    account:AccountProps;
    showRecent: boolean;
    isInitialBalance: boolean;
}

const src = '../media/img'

export default function AccountCard({ account, showRecent, isInitialBalance }: CardTypes) {

    let balance:{currency: string, value: string, decimal: string};
    if ( isInitialBalance ) {
        balance = priceWithComma(account.amount)
    } else {
        balance = priceWithComma(account.runningAmount)
    }

    const [ recentRecords, setRecentRecords ] = useState<RecentAccountRecordsProps[] | undefined>(undefined)
    const overviewKey = useRef(0)

    async function fetchRecents() {
        const recent = await getRecentAccountRecords( account.accountId )
        console.log(recent)
        setRecentRecords(recent)
        // console.log( await getTransfer('2026-04-07'))
    }

    useEffect(() => {
        if ( showRecent ) {
            fetchRecents()
        }
    }, [])

    return (
        <View style={ showRecent? { marginLeft:24 } : { marginLeft:0 } }>
            <ImageBackground  source={ require('../media/img/card-background.png') } imageStyle={{borderRadius:8}} style={AccountSectionStyles.AccountCardStyles}>
                <View style={AccountSectionStyles.AccountCardMain}>
                    <View style={AccountSectionStyles.AccountCardBadgeName}>
                        <View style={[ account.accountBadge? {backgroundColor:account.accountBadge} : {backgroundColor:'grey'} ,AccountSectionStyles.AccountCardBadge ]}></View>
                        <Text style={AccountSectionStyles.AccountCardName}>{account.accountName}</Text>
                    </View>
                    <Text style={AccountSectionStyles.AccountCardBalance}>
                        <Text style={AccountSectionStyles.AccountCardBalanceCurrency}>{ balance.currency}. </Text>
                        { balance.value }
                        <Text style={AccountSectionStyles.AccountCardBalanceDecimal}>.{ balance.decimal }</Text>
                    </Text>
                </View>
                <View style={AccountSectionStyles.AccountCardRecentContainer}>
                    {
                    showRecent?
                        recentRecords?
                            recentRecords.length !== 0?
                                recentRecords.map( rec => {
                                    overviewKey.current = overviewKey.current + 1
                                    return (
                                    <RecentOverview key={overviewKey.current} item={rec} releventAccount={account.accountId}/>
                                    )
                                })
                            :
                            null
                        :
                        <ActivityIndicator/>
                    :
                    null 
                    }
                </View>
            </ImageBackground>
        </View>
    )
}