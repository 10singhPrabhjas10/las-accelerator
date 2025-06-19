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
  Platform,
  Alert,
} from 'react-native';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {convertDateToDisplay} from 'utils/commonMethods';
import Spacer from 'components/spacer';
import {Text, TextInput, Icon} from 'react-native-paper';
import {COLORS} from 'theme/colors';
import DropDown from 'components/dropdown/Dropdown';
import {MODE_OF_TRANSPORT, PROOF_TYPE} from 'utils/Constants';
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
  IExpenseFormState,
} from '../ExpenseManagement.Interface';

// Use a function to get a fresh initial state
const getInitialExpense = (): IExpenseFormState => ({
  id: null,
  fromDate: null,
  toDate: null,
  beatStartPoint: null,
  beatEndPoint: null,
  beatDistance: null,
  modeOfTransport: null,
  calculatedAmount: null,
  lodgingAmount: null,
  lodgingTaxAmount: null,
  otherAmount: null,
  otherTaxAmount: null,
  noOfNight: null,
  city: null,
  cityCategory: null,
  lodgingCity: null,
  lodgingCityCategory: null,
  lodgingComments: '',
  otherComments: '',
  expense_proofs: [],
  files: [],
  travelProofType: null,
  lodgingProofType: null,
  otherProofType: null,
  travelProofComments: '',
  lodgingProofComments: '',
  otherProofComments: '',
});

const GREY_TEXT_THEME = {colors: {onSurface: COLORS.grey2}};
const searchIcon = () => <SearchIcon height={20} width={20} />;

