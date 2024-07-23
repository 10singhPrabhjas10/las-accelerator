import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {Formik} from 'formik';
import DropDown from 'components/dropdown/Dropdown';
import Spacer from 'components/spacer';
import DatePicker from 'components/datePicker/DatePicker';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {convertDateToDisplay} from 'utils/commonMethods';
import {
  GrievanceValidationSchema,
  validatePGrievanceForm,
} from 'validations/activity';
import {
  IInitialValues,
  IPrimaryData,
  IPrimaryRedressalReqBody,
} from '../CheckIn.interface';
import {
  DateFormats,
  ValidRangeStartDate,
  ValidRangeStartDateUpToTwoYear,
  validEndDateRangeUptoThreeMonths,
} from 'constants/dateFormat';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {getPrimaryDropdownData, submitPrimaryTicket} from '../CheckIn.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {NavigationFrom} from 'utils/Constants';
import SuccessFailureModal from 'modals/SuccessFailureModal';

const GrievanceRedressalScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'GrievanceRedressal'>>();
  const {navigationFrom} = route.params;

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN ? relationId : customerCode;

  const initialValues = {
    grievanceCategory: '',
    grievanceSubCategory: '',
    caseDate: '',
    productCategory: '',
    srNo: '',
    siebelDate: '',
    mobileNo: '',
    comments: '',
    shipmentNo: '',
    invoiceNo: '',
    startDate: '',
    endDate: '',
    orderNo: '',
    orderDate: '',
    startLockRemovalDate: '',
    reasonLockRemoval: '',
    typeLockRemoval: '',
  };

  const [dropdownData, setDropdownData] = useState<IPrimaryData>({
    productCategory: [],
    subType: {},
    supportType: [],
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showDropdown, setShowDropdown] = useState({
    grievanceCategory: false,
    grievanceSubCategory: false,
    productCategory: false,
  });

  const getSubTypeOptions = (selectedSupportType: string) => {
    const subTypes = dropdownData?.subType?.[selectedSupportType] || [];
    const options = subTypes.map(subType => ({label: subType, value: subType}));
    return options;
  };

  useEffect(() => {
    if (!dropdownData?.productCategory?.length) {
      getPrimaryDropdownData(setDropdownData);
    }
  }, []);

  const handleSubmit = (values: IInitialValues) => {
    const requestBody: IPrimaryRedressalReqBody = {
      supportType: values.grievanceCategory,
      comments: values.comments,
      ...(values.grievanceSubCategory && {
        supportSubType: values.grievanceSubCategory,
      }),
      ...(values.productCategory && {productCategory: values.productCategory}),
      ...(values.srNo && {siebelSrNo: values.srNo}),
      ...(values.mobileNo && {mobileNo: values.mobileNo}),
      ...(values.shipmentNo && {shipmentNo: values.shipmentNo}),
      ...(values.invoiceNo && {invoiceCNDNNumber: values.invoiceNo}),
      ...(values.startDate && {
        startDate: convertDateToDisplay(
          values.startDate,
          DateFormats.YYYY_MM_DD,
        ),
      }),
      ...(values.endDate && {
        endDate: convertDateToDisplay(values.endDate, DateFormats.YYYY_MM_DD),
      }),
      ...(values.startLockRemovalDate && {
        startDateOfLockRemoval: convertDateToDisplay(
          values.startLockRemovalDate,
          DateFormats.YYYY_MM_DD,
        ),
      }),
      ...(values.orderNo && {orderNumber: values.orderNo}),
      ...(values.typeLockRemoval && {
        typeOfLockRemoval: values.typeLockRemoval,
      }),
      ...(values.reasonLockRemoval && {
        reasonForLockRemoval: values.reasonLockRemoval,
      }),
    };

    if (values.grievanceSubCategory === 'Existing siebel request') {
      requestBody.siebelCreationDate =
        values.siebelDate === ''
          ? null
          : convertDateToDisplay(values.siebelDate, DateFormats.YYYY_MM_DD);
    }
    if (values.grievanceSubCategory === 'Order issue') {
      requestBody.orderDate =
        values.orderDate === ''
          ? null
          : convertDateToDisplay(values.orderDate, DateFormats.YYYY_MM_DD);
    }

    submitPrimaryTicket(requestBody, code, () => setShowSuccessModal(true));
  };

  return (
    <Layout
      isScrollable
      headerTitle="Grievance Redressal"
      style={CommonStyles.padding}>
      <Formik
        initialValues={initialValues}
        validationSchema={GrievanceValidationSchema}
        validateOnBlur={false}
        validate={validatePGrievanceForm}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => {
          handleSubmit(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
          touched,
        }) => {
          return (
            <View style={CommonStyles.flexOne}>
              <DropDown
                list={dropdownData?.supportType}
                label={'Grievance Category'}
                placeholder={'Select Category'}
                // isDisabled={false}
                isRequired
                value={values.grievanceCategory}
                visible={showDropdown.grievanceCategory}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    grievanceCategory: !showDropdown.grievanceCategory,
                  });
                  values.grievanceSubCategory = '';
                }}
                setValue={data => {
                  setFieldValue('grievanceCategory', data);
                }}
                error={
                  touched.grievanceCategory ? errors.grievanceCategory : ''
                }
              />
              {values.grievanceCategory !== 'Others' && (
                <>
                  <Spacer size={20} />
                  <DropDown
                    list={getSubTypeOptions(values?.grievanceCategory)}
                    label={'Grievance Sub-Category'}
                    placeholder={'Select grievance sub-category'}
                    // isDisabled={false}
                    isRequired={values.grievanceCategory !== 'Others'}
                    value={values.grievanceSubCategory}
                    visible={showDropdown.grievanceSubCategory}
                    onChangeDropdownState={() =>
                      setShowDropdown({
                        ...showDropdown,
                        grievanceSubCategory:
                          !showDropdown.grievanceSubCategory,
                      })
                    }
                    setValue={data => {
                      setFieldValue('grievanceSubCategory', data);
                    }}
                    error={
                      touched.grievanceSubCategory
                        ? errors.grievanceSubCategory
                        : ''
                    }
                  />
                </>
              )}

              <Spacer size={20} />
              <DatePicker
                onInputChange={() => {}}
                isDatePickerEditable={false}
                value={convertDateToDisplay(
                  new Date(),
                  DateFormats.DD_MM_YYYY_,
                )}
                label="Case Creation Date"
              />
              {values?.grievanceCategory === 'DMS related' &&
                values.grievanceSubCategory === 'DMS lock removal request' && (
                  <>
                    <Spacer size={20} />
                    <DatePicker
                      isRequired
                      onInputChange={val => {
                        setFieldValue('startLockRemovalDate', val);
                      }}
                      value={
                        values?.startLockRemovalDate
                          ? convertDateToDisplay(values?.startLockRemovalDate)
                          : ''
                      }
                      label="Start Date of Lock Removal"
                      isDatePickerEditable
                      placeholder="Select Date"
                    />
                    <Spacer size={20} />
                    <PrimaryTextInput
                      titleText="Type of Lock Removal"
                      value={values.typeLockRemoval}
                      onChangeText={val => {
                        setFieldValue('typeLockRemoval', val);
                      }}
                      placeHolder="Enter Type"
                      onBlur={handleBlur('typeLockRemoval')}
                      isRequired
                      errorText={
                        touched.typeLockRemoval ? errors.typeLockRemoval : ''
                      }
                    />
                    <Spacer size={20} />
                    <PrimaryTextInput
                      titleText="Reason for Lock Removal"
                      value={values.reasonLockRemoval}
                      onChangeText={val => {
                        setFieldValue('reasonLockRemoval', val);
                      }}
                      placeHolder="Enter Type"
                      onBlur={handleBlur('reasonLockRemoval')}
                      isRequired
                      errorText={
                        touched.reasonLockRemoval
                          ? errors.reasonLockRemoval
                          : ''
                      }
                    />
                  </>
                )}
              {(values?.grievanceCategory === 'Product Related' ||
                values?.grievanceCategory === 'Channel Related') && (
                <>
                  <Spacer size={20} />
                  <DropDown
                    list={dropdownData?.productCategory}
                    label={'Product Category'}
                    placeholder={'Select Product Category'}
                    // isDisabled={false}
                    isRequired
                    value={values.productCategory}
                    visible={showDropdown.productCategory}
                    onChangeDropdownState={() =>
                      setShowDropdown({
                        ...showDropdown,
                        productCategory: !showDropdown.productCategory,
                      })
                    }
                    setValue={data => {
                      setFieldValue('productCategory', data);
                    }}
                    error={
                      touched.productCategory ? errors.productCategory : ''
                    }
                  />
                </>
              )}

              {values?.grievanceCategory === 'Product Related' &&
                values?.grievanceSubCategory === 'Order issue' && (
                  <>
                    <Spacer size={20} />
                    <PrimaryTextInput
                      titleText="Order No."
                      value={values.orderNo}
                      onChangeText={val => {
                        setFieldValue('orderNo', val);
                      }}
                      placeHolder="Enter Order No"
                      onBlur={handleBlur('orderNo')}
                      isRequired
                      errorText={touched.orderNo ? errors.orderNo : ''}
                    />
                    <Spacer size={20} />
                    <DatePicker
                      onInputChange={val => {
                        setFieldValue('orderDate', val);
                      }}
                      isDatePickerEditable
                      label="Order Date"
                      validRange={ValidRangeStartDateUpToTwoYear}
                      placeholder="Select Order Date"
                      value={
                        values?.orderDate
                          ? convertDateToDisplay(values?.orderDate)
                          : ''
                      }
                    />
                  </>
                )}
              {values?.grievanceCategory === 'Channel Related' &&
                values?.grievanceSubCategory === 'Supply Chain Management' && (
                  <>
                    <Spacer size={20} />
                    <PrimaryTextInput
                      titleText="Shipment No."
                      isRequired={
                        values?.grievanceSubCategory ===
                        'Supply Chain Management'
                      }
                      value={values.shipmentNo}
                      onChangeText={val => {
                        setFieldValue('shipmentNo', val);
                      }}
                      placeHolder="Enter No"
                      onBlur={handleBlur('shipmentNo')}
                      errorText={touched.shipmentNo ? errors.shipmentNo : ''}
                    />
                  </>
                )}
              {values?.grievanceCategory === 'Commercial' &&
                values?.grievanceSubCategory?.includes('Invoice') && (
                  <>
                    <Spacer size={20} />
                    <PrimaryTextInput
                      titleText="Invoice CN/DN No."
                      isRequired={values?.grievanceCategory === 'Commercial'}
                      value={values.invoiceNo}
                      onChangeText={val => {
                        setFieldValue('invoiceNo', val);
                      }}
                      placeHolder="Enter Invoice/CN/DN No"
                      onBlur={handleBlur('invoiceNo')}
                      errorText={touched.invoiceNo ? errors.invoiceNo : ''}
                    />
                  </>
                )}
              {values?.grievanceCategory === 'Product Related' &&
                values?.grievanceSubCategory === 'Existing Siebel Request' && (
                  <>
                    <Spacer size={20} />
                    <PrimaryTextInput
                      titleText="SIEBEL S.R No."
                      isRequired
                      value={values.srNo}
                      onChangeText={val => {
                        setFieldValue('srNo', val);
                      }}
                      placeHolder="Type srNo"
                      onBlur={handleBlur('srNo')}
                      errorText={touched.srNo ? errors.srNo : ''}
                    />
                    <Spacer size={20} />
                    <PrimaryTextInput
                      placeHolder={'Enter Mobile No.'}
                      titleText={'Mobile No.'}
                      value={values.mobileNo}
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={10}
                      left={values.mobileNo && <TextInput.Affix text="+91 |" />}
                      onChangeText={val => setFieldValue('mobileNo', val)}
                      errorText={touched?.mobileNo ? errors?.mobileNo : ''}
                      onBlur={handleBlur('mobileNo')}
                      isRequired
                    />
                    <Spacer size={20} />
                    <DatePicker
                      onInputChange={val => {
                        setFieldValue('siebelDate', val);
                      }}
                      isDatePickerEditable={true}
                      value={
                        values?.siebelDate
                          ? convertDateToDisplay(values?.siebelDate)
                          : ''
                      }
                      placeholder="Select Date"
                      validRange={ValidRangeStartDateUpToTwoYear}
                      label="Siebel Creation Date"
                    />
                  </>
                )}

              {values?.grievanceCategory === 'Commercial' &&
                values?.grievanceSubCategory === 'Accounts statement' && (
                  <>
                    <Spacer size={20} />
                    <DatePicker
                      isRequired
                      onInputChange={val => {
                        setFieldValue('startDate', val);
                      }}
                      value={
                        values?.startDate
                          ? convertDateToDisplay(values?.startDate)
                          : ''
                      }
                      label="Start Date"
                      isDatePickerEditable
                      placeholder="Select Date"
                      validRange={ValidRangeStartDate}
                    />
                    <Spacer size={20} />
                    <DatePicker
                      isRequired
                      onInputChange={val => {
                        setFieldValue('endDate', val);
                      }}
                      value={
                        values?.endDate
                          ? convertDateToDisplay(values?.endDate)
                          : ''
                      }
                      label="End Date"
                      isDatePickerEditable
                      placeholder="Select Date"
                      validRange={validEndDateRangeUptoThreeMonths(
                        new Date(values?.startDate),
                      )}
                    />
                  </>
                )}

              <Spacer size={20} />
              <PrimaryTextInput
                multiline
                numberOfLines={4}
                titleText="Comments"
                isRequired
                value={values.comments}
                onChangeText={val => {
                  setFieldValue('comments', val);
                }}
                placeHolder="Type Comments"
                onBlur={handleBlur('comments')}
                errorText={touched.comments ? errors.comments : ''}
                textInputStyle={styles.textInput}
              />
              <Spacer size={24} />
              <View style={CommonStyles.flexOne} />
              <CustomButton
                text="Submit"
                type={ButtonTypes.contained}
                onPress={() => {
                  handleSubmit();
                }}
                isDisabled={!isValid}
              />
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title="Ticket Submitted"
        label="You have successfully raised a Service Ticket"
        btnType="confirm"
        secondaryBtnTitle="Dismiss"
        onSecondaryBtnHandler={() => {
          navigation.goBack();
          setShowSuccessModal(false);
        }}
        isSuccess
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    justifyContent: 'center',
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  headlineStyle: {color: COLORS.darkGreen2},
});

export default GrievanceRedressalScreen;
