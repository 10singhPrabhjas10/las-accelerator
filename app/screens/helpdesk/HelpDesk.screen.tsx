import Layout from 'components/Layout';
import ActionButton from 'components/button/ActionButton';
import useLanguageSelection from 'hooks/useLanguageSelection';
import React from 'react';
import {COLORS} from 'theme/colors';
import {HELP_SUPPORT_NUMBER} from 'utils/Constants';
import {callNumber, sendMail} from 'utils/commonMethods';
import CallIcon from './../../../assets/icons/callIcon.svg';
import EmailIcon from './../../../assets/icons/email.svg';
import Spacer from 'components/spacer';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {updateTabIndex} from 'store/redux/modalSlice';
import CommonStyles from 'utils/commonStyle';

const HelpDesk = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <Layout
      headerTitle={useLanguageSelection('helpdesk').label}
      onBackPress={() => {
        dispatch(updateTabIndex(0));
        navigation.navigate('TabNavigator');
      }}
      style={CommonStyles.padding}>
      <Spacer size={10} />
      <ActionButton
        icon={<CallIcon color={COLORS.black} height={25} width={25} />}
        title={useLanguageSelection('call_helpdesk').label}
        onPress={() => callNumber(HELP_SUPPORT_NUMBER)}
      />
      <ActionButton
        icon={<EmailIcon color={COLORS.black} height={25} width={25} />}
        title={useLanguageSelection('email_helpdesk').label}
        onPress={sendMail}
      />
    </Layout>
  );
};

export default HelpDesk;
