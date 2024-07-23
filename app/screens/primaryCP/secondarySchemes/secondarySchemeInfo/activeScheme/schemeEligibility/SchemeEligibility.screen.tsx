import {View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import Accordion from 'components/accordion/Accordion';
import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';

import ArchiveBoxIcon from '../../../../../../../assets/icons/archiveBox.svg';
import SchemeCard from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/components/schemeCard/SchemeCard';
import {
  IAccordionCardItem,
  IAccordionData,
  ISeriesData,
  ISubCategoryList,
} from './SchemeEligibility.interface';
import {getEligibleProductsList} from 'screens/beat/StoreCheckIn/checkIn/schemeLaunch/SchemeLaunch.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import EmptyContainer from 'components/emptyContainer/EmptyContainer';

const SchemeEligibility = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'SchemeEligibility'>>();
  const {schemeId, categoryId} = route.params;
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const [eligibleProductsList, setEligibleProductsList] = useState<
    ISubCategoryList[]
  >([]);

  useEffect(() => {
    getEligibleProductsList(
      customerCode,
      schemeId,
      categoryId,
      setEligibleProductsList,
      'primary',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const footerButton = (cardData: ISeriesData) => {
    const {secondarySchemeId, categoryId, subCategoryId, series} = cardData;
    return [
      {
        title: 'View SKU Details',
        icon: <ArchiveBoxIcon />,
        onButtonPress: () =>
          navigation?.navigate('SkuDetails', {
            secondarySchemeId,
            categoryId,
            subCategoryId,
            series,
          }),
      },
    ];
  };

  return (
    <Layout
      headerTitle="Scheme Eligibility"
      isScrollable
      style={CommonStyles.padding}>
      {eligibleProductsList?.length > 0 ? (
        <View style={styles.cardContainer}>
          {eligibleProductsList?.map(
            (data: ISubCategoryList, index: number) => (
              <View key={index}>
                <Text variant="bodySmall" style={styles.contentHeading}>
                  {data.header}
                </Text>
                {data?.data?.map(
                  (accordionData: IAccordionData, index1: number) => {
                    return (
                      <Accordion
                        title={
                          <Text
                            variant="bodySmall"
                            style={styles.accordionTitle}>
                            {accordionData.accordionHeader}
                          </Text>
                        }
                        isExpanded={false}
                        key={index1}>
                        <View key={index1} style={styles.accordionCard}>
                          {accordionData?.accordionCard?.map(
                            (cardElement: ISeriesData, index2: number) => {
                              return (
                                <SchemeCard
                                  data={[cardElement] as IAccordionCardItem[]}
                                  key={index2}
                                  footerButton={footerButton(cardElement)}
                                />
                              );
                            },
                          )}
                        </View>
                      </Accordion>
                    );
                  },
                )}
              </View>
            ),
          )}
        </View>
      ) : (
        <EmptyContainer title="No scheme eligibility data found." />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 20,
  },
  contentHeading: {
    color: COLORS.grey4,
  },
  accordionCard: {
    paddingTop: 10,
    gap: 16,
  },
  accordionTitle: {
    color: COLORS.darkYellow,
  },
});

export default SchemeEligibility;
