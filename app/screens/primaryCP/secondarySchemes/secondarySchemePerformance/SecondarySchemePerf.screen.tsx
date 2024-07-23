import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import React from 'react';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import ActiveSchemeIcon from '../../../../../assets/icons/activeScheme.svg';
import EndDateIcon from '../../../../../assets/icons/endDate.svg';
import AggregationIcon from '../../../../../assets/icons/aggregation.svg';
import {SchemeStatus} from '../SecondaryScheme.interface';

const SecondarySchemePerf = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout headerTitle="Secondary Schemes" style={CommonStyles.padding}>
      <ActionButton
        icon={<ActiveSchemeIcon />}
        title="Active Scheme"
        onPress={() => {
          navigation.navigate('PerformanceActiveScheme', {
            navigationFrom: SchemeStatus.ACTIVE,
          });
        }}
      />
      <ActionButton
        icon={<EndDateIcon />}
        title="End Date Completed"
        onPress={() => {
          navigation.navigate('PerformanceActiveScheme', {
            navigationFrom: SchemeStatus.END_DATE_COMPLETED,
          });
        }}
      />
      <ActionButton
        icon={<AggregationIcon />}
        title="Aggregation Confirmed"
        onPress={() => {
          navigation.navigate('PerformanceActiveScheme', {
            navigationFrom: SchemeStatus.AGGREGATION_CONFIRMED,
          });
        }}
      />
    </Layout>
  );
};

export default SecondarySchemePerf;
