import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';

import Layout from 'components/Layout';
import {getShippingDetails} from 'screens/primaryCP/PrimaryChannelPartner.business';
import DataCard from 'components/dataCard/DataCard';

import {RootNavigationTypes} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';

const ShippingDetails = () => {
  const [shippingData, setShippingData] = useState<IShippingDetails>();

  const route = useRoute<RouteProp<RootNavigationTypes, 'ShippingDetails'>>();
  const {customerAddressCode} = route?.params;

  useEffect(() => {
    getShippingDetails(customerAddressCode, setShippingData);
  }, [customerAddressCode]);

  return (
    <Layout
      isScrollable
      headerTitle={'Shipping Information'}
      style={CommonStyles.padding}>
      <DataCard header={shippingData?.addressType} data={shippingData?.data} />
    </Layout>
  );
};

export default ShippingDetails;
