import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {Card, Divider, Text} from 'react-native-paper';
import {FlatList} from 'react-native';
import {ISkuProduct, ISkuProductList} from './SkuDetails.interface';
import {COLORS} from 'theme/colors';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {getSkuProductList} from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/SchemeLaunch.business';
import {Dimensions} from 'react-native';

const SeperatorComponent = () => <Divider style={styles.cardDivider} />;

const SkuDetails = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'SkuDetails'>>();
  const {secondarySchemeId, categoryId, subCategoryId, series} = route.params;

  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const [skuProductListData, setSkuProductListData] = useState<ISkuProductList>(
    {
      header: '',
      skuProductList: [],
    },
  );

  const requestBody = {
    secondarySchemeId,
    categoryId,
    subCategoryId,
    series,
    pagination: {
      page: pageNumber,
      pageSize: 15,
    },
  };

  useEffect(() => {
    if (pageNumber <= pageCount) {
      getSkuProductList(
        customerCode,
        requestBody,
        skuProductListData,
        setSkuProductListData,
        setPageCount,
        'primary',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const {header, skuProductList}: ISkuProductList = skuProductListData;
  return (
    <Layout headerTitle="Scheme Eligibility">
      <View style={styles.cardContainer}>
        <Text>
          <Text style={styles.series} variant="bodySmall">
            Series Name:{' '}
          </Text>
          <Text variant="bodySmall" style={styles.contentHeading}>
            {header}
          </Text>
        </Text>
        <Card style={styles.card}>
          <Card.Title
            titleStyle={styles.cardHeader}
            title="List of SKU Items"
          />
          <Card.Content>
            <FlatList
              data={skuProductList}
              renderItem={({item}: {item: ISkuProduct}) => (
                <View>
                  <Text variant="labelLarge">{item.product}</Text>
                </View>
              )}
              initialNumToRender={15}
              onEndReached={() => {
                setPageNumber(prev => prev + 1);
              }}
              style={{flexGrow: 1}}
              scrollEventThrottle={16}
              onEndReachedThreshold={0.1}
              contentContainerStyle={styles.bodyContainerWithData}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={SeperatorComponent}
            />
          </Card.Content>
        </Card>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  series: {
    color: COLORS.grey2,
  },
  bodyContainerWithData: {
    flexGrow: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    paddingVertical: 20,
  },
  contentHeading: {
    color: COLORS.grey2,
  },
  cardHeader: {
    color: COLORS.darkOrange,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    marginTop: 16,
    paddingBottom: 60,
    maxHeight: Dimensions.get('window').height - 160,
  },
  cardDivider: {
    marginVertical: 15,
  },
});

export default SkuDetails;
