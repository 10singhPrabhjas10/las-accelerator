import {View} from 'react-native';
import React from 'react';
import Layout from 'components/Layout';
import Accordion from 'components/accordion/Accordion';
import PersonalDetails from './editProfile/PersonalDetails';
import CommonStyles from 'utils/commonStyle';
import StoreDetails from './editProfile/StoreDetails';
import BankDetails from './editProfile/BankDetails';
import InfluencerMapping from './editProfile/InfluencerMapping';
import BusinessDetails from './editProfile/BusinessDetails';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationTypes} from 'routes/RootNavigation';

const EditProfileScreen = () => {
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'SecondaryEditProfile'>>();
  const {navigationFrom} = route.params;
  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle="Profile Details">
      <View style={CommonStyles.flexOne}>
        <Accordion title={'Personal Details'}>
          <PersonalDetails
            navigationFrom={navigationFrom}
            onSubmit={() => {}}
          />
        </Accordion>
        <Accordion title={'Store Details'}>
          <StoreDetails navigationFrom={navigationFrom} />
        </Accordion>
        <Accordion title={'Bank & KYC Details'}>
          <BankDetails navigationFrom={navigationFrom} onSubmit={() => {}} />
        </Accordion>
        <Accordion title={'Influencer Mapping'}>
          <InfluencerMapping navigationFrom={navigationFrom} />
        </Accordion>
        <Accordion title={'Business Details'}>
          <BusinessDetails
            navigationFrom={navigationFrom}
            onSubmit={() => {}}
          />
        </Accordion>
      </View>
    </Layout>
  );
};

export default EditProfileScreen;
