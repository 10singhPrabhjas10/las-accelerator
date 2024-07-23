import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import DMSIcon from '../../../../assets/icons/dmsIcon.svg';
import ArrowIcon from '../../../../assets/icons/arrowDiagonal.svg';

const PrimaryCPSecondarySchemes = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout headerTitle="Secondary Schemes" style={CommonStyles.padding}>
      <ActionButton
        icon={<DMSIcon />}
        title="Sec. Scheme Information"
        onPress={() => navigation.navigate('SecondarySchemeInfo')}
      />
      <ActionButton
        icon={<ArrowIcon />}
        title="Sec. Scheme Performance"
        onPress={() => {
          navigation.navigate('SecondarySchemePerf');
        }}
      />
    </Layout>
  );
};

export default PrimaryCPSecondarySchemes;
