import React from 'react';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';

import ReceiptIcon from '../../../../../../assets/icons/receipt.svg';
import TimeIcon from '../../../../../../assets/icons/time.svg';

import {COLORS} from 'theme/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';

const SecondaryGrivance = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'SecondaryGrivance'>>();
  const {navigationFrom} = route.params;

  return (
    <Layout style={CommonStyles.padding} headerTitle="Grievance Redressal">
      <ActionButton
        icon={<ReceiptIcon color={COLORS.black} />}
        title="Raise Ticket"
        onPress={() => navigation?.navigate('RaiseTicket', {navigationFrom})}
      />
      <ActionButton
        icon={<TimeIcon color={COLORS.black} />}
        title="Ticket History"
        onPress={() => navigation?.navigate('TicketHistory', {navigationFrom})}
      />
    </Layout>
  );
};

export default SecondaryGrivance;
