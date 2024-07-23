import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import SalesIcon from '../../../assets/icons/sales.svg';
import ComplianceIcon from '../../../assets/icons/business.svg';
import {getTranslationLabel} from 'utils/commonMethods';

const PerformanceManagement = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout headerTitle="Performance Management" style={CommonStyles.padding}>
      <ActionButton
        icon={<SalesIcon width={24} height={24} />}
        title={getTranslationLabel('sales_performance')}
        onPress={() => navigation.navigate('SalesPerformance')}
      />
      <ActionButton
        icon={<ComplianceIcon width={24} height={24} />}
        title="Compliance Performance"
        onPress={() => navigation.navigate('CompliancePerformance')}
      />
    </Layout>
  );
};

export default PerformanceManagement;
