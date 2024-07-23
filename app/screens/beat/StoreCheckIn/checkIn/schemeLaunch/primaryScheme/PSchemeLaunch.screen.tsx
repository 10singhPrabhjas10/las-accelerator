import {FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ProductItem from 'screens/beat/components/productItem/ProductItem';
import {View} from 'react-native';
import {getPrimarySchemesData} from './PSchemeLaunch.business';
import {
  IPrimarySchemeReqBody,
  ITransformedScheme,
} from './PSchemeLaunch.interface';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {NavigationFrom} from 'utils/Constants';

const PSchemeLaunchScreen = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'PSchemeLaunch'>>();
  const {navigationFrom} = route.params;

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [schemeData, setSchemeData] = useState<ITransformedScheme[]>([]);

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN ? relationId : customerCode;

  const fetchPrimarySchemes = useCallback(() => {
    const reqBody: IPrimarySchemeReqBody = {
      channelPartnerId: code,
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
    };
    getPrimarySchemesData(reqBody, setSchemeData, setTotalPages);
  }, [pageNumber]);

  useEffect(() => {
    if (pageNumber <= totalPages) {
      fetchPrimarySchemes();
    }
  }, [pageNumber]);

  return (
    <Layout
      style={CommonStyles.padding}
      headerTitle="Primary Scheme Information">
      {schemeData?.length <= 0 && (
        <EmptyContainer title={'No Primary Schemes'} />
      )}
      <View style={CommonStyles.flexOne}>
        <FlatList
          data={schemeData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ProductItem item={item} key={index + item?.id} />
          )}
          initialNumToRender={10}
          onEndReached={() => {
            setPageNumber(prev => prev + 1);
          }}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
        />
      </View>
    </Layout>
  );
};

export default PSchemeLaunchScreen;
