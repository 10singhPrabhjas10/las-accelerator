import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {EMPTY_DATA_DASH, martialStatus} from 'utils/Constants';
import Spacer from 'components/spacer';
import {TextInput} from 'react-native-paper';
import DatePicker from 'components/datePicker/DatePicker';
import {convertDateToDisplay} from 'utils/commonMethods';
import DropDown from 'components/dropdown/Dropdown';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {StyleSheet} from 'react-native';
import {personalDetailsValidation} from 'validations/activity';
import {IPersonalDetails} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {
  getPersonalDetailsData,
  updatePersonalDetails,
} from '../ProfileDetails.business';
import {
  IPersonalDetailsReqyBody,
  IPersonalDetailsResponse,
} from '../ProfileDetails.interface';
import {DateFormats} from 'constants/dateFormat';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

interface IPersonalDetailsProps {
  onSubmit: (item: IPersonalDetails) => void;
  navigationFrom: string;
}

const PersonalDetails = ({onSubmit, navigationFrom}: IPersonalDetailsProps) => {
  const initialValues = {
    nameOfFirm: '',
    retailerPhoneNo: '',
    emailId: '',
    retailerAlternativePhoneNo: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    marriageAnniversary: '',
    customerMobile: '',
  };

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code = navigationFrom === 'Profile' ? customerCode : relationId;

  const formikRef = React.useRef<any>(null);
  const [showMaritalStatusDropdown, setShowMaritalStatusDropdown] =
    useState(false);

  const [personalDetails, setPersonalDetails] =
    useState<IPersonalDetailsResponse>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleReset = () => {
    if (formikRef.current) {
      formikRef?.current?.resetForm();
    }
  };

  const validRange = {
    startDate: undefined,
    endDate: new Date(),
  };

  useEffect(() => {
    getPersonalDetailsData(setPersonalDetails, code);
  }, []);

  const handleSubmit = (values: IPersonalDetailsResponse) => {
    const requestBody: IPersonalDetailsReqyBody = {};
    if (values?.emailId !== personalDetails?.emailId) {
      requestBody.emailId = values?.emailId;
    }
    if (values?.marriageAnniversary !== personalDetails?.marriageAnniversary) {
      requestBody.marriageAnniversary = values?.marriageAnniversary;
    }
    if (values?.maritalStatus !== personalDetails?.maritalStatus) {
      requestBody.maritalStatus = values?.maritalStatus;
    }
    const isEmpty = Object.keys(requestBody).length === 0;
    if (!isEmpty) {
      updatePersonalDetails(requestBody, code, () => {
        setShowSuccessModal(true);
        setButtonDisabled(true);
      });
    }
  };

  return (
    <View>
      <Formik
        innerRef={formikRef}
        validationSchema={personalDetailsValidation}
        initialValues={personalDetails ?? initialValues}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => {
          handleSubmit(values);
        }}>
        {({
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
          touched,
        }) => {
          return (
            <View>
              <PrimaryTextInput
                titleText={'Retailer Name'}
                value={values?.nameOfFirm ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('nameOfFirm', val)}
                placeHolder={'Retailer Name'}
                onBlur={handleBlur('nameOfFirm')}
                disabled
                errorText={touched?.nameOfFirm ? errors?.nameOfFirm : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                placeHolder={'Mobile No.'}
                titleText={'Mobile Number'}
                value={values?.customerMobile ?? EMPTY_DATA_DASH}
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
                left={
                  values?.customerMobile && <TextInput.Affix text="+91 |" />
                }
                onChangeText={val => setFieldValue('retailerPhoneNo', val)}
                errorText={
                  touched?.retailerPhoneNo ? errors?.retailerPhoneNo : ''
                }
                disabled
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Retailer Email-ID'}
                value={values?.emailId ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('emailId', val)}
                placeHolder={'Retailer Email-Id'}
                onBlur={handleBlur('emailId')}
                errorText={touched?.emailId ? errors?.emailId : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                placeHolder={'Alternate Mobile No.'}
                titleText={'Alternate Mobile Number'}
                value={values?.retailerAlternativePhoneNo ?? EMPTY_DATA_DASH}
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
                left={
                  values?.retailerAlternativePhoneNo && (
                    <TextInput.Affix text="+91 |" />
                  )
                }
                onChangeText={val =>
                  setFieldValue('retailerAlternativePhoneNo', val)
                }
                errorText={
                  touched?.retailerAlternativePhoneNo
                    ? errors?.retailerAlternativePhoneNo
                    : ''
                }
                disabled
              />
              <Spacer size={15} />
              <DatePicker
                label="Date of Birth"
                value={
                  values?.dateOfBirth
                    ? convertDateToDisplay(values?.dateOfBirth)
                    : EMPTY_DATA_DASH
                }
                onInputChange={val => setFieldValue('dateOfBirth', val)}
                isDatePickerEditable={false}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Gender'}
                value={values?.gender ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('gender', val)}
                placeHolder={'Gender'}
                onBlur={handleBlur('gender')}
                disabled
                errorText={touched?.gender ? errors?.gender : ''}
              />
              <Spacer size={15} />
              <DropDown
                list={martialStatus}
                label={'Marital Status'}
                placeholder={'Select Marital Status'}
                // isDisabled={false}
                value={values?.maritalStatus}
                visible={showMaritalStatusDropdown}
                onChangeDropdownState={() =>
                  setShowMaritalStatusDropdown(!showMaritalStatusDropdown)
                }
                setValue={data => {
                  setFieldValue('maritalStatus', data);
                }}
                error={touched.maritalStatus ? errors.maritalStatus : ''}
              />
              <Spacer size={15} />
              <DatePicker
                label="Marriage Anniversary"
                value={
                  values?.marriageAnniversary
                    ? convertDateToDisplay(values?.marriageAnniversary)
                    : ''
                }
                onInputChange={val =>
                  setFieldValue(
                    'marriageAnniversary',
                    convertDateToDisplay(val, DateFormats.YYYY_MM_DD),
                  )
                }
                isDatePickerEditable={true}
                validRange={validRange}
              />
              <Spacer size={30} />
              <View style={styles.buttonView}>
                <CustomButton
                  type={ButtonTypes.outline}
                  text="Clear"
                  onPress={handleReset}
                  style={styles.button}
                />
                <CustomButton
                  type={ButtonTypes.contained}
                  text="Save"
                  onPress={() => {
                    handleSubmit();
                  }}
                  style={styles.button}
                  isDisabled={buttonDisabled}
                />
              </View>
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        btnType="confirm"
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
        }}
        setShowModal={() => setShowSuccessModal(false)}
        secondaryBtnTitle={'Dismiss'}
        title="Success"
        label="You have Successfully updated Personal Details"
        isSuccess
        showModal={showSuccessModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  button: {
    flex: 1,
  },
});

export default PersonalDetails;
