import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {styles} from './styles';
import Layout from '@/components/Layout';
import {COLORS} from '@/theme/colors';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';

import NotificationIconWithDot from '../components/retailerDetailsPage/notificationIcon';
import RetailerDetailsPageHeader from '../components/retailerDetailsPage/pageHeader';
import NavActions from '../components/retailerDetailsPage/navActions';
import ListComponent from '../../beatPlan/components/listComponent/listComponent';
import BeatPlanCard from '../components/retailerDetailsPage/dashboardCard/beatPlanCard';
import RetailerSalesCard from '../components/retailerDetailsPage/dashboardCard/retailerSalesCard';
import BeatList from '../BeatList';

// Dummy Data for the Retailer Details
import dummyImg from '@/../assets/images/userImg.png';
import {OrderConfirmed} from '@/utils/Constants';
import OrderConfirmedModal from '../components/OrderConfirmedModal';
import {useIsFocused} from '@react-navigation/native';
const dummyRetailerData = {
  profileImg: dummyImg,
  //profileImg: '@/../assets/images/userImg.png',
  name: 'Laxmi Traders',
  retailerId: '1232345',
};

const RetailerDetails = (props: any) => {
  const [image, setImage] = useState(dummyRetailerData.profileImg);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const hasNotifications = true;
  const focused = useIsFocused();
  const [showPopUp, setPopUp] = useState<boolean>(
    props.route.params?.from == OrderConfirmed,
  );
  useEffect(() => {
    if (focused) setPopUp(props.route.params?.from == OrderConfirmed);
  }, [focused]);
  return (
    <Layout
      isScrollable
      headerTitle="RetailerDetails"
      onPressCustomLogo={() => {}}
      customLogo={() => (
        <NotificationIconWithDot
          hasNotifications={hasNotifications}
          color={COLORS.white}
        />
      )}>
      <RetailerDetailsPageHeader
        status={status}
        image={image}
        name={dummyRetailerData.name}
        retailerId={dummyRetailerData.retailerId}
      />
      <NavActions />
      <ListComponent />
      <RetailerSalesCard />
      <View style={{marginBottom: 100}} />
      <CustomButton
        text={'Check In'}
        onPress={() => {}}
        style={styles.button}
        type={ButtonTypes.contained}
      />
      <OrderConfirmedModal
        showModal={showPopUp}
        setShowModal={val => {
          setPopUp(val);
        }}
      />
    </Layout>
  );
};
export default RetailerDetails;
