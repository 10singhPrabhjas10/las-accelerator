import {useNavigation} from '@react-navigation/native';
import Layout from 'components/Layout';
import CustomButton from 'components/button/CustomButton';
import DropDown from 'components/dropdown/Dropdown';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {ButtonTypes} from 'types/buttons';
import CommonStyles from 'utils/commonStyle';
import {
  getReplacementReasonsData,
  submitReplacementData,
} from '../OrderManagement.business';
import {Checkbox, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const OrderReplacement = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [returnReasonData, setReturnReasonData] = useState([]);
  const [showReturnReasonDropdown, setShowReturnReasonDropdown] =
    useState(false);
  const [returnReasonValue, setReturnReasonValue] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation<RootNavigationProp>();

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  useEffect(() => {
    getReplacementReasonsData(setReturnReasonData);
  }, []);

  const handleOnSubmit = () => {
    const requestBody = {
      customerCode,
      reasonsForReplacement: returnReasonValue,
      comments: commentText,
      serialisedProducts: isChecked,
    };

    submitReplacementData(requestBody, () => setShowSuccessModal(true));
  };

  return (
    <Layout headerTitle="Replacement" style={CommonStyles.padding}>
      <View style={CommonStyles.flexOne}>
        <DropDown
          list={returnReasonData}
          value={returnReasonValue}
          label="Reason for Replacement"
          isRequired
          placeholder="Select Reason"
          visible={showReturnReasonDropdown}
          onChangeDropdownState={() => {
            setShowReturnReasonDropdown(!showReturnReasonDropdown);
          }}
          setValue={data => {
            setReturnReasonValue(data);
          }}
        />
        <Spacer size={10} />
        <PrimaryTextInput
          titleText="Comments"
          value={commentText}
          onChangeText={setCommentText}
          textInputStyle={styles.comment}
          multiline
        />
        <Spacer size={15} />
        <View style={styles.checkBox}>
          <Checkbox.Android
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsChecked(!isChecked);
            }}
          />
          <Text variant="bodyMedium">Serialised Products</Text>
        </View>
      </View>
      <CustomButton
        type={ButtonTypes.contained}
        text="Submit"
        isDisabled={!returnReasonValue}
        onPress={handleOnSubmit}
      />
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title="Submitted"
        label="You have successfully submitted Replacement request"
        btnType="confirm"
        secondaryBtnTitle="Dismiss"
        isSuccess
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          // navigation.navigate('ReturnReplacementInformation', {
          //   isReturn: false,
          // });
          navigation.navigate('OrderManagement');
        }}
      />
    </Layout>
  );
};

export default OrderReplacement;

const styles = StyleSheet.create({
  comment: {height: 100},
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
