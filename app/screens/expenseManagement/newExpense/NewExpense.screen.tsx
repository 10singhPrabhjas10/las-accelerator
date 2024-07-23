import React, {useEffect, useState, useRef} from 'react';
import CommonStyles from 'utils/commonStyle';
import Layout from 'components/Layout';
import DatePicker from 'components/datePicker/DatePicker';
import {Formik} from 'formik';
import {
  travelExpenseValidation,
  lodgingExpenseValidation,
  otherExpenseValidation,
} from 'validations/newExpense';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {convertDateToDisplay} from 'utils/commonMethods';
import Spacer from 'components/spacer';
import {Text, TextInput, Icon} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import DropDown from 'components/dropdown/Dropdown';
import {MODE_OF_TRANSPORT, PROOF_TYPE, EXPENSE_TYPE} from 'utils/Constants';
import ImageUpload from 'screens/beat/StoreCheckIn/components/imageUpload/ImageUpload';
import UploadImageBottomSheet from 'bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';
import {IPhotoProps} from 'screens/profile/Profile.interface';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {debounce} from 'utils/commonMethods';
import {RootNavigationTypes} from 'routes/RootNavigation';
import {AutocompleteDropdown} from 'components/auto-complete/AutocompleteDropdown';
import {
  getCityRateData,
  getCityList,
  addNewOrUpdateExpense,
} from '../ExpenseManagement.business';
import {TAutocompleteDropdownItem} from 'components/auto-complete/AutocompleteDropdown.interface';
import WarningIcon from '../../../../assets/icons/warning-triangle.svg';
import SearchIcon from '../../../../assets/icons/searchIcon.svg';
import DeleteIcon from '../../../../assets/icons/delete.svg';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import {
  ModeOfTransport,
  IExpenseMgmtCityRate,
  IExpenseData,
} from '../ExpenseManagement.Interface';

let initialExpense = {
  id: null,
  fromDate: null,
  toDate: null,
  type: '',
  beatStartPoint: null,
  beatEndPoint: null,
  beatDistance: null,
  modeOfTransport: null,
  proofType: null,
  amount: null,
  noOfNight: null,
  cityCategory: null,
  city: null,
  taxAmount: null,
  comments: null,
  expense_proofs: [],
  files: [],
};

const GREY_TEXT_THEME = {colors: {onSurface: COLORS.grey2}};
const searchIcon = () => <SearchIcon height={20} width={20} />;

