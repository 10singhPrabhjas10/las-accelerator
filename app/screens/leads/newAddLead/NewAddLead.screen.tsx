import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

import Layout from 'components/Layout';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import DropDown from 'components/dropdown/Dropdown';
import CustomButton from 'components/button/CustomButton';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';

import {PrimaryLeadSchema} from 'validations/primaryLead';
import {ButtonTypes} from 'types/buttons';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {getTranslationLabel} from 'utils/commonMethods';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {COLORS} from '@/theme/colors';
import {EMPTY_DATA_DASH} from '@/utils/Constants';

const initialLeadData = {
  leadName: '',
  leadEmail: '',
  leadMobile: '',
  categoryName: '',
  subCategoryName: '',
  leadType: '',
  pinCode: '',
  district: '',
  salesOffice: '',
  state: '',
  zone: '',
  country: 'India',
};

const NewAddLeadScreen = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [location, setLocation] = useState('');

  const navigation = useNavigation<RootNavigationProp>();
  useEffect(() => {
    //getCategoryDropdown(setCategoryData);
  }, []);

  useEffect(() => {
    // fetchLocation();
  }, []);

  const handleOnSubmit = (values: any) => {
    // Map form values to API request body
    const createReqBody = {
      contactPersonName: values.leadName,
      emailId: values.leadEmail,
      mobileNumber: values.leadMobile,
      categoryId: values.categoryName,
      subCategoryId: values.subCategoryName,
      leadType: values.leadType,
      pincode: values.pinCode,
      district: values.district,
      salesOffice: values.salesOffice,
      state: values.state,
      zone: values.zone,
      country: values.country,
    };
    console.log(createReqBody);

    setShowSuccessModal(true);
    //submitPrimaryLead(createReqBody, () => setShowSuccessModal(true));
  };

  const fetchLocation = () => {
    try {
      let location: string;
      const handleLocationResponse = (response: GeolocationResponse) => {
        location = `lat=${response.coords.latitude}&lng=${response.coords.longitude}`;
        setLocation(location);
      };
      const handleLocationError = (_error: GeolocationError) => {
        setLocation(location ?? 'LOCATION_FETCH_FAILED');
      };
      getHere(handleLocationResponse, handleLocationError);
    } catch (error) {}
  };

  const getHere = (
    cb: (response: GeolocationResponse) => void,
    cbError: (error: GeolocationError) => void,
  ) => {
    let location;

    Geolocation.getCurrentPosition(cb, cbError, {
      enableHighAccuracy: true,
    });

    return location;
  };

  // Simulate pinCode lookup (replace with real API if needed)
  const handlePinCodeChange = (text: string, setFieldValue: any) => {
    setFieldValue('pinCode', text);
    if (text === '470001') {
      setFieldValue('district', 'Mumbai');
      setFieldValue('salesOffice', 'Lorem Ipsum');
      setFieldValue('state', 'Maharashtra');
      setFieldValue('zone', 'Lorem Ipsum');
      setFieldValue('country', 'India');
    } else {
      setFieldValue('district', '');
      setFieldValue('salesOffice', '');
      setFieldValue('state', '');
      setFieldValue('zone', '');
      setFieldValue('country', 'India');
    }
  };

  return (
    <Layout
      headerTitle={getTranslationLabel('lead_addition')}
      isScrollable
      style={CommonStyles.padding}>
      <Formik
        initialValues={initialLeadData}
        validationSchema={PrimaryLeadSchema}
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
          setFieldValue,
          touched,
        }) => {
          return (
            <View>
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_name')}
                titleText={getTranslationLabel('leads_name')}
                isRequired
                value={values.leadName}
                onChangeText={handleChange('leadName')}
                onBlur={handleBlur('leadName')}
                errorText={
                  touched.leadName && errors.leadName ? errors.leadName : ''
                }
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_email_id')}
                titleText={getTranslationLabel('leads_email_id')}
                isRequired
                value={values.leadEmail ?? EMPTY_DATA_DASH}
                keyboardType="email-address"
                onChangeText={handleChange('leadEmail')}
                onBlur={handleBlur('leadEmail')}
                errorText={
                  touched.leadEmail && errors.leadEmail ? errors.leadEmail : ''
                }
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={
                  '+91' + ' | ' + getTranslationLabel('enter_mobile_num')
                }
                titleText={getTranslationLabel('leads_mobile_no')}
                isRequired
                value={values.leadMobile}
                onChangeText={text => {
                  let formatted = text;
                  if (text === '' || text === '+91') {
                    formatted = '';
                  } else if (!text.startsWith('+91')) {
                    formatted =
                      '+91' + (text.startsWith('0') ? text.slice(1) : text);
                  }
                  setFieldValue('leadMobile', formatted);
                }}
                onBlur={handleBlur('leadMobile')}
                maxLength={13}
                keyboardType="numeric"
                errorText={
                  touched.leadMobile && errors.leadMobile
                    ? errors.leadMobile
                    : ''
                }
              />
              <Spacer size={20} />
              <DropDown
                list={[
                  {label: 'Water Heaters', value: 'Water Heaters'},
                  {label: 'Geysers', value: 'Geysers'},
                  {label: 'Solar', value: 'Solar'},
                ]}
                label={getTranslationLabel('category_name')}
                placeholder={getTranslationLabel('category_name')}
                isRequired
                value={values.categoryName}
                visible={showCategoryDropdown}
                onChangeDropdownState={() =>
                  setShowCategoryDropdown(!showCategoryDropdown)
                }
                setValue={data => setFieldValue('categoryName', data)}
                error={
                  touched.categoryName && errors.categoryName
                    ? errors.categoryName
                    : ''
                }
                textInputStyle={{backgroundColor: COLORS.white}}
              />
              <Spacer size={20} />
              <DropDown
                list={[
                  {label: 'Lorem Ipsum', value: 'Lorem Ipsum'},
                  {label: 'Dolor Sit', value: 'Dolor Sit'},
                  {label: 'Amet', value: 'Amet'},
                ]}
                label={getTranslationLabel('sub_category_name')}
                placeholder={getTranslationLabel('sub_category_name')}
                isRequired
                value={values.subCategoryName}
                visible={showSubCategoryDropdown}
                onChangeDropdownState={() =>
                  setShowSubCategoryDropdown(!showSubCategoryDropdown)
                }
                setValue={data => setFieldValue('subCategoryName', data)}
                error={
                  touched.subCategoryName && errors.subCategoryName
                    ? errors.subCategoryName
                    : ''
                }
                textInputStyle={{backgroundColor: COLORS.white}}
              />
              <Spacer size={20} />
              <CustomRadioButton
                title={getTranslationLabel('lead_type')}
                onChange={val => setFieldValue('leadType', val)}
                value={values.leadType}
                isRequired
                data={[
                  {value: 'Consumer', label: 'Consumer'},
                  {value: 'Institutional', label: 'Institutional'},
                ]}
              />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_pin_code')}
                titleText={getTranslationLabel('pin_code')}
                isRequired
                value={values.pinCode}
                onChangeText={text => handlePinCodeChange(text, setFieldValue)}
                onBlur={handleBlur('pinCode')}
                keyboardType="numeric"
                maxLength={6}
                returnKeyType="search"
                errorText={
                  touched.pinCode && errors.pinCode ? errors.pinCode : ''
                }
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_district')}
                titleText={getTranslationLabel('district')}
                value={values.district}
                onChangeText={handleChange('district')}
                onBlur={handleBlur('district')}
                errorText={touched.district ? errors.district : ''}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_sales_office')}
                titleText={getTranslationLabel('sales_office')}
                value={values.salesOffice}
                onChangeText={handleChange('salesOffice')}
                onBlur={handleBlur('salesOffice')}
                errorText={touched.salesOffice ? errors.salesOffice : ''}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_state')}
                titleText={getTranslationLabel('state')}
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                errorText={touched.state ? errors.state : ''}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_zone')}
                titleText={getTranslationLabel('zone')}
                value={values.zone}
                onChangeText={handleChange('zone')}
                onBlur={handleBlur('zone')}
                errorText={touched.zone ? errors.zone : ''}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('India')}
                titleText={getTranslationLabel('country')}
                value={values.country}
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                errorText={touched.country ? errors.country : ''}
                disabled
              />
              <Spacer size={40} />
              <CustomButton
                type={ButtonTypes.contained}
                onPress={handleSubmit}
                isDisabled={false} //{!isValid || pinCodeError}
                text={getTranslationLabel('save_submit')}
              />
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title={getTranslationLabel('created')}
        label={getTranslationLabel('success_primary_lead')}
        btnType="confirm"
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        onSecondaryBtnHandler={() => navigation.navigate('Leads')}
        isSuccess
      />
    </Layout>
  );
};

export default NewAddLeadScreen;
