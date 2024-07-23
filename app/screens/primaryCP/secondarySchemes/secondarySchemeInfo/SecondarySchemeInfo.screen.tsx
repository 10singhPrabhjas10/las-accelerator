import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import ActiveSchemeIcon from '../../../../../assets/icons/activeScheme.svg';
import EndDateIcon from '../../../../../assets/icons/endDate.svg';
import AggregationIcon from '../../../../../assets/icons/aggregation.svg';
import {SchemeStatus} from '../SecondaryScheme.interface';

const SecondarySchemeInfo = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout headerTitle="Secondary Schemes" style={CommonStyles.padding}>
      <ActionButton
        icon={<ActiveSchemeIcon />}
        title="Active Scheme"
        onPress={() => {
          navigation.navigate('ActiveScheme', {
            navigationFrom: SchemeStatus.ACTIVE,
          });
        }}
      />
      <ActionButton
        icon={<EndDateIcon />}
        title="End Date Completed"
        onPress={() => {
          navigation.navigate('ActiveScheme', {
            navigationFrom: SchemeStatus.END_DATE_COMPLETED,
          });
        }}
      />
      <ActionButton
        icon={<AggregationIcon />}
        title="Aggregation Confirmed"
        onPress={() => {
          navigation.navigate('ActiveScheme', {
            navigationFrom: SchemeStatus.AGGREGATION_CONFIRMED,
          });
        }}
      />
    </Layout>
  );
};

export default SecondarySchemeInfo;