const NewExpense = () => {
  const [showUploadImageBottomSheet, setShowUploadImageBottomSheet] =
    useState<boolean>(false);
  const [visibility, setVisibility] = useState({
    proofTypeDropdown: false,
    expenseTypeDropdown: false,
    modeOfTransportDropdown: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [photo, setPhoto] = useState<IPhotoProps[] | null>([]);
  const [expenseProofList, setExpenseProofList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cityRate, setCityRate] = useState<IExpenseMgmtCityRate>();
  const [searchedCityList, setSearchedCityList] = useState<
    TAutocompleteDropdownItem[]
  >([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState(null);
  const navigation = useNavigation();
  const formikRef = useRef(null);
  const route = useRoute<RouteProp<RootNavigationTypes, 'NewExpense'>>();
  const {selectedExpenseToBeModified: selectedExpenseToBeModified = null} =
    route?.params || {};

  const createReqBody = () => {
    try {
      let requestBody = {...formikRef?.current?.values};
      let photoList = photo?.map(item => item?.uri);
      requestBody.files = [...expenseProofList, ...photoList];
      requestBody.expense_proofs = [];
      requestBody.amount =
        Number(requestBody?.amount) + Number(requestBody?.taxAmount);
      requestBody.modeOfTransport = requestBody?.modeOfTransport;
      requestBody.fromDate = moment(requestBody?.fromDate).format(
        DateFormats.YYYY_MM_DD,
      );
      requestBody.toDate = moment(requestBody?.toDate).format(
        DateFormats.YYYY_MM_DD,
      );
      requestBody.taxAmount = Number(requestBody?.taxAmount);
      requestBody.beatDistance = Number(requestBody?.beatDistance);
      setShowWarningModal(false);
      addNewOrUpdateExpense(
        selectedExpenseToBeModified ? 'Update' : 'Create',
        requestBody,
        () => {
          setIsSubmitted(true);
          setShowSuccessModal(true);
        },
        () => {
          setIsSubmitted(false);
          setShowSuccessModal(true);
        },
      );
    } catch (error) {}
  };

  const toggleDropDownVisibility = key => {
    setVisibility(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const getCityRate = (selectedCity: string) => {
    getCityRateData(selectedCity, setCityRate);
  };

  useEffect(() => {
    if (selectedExpenseToBeModified) {
      let data: IExpenseData = selectedExpenseToBeModified;
      initialExpense.id = data.id;
      initialExpense.fromDate = data.fromDate;
      initialExpense.toDate = data.toDate;
      initialExpense.type = data.expenseType;
      initialExpense.beatStartPoint = data.beatStartPoint;
      initialExpense.beatEndPoint = data.beatEndPoint;
      initialExpense.city = data.city;
      initialExpense.cityCategory = data.cityCategory;
      initialExpense.beatDistance = String(data.actualBeatDistance);
      initialExpense.modeOfTransport = data.modeOfTransport;
      initialExpense.proofType = data.proofType;
      initialExpense.noOfNight = data.noOfNight;
      initialExpense.amount =
        data.expenseType === 'TA'
          ? String(data.totalAmount)
          : String(data.totalAmount - data.taxAmount);
      initialExpense.taxAmount = String(data.taxAmount);
      initialExpense.expense_proofs = data?.expense_proofs
        .filter(item => item.proofFile)
        ?.map(item => item.proofFile);
      setExpenseProofList(initialExpense.expense_proofs);
      setSearchedCityList([
        {
          id: data.cityCategory,
          title: data.city,
        },
      ]);

      setSelectedExpenseType(data.expenseType);
    } else {
      resetFormData();
    }
  }, []);

  const handleAddMoreProof = () => {
    try {
      setShowUploadImageBottomSheet(true);
    } catch (error) {}
  };

  const onDeleteIconPress = index => {
    try {
      const newArray =
        index !== -1
          ? [...photo.slice(0, index), ...photo.slice(index + 1)]
          : photo;
      setPhoto(newArray);
    } catch (error) {}
  };

  const checkIfAmountExceedLimit = values => {
    let beatDistance = values?.beatDistance;
    let modeOfTransport = values?.modeOfTransport;
    let amount = values?.amount;

    if (modeOfTransport === ModeOfTransport.OWN_VEHICLE) {
      if (beatDistance > 35)
        return amount > cityRate?.outstationTravelRate ? true : false;
      else return amount > cityRate?.localTravelRate ? true : false;
    } else return amount > cityRate?.outstationTravelRate ? true : false;
  };

  const resetFormData = () => {
    initialExpense = {
      id: null,
      fromDate: null,
      toDate: null,
      type: '',
      beatStartPoint: null,
      beatEndPoint: null,
      beatDistance: null,
      modeOfTransport: null,
      proofType: null,
      amount: null,
      noOfNight: null,
      cityCategory: null,
      city: null,
      taxAmount: null,
      comments: null,
      expense_proofs: [],
      files: [],
    };
    let setFieldValue = formikRef?.current?.setFieldValue;
    setFieldValue('fromDate', initialExpense.fromDate);
    setFieldValue('toDate', initialExpense.toDate);
    setFieldValue('type', initialExpense.type);
    setFieldValue('beatStartPoint', initialExpense.beatStartPoint);
    setFieldValue('beatEndPoint', initialExpense.beatEndPoint);
    setFieldValue('beatDistance', initialExpense.beatDistance);
    setFieldValue('modeOfTransport', initialExpense.modeOfTransport);
    setFieldValue('proofType', initialExpense.proofType);
    setFieldValue('amount', initialExpense.amount);
    setFieldValue('noOfNight', initialExpense.noOfNight);
    setFieldValue('cityCategory', initialExpense.cityCategory);
    setFieldValue('city', initialExpense.city);
    setFieldValue('taxAmount', initialExpense.taxAmount);
    setFieldValue('comments', initialExpense.comments);
    setPhoto([]);
  };

  const handleExpenseTypeChange = (value, setFieldValue) => {
    if (value !== selectedExpenseType) {
      setSelectedExpenseType(value);
      setFieldValue('type', value);
      setFieldValue('beatStartPoint', initialExpense.beatStartPoint);
      setFieldValue('beatEndPoint', initialExpense.beatEndPoint);
      setFieldValue('beatDistance', initialExpense.beatDistance);
      setFieldValue('modeOfTransport', initialExpense.modeOfTransport);
      setFieldValue('proofType', initialExpense.proofType);
      setFieldValue('amount', initialExpense.amount);
      setFieldValue('noOfNight', initialExpense.noOfNight);
      setFieldValue('cityCategory', initialExpense.cityCategory);
      setFieldValue('city', initialExpense.city);
      setFieldValue('taxAmount', initialExpense.taxAmount);
      setFieldValue('comments', initialExpense.comments);
      setPhoto([]);
    }
  };

  const handleCitySearch = debounce((searchText: string) => {
    getCityList(searchText, setSearchedCityList);
  }, 1000);

  const renderTravelAllowance = (
    handleBlur,
    values,
    errors,
    setFieldValue,
    touched,
  ) => {
    return (
      <>
        <Spacer size={15} />
        <Text variant="bodyMedium" theme={GREY_TEXT_THEME}>
          Travel Expense
        </Text>
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Beat Start Point'}
          value={values?.beatStartPoint}
          isRequired
          onChangeText={val => setFieldValue('beatStartPoint', val)}
          placeHolder={'Enter Start Point'}
          onBlur={handleBlur('beatStartPoint')}
          errorText={touched?.beatStartPoint ? errors?.beatStartPoint : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Beat End Point'}
          isRequired
          value={values?.beatEndPoint}
          onChangeText={val => setFieldValue('beatEndPoint', val)}
          placeHolder={'Enter End Point'}
          onBlur={handleBlur('beatEndPoint')}
          errorText={touched?.beatEndPoint ? errors?.beatEndPoint : ''}
        />

        <Spacer size={15} />
        <AutocompleteDropdown
          titleText={'City'}
          placeholder="Search City"
          initialValue={initialExpense?.city ? initialExpense?.city : null}
          dataSet={searchedCityList}
          onChangeText={(value: string) => {
            if (value.length > 0) {
              handleCitySearch(value);
            }
          }}
          onSelectItem={data => {
            if (data) {
              setFieldValue('cityCategory', data?.id);
              setFieldValue('city', data?.title);
              getCityRate(data?.title);
            }
          }}
          icon={<TextInput.Icon icon={searchIcon} />}
          clearOnFocus={false}
          isRequired
          closeOnBlur={true}
          closeOnSubmit={false}
          errorText={touched?.cityCategory ? errors?.cityCategory : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Actual Beat Distance'}
          value={values?.beatDistance}
          isRequired
          onChangeText={val => {
            setFieldValue('beatDistance', val);
          }}
          placeHolder={'Enter Beat Distance'}
          onBlur={handleBlur('beatDistance')}
          right={values.beatDistance && <TextInput.Affix text="Kms" />}
          keyboardType="decimal-pad"
          errorText={touched?.beatDistance ? errors?.beatDistance : ''}
        />
        <Spacer size={15} />
        <DropDown
          list={MODE_OF_TRANSPORT}
          label={'Mode of Transport'}
          isRequired
          placeholder={'Select Mode of Transport'}
          value={values.modeOfTransport}
          visible={visibility.modeOfTransportDropdown}
          onChangeDropdownState={() =>
            toggleDropDownVisibility('modeOfTransportDropdown')
          }
          setValue={data => {
            setFieldValue('modeOfTransport', data);
          }}
          error={touched.modeOfTransport ? errors.modeOfTransport : ''}
        />
        <Spacer size={15} />
        <DropDown
          list={PROOF_TYPE}
          label={'Proof Type'}
          placeholder={'Select Proof Type'}
          value={values.proofType}
          visible={visibility.proofTypeDropdown}
          onChangeDropdownState={() =>
            toggleDropDownVisibility('proofTypeDropdown')
          }
          setValue={data => {
            setFieldValue('proofType', data);
          }}
          error={touched.proofType ? errors.proofType : ''}
        />
        {values?.modeOfTransport !== '' && (
          <>
            <Spacer size={15} />
            <Text variant="bodyMedium">{getTransportUploadTitle(values)}</Text>
            <ImageUpload
              imageData={photo}
              rightIcon={true}
              openBottomSheet={() => setShowUploadImageBottomSheet(true)}
              onRightIconPress={index => onDeleteIconPress(index)}
            />
          </>
        )}

        {photo && photo.length > 0 && (
          <CustomButton
            type={ButtonTypes.outline}
            onPress={() => {
              handleAddMoreProof();
            }}
            icon={<Icon size={16} source={'plus'} />}
            text="Add More Proof"
            isDisabled={combinedImageCountExceedsLimit(photo, expenseProofList)}
          />
        )}

        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Calculated Amount'}
          value={values?.amount}
          isRequired
          onChangeText={val => setFieldValue('amount', val)}
          placeHolder={'Enter Calculated Amount'}
          onBlur={handleBlur('amount')}
          keyboardType="decimal-pad"
          errorText={touched?.amount ? errors?.amount : ''}
        />
      </>
    );
  };

  const combinedImageCountExceedsLimit = (
    array1: [],
    array2: [],
    limit = 5,
  ) => {
    const length1 = array1 ? array1.length : 0;
    const length2 = array2 ? array2.length : 0;
    return length1 + length2 >= limit;
  };

  const renderLodgingAllowance = (
    handleBlur,
    values,
    errors,
    setFieldValue,
    touched,
  ) => {
    return (
      <>
        <Spacer size={15} />
        <Text variant="bodyMedium" theme={GREY_TEXT_THEME}>
          Lodging Expense
        </Text>
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'No. of Night'}
          value={values?.noOfNight}
          isRequired
          onChangeText={val => setFieldValue('noOfNight', val)}
          placeHolder={'Enter No. of Night'}
          onBlur={handleBlur('noOfNight')}
          keyboardType="decimal-pad"
          errorText={touched?.noOfNight ? errors?.noOfNight : ''}
        />
        <Spacer size={15} />
        <AutocompleteDropdown
          titleText={'City'}
          placeholder="Search City"
          initialValue={initialExpense?.city}
          dataSet={searchedCityList}
          onChangeText={(value: string) => {
            if (value.length > 0) {
              handleCitySearch(value);
            }
          }}
          onSelectItem={data => {
            if (data) {
              setFieldValue('cityCategory', data?.id);
              setFieldValue('city', data?.title);
              getCityRate(data?.title);
            }
          }}
          icon={<TextInput.Icon icon={searchIcon} />}
          clearOnFocus={false}
          isRequired
          closeOnBlur={true}
          closeOnSubmit={false}
          errorText={touched?.cityCategory ? errors?.cityCategory : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Amount (excl. tax)'}
          value={values?.amount}
          onChangeText={val => setFieldValue('amount', val)}
          placeHolder={'Enter Amount (excl. tax)'}
          isRequired
          onBlur={handleBlur('amount')}
          keyboardType="decimal-pad"
          errorText={touched?.amount ? errors?.amount : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Tax Amount'}
          value={values?.taxAmount}
          onChangeText={val => setFieldValue('taxAmount', val)}
          placeHolder={'Enter Tax Amount'}
          onBlur={handleBlur('taxAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.taxAmount ? errors?.taxAmount : ''}
        />
        <Spacer size={15} />
        <DropDown
          list={PROOF_TYPE}
          label={'Proof Type'}
          placeholder={'Select Proof Type'}
          value={values.proofType}
          visible={visibility.proofTypeDropdown}
          onChangeDropdownState={() =>
            toggleDropDownVisibility('proofTypeDropdown')
          }
          setValue={data => {
            setFieldValue('proofType', data);
          }}
          error={touched.proofType ? errors.proofType : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          multiline
          numberOfLines={4}
          titleText="Comments"
          value={values?.comments}
          onChangeText={val => {
            setFieldValue('comments', val);
          }}
          placeHolder="Type Comments"
          onBlur={handleBlur('comments')}
          errorText={touched?.comments ? errors?.comments : ''}
          textInputStyle={styles.textInput}
        />
        <Spacer size={15} />
        <ImageUpload
          imageData={photo}
          rightIcon={true}
          openBottomSheet={() => setShowUploadImageBottomSheet(true)}
          onRightIconPress={index => onDeleteIconPress(index)}
        />

        {photo && photo.length > 0 && (
          <CustomButton
            type={ButtonTypes.outline}
            onPress={() => {
              handleAddMoreProof();
            }}
            icon={<Icon size={16} source={'plus'} />}
            text="Add More Proof"
            isDisabled={combinedImageCountExceedsLimit(photo, expenseProofList)}
          />
        )}
      </>
    );
  };

  const renderOtherAllowance = (
    handleBlur,
    values,
    errors,
    setFieldValue,
    touched,
  ) => {
    return (
      <>
        <Spacer size={15} />
        <Text variant="bodyMedium" theme={GREY_TEXT_THEME}>
          Other Expense
        </Text>
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Amount (excl. tax)'}
          value={values?.amount}
          onChangeText={val => setFieldValue('amount', val)}
          placeHolder={'Enter Amount (excl. tax)'}
          isRequired
          onBlur={handleBlur('amount')}
          keyboardType="decimal-pad"
          errorText={touched?.amount ? errors?.amount : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Tax Amount'}
          value={values?.taxAmount}
          onChangeText={val => setFieldValue('taxAmount', val)}
          placeHolder={'Enter Tax Amount'}
          onBlur={handleBlur('taxAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.taxAmount ? errors?.taxAmount : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          multiline
          numberOfLines={4}
          titleText="Comments"
          value={values?.comments}
          onChangeText={val => {
            setFieldValue('comments', val);
          }}
          placeHolder="Type Comments"
          onBlur={handleBlur('comments')}
          errorText={touched?.comments ? errors?.comments : ''}
          textInputStyle={styles.textInput}
        />
        <Spacer size={15} />
        <ImageUpload
          imageData={photo}
          openBottomSheet={() => setShowUploadImageBottomSheet(true)}
          rightIcon={true}
          onRightIconPress={index => onDeleteIconPress(index)}
        />
      </>
    );
  };

  const getTransportUploadTitle = values => {
    if (values.modeOfTransport === ModeOfTransport.OWN_VEHICLE) {
      return 'Upload fuel bill';
    } else if (values.modeOfTransport === ModeOfTransport.OUTSTATION_TRAVEL) {
      return 'Upload train ticket';
    } else if (values.modeOfTransport === ModeOfTransport.LOCAL_TRAVEL) {
      return 'Upload bus ticket ';
    }
  };

  const showExpenseType = (
    handleBlur,
    values,
    errors,
    setFieldValue,
    touched,
  ) => {
    switch (values.type) {
      case 'TA':
        return renderTravelAllowance(
          handleBlur,
          values,
          errors,
          setFieldValue,
          touched,
        );
      case 'LA':
        return renderLodgingAllowance(
          handleBlur,
          values,
          errors,
          setFieldValue,
          touched,
        );
      case 'other':
        return renderOtherAllowance(
          handleBlur,
          values,
          errors,
          setFieldValue,
          touched,
        );
    }
  };

  const handleRemoveImage = (index: number) => {
    const newProofs = expenseProofList.filter((_, i) => i !== index);
    setExpenseProofList(newProofs);
  };

  const validRangeFrom = {
    startDate: undefined,
    endDate: new Date(),
  };

  return (
    <>
      <Layout
        headerTitle="Expense Management"
        style={CommonStyles.padding}
        isScrollable>
        <Formik
          innerRef={formikRef}
          validationSchema={
            selectedExpenseType === 'TA'
              ? travelExpenseValidation
              : selectedExpenseType === 'LA'
              ? lodgingExpenseValidation
              : otherExpenseValidation
          }
          initialValues={initialExpense}
          onSubmit={values => {
            let status = checkIfAmountExceedLimit(values);
            if (status) {
              setShowWarningModal(true);
            } else {
              createReqBody();
            }
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
                <DatePicker
                  label="From Date"
                  isRequired
                  value={
                    values?.fromDate
                      ? convertDateToDisplay(values.fromDate)
                      : ''
                  }
                  onInputChange={val => {
                    setFieldValue('fromDate', val);
                  }}
                  isDatePickerEditable={true}
                  validRange={validRangeFrom}
                />
                {touched.fromDate && errors.fromDate && (
                  <Text style={{color: COLORS.red}}>
                    {String(errors.fromDate)}
                  </Text>
                )}

                <Spacer size={15} />
                <DatePicker
                  label="To Date"
                  isRequired
                  value={
                    values?.toDate ? convertDateToDisplay(values.toDate) : ''
                  }
                  onInputChange={val => setFieldValue('toDate', val)}
                  isDatePickerEditable={true}
                  validRange={{
                    startDate: values?.fromDate
                      ? new Date(values?.fromDate)
                      : new Date(),
                    endDate: new Date(),
                  }}
                />
                {touched.toDate && errors.toDate && (
                  <Text style={{color: COLORS.red}}>
                    {String(errors.toDate)}
                  </Text>
                )}
                <Spacer size={15} />
                <DropDown
                  list={EXPENSE_TYPE}
                  label={'Expense Type'}
                  isRequired
                  isDisabled={selectedExpenseToBeModified ? true : false}
                  placeholder={'Select Expense Type'}
                  value={values?.type}
                  visible={visibility.expenseTypeDropdown}
                  onChangeDropdownState={() =>
                    toggleDropDownVisibility('expenseTypeDropdown')
                  }
                  setValue={data => {
                    setFieldValue('type', data);
                    handleExpenseTypeChange(data, setFieldValue);
                    setSelectedExpenseType(data);
                  }}
                />

                {selectedExpenseType &&
                  showExpenseType(
                    handleBlur,
                    values,
                    errors,
                    setFieldValue,
                    touched,
                  )}

                <Spacer size={15} />
                {expenseProofList && (
                  <FlatList
                    data={expenseProofList}
                    keyExtractor={(item, index) => String(index)}
                    horizontal
                    renderItem={({item, index}) => (
                      <View style={styles.itemContainer}>
                        <Image source={{uri: item}} style={styles.image} />
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.deleteButton}
                          onPress={() => handleRemoveImage(index)}>
                          <DeleteIcon
                            fill={COLORS.red2}
                            height={16}
                            width={16}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                )}

                {selectedExpenseType && (
                  <>
                    <Spacer size={15} />
                    <CustomButton
                      type={ButtonTypes.contained}
                      text="Submit"
                      onPress={handleSubmit}
                      style={CommonStyles.flexOne}
                    />
                  </>
                )}
              </View>
            );
          }}
        </Formik>
        <SuccessFailureModal
          btnType="both"
          title={isSubmitted ? 'Submitted' : 'Failure'}
          label={
            isSubmitted
              ? 'You have successfully submitted your expenses.'
              : 'Expenses request failed'
          }
          secondaryBtnTitle={'Dismiss'}
          onSecondaryBtnHandler={() => {
            setShowSuccessModal(false);
            if (isSubmitted) {
              navigation?.goBack();
            }
          }}
          primaryButtonTitle="Add New Expense"
          onPrimaryBtnHandler={() => {
            resetFormData();
            setShowSuccessModal(false);
          }}
          setShowModal={() => setShowSuccessModal(false)}
          showModal={showSuccessModal}
          isSuccess={isSubmitted}
        />

        <SuccessFailureModal
          btnType="both"
          showModal={showWarningModal}
          isSuccess={false}
          icon={<WarningIcon />}
          title={'Confirmation'}
          label={'Calculated amount exceeds limit. Continue to submit?'}
          secondaryBtnTitle={'Continue'}
          onSecondaryBtnHandler={() => {
            createReqBody();
          }}
          primaryButtonTitle="Dismiss"
          onPrimaryBtnHandler={() => {
            setShowWarningModal(false);
          }}
          headlineStyle={{
            color: COLORS.delightYellow,
          }}
        />
      </Layout>
      <UploadImageBottomSheet
        setPhoto={newPhoto =>
          setPhoto((prevPhoto: any) => [...prevPhoto, newPhoto])
        }
        visible={showUploadImageBottomSheet}
        onDismiss={() => setShowUploadImageBottomSheet(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    justifyContent: 'center',
    paddingTop: 15,
    textAlignVertical: 'center',
  },
  addNewExpenseBtn: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 15,
    padding: 5,
  },
  itemContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  errorText: {
    color: COLORS.red,
  },
});

export default NewExpense;
