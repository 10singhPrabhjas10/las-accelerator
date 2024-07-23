import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import DropDown from 'components/dropdown/Dropdown';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {
  getExitProcessReasons,
  submitExitProcess,
} from './SelfManagement.business';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {getTranslationLabel} from 'utils/commonMethods';

const ExitProcess = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reasonData, setReasonData] = useState([]);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [reasonValue, setReasonValue] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    getExitProcessReasons(setReasonData);
  }, []);

  const handleOnSubmit = () => {
    const requestBody = {
      reason: reasonValue,
      comments: commentText,
    };

    submitExitProcess(requestBody, () => setShowSuccessModal(true));
  };

  return (
    <Layout
      headerTitle={getTranslationLabel('exit_process')}
      style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <DropDown
          list={reasonData}
          value={reasonValue}
          label={getTranslationLabel('reason')}
          isRequired
          placeholder={getTranslationLabel('select_reason')}
          visible={showReasonDropdown}
          onChangeDropdownState={() => {
            setShowReasonDropdown(!showReasonDropdown);
          }}
          setValue={data => {
            setReasonValue(data);
          }}
        />
        <Spacer size={10} />
        <PrimaryTextInput
          titleText={getTranslationLabel('comments')}
          value={commentText}
          onChangeText={setCommentText}
          textInputStyle={CommonStyles.comment}
          multiline
        />
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text={getTranslationLabel('submit')}
        isDisabled={!reasonValue}
        onPress={handleOnSubmit}
      />
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title={getTranslationLabel('submitted')}
        label={getTranslationLabel('initiated_exit_process')}
        btnType="confirm"
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        isSuccess
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          navigation.navigate('SelfManagement');
        }}
      />
    </Layout>
  );
};

export default ExitProcess;
