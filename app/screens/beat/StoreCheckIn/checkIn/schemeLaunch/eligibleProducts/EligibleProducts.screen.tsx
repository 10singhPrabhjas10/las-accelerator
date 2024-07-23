// External Dependencies
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Text} from 'react-native-paper';

// Internal Dependencies
import Layout from 'components/Layout';
import Accordion from 'components/accordion/Accordion';
import SchemeCard from '../components/schemeCard/SchemeCard';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';

// Styles, constants and Interfaces
import styles from './EligibleProducts.style';
import ArchiveBoxIcon from '../../../../../../../assets/icons/archiveBox.svg';
import {
  IAccordionData,
  ISeriesData,
  ISubCategoryList,
} from './EligibleProducts.interface';
import {IAccordionCardItem} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import CommonStyles from 'utils/commonStyle';
import {getEligibleProductsList} from '../SchemeLaunch.business';

const EligibleProducts = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'EligibleProducts'>>();

  const [eligibleProductsList, setEligibleProductsList] = useState<
    ISubCategoryList[]
  >([]);

  useEffect(() => {
    getEligibleProductsList(
      route?.params?.relationId,
      route?.params?.secondarySchemeId,
      route?.params?.categoryId,
      setEligibleProductsList,
      'secondary',
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
          navigation?.navigate('SkuProductList', {
            secondarySchemeId,
            categoryId,
            subCategoryId,
            series,
            relationId: route?.params?.relationId,
          }),
      },
    ];
  };

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle={'Eligible Products'}>
      <View style={styles.cardContainer}>
        {eligibleProductsList?.map((data: ISubCategoryList, index: number) => (
          <View key={index}>
            <Text variant="bodySmall" style={styles.contentHeading}>
              {data.header}
            </Text>
            {data?.data?.map((accordionData: IAccordionData, index: number) => {
              return (
                <Accordion
                  title={
                    <Text variant="bodySmall" style={styles.accordionTitle}>
                      {accordionData.accordionHeader}
                    </Text>
                  }
                  isExpanded={false}
                  key={index}>
                  <View style={styles.accordionCard}>
                    {accordionData?.accordionCard?.map(
                      (cardElement: ISeriesData) => {
                        return (
                          <SchemeCard
                            data={[cardElement] as IAccordionCardItem[]}
                            key={cardElement.id}
                            footerButton={footerButton(cardElement)}
                          />
                        );
                      },
                    )}
                  </View>
                </Accordion>
              );
            })}
          </View>
        ))}
      </View>
    </Layout>
  );
};

export default EligibleProducts;
