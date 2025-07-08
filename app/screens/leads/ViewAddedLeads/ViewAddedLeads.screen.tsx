import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

import Layout from 'components/Layout';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import DropDown from 'components/dropdown/Dropdown';
import CustomButton from 'components/button/CustomButton';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';

import {PrimaryLeadSchema} from 'validations/primaryLead';
import {ButtonTypes} from 'types/buttons';
import {RootNavigationProp} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {getTranslationLabel} from 'utils/commonMethods';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { COLORS } from '@/theme/colors';

const initialLeadData = {
  contactPersonName: '',
  businessName: '',
  mobileNumber: '',
  emailId: '',
  gstIn: '',
  categoryId: '',
  pincode: '',
  geoLocation: '',
};

const ViewAddedLeadsScreen = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [pinCodeError, setPinCodeError] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [location, setLocation] = useState('');

  const navigation = useNavigation<RootNavigationProp>();
  useEffect(() => {
    //getCategoryDropdown(setCategoryData);
  }, []);

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleOnSubmit = (values: IPrimaryLeadData) => {
    if (values.emailId === '') {
      values.emailId = null;
    }
    setShowSuccessModal(true);
    //submitPrimaryLead(values, () => setShowSuccessModal(true));
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

  return (
    <Layout
      headerTitle={getTranslationLabel('view_added_leads')}
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
          isValid,
          setFieldValue,
          touched,
          setFieldError,
        }) => {
          return (
            <View>
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_name')}
                titleText={getTranslationLabel('contact_person_name')}
                isRequired
                value={values.contactPersonName}
                onChangeText={handleChange('contactPersonName')}
                onBlur={handleBlur('contactPersonName')}
                errorText={
                  touched.contactPersonName ? errors.contactPersonName : ''
                }
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_business_name')}
                titleText={getTranslationLabel('businessName')}
                isRequired
                value={values.businessName}
                onChangeText={handleChange('businessName')}
                onBlur={handleBlur('businessName')}
                errorText={touched.businessName ? errors.businessName : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_mobile_no')}
                titleText={getTranslationLabel('mobile_num')}
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
                placeHolder={getTranslationLabel('enter_email_id')}
                titleText={getTranslationLabel('email_id')}
                value={values.emailId ?? EMPTY_DATA_DASH}
                onChangeText={handleChange('emailId')}
                onBlur={handleBlur('emailId')}
                keyboardType="email-address"
                errorText={touched.emailId ? errors.emailId : ''}
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
              <DropDown
                list={[
                  {
                    label: 'Retailer',
                    value: 'Retailer',
                  },
                  {
                    label: 'Non-Retailer',
                    value: 'Non-Retailer',
                  },
                ]}
                label={getTranslationLabel('category')}
                placeholder={getTranslationLabel('select_category')}
                isRequired
                value={values.categoryId}
                visible={showCategoryDropdown}
                onChangeDropdownState={() =>
                  setShowCategoryDropdown(!showCategoryDropdown)
                }
                setValue={data => {
                  setFieldValue('categoryId', data);
                }}
                error={touched.categoryId ? errors.categoryId : ''}
                textInputStyle={{backgroundColor: COLORS.white}}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_pin_code')}
                titleText={getTranslationLabel('pin_code')}
                isRequired
                value={values.pincode}
                // onEndEditing={() => {
                //   if (values.pincode.length === 6) {
                //     getPincodeData(
                //       values.pincode,
                //       setFieldValue,
                //       setPinCodeError,
                //       setFieldError,
                //     );
                //   }
                // }}
                onChangeText={handleChange('pincode')}
                onBlur={handleBlur('pincode')}
                maxLength={6}
                keyboardType="numeric"
                returnKeyType="search"
                errorText={touched.pincode ? errors.pincode : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('geo_location')}
                titleText={getTranslationLabel('select_geo_location')}
                value={location}
                onChangeText={() => undefined}
                errorText={touched.geoLocation ? errors.geoLocation : ''}
                onPressIn={() => {}}
              />
              <Spacer size={40} />
              <CustomButton
                type={ButtonTypes.contained}
                onPress={handleSubmit}
                isDisabled={false} //{!isValid || pinCodeError}
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
        label={getTranslationLabel('success_primary_lead')}
        btnType="confirm"
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        onSecondaryBtnHandler={() => navigation.navigate('LeadManagement')}
        isSuccess
      />
    </Layout>
  );
};

export default ViewAddedLeadsScreen;
