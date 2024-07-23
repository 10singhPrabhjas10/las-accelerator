import React from 'react';
import {useNavigation} from '@react-navigation/native';

import ActionButton from 'components/button/ActionButton';
import Layout from 'components/Layout';

import PageIcon from './../../../../assets/icons/pageIcon.svg';
import OutstandingIcon from './../../../../assets/icons/outstandingIcon.svg';
import StatementIcon from './../../../../assets/icons/statementIcon.svg';
import CommonStyles from 'utils/commonStyle';
import {RootNavigationProp} from 'routes/RootNavigation';

const FinancialInformation = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const summaryIcon = () => <PageIcon />;
  const outstandingIcon = () => <OutstandingIcon />;
  const statementIcon = () => <StatementIcon />;

  return (
    <Layout headerTitle="Financial Information" style={CommonStyles.padding}>
      <ActionButton
        title="Financial Summary"
        onPress={() => navigation.navigate('FinancialSummary')}
        icon={summaryIcon()}
      />
      <ActionButton
        title="Account Outstanding"
        onPress={() => navigation.navigate('AccountOutstanding')}
        icon={outstandingIcon()}
      />
      <ActionButton
        title="Account Statement"
        onPress={() => navigation.navigate('AccountStatement')}
        icon={statementIcon()}
      />
    </Layout>
  );
};

export default FinancialInformation;
