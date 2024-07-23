import Layout from 'components/Layout';
import CardInfoSection from 'components/cardInfoSection/CardInfoSection';
import Spacer from 'components/spacer';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';

import CommonStyles from 'utils/commonStyle';
import RupeeBagIcon from '../../../../../../../assets/icons/coinHand.svg';
import ThreeBlocksIcon from '../../../../../../../assets/icons/foc.svg';
import GiftIcon from '../../../../../../../assets/icons/gift.svg';
import CoinsIcon from '../../../../../../../assets/icons/coins.svg';
import AirplaneIcon from '../../../../../../../assets/icons/airplane.svg';
import {COLORS} from 'theme/colors';
import DataCard from 'components/dataCard/DataCard';
import {getSchemeRewardsData} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.business';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {ITransformedRewards} from 'screens/primaryCP/secondarySchemes/SecondaryScheme.interface';

const RewardsQualification = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'RewardsQualification'>>();
  const {schemeId} = route.params;
  const [rewardsData, setRewardsData] = useState<ITransformedRewards>();

  const fetchSchemeRewards = useCallback((id: string) => {
    getSchemeRewardsData(schemeId, setRewardsData);
  }, []);

  useEffect(() => {
    fetchSchemeRewards(schemeId);
  }, [schemeId]);

  return (
    <Layout headerTitle="Rewards & Qualification" style={CommonStyles.padding}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardContent}>
            <CardInfoSection
              title="Credit Notes"
              value={rewardsData?.rewards?.creditNotes ?? ''}
              icon={<RupeeBagIcon />}
            />
            <Divider style={CommonStyles.verticalDivider} />
            <CardInfoSection
              title="Foc"
              value={rewardsData?.rewards?.foc ?? ''}
              icon={<ThreeBlocksIcon color={'red'} />}
            />
            <Divider style={CommonStyles.verticalDivider} />
            <CardInfoSection
              title="Gift"
              value={rewardsData?.rewards?.gift ?? ''}
              icon={<GiftIcon />}
            />
          </View>
          <Spacer size={30} />
          <View style={styles.cardContent}>
            <CardInfoSection
              title="Gold"
              value={rewardsData?.rewards?.gold ?? ''}
              icon={<CoinsIcon />}
            />
            <Divider style={CommonStyles.verticalDivider} />
            <CardInfoSection
              title="Tour"
              value={rewardsData?.rewards?.tour ?? ''}
              icon={<AirplaneIcon />}
            />
          </View>
        </Card.Content>
      </Card>
      <Spacer size={24} />
      <FlatList
        data={rewardsData?.slabDetails}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <DataCard
              data={item?.data}
              rows={2}
              isExpandableButtonVisible
              header={item?.header}
              key={index}
            />
          );
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
  },
  cardContent: {
    alignContent: 'center',
    flexDirection: 'row',
  },
});

export default RewardsQualification;
