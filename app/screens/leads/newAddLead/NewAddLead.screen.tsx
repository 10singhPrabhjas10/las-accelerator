import React, {useState} from 'react';
import {View, Text, Linking} from 'react-native';
import {Formik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';
import Layout from 'components/Layout';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import DropDown from 'components/dropdown/Dropdown';
import CustomButton from 'components/button/CustomButton';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import HelpdeskIcon from '../../../../assets/icons/phone-ringing.svg';
import EmaildeskIcon from '../../../../assets/icons/emailIcon.svg';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {leadsStyles} from '../Leads.style';
import {useAppDispatch} from '../../../store/redux/store';
import {addLead} from '../../../store/redux/newAddLeadSlice';

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
  const route = useRoute();
  const leadParam = (route.params && (route.params as any).lead) || undefined;
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [location, setLocation] = useState('');

  const navigation = useNavigation<RootNavigationProp>();
  const dispatch = useAppDispatch();

  // If lead param is passed, use it as initial values
  const formInitialValues = leadParam
    ? {
        leadName: leadParam.contactPersonName || '',
        leadEmail: leadParam.emailId || '',
        leadMobile: leadParam.mobileNumber || '',
        categoryName: leadParam.categoryId || '',
        subCategoryName: leadParam.subCategoryId || '',
        leadType: leadParam.leadType || '',
        pinCode: leadParam.pincode || '',
        district: leadParam.district || '',
        salesOffice: leadParam.salesOffice || '',
        state: leadParam.state || '',
        zone: leadParam.zone || '',
        country: leadParam.country || 'India',
      }
    : initialLeadData;

  // Determine if the form should be read-only (when coming from View Lead Details)
  const isReadOnly = !!leadParam;

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
    dispatch(addLead(createReqBody));
    setShowSuccessModal(true);
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

  // Function to open phone dialer
  const handlePhonePress = () => {
    Linking.openURL('tel:+919876567890');
  };

  // Function to open email client
  const handleEmailPress = () => {
    Linking.openURL('mailto:info@LAS.com');
  };

  // Helper to ensure errorText is always a string
  const getErrorString = (err: any) => {
    if (typeof err === 'string') return err;
    if (Array.isArray(err)) return err.join(', ');
    return '';
  };

  return (
    <Layout
      headerTitle={getTranslationLabel('lead_addition')}
      isScrollable
      style={CommonStyles.padding}>
      <Formik
        initialValues={formInitialValues}
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
                errorText={getErrorString(
                  touched.leadName && errors.leadName ? errors.leadName : '',
                )}
                disabled={isReadOnly}
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
                errorText={getErrorString(
                  touched.leadEmail && errors.leadEmail ? errors.leadEmail : '',
                )}
                disabled={isReadOnly}
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
                errorText={getErrorString(
                  touched.leadMobile && errors.leadMobile
                    ? errors.leadMobile
                    : '',
                )}
                disabled={isReadOnly}
              />
              <Spacer size={20} />
              <DropDown
                list={[
                  {label: 'Water Heaters', value: 'Water Heaters'},
                  {label: 'Voltage Stabilisers', value: 'Voltage Stabilisers'},
                  {label: 'Fans', value: 'Fans'},
                  {label: 'Electric Motors', value: 'Electric Motors'},
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
                error={getErrorString(
                  touched.categoryName && errors.categoryName
                    ? errors.categoryName
                    : '',
                )}
                textInputStyle={{backgroundColor: COLORS.white}}
                isDisabled={isReadOnly}
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
                error={getErrorString(
                  touched.subCategoryName && errors.subCategoryName
                    ? errors.subCategoryName
                    : '',
                )}
                textInputStyle={{backgroundColor: COLORS.white}}
                isDisabled={isReadOnly}
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
                disabled={isReadOnly}
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
                errorText={getErrorString(
                  touched.pinCode && errors.pinCode ? errors.pinCode : '',
                )}
                disabled={isReadOnly}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_district')}
                titleText={getTranslationLabel('district')}
                value={values.district}
                onChangeText={handleChange('district')}
                onBlur={handleBlur('district')}
                errorText={getErrorString(
                  touched.district ? errors.district : '',
                )}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_sales_office')}
                titleText={getTranslationLabel('sales_office')}
                value={values.salesOffice}
                onChangeText={handleChange('salesOffice')}
                onBlur={handleBlur('salesOffice')}
                errorText={getErrorString(
                  touched.salesOffice ? errors.salesOffice : '',
                )}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_state')}
                titleText={getTranslationLabel('state')}
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                errorText={getErrorString(touched.state ? errors.state : '')}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('enter_zone')}
                titleText={getTranslationLabel('zone')}
                value={values.zone}
                onChangeText={handleChange('zone')}
                onBlur={handleBlur('zone')}
                errorText={getErrorString(touched.zone ? errors.zone : '')}
                disabled
              />
              <Spacer size={20} />
              <PrimaryTextInput
                placeHolder={getTranslationLabel('India')}
                titleText={getTranslationLabel('country')}
                value={values.country}
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                errorText={getErrorString(
                  touched.country ? errors.country : '',
                )}
                disabled
              />
              {!isReadOnly && (
                <>
                  <Spacer size={40} />
                  <CustomButton
                    type={ButtonTypes.contained}
                    onPress={handleSubmit}
                    isDisabled={false}
                    text={getTranslationLabel('save_submit')}
                  />
                </>
              )}
              <Spacer size={40} />
              <View style={leadsStyles.contactRow}>
                <TouchableOpacity
                  style={leadsStyles.contactTouchable}
                  onPress={handlePhonePress}>
                  <HelpdeskIcon />
                  <Text style={leadsStyles.contactText}>+91 9876567890</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={leadsStyles.contactTouchable}
                  onPress={handleEmailPress}>
                  <EmaildeskIcon />
                  <Text style={leadsStyles.contactText}>info@LAS.com</Text>
                </TouchableOpacity>
              </View>
              <Spacer size={40} />
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title={getTranslationLabel('lead_draft_saved')}
        label={getTranslationLabel('success_saved_leads_draft')}
        btnType="confirm"
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        onSecondaryBtnHandler={() => navigation.navigate('Leads')}
        isSuccess
      />
    </Layout>
  );
};

export default NewAddLeadScreen;
