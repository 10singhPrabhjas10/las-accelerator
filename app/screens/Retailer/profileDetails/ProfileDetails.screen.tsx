import {View} from 'react-native';
import React from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import Accordion from 'components/accordion/Accordion';
import PersonalDetails from './components/PersonalDetails';
import BusinessDetails from './components/BusinessDetails';
import StoreDetails from './components/StoreDetails';
import BankDetails from './components/BankDetails';
import InfluencerMapping from './components/InfluencerMapping';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import EditIcon from '../../../../assets/icons/editProfile.svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

const ProfileDetailsScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  return (
    <Layout
      isScrollable
      headerTitle="Profile Details"
      style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <Accordion title={'Personal Details'}>
          <PersonalDetails />
        </Accordion>
        <Accordion title={'Business Details'}>
          <BusinessDetails />
        </Accordion>
        <Accordion title={'Store Details'}>
          <StoreDetails />
        </Accordion>
        <Accordion title={'Bank & KYC Details'}>
          <BankDetails />
        </Accordion>
        <Accordion title={'Influencer Mapping'}>
          <InfluencerMapping />
        </Accordion>
      </View>
      <CustomButton
        type={ButtonTypes.outline}
        text="Edit Profile"
        onPress={() =>
          navigation.navigate('SecondaryEditProfile', {
            navigationFrom: 'Profile',
          })
        }
        icon={<EditIcon />}
      />
    </Layout>
  );
};

export default ProfileDetailsScreen;
