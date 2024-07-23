import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import Accordion from 'components/accordion/Accordion';
import {Card, Icon, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';

import {RootNavigationProp} from 'routes/RootNavigation';
import {useNavigation} from '@react-navigation/native';
import {getCategoriesData} from './InventoryCheck.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {ITransformedCategories} from './InventoryCheck.interface';

const InventoryCheckScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );
  const [categoriesData, setCategoriesData] = useState<
    ITransformedCategories[]
  >([]);

  useEffect(() => {
    getCategoriesData(relationId, setCategoriesData);
  }, []);

  return (
    <Layout headerTitle="Inventory Record" style={CommonStyles.padding}>
      <FlatList
        data={categoriesData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Accordion key={index} title={item?.accordionHeader}>
              {item?.accordionSubHeader?.map((subCategory, indexx) => {
                return (
                  <Card style={styles.card} key={indexx}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('InventoryCard', {
                          category: item?.accordionHeader,
                          subCategory: subCategory,
                        });
                      }}
                      style={styles.subGroupView}>
                      <Text variant="labelLarge" style={styles.subHeader}>
                        {subCategory}
                      </Text>
                      <Icon
                        color={COLORS.darkYellow}
                        source={'chevron-right'}
                        size={16}
                      />
                    </TouchableOpacity>
                  </Card>
                );
              })}
            </Accordion>
          );
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGrey2,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: COLORS.lightGrey2,
    shadowOpacity: 0.25,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  subGroupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  subHeader: {color: COLORS.darkYellow},
});
export default InventoryCheckScreen;
