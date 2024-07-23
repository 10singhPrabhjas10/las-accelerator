import {useNavigation} from '@react-navigation/native';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import React from 'react';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import PrimaryUserProfile from '../../../assets/icons/primaryuserProfile.svg';
import SecondaryProfileIcon from '../../../assets/icons/secondaryProfileIcon.svg';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';
import {View} from 'react-native';

const OrderTaking = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const lasType = useSelector((state: RootState) => state?.user?.user?.lasType);

  const isReLasType = lasType === LasType.RE;

  return (
    <Layout style={CommonStyles.padding} headerTitle="Order Taking">
      <View style={CommonStyles.flexOne}>
        {!isReLasType ? (
          <ActionButton
            icon={<PrimaryUserProfile width={24} height={24} />}
            title="Primary Order Taking"
            onPress={() => {
              navigation.navigate('PrimaryPartnerSearch', {
                fromOrderTaking: true,
              });
            }}
          />
        ) : null}
        <ActionButton
          icon={<SecondaryProfileIcon width={24} height={24} />}
          title="Secondary Order Taking"
          onPress={() => {
            navigation.navigate('RetailerPartnerSearch', {
              fromOrderTaking: true,
            });
          }}
        />
      </View>
    </Layout>
  );
};

export default OrderTaking;
