import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {Card, Divider, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import RupeeBagIcon from '../../../../../assets/icons/rupeeBag.svg';
import ThreeBlocksIcon from '../../../../../assets/icons/threeBlocks.svg';
import GiftIcon from '../../../../../assets/icons/gift.svg';
import CoinsIcon from '../../../../../assets/icons/coins.svg';
import AirplaneIcon from '../../../../../assets/icons/airplane.svg';
import RewardsIcon from '../../../../../assets/icons/rewards.svg';

import Accordion from 'components/accordion/Accordion';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import CardInfoSection from 'components/cardInfoSection/CardInfoSection';
import Spacer from 'components/spacer';
import {getSecondarySchemesDashboardData} from 'screens/Retailer/Retailer.business';
import DataCard from 'components/dataCard/DataCard';
import {getTranslationLabel} from 'utils/commonMethods';
import SchemeFilter from './SchemeFilter';
import FilterButton from 'components/button/FilterButton';

const SchemePerformanceScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'SchemePerformance'>>();
  const categoryName = route.params.categoryName;
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const [schemesData, setSchemesData] = useState<ISchemesData>({
    schemeList: [],
    dashboard: {
      foc: 0,
      gift: 0,
      gold: 0,
      tour: 0,
      creditNotes: 0,
      other: 0,
    },
  });
  const [filterData, setFilterData] = useState<ISecondarySchemesPerformance>({
    startDate: '',
    endDate: '',
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleApplyFilters = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsFilterApplied(true);
  };

  const getData = useCallback(
    (filters: ISecondarySchemesPerformance) => {
      getSecondarySchemesDashboardData(categoryName, filters, setSchemesData);
      setIsFilterApplied(false);
    },
    [categoryName],
  );

  useEffect(() => {
    if (isFilterApplied) {
      getData(filterData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterApplied]);

  return (
    <Layout headerTitle="Scheme Dashboard">
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}>
        <Text>{categoryName}</Text>
        <Spacer size={15} />
        <Card style={styles.container}>
          <Card.Content>
            <View style={styles.cardContent}>
              <CardInfoSection
                title="Credit Notes"
                value={
                  schemesData?.dashboard?.creditNotes
                    ? '₹ ' + schemesData?.dashboard?.creditNotes
                    : '--'
                }
                icon={<RupeeBagIcon />}
              />
              <Divider style={CommonStyles.verticalDivider} />
              <CardInfoSection
                title="FoC"
                value={
                  schemesData?.dashboard?.creditNotes
                    ? '₹ ' + schemesData?.dashboard?.foc
                    : '--'
                }
                icon={<ThreeBlocksIcon />}
              />
              <Divider style={CommonStyles.verticalDivider} />
              <CardInfoSection
                title="Gift"
                value={
                  schemesData?.dashboard?.gift
                    ? '₹ ' + schemesData?.dashboard?.gift
                    : '--'
                }
                icon={<GiftIcon />}
              />
            </View>
            <Spacer size={30} />
            <View style={styles.cardContent}>
              <CardInfoSection
                title="Gold"
                value={
                  schemesData?.dashboard?.gold
                    ? '₹ ' + schemesData?.dashboard?.gold
                    : '--'
                }
                icon={<CoinsIcon />}
              />
              <Divider style={CommonStyles.verticalDivider} />
              <CardInfoSection
                title="Tour"
                value={
                  schemesData?.dashboard?.tour
                    ? '₹ ' + schemesData?.dashboard?.tour
                    : '--'
                }
                icon={<AirplaneIcon />}
              />
              {schemesData.dashboard.other ? (
                <>
                  <Divider style={CommonStyles.verticalDivider} />
                  <CardInfoSection
                    title="Tour"
                    value={
                      schemesData?.dashboard?.other
                        ? '₹ ' + schemesData?.dashboard?.other
                        : '--'
                    }
                    icon={<AirplaneIcon />}
                  />
                </>
              ) : null}
            </View>
          </Card.Content>
        </Card>
        <Spacer size={20} />
        {schemesData?.schemeList?.length > 0 &&
          schemesData?.schemeList?.map((scheme, index) => {
            return (
              <Accordion
                title={scheme.schemeName}
                isExpanded={false}
                key={index}>
                <DataCard
                  data={scheme.data}
                  showViewDetailsButton
                  isExpandableButtonVisible={false}
                  rows={4}
                  buttonText={getTranslationLabel('view_rewards')}
                  onPressViewLeadDetails={() =>
                    navigation.navigate('ViewRewards', {
                      schemeCode: scheme.schemeCode,
                      categoryName,
                    })
                  }
                  buttonIcon={<RewardsIcon height={15} width={15} />}
                />
              </Accordion>
            );
          })}
      </ScrollView>
      <FilterButton onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheetModalComponent
        maxHeight={'77%'}
        minHeight={'77%'}
        isFilter={true}
        ref={bottomSheetModalRef}>
        <SchemeFilter
          filterData={filterData}
          setFilterData={setFilterData}
          onApplyFilter={handleApplyFilters}
        />
      </BottomSheetModalComponent>
    </Layout>
  );
};

export default SchemePerformanceScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
  },
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
  },
  cardContent: {
    alignContent: 'center',
    flexDirection: 'row',
  },
});
