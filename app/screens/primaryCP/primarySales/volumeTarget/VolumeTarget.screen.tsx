import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {getVolumeTargetData} from 'screens/primaryCP/PrimaryChannelPartner.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {getTranslationLabel} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';

const VolumeTarget = () => {
  const channelPartnerId = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const route = useRoute<RouteProp<RootNavigationTypes, 'VolumeTarget'>>();
  const {categoryId, categoryName} = route.params;
  const [volumeTargetData, setVolumeTargetData] =
    useState<ITransformedVolumeTarget>();

  useEffect(() => {
    getVolumeTargetData(channelPartnerId, categoryId, setVolumeTargetData);
  }, []);

  return (
    <Layout
      style={CommonStyles.padding}
      headerTitle={getTranslationLabel('volume_target')}>
      <DataCard data={volumeTargetData?.data ?? []} header={categoryName} />
    </Layout>
  );
};

export default VolumeTarget;