const NewExpense = () => {
  const [showUploadImageBottomSheet, setShowUploadImageBottomSheet] =
    useState<boolean>(false);

  const [currentProofType, setCurrentProofType] = useState<
    'travel' | 'lodging' | 'other' | null
  >(null);

  const [travelPhotos, setTravelPhotos] = useState<IPhotoProps[]>([]);
  const [lodgingPhotos, setLodgingPhotos] = useState<IPhotoProps[]>([]);
  const [otherPhotos, setOtherPhotos] = useState<IPhotoProps[]>([]);

  const [visibility, setVisibility] = useState<{
    travelProofTypeDropdown: boolean;
    lodgingProofTypeDropdown: boolean;
    otherProofTypeDropdown: boolean;
    modeOfTransportDropdown: boolean;
  }>({
    travelProofTypeDropdown: false,
    lodgingProofTypeDropdown: false,
    otherProofTypeDropdown: false,
    modeOfTransportDropdown: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [photo, setPhoto] = useState<IPhotoProps[]>([]);
  const [expenseProofList, setExpenseProofList] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cityRate, setCityRate] = useState<IExpenseMgmtCityRate>();
  const [searchedCityList, setSearchedCityList] = useState<
    TAutocompleteDropdownItem[]
  >([]);
  const navigation = useNavigation();
  const formikRef = useRef<any>(null);
  const route = useRoute<RouteProp<RootNavigationTypes, 'NewExpense'>>();
  const {selectedExpenseToBeModified = null} = route?.params || {};

  const toggleDropDownVisibility = (
    key:
      | 'travelProofTypeDropdown'
      | 'lodgingProofTypeDropdown'
      | 'otherProofTypeDropdown'
      | 'modeOfTransportDropdown',
  ) => {
    setVisibility({
      travelProofTypeDropdown: false,
      lodgingProofTypeDropdown: false,
      otherProofTypeDropdown: false,
      modeOfTransportDropdown: false,
      [key]: !visibility[key],
    });
  };

  const getCityRate = (selectedCity: string) => {
    if (!selectedCity) return;
    getCityRateData(selectedCity, setCityRate);
  };

  useEffect(() => {
    if (selectedExpenseToBeModified) {
      const data: IExpenseData = selectedExpenseToBeModified;
      const mappedExpenseProofs =
        data?.expense_proofs?.filter(item => item.proofFile)
          ?.map(item => ({
            id: item.id ?? null,
            expenseName: item.expenseName ?? '',
            proofFile: item.proofFile,
          })) ?? []; 
      const updatedExpense: IExpenseFormState = {
        id: data.id ?? null,
        fromDate: data.fromDate ?? null,
        toDate: data.toDate ?? null,
        beatStartPoint: data.beatStartPoint ?? null,
        beatEndPoint: data.beatEndPoint ?? null,
        beatDistance: data.actualBeatDistance
          ? String(data.actualBeatDistance)
          : null,
        modeOfTransport: data.modeOfTransport ?? null,
        city: data.city ?? null,
        cityCategory: data.cityCategory ?? null,
        calculatedAmount: data.calculatedAmount
          ? String(data.calculatedAmount)
          : null,
        noOfNight: data.noOfNight ?? null,
        lodgingCity: data.lodgingCity ?? null,
        lodgingCityCategory: data.lodgingCityCategory ?? null,
        lodgingAmount:
          data.expenseType === 'LA'
            ? String(data.totalAmount)
            : String(data.totalAmount - data.lodgingTaxAmount),
        lodgingTaxAmount: String(data.lodgingTaxAmount),
        otherAmount:
          data.expenseType === 'OA'
            ? String(data.totalAmount)
            : String(data.totalAmount - data.otherTaxAmount),
        otherTaxAmount: String(data.otherTaxAmount),
        lodgingComments: data.lodgingComments ?? null,
        otherComments: data.otherComments ?? null,
        expense_proofs: mappedExpenseProofs,
        files: [],
        travelProofType: data.travelProofType ?? null,
        lodgingProofType: data.lodgingProofType ?? null,
        otherProofType: data.otherProofType ?? null,
        travelProofComments: data.travelProofComments ?? null,
        lodgingProofComments: data.lodgingProofComments ?? null,
        otherProofComments: data.otherProofComments ?? null,
      };
      setInitialExpense(updatedExpense);
      setExpenseProofList(mappedExpenseProofs.map(item => item.proofFile));
      setSearchedCityList([
        {
          id: data.cityCategory ?? '',
          title: data.city ?? '',
        },
      ]);
    } else {
      resetFormData();
    }
  }, []);

  const handleAddMoreProof = (proofType: 'travel' | 'lodging' | 'other') => {
    setCurrentProofType(proofType);
    setShowUploadImageBottomSheet(true);
  };

  const handleCitySearch = debounce((searchText: string) => {
    getCityList(searchText, setSearchedCityList);
  }, 1000);

  const combinedImageCountExceedsLimit = (
    currentPhotos: any[] = [],
    uploadedProofs: any[] = [],
    limit = 5,
  ) => {
    return (
      (currentPhotos?.length ?? 0) + (uploadedProofs?.length ?? 0) >= limit
    );
  };

  const getTransportUploadTitle = (values: IExpenseFormState) => {
    if (values.modeOfTransport === ModeOfTransport.OWN_VEHICLE) {
      return 'Upload fuel bill';
    } else if (values.modeOfTransport === ModeOfTransport.OUTSTATION_TRAVEL) {
      return 'Upload train ticket';
    } else if (values.modeOfTransport === ModeOfTransport.LOCAL_TRAVEL) {
      return 'Upload bus ticket ';
    }
  };

  const validRangeFrom = {
    startDate: undefined,
    endDate: new Date(),
  };

  const handleRemoveImage = (index: number) => {
    const newProofs = expenseProofList.filter((_, i) => i !== index);
    setExpenseProofList(newProofs);
  };

  const checkIfAmountExceedLimit = (
    values: IExpenseFormState,
    type: 'travel' | 'lodging' | 'other',
  ) => {
    const beatDistance = Number(values?.beatDistance);
    const modeOfTransport = values?.modeOfTransport;

    if (!cityRate) return false;

    let amount = 0;

    switch (type) {
      case 'travel':
        amount = Number(values?.calculatedAmount ?? 0);
        break;
      case 'lodging':
        amount = Number(values?.lodgingAmount ?? 0);
        break;
      case 'other':
        amount = Number(values?.otherAmount ?? 0);
        break;
      default:
        return false;
    }

    if (type === 'travel') {
      if (modeOfTransport === ModeOfTransport.OWN_VEHICLE) {
        if (beatDistance > 35) {
          return (
            cityRate.outstationTravelRate !== undefined &&
            amount > cityRate.outstationTravelRate
          );
        } else {
          return (
            cityRate.localTravelRate !== undefined &&
            amount > cityRate.localTravelRate
          );
        }
      } else {
        return (
          cityRate.outstationTravelRate !== undefined &&
          amount > cityRate.outstationTravelRate
        );
      }
    }
    return false;
  };

  const [initialExpense, setInitialExpense] = useState<IExpenseFormState>(
    getInitialExpense(),
  );

  const resetFormData = () => {
    const freshExpense = getInitialExpense();
    setInitialExpense(freshExpense);
    if (formikRef?.current?.resetForm) {
      formikRef.current.resetForm({ values: freshExpense });
    } else {
      const setFieldValue = formikRef?.current?.setFieldValue;
      Object.entries(freshExpense).forEach(([key, val]) => {
        setFieldValue?.(key, val);
      });
    }
    setPhoto([]);
    setTravelPhotos([]);
    setLodgingPhotos([]);
    setOtherPhotos([]);
    setExpenseProofList([]);
  };

  const createReqBody = () => {
    try {
      const values = formikRef?.current?.values;
      if (!values) {
        Alert.alert('Unexpected Error', 'Form data is missing');
        return;
      }

      const photoList = photo?.map(item => item.uri) || [];

      // Build expense_proofs array with type and uri
      const expense_proofs = [
        ...travelPhotos.map(photo => ({ type: 'travel', uri: photo.uri })),
        ...lodgingPhotos.map(photo => ({ type: 'lodging', uri: photo.uri })),
        ...otherPhotos.map(photo => ({ type: 'other', uri: photo.uri })),
      ];

      const requestBody = {
        ...values,
        files: [...expenseProofList, ...photoList],
        expense_proofs,
        calculatedAmount: Number(values?.calculatedAmount),
        lodgingAmount:
          Number(values?.lodgingAmount || 0) +
          Number(values?.lodgingTaxAmount || 0),
        otherAmount:
          Number(values?.otherAmount || 0) +
          Number(values?.otherTaxAmount || 0),
        beatDistance: Number(values?.beatDistance),
        fromDate: moment(values?.fromDate).format(DateFormats.YYYY_MM_DD),
        toDate: moment(values?.toDate).format(DateFormats.YYYY_MM_DD),
      };
      console.log(requestBody);

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
    } catch (error) {
      console.error('Error in createReqBody:', error);
    }
  };

  const renderTravelAllowance = (
    handleBlur: (field: string) => void,
    values: IExpenseFormState,
    errors: any,
    setFieldValue: (field: string, value: any) => void,
    touched: any,
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
          value={values?.beatStartPoint ?? undefined}
          isRequired
          onChangeText={val => setFieldValue('beatStartPoint', val)}
          placeHolder={'Enter Start Point'}
          onBlur={() => handleBlur('beatStartPoint')}
          errorText={touched?.beatStartPoint ? errors?.beatStartPoint : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Beat End Point'}
          isRequired
          value={values?.beatEndPoint ?? undefined}
          onChangeText={val => setFieldValue('beatEndPoint', val)}
          placeHolder={'Enter End Point'}
          onBlur={() => handleBlur('beatEndPoint')}
          errorText={touched?.beatEndPoint ? errors?.beatEndPoint : ''}
        />

        <Spacer size={15} />
        <AutocompleteDropdown
          titleText={'City'}
          placeholder="Search City"
          initialValue={initialExpense.city ?? undefined}
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
              if (data?.title && typeof data.title === 'string') {
                getCityRate(data.title as string);
              }
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
          value={values?.beatDistance ?? undefined}
          isRequired
          onChangeText={val => {
            setFieldValue('beatDistance', val);
          }}
          placeHolder={'Enter Beat Distance'}
          onBlur={() => handleBlur('beatDistance')}
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
          value={values.travelProofType}
          visible={visibility.travelProofTypeDropdown}
          onChangeDropdownState={() =>
            toggleDropDownVisibility('travelProofTypeDropdown')
          }
          setValue={data => {
            setFieldValue('travelProofType', data);
            if (data !== 'Other')
              setFieldValue('travelProofComments', undefined);
          }}
          error={touched.travelProofType ? errors.travelProofType : ''}
        />

        <Spacer size={15} />
        {values.travelProofType === 'other' && (
          <PrimaryTextInput
            titleText={'Other Proof Type'}
            value={values.travelProofComments ?? undefined}
            onChangeText={val => setFieldValue('travelProofComments', val)}
            placeHolder={'Enter Other Proof Type'}
            onBlur={() => handleBlur('travelProofComments')}
            errorText={
              touched?.travelProofComments ? errors?.travelProofComments : ''
            }
          />
        )}
        {values?.modeOfTransport !== '' && (
          <>
            <Spacer size={15} />
            <ImageUpload
              title="Upload Travel Proof"
              imageData={travelPhotos}
              rightIcon
              openBottomSheet={() => handleAddMoreProof('travel')}
              onRightIconPress={index =>
                setTravelPhotos(prev => [
                  ...prev.slice(0, index),
                  ...prev.slice(index + 1),
                ])
              }
            />
          </>
        )}
        {travelPhotos.length > 0 && (
          <CustomButton
            type={ButtonTypes.outline}
            textStyle={{color: COLORS.black}}
            onPress={() => handleAddMoreProof('travel')}
            icon={<Icon size={16} source={'plus'} />}
            text="Add More Proof"
            isDisabled={combinedImageCountExceedsLimit(
              travelPhotos,
              expenseProofList,
            )}
          />
        )}

        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Calculated Amount'}
          value={values?.calculatedAmount ?? undefined}
          isRequired
          onChangeText={val => setFieldValue('calculatedAmount', val)}
          placeHolder={'Enter Calculated Amount'}
          onBlur={() => handleBlur('calculatedAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.calculatedAmount ? errors?.calculatedAmount : ''}
        />
      </>
    );
  };

  const renderLodgingAllowance = (
    handleBlur: (field: string) => void,
    values: IExpenseFormState,
    errors: any,
    setFieldValue: (field: string, value: any) => void,
    touched: any,
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
          value={values?.noOfNight ?? undefined}
          isRequired
          onChangeText={val => setFieldValue('noOfNight', val)}
          placeHolder={'Enter No. of Night'}
          onBlur={() => handleBlur('noOfNight')}
          keyboardType="decimal-pad"
          errorText={touched?.noOfNight ? errors?.noOfNight : ''}
        />
        <Spacer size={15} />
        <AutocompleteDropdown
          titleText={'City'}
          placeholder="Search City"
          initialValue={initialExpense.lodgingCity ?? undefined}
          dataSet={searchedCityList}
          onChangeText={value => {
            if (value.length > 0) {
              handleCitySearch(value);
            }
          }}
          onSelectItem={data => {
            if (data) {
              setFieldValue('lodgingCityCategory', data?.id);
              setFieldValue('lodgingCity', data?.title);
              if (data?.title && typeof data.title === 'string') {
                getCityRate(data.title as string);
              }
            }
          }}
          icon={<TextInput.Icon icon={searchIcon} />}
          clearOnFocus={false}
          isRequired
          closeOnBlur={true}
          closeOnSubmit={false}
          errorText={
            touched?.lodgingCityCategory ? errors?.lodgingCityCategory : ''
          }
        />

        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Amount (excl. tax)'}
          value={values?.lodgingAmount ?? undefined}
          onChangeText={val => setFieldValue('lodgingAmount', val)}
          placeHolder={'Enter Amount (excl. tax)'}
          isRequired
          onBlur={() => handleBlur('lodgingAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.lodgingAmount ? errors?.lodgingAmount : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Tax Amount'}
          value={values?.lodgingTaxAmount ?? undefined}
          onChangeText={val => setFieldValue('lodgingTaxAmount', val)}
          placeHolder={'Enter Tax Amount'}
          onBlur={() => handleBlur('lodgingTaxAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.lodgingTaxAmount ? errors?.lodgingTaxAmount : ''}
        />
        <Spacer size={15} />
        <DropDown
          list={PROOF_TYPE}
          label={'Proof Type'}
          placeholder={'Select Proof Type'}
          value={values.lodgingProofType}
          visible={visibility.lodgingProofTypeDropdown}
          onChangeDropdownState={() =>
            toggleDropDownVisibility('lodgingProofTypeDropdown')
          }
          setValue={data => {
            setFieldValue('lodgingProofType', data);
            if (data !== 'Other')
              setFieldValue('lodgingProofComments', undefined);
          }}
          error={touched.lodgingProofType ? errors.lodgingProofType : ''}
        />
        <Spacer size={15} />
        {values.lodgingProofType === 'other' && (
          <PrimaryTextInput
            titleText={'Other Proof Type'}
            value={values.lodgingProofComments ?? undefined}
            onChangeText={val => setFieldValue('lodgingProofComments', val)}
            placeHolder={'Enter Other Proof Type'}
            onBlur={() => handleBlur('lodgingProofComments')}
            errorText={
              touched?.lodgingProofComments ? errors?.lodgingProofComments : ''
            }
          />
        )}
        <Spacer size={15} />
        <PrimaryTextInput
          multiline
          numberOfLines={4}
          titleText="Comments"
          value={values?.lodgingComments ?? undefined}
          onChangeText={val => {
            setFieldValue('lodgingComments', val);
          }}
          placeHolder="Type Comments"
          onBlur={() => handleBlur('lodgingComments')}
          errorText={touched?.lodgingComments ? errors?.lodgingComments : ''}
          textInputStyle={styles.textInput}
        />
        <Spacer size={15} />

        <ImageUpload
          title="Upload Lodging Proof"
          imageData={lodgingPhotos}
          rightIcon
          openBottomSheet={() => handleAddMoreProof('lodging')}
          onRightIconPress={index =>
            setLodgingPhotos(prev => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1),
            ])
          }
        />
        {lodgingPhotos.length > 0 && (
          <CustomButton
            type={ButtonTypes.outline}
            onPress={() => handleAddMoreProof('lodging')}
            icon={<Icon size={16} source={'plus'} />}
            text="Add More Proof"
            isDisabled={combinedImageCountExceedsLimit(
              lodgingPhotos,
              expenseProofList,
            )}
          />
        )}
      </>
    );
  };

  const renderOtherAllowance = (
    handleBlur: (field: string) => void,
    values: IExpenseFormState,
    errors: any,
    setFieldValue: (field: string, value: any) => void,
    touched: any,
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
          value={values?.otherAmount ?? undefined}
          onChangeText={val => setFieldValue('otherAmount', val)}
          placeHolder={'Enter Amount (excl. tax)'}
          isRequired
          onBlur={() => handleBlur('otherAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.otherAmount ? errors?.otherAmount : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Tax Amount'}
          value={values?.otherTaxAmount ?? undefined}
          onChangeText={val => setFieldValue('otherTaxAmount', val)}
          placeHolder={'Enter Tax Amount'}
          onBlur={() => handleBlur('otherTaxAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.otherTaxAmount ? errors?.otherTaxAmount : ''}
        />
        <Spacer size={15} />
        <DropDown
          list={PROOF_TYPE}
          label={'Proof Type'}
          placeholder={'Select Proof Type'}
          value={values.otherProofType}
          visible={visibility.otherProofTypeDropdown}
          onChangeDropdownState={() =>
            toggleDropDownVisibility('otherProofTypeDropdown')
          }
          setValue={data => {
            setFieldValue('otherProofType', data);
            if (data !== 'Other')
              setFieldValue('otherProofComments', undefined);
          }}
          error={touched.otherProofType ? errors.otherProofType : ''}
        />

        <Spacer size={15} />
        {values.otherProofType === 'other' && (
          <PrimaryTextInput
            titleText={'Other Proof Type'}
            value={values.otherProofComments ?? undefined}
            onChangeText={val => setFieldValue('otherProofComments', val)}
            placeHolder={'Enter Other Proof Type'}
            onBlur={() => handleBlur('otherProofComments')}
            errorText={
              touched?.otherProofComments ? errors?.otherProofComments : ''
            }
          />
        )}
        <Spacer size={15} />
        <PrimaryTextInput
          multiline
          numberOfLines={4}
          titleText="Comments"
          value={values?.otherComments ?? undefined}
          onChangeText={val => {
            setFieldValue('otherComments', val);
          }}
          placeHolder="Type Comments"
          onBlur={() => handleBlur('otherComments')}
          errorText={touched?.otherComments ? errors?.otherComments : ''}
          textInputStyle={styles.textInput}
        />
        <Spacer size={15} />

        <ImageUpload
          title="Upload Other Proof"
          imageData={otherPhotos}
          rightIcon
          openBottomSheet={() => handleAddMoreProof('other')}
          onRightIconPress={index =>
            setOtherPhotos(prev => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1),
            ])
          }
        />
        {otherPhotos.length > 0 && (
          <CustomButton
            type={ButtonTypes.outline}
            onPress={() => handleAddMoreProof('other')}
            icon={<Icon size={16} source={'plus'} />}
            text="Add More Proof"
            isDisabled={combinedImageCountExceedsLimit(
              otherPhotos,
              expenseProofList,
            )}
          />
        )}
      </>
    );
  };

  return (
    <>
      <Layout
        headerTitle="Expense Management"
        style={CommonStyles.padding}
        isScrollable>
        <Formik
          innerRef={formikRef}
          validationSchema={travelExpenseValidation
            .concat(lodgingExpenseValidation)
            .concat(otherExpenseValidation)}
          initialValues={initialExpense}
          enableReinitialize
          onSubmit={values => {
            const exceedsTravel = checkIfAmountExceedLimit(values, 'travel');
            const exceedsLodging = checkIfAmountExceedLimit(values, 'lodging');
            const exceedsOther = checkIfAmountExceedLimit(values, 'other');
            if (exceedsTravel || exceedsLodging || exceedsOther) {
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

                {renderTravelAllowance(
                  handleBlur,
                  values,
                  errors,
                  setFieldValue,
                  touched,
                )}
                {renderLodgingAllowance(
                  handleBlur,
                  values,
                  errors,
                  setFieldValue,
                  touched,
                )}
                {renderOtherAllowance(
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

                <Spacer size={15} />
                <CustomButton
                  type={ButtonTypes.contained}
                  text="Submit"
                  onPress={handleSubmit}
                  style={CommonStyles.flexOne}
                />
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
        setPhoto={newPhoto => {
          if (currentProofType === 'travel' && newPhoto) {
            setTravelPhotos(prev => [...prev, newPhoto as IPhotoProps]);
          } else if (currentProofType === 'lodging' && newPhoto) {
            setLodgingPhotos(prev => [...prev, newPhoto as IPhotoProps]);
          } else if (currentProofType === 'other' && newPhoto) {
            setOtherPhotos(prev => [...prev, newPhoto as IPhotoProps]);
          }
        }}
        visible={showUploadImageBottomSheet}
        onDismiss={() => setShowUploadImageBottomSheet(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 15 : 0,
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
