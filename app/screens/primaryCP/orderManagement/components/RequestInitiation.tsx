import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';

import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import Spacer from 'components/spacer';
import CustomButton from 'components/button/CustomButton';
import DropDown from 'components/dropdown/Dropdown';

import CommonStyles from 'utils/commonStyle';
import {ButtonTypes} from 'types/buttons';
import {
  getReturnRequestInitiationData,
  updateRequestInitiationData,
} from '../OrderManagement.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const RequestInitiation = ({onSubmit}: IRequestInitiation) => {
  const initialRequestData = {
    salesOffice: '',
    categoryData: [],
    returnReasonData: [],
  };

  const [commentText, setCommentText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [requestData, setRequestData] = useState(initialRequestData);

  const [showDCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showReturnReasonDropdown, setShowReturnReasonDropdown] =
    useState(false);

  const [productCategory, setProductCategory] = useState('');
  const [reasonForReturn, setReasonForReturn] = useState('');

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  useEffect(() => {
    getReturnRequestInitiationData(customerCode, setRequestData);
  }, [customerCode]);

  const handleOnSubmit = () => {
    const requestBody = {
      customerCode,
      salesOffice: requestData.salesOffice,
      productCategory,
      reasonForReturn,
      comments: commentText,
      serialisedProducts: isChecked,
    };
    onSubmit(requestBody);
  };

  return (
    <View style={CommonStyles.flexOne}>
      <View style={CommonStyles.flexOne}>
        <PrimaryTextInput
          titleText="Customer Code"
          value={customerCode}
          onChangeText={() => {}}
          disabled
        />
        <Spacer size={10} />
        <PrimaryTextInput
          titleText="Sales Office"
          value={requestData.salesOffice}
          onChangeText={() => {}}
          disabled
        />
        <Spacer size={15} />
        <DropDown
          list={requestData.categoryData}
          value={productCategory}
          label="Product Category"
          isRequired
          placeholder="Select Product Category"
          visible={showDCategoryDropdown}
          onChangeDropdownState={() => {
            setShowCategoryDropdown(!showDCategoryDropdown);
          }}
          setValue={data => {
            setProductCategory(data);
          }}
        />
        <Spacer size={15} />
        <DropDown
          list={requestData.returnReasonData}
          value={reasonForReturn}
          label="Reason for Return"
          isRequired
          placeholder="Select Reason"
          visible={showReturnReasonDropdown}
          onChangeDropdownState={() => {
            setShowReturnReasonDropdown(!showReturnReasonDropdown);
          }}
          setValue={data => {
            setReasonForReturn(data);
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
        text="Next"
        isDisabled={!productCategory || !reasonForReturn}
        onPress={handleOnSubmit}
      />
    </View>
  );
};

export default RequestInitiation;

const styles = StyleSheet.create({
  comment: {height: 100},
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
