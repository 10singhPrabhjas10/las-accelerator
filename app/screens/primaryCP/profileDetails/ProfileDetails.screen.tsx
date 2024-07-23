import React from 'react';
import {useNavigation} from '@react-navigation/native';

import ActionButton from 'components/button/ActionButton';
import Layout from 'components/Layout';

import {RootNavigationProp} from 'routes/RootNavigation';
import GeneralInfoIcon from '../../../../assets/icons/generalInformationIcon.svg';
import KeyContactsIcon from '../../../../assets/icons/keyContactsIcon.svg';
import DmsInfoIcon from '../../../../assets/icons/dmsInfoIcon.svg';
import ShippingInfoIcon from '../../../../assets/icons/shippingInfoIcon.svg';
import RelatedCode from '../../../../assets/icons/relatedCode.svg';
import CommonStyles from 'utils/commonStyle';

const ProfileDetails = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Layout isScrollable headerTitle="Profile" style={CommonStyles.padding}>
      <ActionButton
        icon={<GeneralInfoIcon />}
        title={'General Information'}
        onPress={() => {
          navigation.navigate('PrimaryCPGeneralInfo');
        }}
      />
      <ActionButton
        icon={<KeyContactsIcon />}
        title={'Key Contacts'}
        onPress={() => {
          navigation.navigate('KeyContacts');
        }}
      />
      <ActionButton
        icon={<DmsInfoIcon />}
        title={'DMS Information'}
        onPress={() => {
          navigation.navigate('DmsInformation');
        }}
      />
      <ActionButton
        icon={<ShippingInfoIcon />}
        title={'Shipping Information'}
        onPress={() => {
          navigation.navigate('ShippingInfo');
        }}
      />
      <ActionButton
        icon={<RelatedCode />}
        title={'Related Codes'}
        onPress={() => {
          navigation.navigate('RelatedCode');
        }}
      />
    </Layout>
  );
};
export default ProfileDetails;
