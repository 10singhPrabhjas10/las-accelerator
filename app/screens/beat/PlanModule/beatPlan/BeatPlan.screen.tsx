import React from 'react';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import ModifyBeat from '../../../../../assets/icons/modifyBeat.svg';
import StoreCheck from '../../../../../assets/icons/storeCheck.svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';

const BeatPlanScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout style={CommonStyles.padding} headerTitle="Beat Plan">
      <ActionButton
        icon={<ModifyBeat width={24} height={24} />}
        title="Add-Modify Beat Plan"
        onPress={() => navigation.navigate('AddBeat')}
      />
      <ActionButton
        icon={<StoreCheck width={24} height={24} />}
        title="My Beat Plan"
        onPress={() => navigation.navigate('MyBeatPlan')}
      />
    </Layout>
  );
};

export default BeatPlanScreen;
