import {useNavigation} from '@react-navigation/native';
import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import React from 'react';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import UserIcon from './../../../assets/icons/userProfileIcon.svg';
import SecondaryUserIcon from './../../../assets/icons/secondaryUsersIcon.svg';
import {getTranslationLabel} from 'utils/commonMethods';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {LasType} from 'screens/performanceManagement/PerformanceMgmt.interface';

const LeadManagement = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const lasType = useSelector((state: RootState) => state?.user?.user?.lasType);
  return (
    <Layout
      headerTitle={getTranslationLabel('lead_management')}
      style={CommonStyles.padding}>
      {lasType !== LasType.RE && (
        <ActionButton
          title={getTranslationLabel('primary_lead_creation')}
          onPress={() => navigation.navigate('PrimaryLeadCreation')}
          icon={<UserIcon />}
        />
      )}
      <ActionButton
        title={getTranslationLabel('secondary_lead_creation')}
        onPress={() => navigation.navigate('SecondaryLeadCreation')}
        icon={<SecondaryUserIcon />}
      />
    </Layout>
  );
};

export default LeadManagement;
