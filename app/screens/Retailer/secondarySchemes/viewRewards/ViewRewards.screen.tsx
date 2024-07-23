import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import CardWrapper from 'components/card/Card';
import {Divider, ProgressBar, Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import Spacer from 'components/spacer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {getSecondarySchemesRewardsData} from 'screens/Retailer/Retailer.business';
import {getTranslationLabel} from 'utils/commonMethods';

const greyText = {colors: {onSurface: COLORS.grey2}};
const orangeText = {colors: {onSurface: COLORS.darkOrange2}};
const greenText = {colors: {onSurface: COLORS.darkGreen2}};

const ViewRewardsScreen = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'ViewRewards'>>();
  const {schemeCode, categoryName} = route.params;

  const [dashboardData, setDashboardData] = useState<ISchemeRewardResponse[]>(
    [],
  );

  useEffect(() => {
    getSecondarySchemesRewardsData(schemeCode, setDashboardData);
  }, [schemeCode]);

  return (
    <Layout
      headerTitle={getTranslationLabel('scheme_dashboard')}
      style={CommonStyles.padding}>
      <FlatList
        data={dashboardData}
        renderItem={({item, index}) => {
          let slabTo = '';
          let progress = 0;
          let slabProgress = '';
          if (!item?.currentSlab) {
            slabTo = '--';
            progress = 0;
          } else if (item?.currentSlab?.includes('-')) {
            slabTo = item?.currentSlab?.split('-')[1];
            progress = Number(item.currentProgress) / Number(slabTo);
            slabProgress = item.currentProgress + '/' + slabTo;
          } else if (item?.currentSlab?.includes('>')) {
            slabTo = item?.currentSlab?.split(' ')[1];
            progress = 1;
            slabProgress = item.currentProgress + '/' + slabTo;
          }
          return (
            <CardWrapper key={index}>
              <Text theme={orangeText} variant="headlineSmall">
                {item?.distributorName}
              </Text>
              <Spacer size={10} />
              <View style={CommonStyles.flexRow}>
                <Text variant="bodyLarge">
                  {getTranslationLabel('current_slab')}{' '}
                </Text>
                <Text theme={greyText} variant="bodySmall">
                  {item?.currentSlab}
                </Text>
              </View>
              <Spacer size={10} />
              <ProgressBar
                progress={progress}
                color={COLORS.orange}
                style={styles.progressBar}
              />
              <Spacer size={15} />
              <View style={CommonStyles.flexRow}>
                <Text variant="bodyMedium">
                  {getTranslationLabel('achievement_loyalty')}{' '}
                </Text>
                <Text variant="bodyLarge">{item.status}</Text>
                <Divider style={styles.verticalDivider} />
                <Text theme={greyText} variant="bodySmall">
                  {slabProgress}
                </Text>
              </View>
              <Spacer size={15} />
              <Text variant="bodyMedium">
                {getTranslationLabel('reward_unlocked')}{' '}
                <Text variant="bodyLarge" theme={greenText}>
                  {item?.rewardValue}
                </Text>
                <Text variant="bodySmall">
                  {' '}
                  {getTranslationLabel('achieved')}
                </Text>
              </Text>
              {item?.nextRewardObj !== null ? (
                <>
                  <Spacer size={15} />
                  <Text theme={greyText} variant="bodySmall">
                    {getTranslationLabel('next_reward')}
                  </Text>
                  <Text variant="bodyMedium">
                    You’re currently{' '}
                    <Text variant="bodyLarge" theme={greenText}>
                      {item?.nextRewardObj?.nextRewardDiff} {categoryName}
                    </Text>
                    <Text variant="bodySmall">
                      {' '}
                      {getTranslationLabel('from_getting_bonus')}{' '}
                      {item?.nextRewardObj?.nextRewardValue}{' '}
                      {getTranslationLabel('on_your_total_points')}
                    </Text>
                  </Text>
                </>
              ) : null}
            </CardWrapper>
          );
        }}
      />
    </Layout>
  );
};
const styles = StyleSheet.create({
  progressBar: {height: 10, borderRadius: 10},
  verticalDivider: {
    width: 2,
    marginHorizontal: 10,
    height: '90%',
    borderColor: COLORS.grey2,
  },
});
export default ViewRewardsScreen;
