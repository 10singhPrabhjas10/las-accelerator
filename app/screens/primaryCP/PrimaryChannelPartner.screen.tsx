import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Layout from 'components/Layout';
import Spacer from 'components/spacer';
import {FlatList, StyleSheet} from 'react-native';
import ProfileDetails from './components/ProfileDetail';
import ActionButton from 'components/button/ActionButton';
import ContactFooter from 'components/contactFooter/ContactFooter';
import {getPrimaryCustomerDetails} from './PrimaryChannelPartner.business';

import {NavigationFrom, ProfileActionItem} from 'utils/Constants';
import CommonStyles from 'utils/commonStyle';
import {RootNavigationProp} from 'routes/RootNavigation';
import OrderTrackingIcon from '../../../assets/icons/orderTracking.svg';
import UserProfileIcon from '../../../assets/icons/userProfileIcon.svg';
import ProductMappingIcon from '../../../assets/icons/productMappingIcon.svg';
import FinancialInformationIcon from '../../../assets/icons/financialInformationIcon.svg';
import OrderManagementIcon from '../../../assets/icons/orderMgmtIcon.svg';
import PrimarySalesIcon from '../../../assets/icons/primarySalesIcon.svg';
import SecondarySalesIcon from '../../../assets/icons/secondarySalesIcon.svg';
import SecondarySchemesIcon from '../../../assets/icons/secondarySchemesIcon.svg';
import MappedRetailerIcon from '../../../assets/icons/mappedRetailerIcon.svg';
import {RootState} from 'store/redux/store';
import TicketIcon from '../../../assets/icons/ticketIcon.svg';
import CollectionIcon from '../../../assets/icons/collectionIcon.svg';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import SePicIcon from '../../../assets/icons/imageCapture.svg';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';

const PrimaryChannelPartner = () => {
  const [customerData, setCustomerData] = useState<IProfileDetails>({
    isBlocked: false,
    data: [],
  });

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const lasType = useSelector((state: RootState) => state?.user?.user?.lasType);

  const navigation = useNavigation<RootNavigationProp>();
  const menuItems = [
    {
      name: ProfileActionItem.ORDER_TAKING,
      icon: <OrderTrackingIcon height={21} width={21} />,
      navigationScreen: '',
      roles: LasType.TE,
    },
    {
      name: ProfileActionItem.PROFILE_DETAILS,
      icon: <UserProfileIcon height={21} width={21} />,
      navigationScreen: '',
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.PRODUCT_MAPPING,
      icon: <ProductMappingIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.FINANCIAL_INFO,
      icon: <FinancialInformationIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.ORDER_MANAGEMENT,
      icon: <OrderManagementIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.PRIMARY_SALES,
      icon: <PrimarySalesIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.SECONDARY_SALES,
      icon: <SecondarySalesIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.PRIMARY_SCHEMES,
      icon: <SecondarySchemesIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.SECONDARY_SCHEMES,
      icon: <SecondarySchemesIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.MAPPED_RETAILER,
      icon: <MappedRetailerIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
    {
      name: ProfileActionItem.GRIEVANCE_REDRESSAL,
      icon: <TicketIcon height={21} width={21} />,
      roles: LasType.TE,
    },
    {
      name: ProfileActionItem.BTL,
      icon: <CollectionIcon height={21} width={21} />,
      roles: LasType.TE,
    },
    {
      name: ProfileActionItem.SE_PIC,
      icon: <SePicIcon height={21} width={21} />,
      roles: [LasType.TE, LasType.RE],
    },
  ];

  useEffect(() => {
    getPrimaryCustomerDetails(customerCode, setCustomerData);
  }, [customerCode]);

  const handleAction = (key: string) => {
    switch (key) {
      case ProfileActionItem.ORDER_TAKING:
        navigation.navigate('OrderTask', {
          relation: Relation.PRIMARY_CHANNEL_PARTNER,
          navigationFrom: NavigationFrom.PRIMARY_CP,
        });
        break;
      case ProfileActionItem.PROFILE_DETAILS:
        navigation.navigate('ProfileDetails');
        break;
      case ProfileActionItem.FINANCIAL_INFO:
        navigation.navigate('FinancialInformation');
        break;
      case ProfileActionItem.ORDER_MANAGEMENT:
        navigation.navigate('OrderManagement');
        break;
      case ProfileActionItem.PRODUCT_MAPPING:
        navigation.navigate('ProductsMapping');
        break;
      case ProfileActionItem.MAPPED_RETAILER:
        navigation.navigate('MappedRetailer');
        break;
      case ProfileActionItem.GRIEVANCE_REDRESSAL:
        navigation.navigate('GrievanceRedressal', {
          navigationFrom: NavigationFrom.PRIMARY_CP,
        });
        break;
      case ProfileActionItem.BTL:
        navigation.navigate('BTL', {
          navigationFrom: NavigationFrom.PRIMARY_CP,
          relation: Relation.PRIMARY_CHANNEL_PARTNER,
        });
        break;
      case ProfileActionItem.SE_PIC:
        navigation.navigate('PrimaryCustomerSePic');
        break;
      case ProfileActionItem.SECONDARY_SCHEMES:
        navigation.navigate('PrimaryCPSecondarySchemes');
        break;
      case ProfileActionItem.PRIMARY_SCHEMES:
        navigation?.navigate('PSchemeLaunch', {
          navigationFrom: NavigationFrom.PRIMARY_CP,
        });
        break;
      case ProfileActionItem.SECONDARY_SALES:
        navigation.navigate('PrimarySecondarySales');
        break;
      case ProfileActionItem.PRIMARY_SALES:
        navigation.navigate('PrimarySales');
        break;

      default:
        return null;
    }
  };

  const filteredTiles = menuItems.filter(tile => {
    return tile?.roles?.includes(lasType as LasType);
  });

  return (
    <Layout
      headerTitle={'Primary Channel Partner'}
      style={CommonStyles.padding16}>
      <FlatList
        data={filteredTiles}
        renderItem={({item}) => (
          <ActionButton
            icon={item.icon}
            title={item.name}
            key={item.name}
            onPress={val => handleAction(val)}
          />
        )}
        ListHeaderComponent={
          <>
            <ProfileDetails
              isBlocked={customerData.isBlocked}
              data={customerData.data}
            />
            <Spacer size={16} />
          </>
        }
        ListFooterComponent={
          <>
            <Spacer size={16} />
            <ContactFooter is0PaddingHorizontal />
          </>
        }
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item, index) => `tile_${index}`}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default PrimaryChannelPartner;

const styles = StyleSheet.create({
  flatListContainer: {paddingHorizontal: 4},
});
