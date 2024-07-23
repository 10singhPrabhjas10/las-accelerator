import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import SePicIcon from '../../../assets/icons/imageCapture.svg';
import UserProfileIcon from '../../../assets/icons/userProfileIcon.svg';
import SchemeIcon from '../../../assets/icons/schemeIcon.svg';
import CollectionIcon from '../../../assets/icons/collectionIcon.svg';
import TicketIcon from '../../../assets/icons/ticketIcon.svg';
import InvoiceIcon from '../../../assets/icons/invoice.svg';
import PerformanceIcon from '../../../assets/icons/PerformanceIcon.svg';
import OrderTakingIcon from '../../../assets/icons/orderCreate.svg';
import OrderHistoryIcon from '../../../assets/icons/orderHistoryIcon.svg';

import ActionButton from 'components/button/ActionButton';
import RetailerDetails, {ICustomer} from './components/RetailerDetails';
import Spacer from 'components/spacer';
import ContactFooter from 'components/contactFooter/ContactFooter';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {
  getSecondaryCustomerDetails,
  submitLiveLocationData,
} from './Retailer.business';
import {NavigationFrom} from 'utils/Constants';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {hasLocationPermission} from 'utils/commonMethods';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

const SecondaryChannelPartnerScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  const [customerData, setCustomerData] = useState<ICustomer>();
  const [location, setLocation] = useState<GeolocationResponse>();

  useEffect(() => {
    getSecondaryCustomerDetails(customerCode, setCustomerData);
  }, [customerCode]);

  const getLocation = async () => {
    try {
      const hasPermission = await hasLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos);
          },
          error => console.log('err', error),
          {enableHighAccuracy: true},
        );
      } else {
        throw new Error('Location permission not granted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location && customerCode) {
      const requestBody = {
        latitude: location?.coords?.latitude?.toString(),
        longitude: location?.coords?.longitude?.toString(),
      };
      submitLiveLocationData(customerCode, requestBody, () => {
        getSecondaryCustomerDetails(customerCode, setCustomerData);
      });
    }
  }, [location, customerCode]);

  const tilesData = [
    {
      title: 'Profile Details',
      image: <UserProfileIcon height={21} width={21} />,
      onPress: () => navigation.navigate('SecondaryProfileDetails'),
    },
    {
      title: 'Secondary Schemes',
      image: <SchemeIcon height={21} width={21} />,
      onPress: () => navigation.navigate('SecondarySchemes'),
    },
    {
      title: 'Performance',
      image: <PerformanceIcon height={21} width={21} />,
      onPress: () => navigation.navigate('Performance'),
    },
    {
      title: 'Order Taking',
      image: <OrderTakingIcon height={21} width={21} />,
      onPress: () =>
        navigation.navigate('OrderTask', {
          relation: Relation.SECONDARY_CHANNEL_PARTNER,
          navigationFrom: NavigationFrom.SECONDARY_CP,
        }),
    },
    {
      title: 'BTL',
      image: <CollectionIcon height={21} width={21} />,
      onPress: () =>
        navigation.navigate('BTL', {
          navigationFrom: NavigationFrom.SECONDARY_CP,
          relation: Relation.SECONDARY_CHANNEL_PARTNER,
        }),
    },
    {
      title: 'Grievance Redressal',
      image: <TicketIcon height={24} width={24} />,
      onPress: () =>
        navigation?.navigate('SecondaryGrivance', {
          navigationFrom: NavigationFrom.SECONDARY_CP,
        }),
    },
    {
      title: 'Order History',
      image: <OrderHistoryIcon height={24} width={24} />,
      onPress: () => navigation?.navigate('RetailerOrderHistory'),
    },
    {
      title: 'Customer: SE- PIC',
      image: <SePicIcon height={21} width={21} />,
      onPress: () =>
        navigation.navigate('CustomerSePic', {
          retailerCode: customerData?.retailerCode ?? '',
        }),
    },
    {
      title: 'Invoice Details',
      image: <InvoiceIcon height={24} width={24} />,
      onPress: () => {
        navigation.navigate('InvoiceDetailsSecondary', {
          retailerCode: customerData?.retailerCode ?? '',
        });
      },
    },
  ];

  return (
    <Layout headerTitle="Retailer" style={CommonStyles.padding}>
      <FlatList
        data={tilesData}
        renderItem={({item, index}) => (
          <ActionButton
            title={item?.title}
            icon={item?.image}
            onPress={item?.onPress}
            key={item?.title + index}
          />
        )}
        ListHeaderComponent={
          <>
            <RetailerDetails
              data={customerData}
              onPressLiveLocation={() => {
                getLocation();
              }}
            />
            <Spacer size={16} />
          </>
        }
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <Spacer size={16} />
            <ContactFooter is0PaddingHorizontal />
          </>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {paddingHorizontal: 4, flexGrow: 1},
});

export default SecondaryChannelPartnerScreen;
