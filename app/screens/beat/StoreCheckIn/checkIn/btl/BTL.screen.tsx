import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';

import BtlPlanIcon from '../../../../../../assets/icons/btlPlan.svg';
import BtlActivation from '../../../../../../assets/icons/btlActivation.svg';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {getTranslationLabel} from 'utils/commonMethods';

const BTLScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'BTL'>>();
  const {navigationFrom, relation} = route.params;
  return (
    <Layout
      headerTitle={getTranslationLabel('btl')}
      style={CommonStyles.padding}>
      <ActionButton
        icon={<BtlPlanIcon width={24} height={24} />}
        title={getTranslationLabel('btl_planning')}
        onPress={() =>
          navigation?.navigate('BtlPlanning', {navigationFrom, relation})
        }
      />
      <ActionButton
        icon={<BtlActivation width={24} height={24} />}
        title={getTranslationLabel('btl_activation')}
        onPress={() => navigation?.navigate('BtlActivation')}
      />
    </Layout>
  );
};

export default BTLScreen;
