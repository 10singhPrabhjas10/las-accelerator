import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DataCard from 'components/dataCard/DataCard';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {getCustomerSePicData} from './CustomerSePic.business';
import {
  ICustomerSePicBody,
  ICustomerSePicResponse,
} from './CustomerSePic.interface';
import {convertDateToDisplay} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const CustomerSePicScreen = () => {
  const [customerData, setCustomerData] = useState<ICustomerSePicResponse[]>(
    [],
  );
  const route = useRoute<RouteProp<RootNavigationTypes, 'CustomerSePic'>>();
  const {retailerCode} = route.params;
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner?.retailerCustomerCode,
  );
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const getCustomerData = useCallback(() => {
    const requestBody: ICustomerSePicBody = {
      channelPartnerId: customerCode,
      retailerId: retailerCode,
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
    };
    getCustomerSePicData(setCustomerData, setTotalPages, requestBody);
  }, [pageNumber]);
  useEffect(() => {
    if (pageNumber <= totalPages) {
      getCustomerData();
    }
  }, []);

  return (
    <Layout headerTitle="Customer: SE- PIC" style={CommonStyles.padding}>
      <FlatList
        data={customerData}
        renderItem={({item}) => (
          <DataCard
            data={[
              {
                title: 'Category Name',
                text: item?.categories ?? EMPTY_DATA_DASH,
              },
              {
                title: 'Chan. Part. Name',
                text: item?.ChannelPartnerName ?? EMPTY_DATA_DASH,
              },
              {
                title: 'Chan. Part. Relation',
                text: item?.channelPartnerGroup ?? EMPTY_DATA_DASH,
              },
              {
                title: 'Last Order Date',
                text: item?.lastOrderDate
                  ? convertDateToDisplay(
                      item?.lastOrderDate,
                      DateFormats.DD_MM_YYYY_,
                    )
                  : EMPTY_DATA_DASH,
              },
              {
                title: 'Salesperson Name',
                text: item?.salesUser?.name ?? EMPTY_DATA_DASH,
              },
              {
                title: 'Salesperson Contact',
                text: item?.salesUser?.mobileNumber
                  ? `+91 ${item?.salesUser?.mobileNumber}`
                  : EMPTY_DATA_DASH,
              },
            ]}
            key={item?.id}
          />
        )}
        initialNumToRender={10}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
        }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyContainer title="You do not have Customer SE-PIC data" />
        }
      />
    </Layout>
  );
};

export default CustomerSePicScreen;
