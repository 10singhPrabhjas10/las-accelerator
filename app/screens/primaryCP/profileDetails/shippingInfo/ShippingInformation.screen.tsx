import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getShippingInformationListData} from 'screens/primaryCP/PrimaryChannelPartner.business';
import {Text} from 'react-native-paper';

import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';

import CommonStyles from 'utils/commonStyle';
import {RootNavigationProp} from 'routes/RootNavigation';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const ShippingInformation = () => {
  const [shippingData, setShippingData] = useState<IShippingListData[]>([
    {
      addressType: 'temp',
      customerAddressCode: '345345345',
      address: 'delhi inida',
      customerAddressId: '5345345',
    },
  ]);

  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    getShippingInformationListData(setShippingData);
  }, []);

  const renderEmptyComponent = () => (
    <EmptyContainer title="You do not have any Shipping Information" />
  );

  return (
    <Layout
      isScrollable
      headerTitle="Shipping Information"
      style={CommonStyles.padding}>
      <FlatList
        data={shippingData}
        renderItem={({item}) => (
          <DataCard
            header={item.addressType}
            showViewDetailsButton
            body={<Text>{item.address}</Text>}
            onPressViewLeadDetails={() =>
              navigation.navigate('ShippingDetails', {
                customerAddressCode: item.customerAddressId,
              })
            }
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
    </Layout>
  );
};

export default ShippingInformation;
