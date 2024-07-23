import React from 'react';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import BeatPlan from '../../../assets/icons/beatPlan.svg';
import StoreCheck from '../../../assets/icons/storeCheck.svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';

const BeatScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout style={CommonStyles.padding} headerTitle="Beat">
      <ActionButton
        icon={<BeatPlan width={24} height={24} />}
        title="Beat Plan"
        onPress={() => navigation.navigate('BeatPlan')}
      />
      <ActionButton
        icon={<StoreCheck width={24} height={24} />}
        title="Store Check-In"
        onPress={() => navigation.navigate('StoreCheckIn')}
      />
    </Layout>
  );
};

export default BeatScreen;
