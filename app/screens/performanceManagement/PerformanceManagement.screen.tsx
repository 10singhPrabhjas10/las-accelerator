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
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Layout from 'components/Layout';
import CustomTabBar from '../../components/customTabBar/CustomTabBar';
import styles from './PerformanceStyle.ts';
import SalesReport from './performanceTabBar/PerformanceSalesReport.screen.tsx';
import AttendanceView from './tabs/AttendanceTab/AttendenceDashboard.tsx';
import Svg, {G, Path} from 'react-native-svg';
import ProductivityView from './tabs/Productivity/ProductivityDashBoard.tsx';

interface InsightCardProps {
  title: string;
  value: string | number;
  change: number;
  onPress: () => void;
}

const UpArrow = ({color}: {color: string}) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <G id="ic_Down">
      <Path
        id="Shape"
        d="M5.99777 2.00001C5.87396 1.9994 5.74995 2.05008 5.66089 2.15201L2.55421 5.70757C2.3927 5.89241 2.41162 6.17318 2.59646 6.33469C2.7813 6.49619 3.06207 6.47727 3.22358 6.29243L5.55556 3.62351V9.55556C5.55556 9.80102 5.75454 10 6 10C6.24546 10 6.44445 9.80102 6.44445 9.55556V3.6311L8.77684 6.2929C8.93861 6.47752 9.21941 6.49604 9.40402 6.33427C9.58863 6.17251 9.60715 5.89171 9.44539 5.7071L6.36781 2.19487C6.28785 2.07725 6.15295 2 6 2L5.99777 2.00001Z"
        fill="#3DD598"
      />
    </G>
  </Svg>
);

const DownArrow = ({color}: {color: string}) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <G id="ic_Down">
      <Path
        id="Shape"
        d="M5.99777 10C5.87396 10.0006 5.74995 9.94992 5.66089 9.84799L2.55421 6.29243C2.3927 6.10759 2.41162 5.82682 2.59646 5.66532C2.7813 5.50381 3.06207 5.52273 3.22358 5.70757L5.55556 8.37649V2.44444C5.55556 2.19898 5.75454 2 6 2C6.24546 2 6.44445 2.19898 6.44445 2.44444V8.3689L8.77684 5.7071C8.93861 5.52248 9.21941 5.50396 9.40402 5.66573C9.58863 5.8275 9.60715 6.10829 9.44539 6.29291L6.36781 9.80514C6.28785 9.92275 6.15295 10 6 10L5.99777 10Z"
        fill="#FC5A5A"
      />
    </G>
  </Svg>
);

const AltArrow = ({color = 'white'}: {color?: string}) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <G id="Outline / Arrows / Alt Arrow Right">
      <Path
        id="Vector (Stroke)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.9995 3.48858C7.27003 3.2567 7.67732 3.28803 7.90921 3.55856L13.0705 9.58005C13.2776 9.82166 13.2776 10.1782 13.0705 10.4198L7.90921 16.4413C7.67732 16.7118 7.27003 16.7431 6.9995 16.5113C6.72897 16.2794 6.69764 15.8721 6.92952 15.6015L11.7309 9.99992L6.92952 4.39829C6.69764 4.12776 6.72897 3.72047 6.9995 3.48858Z"
        fill="white"
      />
    </G>
  </Svg>
);

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  change,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        {change > 0 ? (
          <View style={styles.changeRow}>
            <View style={[styles.arrowCircle, styles.positiveCircle]}>
              <UpArrow color="#4BB543" />
            </View>
            <Text style={[styles.changeText, styles.positive]}>+{change}%</Text>
          </View>
        ) : (
          <View style={styles.changeRow}>
            <View style={[styles.arrowCircle, styles.negativeCircle]}>
              <DownArrow color="#FF3B30" />
            </View>
            <Text style={[styles.changeText, styles.negative]}>{change}%</Text>
          </View>
        )}
        <View style={styles.altArrowContainer}>
          <AltArrow color="white" />
        </View>
      </View>
      
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);
const PerformanceManagement: React.FC = () => {
  const periods = ['Today', 'Week', 'Month', 'Custom'];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Generate component only upon tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <SalesReport />;
      case 1:
        return <ProductivityView />;
      case 2:
        return <AttendanceView />;
      default:
        return <SalesReport />;
    }
  };

  return (
    <Layout isScrollable={true} headerTitle="Performance 360">
      <View style={styles.mainContainer}>
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
              title="Leads"
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

        {/* Custom Tab Navigation */}
        <View style={fixedStyles.tabBarContainer}>
          <TouchableOpacity
            style={[
              fixedStyles.tabButton,
              activeTab === 0 && fixedStyles.activeTab,
            ]}
            onPress={() => setActiveTab(0)}>
            <Text
              style={[
                fixedStyles.tabText,
                activeTab === 0 && fixedStyles.activeTabText,
              ]}>
              Sales Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              fixedStyles.tabButton,
              activeTab === 1 && fixedStyles.activeTab,
            ]}
            onPress={() => setActiveTab(1)}>
            <Text
              style={[
                fixedStyles.tabText,
                activeTab === 1 && fixedStyles.activeTabText,
              ]}>
              Productivity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              fixedStyles.tabButton,
              activeTab === 2 && fixedStyles.activeTab,
            ]}
            onPress={() => setActiveTab(2)}>
            <Text
              style={[
                fixedStyles.tabText,
                activeTab === 2 && fixedStyles.activeTabText,
              ]}>
              Attendance
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={fixedStyles.tabContentContainer}>
          {renderTabContent()}
        </View>
      </View>
    </Layout>
  );
};

const fixedStyles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    marginTop: 4,
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    backgroundColor: '#E6EDEE',
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: '#222426',
    fontWeight: 'bold',
  },
  tabContentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default PerformanceManagement;
