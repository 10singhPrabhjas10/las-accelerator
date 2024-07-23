// External Dependencies
import {View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Card, Divider, Text} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';

// Internal Dependencies
import Layout from 'components/Layout';
import {RootNavigationTypes} from 'routes/RootNavigation';

// Styles, constants and Interfaces
import styles from './SkuProductList.style';
import {ISkuProduct, ISkuProductList} from './SkuProductList.interface';
import CommonStyles from 'utils/commonStyle';
import {getSkuProductList} from '../SchemeLaunch.business';

const SeperatorComponent = () => <Divider style={styles.cardDivider} />;

const SkuProductList = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'SkuProductList'>>();

  const {secondarySchemeId, categoryId, subCategoryId, series} = route.params;

  const [skuProductListData, setSkuProductListData] = useState<ISkuProductList>(
    {
      header: '',
      skuProductList: [],
    },
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const getSkuProductListData = useCallback(
    () => {
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
      getSkuProductList(
        route?.params?.relationId,
        requestBody,
        skuProductListData,
        setSkuProductListData,
        setPageCount,
        'secondary',
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageNumber],
  );

  useEffect(() => {
    if (pageNumber <= pageCount) {
      getSkuProductListData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const {header, skuProductList}: ISkuProductList = skuProductListData;

  return (
    <Layout headerTitle="Eligible Products">
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
              style={CommonStyles.flexGrow}
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

export default SkuProductList;
