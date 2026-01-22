import { ImageBackground, Text, View } from 'react-native';
import AccountSectionStyles from '../styles/accountsSectionStyles';
import RecentOverview from './recentOverview';

interface Category {
    type:string,
    amount:number,
    category:string
}

type CardTypes = {
    name:string,
    color:string,
    balance:string,
    category: Category[]
}

const src = '../media/img'

export default function AccountCard({name, color, balance, category}: CardTypes) {
    return (
        <ImageBackground  source={require('../media/img/card-background.png')} imageStyle={{borderRadius:8}} style={AccountSectionStyles.AccountCardStyles}>
            <View style={AccountSectionStyles.AccountCardMain}>
                <View style={AccountSectionStyles.AccountCardBadgeName}>
                    <View style={[{backgroundColor:color},AccountSectionStyles.AccountCardBadge ]}></View>
                    <Text style={AccountSectionStyles.AccountCardName}>{name}</Text>
                </View>
                <Text style={AccountSectionStyles.AccountCardBalance}>{balance}</Text>
            </View>
            <View style={AccountSectionStyles.AccountCardRecentContainer}>
                <RecentOverview type='spend' amount='Rs. 800' category='Fees'/>
                <RecentOverview type='spend' amount='Rs. 800' category='Fees'/>
                <RecentOverview type='spend' amount='Rs. 800' category='Fees'/>
            </View>
        </ImageBackground>
    )
}