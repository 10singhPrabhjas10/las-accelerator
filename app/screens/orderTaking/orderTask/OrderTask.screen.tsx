import React from 'react';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';

import OrderIcon from '../../../../assets/icons/orderCreate.svg';
import MultipleFileIcon from '../../../../assets/icons/multipleFile.svg';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {getTranslationLabel} from 'utils/commonMethods';

const OrderTaskScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'OrderTask'>>();
  const {relation, navigationFrom} = route.params;

  return (
    <Layout
      style={CommonStyles.padding}
      headerTitle={getTranslationLabel('order_taking_task')}>
      <ActionButton
        icon={<OrderIcon width={24} height={24} />}
        title={getTranslationLabel('order_creation')}
        onPress={() => {
          navigation.navigate('OrderCreation', {navigationFrom, relation});
        }}
      />
      <ActionButton
        icon={<MultipleFileIcon width={24} height={24} />}
        title={getTranslationLabel('order_status')}
        onPress={() => {
          relation === Relation.SECONDARY_CHANNEL_PARTNER ||
          relation === Relation.SECONDARY_LEAD
            ? navigation.navigate('SecondaryOrderStatus')
            : navigation.navigate('OrderStatus', {navigationFrom, relation});
        }}
      />
    </Layout>
  );
};

export default OrderTaskScreen;
