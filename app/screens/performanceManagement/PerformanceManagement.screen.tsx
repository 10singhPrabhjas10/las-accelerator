// import React from 'react';
// import Layout from 'components/Layout';
// import CommonStyles from 'utils/commonStyle';
// import ActionButton from 'components/button/ActionButton';
// import {useNavigation} from '@react-navigation/native';
// import {RootNavigationProp} from 'routes/RootNavigation';

// import SalesIcon from '../../../assets/icons/sales.svg';
// import ComplianceIcon from '../../../assets/icons/business.svg';
// import {getTranslationLabel} from 'utils/commonMethods';

// const PerformanceManagement = () => {
//   const navigation = useNavigation<RootNavigationProp>();
//   return (
//     <Layout headerTitle="Performance Management" style={CommonStyles.padding}>
//       <ActionButton
//         icon={<SalesIcon width={24} height={24} />}
//         title={'sales_performance'}
//         onPress={() => navigation.navigate('SalesPerformance')}
//       />
//       <ActionButton
//         icon={<ComplianceIcon width={24} height={24} />}
//         title="Compliance Performance"
//         onPress={() => navigation.navigate('CompliancePerformance')}
//       />
//     </Layout>
//   );
// };

// export default PerformanceManagement;

//---------new design-------------
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Layout from 'components/Layout';
import CustomTabBar from '../../components/customTabBar/CustomTabBar';
import {Tabs, TabScreen, TabsProvider} from 'react-native-paper-tabs';
import {COLORS} from '@/theme/colors';
import styles from './PerformanceStyle.ts';
import SalesReport from './performanceTabBar/PerformanceSalesReport.screen.tsx';
import NewRetailers from './performanceTabBar/attendence/RetailersComponent.tsx';
import AttendenceView from './performanceTabBar/attendence/AttendenceView.tsx';
interface InsightCardProps {
  title: string;
  value: string | number;
  change: number;
  onPress: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  change,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.changeContainer}>
      {change > 0 ? (
        <Text style={[styles.changeText, styles.positive]}>▲ +{change}%</Text>
      ) : (
        <Text style={[styles.changeText, styles.negative]}>▼ {change}%</Text>
      )}
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const PerformanceManagement: React.FC = () => {
  const periods = ['Today', 'Week', 'Month', 'Custom'];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const renderTab = () => {
    return (
      <>
        <TabsProvider>
          <Tabs theme={{colors: {surface: COLORS.white}}} disableSwipe>
            <TabScreen label={'Sales Report'}>{<SalesReport />}</TabScreen>
            <TabScreen label={'Productivity'}>{<SalesReport />}</TabScreen>
            <TabScreen label={'Attendance'}>{<AttendenceView />}</TabScreen>
          </Tabs>
        </TabsProvider>
      </>
    );
  };
  return (
    <Layout isScrollable headerTitle="Performance Management">
      <View style={styles.container}>
        <Text style={styles.header}>Overall Insights</Text>
        <CustomTabBar
          periods={periods}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <View style={styles.cardsContainer}>
          <InsightCard
            title="Total Sales"
            value="₹ 1.2 Lakhs"
            change={2.5}
            onPress={() => {}}
          />
          <InsightCard
            title="Retailer Visits"
            value={32}
            change={-1.5}
            onPress={() => {}}
          />
          <InsightCard
            title="Retailer Leads"
            value={12}
            change={-1.5}
            onPress={() => {}}
          />
          <InsightCard
            title="Products Sold"
            value={1234}
            change={2.5}
            onPress={() => {}}
          />
        </View>
      </View>
      {renderTab()}
    </Layout>
  );
};

export default PerformanceManagement;
