import {View} from 'react-native';
import React, {useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {Formik} from 'formik';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import Spacer from 'components/spacer';
import {TextInput} from 'react-native-paper';
import DropDown from 'components/dropdown/Dropdown';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {RootNavigationProp} from 'routes/RootNavigation';
import {useNavigation} from '@react-navigation/native';
import {SecondaryLeadSchema} from 'validations/secondaryLead';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  getSecondaryPincodeData,
  submitSecondaryLead,
} from '../LeadManagement.business';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';
import {getTranslationLabel} from 'utils/commonMethods';

const initialLeadData = {
  firmName: '',
  gstIn: '',
  panCardNumber: '',
  mobileNumber: '',
  alternativeMobileNumber: '',
  ownerName: '',
  emailId: '',
  pincode: '',
  area: '',
  district: '',
  state: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
};

const SecondaryLeadCreation = () => {
  const [areaData, setAreaData] = useState([]);
  const [showAreaDropdown, setShowAreaDropdown] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const navigation = useNavigation<RootNavigationProp>();

  const handleOnSubmit = (values: ISecondaryLeadData) => {
    const requestBody: ISecondaryLeadRequestBody = {
      firmName: values.firmName,
      retailerMobileNumber: values.mobileNumber,
      retailerOwnerName: values.ownerName,
      pincode: values.pincode,
      area: values.area,
      district: values.district,
      emailId: values?.emailId === '' ? null : values.emailId,
      state: values.state,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      landMark: values.landmark,
      ...(values.gstIn && {gstIn: values.gstIn}),
      ...(values.panCardNumber && {panCardNumber: values.panCardNumber}),
      ...(values.alternativeMobileNumber && {
        retailerAlternativeMobileNumber: values.alternativeMobileNumber,
      }),
    };
    submitSecondaryLead(requestBody, () => setShowSuccessModal(true));
  };

  return (
    <Layout
      headerTitle={getTranslationLabel('secondary_lead_creation')}
      isScrollable
      style={CommonStyles.padding}>
      <Formik
        initialValues={initialLeadData}
        validationSchema={SecondaryLeadSchema}
        validateOnBlur
        validateOnMount
        validateOnChange
        enableReinitialize
        onSubmit={values => handleOnSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
          touched,
          setFieldError,
        }) => {
          return (
            <View>
              <PrimaryTextInput
                titleText={getTranslationLabel('firm_name')}
                isRequired
                value={values.firmName}
                onChangeText={handleChange('firmName')}
                onBlur={handleBlur('firmName')}
                placeHolder={getTranslationLabel('enter_firm_name')}
                errorText={touched.firmName ? errors.firmName : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_gstin')}
                titleText={getTranslationLabel('gstin')}
                value={values.gstIn}
                onChangeText={handleChange('gstIn')}
                onBlur={handleBlur('gstIn')}
                maxLength={15}
                autoCapitalize="characters"
                errorText={touched.gstIn ? errors.gstIn : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_pan_card_no')}
                titleText={getTranslationLabel('pan_card_num')}
                value={values.panCardNumber}
                onChangeText={handleChange('panCardNumber')}
                onBlur={handleBlur('panCardNumber')}
                maxLength={10}
                autoCapitalize="characters"
                errorText={touched.panCardNumber ? errors.panCardNumber : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_mobile_no')}
                titleText={getTranslationLabel('retailer_mobile_num')}
                isRequired
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                maxLength={10}
                left={values.mobileNumber && <TextInput.Affix text="+91 |" />}
                keyboardType="numeric"
                errorText={touched.mobileNumber ? errors.mobileNumber : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_mobile_no')}
                titleText={getTranslationLabel(
                  'retailer_alternative_mobile_num',
                )}
                value={values.alternativeMobileNumber}
                onChangeText={handleChange('alternativeMobileNumber')}
                onBlur={handleBlur('alternativeMobileNumber')}
                maxLength={10}
                left={
                  values.alternativeMobileNumber && (
                    <TextInput.Affix text="+91 |" />
                  )
                }
                keyboardType="numeric"
                errorText={
                  touched.alternativeMobileNumber
                    ? errors.alternativeMobileNumber
                    : ''
                }
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_owner_name')}
                titleText={getTranslationLabel('retailer_owner_name')}
                isRequired
                value={values.ownerName}
                onChangeText={handleChange('ownerName')}
                onBlur={handleBlur('ownerName')}
                errorText={touched.ownerName ? errors.ownerName : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_email_id')}
                titleText={getTranslationLabel('email_id')}
                value={values.emailId}
                onChangeText={handleChange('emailId')}
                onBlur={handleBlur('emailId')}
                keyboardType="email-address"
                errorText={touched.emailId ? errors.emailId : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_pin_code')}
                titleText={getTranslationLabel('pin_code')}
                isRequired
                value={values.pincode}
                onEndEditing={() => {
                  getSecondaryPincodeData(
                    values.pincode,
                    setFieldValue,
                    setAreaData,
                    setFieldError,
                  );
                }}
                onChangeText={handleChange('pincode')}
                onBlur={handleBlur('pincode')}
                maxLength={6}
                keyboardType="numeric"
                right={
                  values.pincode.length > 5 && (
                    <TextInput.Icon
                      // eslint-disable-next-line react/no-unstable-nested-components
                      icon={() => (
                        <SearchIcon
                          height={20}
                          width={20}
                          onPress={() => {
                            getSecondaryPincodeData(
                              values.pincode,
                              setFieldValue,
                              setAreaData,
                              setFieldError,
                            );
                          }}
                        />
                      )}
                    />
                  )
                }
                returnKeyType="search"
                errorText={touched.pincode ? errors.pincode : ''}
              />
              <Spacer size={20} />
              <DropDown
                list={areaData}
                label={getTranslationLabel('area')}
                placeholder={getTranslationLabel('select_area')}
                isRequired
                isDisabled={!values.pincode}
                value={values.area}
                visible={showAreaDropdown}
                onChangeDropdownState={() =>
                  setShowAreaDropdown(!showAreaDropdown)
                }
                setValue={data => {
                  setFieldValue('area', data);
                }}
                error={touched.area ? errors.area : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                titleText={getTranslationLabel('district')}
                disabled
                isRequired
                value={values.district ?? EMPTY_DATA_DASH}
                onChangeText={() => {}}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                titleText={getTranslationLabel('state')}
                disabled
                isRequired
                value={values.state ?? EMPTY_DATA_DASH}
                onChangeText={() => {}}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_address')}
                titleText={getTranslationLabel('address_line1')}
                isRequired
                value={values.addressLine1}
                onChangeText={handleChange('addressLine1')}
                onBlur={handleBlur('addressLine1')}
                errorText={touched.addressLine1 ? errors.addressLine1 : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_address')}
                titleText={getTranslationLabel('address_line2')}
                isRequired
                value={values.addressLine2}
                onChangeText={handleChange('addressLine2')}
                onBlur={handleBlur('addressLine2')}
                errorText={touched.addressLine2 ? errors.addressLine2 : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_landmark')}
                titleText={getTranslationLabel('landmark')}
                isRequired
                value={values.landmark}
                onChangeText={handleChange('landmark')}
                onBlur={handleBlur('landmark')}
                errorText={touched.landmark ? errors.landmark : ''}
              />
              <Spacer size={40} />
              <CustomButton
                type={ButtonTypes.contained}
                onPress={handleSubmit}
                isDisabled={!isValid}
                text={getTranslationLabel('submit')}
              />
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title={getTranslationLabel('created')}
        label={getTranslationLabel('success_secondary_lead')}
        btnType="confirm"
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        onSecondaryBtnHandler={() => navigation.navigate('LeadManagement')}
        isSuccess
      />
    </Layout>
  );
};

export default SecondaryLeadCreation;
