import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';
import LogoutIcon from '../../../assets/icons/logoutIcon.svg';
import {getTranslationLabel} from 'utils/commonMethods';

const SelfManagement = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Layout
      headerTitle={getTranslationLabel('self_management')}
      style={CommonStyles.padding}>
      <ActionButton
        title={getTranslationLabel('exit_process')}
        onPress={() => navigation.navigate('ExitProcess')}
        icon={<LogoutIcon />}
      />
    </Layout>
  );
};

export default SelfManagement;
