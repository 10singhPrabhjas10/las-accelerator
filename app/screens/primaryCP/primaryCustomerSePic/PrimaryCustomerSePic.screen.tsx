import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DataCard from 'components/dataCard/DataCard';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  ICustomerSePicBody,
  IPrimaryCustomerResponse,
  getCustomerSePicData,
} from './PrimaryCustomerSePic.business';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const PrimaryCustomerSePic = () => {
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const [customerData, setCustomerData] = useState<IPrimaryCustomerResponse[]>(
    [],
  );
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const getCustomerData = useCallback(() => {
    const requestBody: ICustomerSePicBody = {
      channelPartnerId: customerCode,
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
    };
    getCustomerSePicData(setCustomerData, setTotalPages, requestBody);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      getCustomerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <Layout
      headerTitle={getTranslationLabel('customer_se_pic')}
      style={CommonStyles.padding}>
      <FlatList
        data={customerData}
        renderItem={({item}) => (
          <DataCard
            data={[
              {
                title: getTranslationLabel('category_name'),
                text: item?.categories ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('cp_relation'),
                text: item?.channelPartnerGroup ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('last_order_date'),
                text: item?.lastOrderDate
                  ? convertDateToDisplay(
                      item?.lastOrderDate,
                      DateFormats.DD_MM_YYYY_,
                    )
                  : EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('sales_person_name'),
                text: item?.salesUser?.name ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('sales_person_contact'),
                text: item?.salesUser?.mobileNumber ?? EMPTY_DATA_DASH,
              },
            ]}
            key={item?.id}
          />
        )}
        initialNumToRender={10}
        onEndReached={() => {
          setPageNumber(prev => prev + 1);
        }}
        ListEmptyComponent={
          <EmptyContainer title={getTranslationLabel('no_primary_sepic')} />
        }
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default PrimaryCustomerSePic;
