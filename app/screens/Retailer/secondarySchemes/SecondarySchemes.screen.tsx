import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import ActionButton from 'components/button/ActionButton';
import SchemeInfoIcon from '../../../../assets/icons/schemeInfo.svg';
import ArrowDiagonalIcon from '../../../../assets/icons/arrowDiagonal.svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {NavigationFrom} from 'utils/Constants';

const SecondarySchemesScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout headerTitle="Secondary Schemes" style={CommonStyles.padding}>
      <ActionButton
        title="Secondary Scheme Info."
        onPress={() =>
          navigation?.navigate('SSchemeLaunch', {
            navigationFrom: NavigationFrom.SECONDARY_CP,
          })
        }
        icon={<SchemeInfoIcon />}
      />
      <ActionButton
        title="Secondary Scheme Perf."
        onPress={() => navigation.navigate('SchemesCategory')}
        icon={<ArrowDiagonalIcon />}
      />
    </Layout>
  );
};

export default SecondarySchemesScreen;
