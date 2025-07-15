import React, {ReactNode, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Layout from 'components/Layout';
import DashboardHeader from './dashboardComponent/dashboardHeader/DashboardHeader';

import {RootNavigationProp} from 'routes/RootNavigation';
import PrimaryUserProfile from '../../../assets/icons/primaryuserProfile.svg';
import SecondaryProfileIcon from '../../../assets/icons/secondaryProfileIcon.svg';
import MultipleUsersIcon from '../../../assets/icons/multipleUsersIcon.svg';
import ExpenseManagementIcon from '../../../assets/icons/expenseManagementIcon.svg';
import SelfManagementIcon from '../../../assets/icons/selfManagementIcon.svg';
import OrderTakingIcon from '../../../assets/icons/orderTakingIcon.svg';
import PerformanceIcon from '../../../assets/icons/performance.svg';
import ProductPriceListIcon from '../../../assets/icons/productPriceListIcon.svg';
import BeatIcon from '../../../assets/icons/beat.svg';
import {COLORS, spacing} from 'theme/theme';
import AttendaceIcon from '../../../assets/icons/attendance.svg';
import {getDeviceWidth, getTranslationLabel} from 'utils/commonMethods';
import {getCurrentLocation} from '@/utils/Permissions';
import {TodaysBeatPlan} from '@/utils/dummyData';
import ListCard from '../beatPlan/cardComponents/listCard/listCard';
import PerformanceCard from './components/performanceCard';
import {ScrollView} from 'react-native-gesture-handler';
import QuickLinkCard from './components/QuickLinkCard';
import CommonStyles from '@/utils/commonStyle';

interface IDashboardTileProps {
  title: string;
  icon: ReactNode;
  onPress: () => void;
}

const DashboardTile = ({title, icon, onPress}: IDashboardTileProps) => {
  return (
    <Card style={styles.tile} onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        {icon}
        <Text variant="bodyMedium" style={styles.tileText}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
};

const Dashboard = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const tilesData = [
    // {
    //   title: getTranslationLabel('primary_cp'),
    //   image: <PrimaryUserProfile height={24} width={24} />,
    //   onPress: () =>
    //     navigation.navigate('PrimaryPartnerSearch', {fromOrderTaking: false}),
    // },
    // {
    //   title: getTranslationLabel('secondary_cp'),
    //   image: <SecondaryProfileIcon height={24} width={24} />,
    //   onPress: () =>
    //     navigation.navigate('RetailerPartnerSearch', {fromOrderTaking: false}),
    // },
    {
      title: getTranslationLabel('attendance'),
      image: <AttendaceIcon height={24} width={24} />,
      onPress: () => navigation.navigate('AttendanceManagement'),
    },
    {
      title: getTranslationLabel('beatplan'),
      image: <BeatIcon height={24} width={24} />,
      onPress: () => navigation.navigate('Beat'),
    },
    {
      title: getTranslationLabel('retailer360'),
      image: <BeatIcon height={24} width={24} />,
      onPress: () => navigation.navigate('Beat'),
    },
    {
      title: getTranslationLabel('performance360'),
      image: <BeatIcon height={24} width={24} />,
      onPress: () => navigation.navigate('PerformanceManagement'),
    },
    {
      title: getTranslationLabel('lead_management'),
      image: <MultipleUsersIcon height={24} width={24} />,
      onPress: () => navigation.navigate('LeadManagement'),
    },
    // {
    //   title: getTranslationLabel('travel_expenses'),
    //   image: <BeatIcon height={24} width={24} />,
    //   onPress: () => navigation.navigate('Beat'),
    // },
    {
      title: getTranslationLabel('expense_management'),
      image: <ExpenseManagementIcon height={24} width={24} />,
      onPress: () => navigation.navigate('ExpenseManagement'),
    },
    {
      title: getTranslationLabel('leads'),
      image: <SecondaryProfileIcon height={24} width={24} />,
      onPress: () => navigation.navigate('Leads'),
    },
    // {
    //   title: getTranslationLabel('self_management'),
    //   image: <SelfManagementIcon height={24} width={24} />,
    //   onPress: () => navigation.navigate('SelfManagement'),
    // },
    {
      title: getTranslationLabel('order_taking'),
      image: <OrderTakingIcon height={24} width={24} />,
      onPress: () => navigation.navigate('OrderHome'),
    },
    // {
    //   title: getTranslationLabel('product_price_list'),
    //   image: <ProductPriceListIcon height={24} width={24} />,
    //   onPress: () => navigation.navigate('ProductPriceList'),
    // },
    // {
    //   title: getTranslationLabel('performance_management'),
    //   image: <PerformanceIcon height={24} width={24} />,
    //   onPress: () => navigation.navigate('PerformanceManagement'),
    // },
  ];
  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <Layout isScrollable>
      <DashboardHeader />

      <PerformanceCard customStyle={{marginTop: '-10%'}} />

      <View style={styles.component}>
        <Text variant="headlineSmall" style={CommonStyles.marginVertical10}>
          {getTranslationLabel('Todays_Visits')}
        </Text>
        <FlatList
          data={TodaysBeatPlan}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flatListContainer}
          renderItem={({item, index}) => (
            <ListCard
              image={''}
              name={item.name}
              address={item.location.street + ',' + item.location.city}
              distance={item.distance}
              time={item.eta}
              number={item.mobile_number}
              customStyle={{
                alignSelf: 'flex-start',
                minWidth: getDeviceWidth(0.8),
              }}
              status={item.status}
            />
          )}
        />
      </View>

      <View style={[styles.component, styles.marginBottom50]}>
        <Text variant="headlineSmall" style={CommonStyles.marginVertical10}>
          Quick Links
        </Text>
        <FlatList
          data={tilesData}
          numColumns={3}
          renderItem={({item, index}) => (
            <QuickLinkCard text={item.title} onPress={item.onPress} icon={item.image} />
          )}
        />
      </View>
    </Layout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  cardContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marginBottom50: {
    marginBottom: 50,
  },
  row: {
    gap: 8,
  },
  fontSize16: {
    fontSize: 16,
  },
  component: {paddingLeft: '5%'},
  flatListContainer: {
    marginRight: '5%',
  },
  tile: {
    backgroundColor: COLORS.white,
    flex: 1 / 2,
    height: 114,
    margin: 5,
    justifyContent: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 1,
    alignSelf: 'center',
  },
  flatListContent: {
    gap: 8,
    padding: 10,
  },
  tileText: {
    textAlign: 'center',
    color: COLORS.black,
    paddingTop: spacing.layoutPaddingH,
  },
});
