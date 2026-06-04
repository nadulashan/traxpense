import AnalysisOverview from '@/components/analysisOverview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Analysis(){
    return (
        <SafeAreaView style={{marginTop:24, alignItems:'center'}}>
            <AnalysisOverview />
        </SafeAreaView>
    )
}