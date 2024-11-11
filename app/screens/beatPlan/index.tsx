import React, {useState, useEffect, useRef} from 'react';
import {styles} from './styles';
import TodaysBeatPlan from './TodaysBeatPlan';
import Layout from '@/components/Layout';
import {View} from 'react-native';
import DashboardHeader from '../dashboard/dashboardComponent/dashboardHeader/DashboardHeader';
import ScreenHeader from '@/components/headers/ScreenHeader';
import SubHeader from '@/components/subHeader/subHeader';
import {useNavigation} from '@react-navigation/native';
import {getTranslationLabel} from '@/utils/commonMethods';
import CustomTabBar from '@/components/customTabBar/CustomTabBar';
import InsightCard from '@/components/insightCard';
import CommonStyles from '@/utils/commonStyle';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {COLORS} from '@/theme/colors';
import {Text} from 'react-native-paper';
import Progress from './components/Progress';
import CardWrapper from '@/components/card/Card';
import QuickLinkCard from '../dashboard/components/QuickLinkCard';
import {RootNavigationProp} from '@/routes/RootNavigation';
import CustomBarChart from '@/components/custombarCharts';
import CustomLineChart from '@/components/customLineCharts';
function BeatPlan() {
  const navigation = useNavigation<RootNavigationProp>();
  const Periods = ['Today', 'Week', 'Month', 'Custom'];
  const [TimePeriod, setTimePeriod] = useState<number>(0);
  return (
    <Layout isScrollable>
      <ScreenHeader
        header={getTranslationLabel('beatplan')}
        onBackPress={navigation.goBack}
      />
      <SubHeader
        shouldShowCardView={false}
        otherSubHeaderContentStyle={{
          height: null,
        }}
        otherSubHeaderContent={
          <>
            <View style={styles.navigationParent}>
              <CustomTabBar
                periods={Periods}
                selectedIndex={TimePeriod}
                setSelectedIndex={function (
                  value: React.SetStateAction<number>,
                ): void {
                  setTimePeriod(value);
                }}
              />
              <Progress
                progress={10}
                currentVisits={2}
                totalVisits={5}
                tasks={3}
              />

              <View style={styles.insightParent}>
                <InsightCard value={'20k'} title="Total Sales" />
                <InsightCard value={'12'} title="Total Orders" />
                <InsightCard value={'100%'} title="Attendance" />
              </View>
            </View>
          </>
        }
        children
      />
      <View style={styles.quickLinkParent}>
        <QuickLinkCard
          text={'Todays Beat Plan'}
          customStyle={styles.navigationCard}
          onPress={function (): void {
            navigation.navigate('TodayBeatPlan');
          }}
        />
        <QuickLinkCard
          text={'Previous Beat Plan'}
          customStyle={styles.navigationCard}
          onPress={function (): void {
            //  throw new Error('Function not implemented.');
          }}
        />
      </View>
      <CustomLineChart />
      <CustomBarChart />
    </Layout>
  );
}
export default BeatPlan;
