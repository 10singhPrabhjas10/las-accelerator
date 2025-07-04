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
import {
  MODE_OF_TRANSPORT,
  TRAVEL_PROOF_TYPE,
  LODGING_PROOF_TYPE,
  OTHER_PROOF_TYPE,
} from 'utils/Constants';
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
import ArrowDown from '../../../../assets/icons/arrowDown.svg';
import SuccessModal from '@/modals/SuccessModal';
import {MOCK_CITY_DATA, MOCK_CITY_RATES} from './newExpenses.mock';
import {
  setExpenseFormWithFlag,
  setExpenseFrom,
  updateExpenseFormWithFlag,
} from '@/store/redux/expenseFormSlice';
import {useDispatch} from 'react-redux';

// Helper to format amount as ₹900/-
const formatAmount = (value: string | number | null) => {
  if (value === null || value === undefined || value === '') return '';
  const num = String(value).replace(/[^\d.]/g, '');
  if (!num) return '';
  return `₹${num}/-`;
};
// Helper to parse formatted amount back to number string
const parseAmount = (value: string) => {
  return value.replace(/[^\d.]/g, '');
};

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
  noOfNight: null,
  city: null,
  cityCategory: null,
  lodgingComments: null,
  travelProofType: null,
  lodgingProofType: null,
  travelProofComments: null,
  lodgingProofComments: null,
  otherAmount: null,
  otherTaxAmount: null,
  otherProofType: null,
  otherProofComments: null,
  otherComments: null,
});
const GREY_TEXT_THEME = {colors: {onSurface: COLORS.grey2}};

const NewExpense = () => {
  const [showUploadImageBottomSheet, setShowUploadImageBottomSheet] =
    useState<boolean>(false);

  const [currentProofType, setCurrentProofType] = useState<
    'travel' | 'lodging' | 'other' | null
  >(null);

  const [travelPhotos, setTravelPhotos] = useState<IPhotoProps[]>([]);
  const [lodgingPhotos, setLodgingPhotos] = useState<IPhotoProps[]>([]);
  const [otherPhotos, setOtherPhotos] = useState<IPhotoProps[][]>([[]]);

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
  const [expenseProofList, setExpenseProofList] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cityRate, setCityRate] = useState<IExpenseMgmtCityRate>();
  const [searchedCityList, setSearchedCityList] = useState<
    TAutocompleteDropdownItem[]
  >([]);
  const navigation = useNavigation();
  const formikRef = useRef<any>(null);
  const route = useRoute<RouteProp<RootNavigationTypes, 'NewExpense'>>();
  const {selectedExpenseToBeModified, selectedExpenseIndex} =
    route?.params || {};

  const [otherExpenses, setOtherExpenses] = useState<IExpenseFormState[]>([
    getInitialExpense(),
  ]);

  const [otherProofDropdowns, setOtherProofDropdowns] = useState<boolean[]>([
    false,
  ]);

  const [currentOtherIdx, setCurrentOtherIdx] = useState<number | null>(null);

  const [initialExpense, setInitialExpense] = useState<IExpenseFormState>(
    getInitialExpense(),
  );

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

  // useEffect(() => {
  //   if (selectedExpenseToBeModified && selectedExpenseToBeModified.form) {
  //     setInitialExpense(selectedExpenseToBeModified.form);
  //     // Set other states as needed (photos, etc.)
  //   } else {
  //     resetFormData();
  //   }
  // }, [selectedExpenseToBeModified]);

  useEffect(() => {
    if (selectedExpenseToBeModified && selectedExpenseToBeModified.form) {
      const form = selectedExpenseToBeModified.form;
      console.log('MyFORM', form);
      const mappedForm = {
        ...form,
        beatDistance: form.beatDistance ? String(form.beatDistance) : null,
      };
      setInitialExpense(mappedForm);
      // Set travel photos
      if (
        form.travel_expense_proof &&
        Array.isArray(form.travel_expense_proof)
      ) {
        setTravelPhotos(form.travel_expense_proof.map(uri => ({uri})));
      } else {
        setTravelPhotos([]);
      }

      // Set lodging photos
      if (
        form.lodging_expense_proof &&
        Array.isArray(form.lodging_expense_proof)
      ) {
        setLodgingPhotos(form.lodging_expense_proof.map(uri => ({uri})));
      } else {
        setLodgingPhotos([]);
      }

      // Set other photos (array of arrays)
      if (
        form.other_expense_proofs &&
        Array.isArray(form.other_expense_proofs)
      ) {
        setOtherPhotos(
          form.other_expense_proofs.map(photoArr =>
            Array.isArray(photoArr) ? photoArr.map(uri => ({uri})) : [],
          ),
        );
      } else {
        setOtherPhotos([[]]);
      }

      // Set other expenses
      if (form.otherExpenses && Array.isArray(form.otherExpenses)) {
        setOtherExpenses(form.otherExpenses);
        setOtherProofDropdowns(form.otherExpenses.map(() => false));
      } else {
        setOtherExpenses([getInitialExpense()]);
        setOtherProofDropdowns([false]);
      }

      // Set city dropdown if needed
      if (form.city && form.cityCategory) {
        setSearchedCityList([
          {
            id: form.cityCategory,
            title: form.city,
          },
        ]);
      }
      if (formikRef.current && formikRef.current.resetForm) {
        formikRef.current.resetForm({values: form});
      }
    } else {
      // eslint-disable-next-line prettier/prettier
    resetFormData();
    }
  }, [selectedExpenseToBeModified]);

  // useEffect(() => {
  //   console.log('selectedExpenseToBeModified', selectedExpenseToBeModified);
  //   if (selectedExpenseToBeModified.form) {
  //     const data: IExpenseData = selectedExpenseToBeModified.form;
  //     const updatedExpense: IExpenseFormState = {
  //       id: data.id ?? null,
  //       fromDate: data.fromDate ?? null,
  //       toDate: data.toDate ?? null,
  //       beatStartPoint: data.beatStartPoint ?? null,
  //       beatEndPoint: data.beatEndPoint ?? null,
  //       beatDistance: data.actualBeatDistance
  //         ? String(data.actualBeatDistance)
  //         : null,
  //       modeOfTransport: data.modeOfTransport ?? null,
  //       city: data.city ?? null,
  //       cityCategory: data.cityCategory ?? null,
  //       calculatedAmount: data.calculatedAmount ?? null,
  //       noOfNight: data.noOfNight ?? null,
  //       lodgingAmount: String(data.totalAmount) ?? null,
  //       lodgingTaxAmount: String(data.lodgingTaxAmount) ?? null,
  //       otherAmount: String(data.totalAmount) ?? null,
  //       otherTaxAmount: String(data.otherTaxAmount) ?? null,
  //       lodgingComments: data.lodgingComments ?? null,
  //       otherComments: data.otherComments ?? null,
  //       travelProofType: data.travelProofType ?? null,
  //       lodgingProofType: data.lodgingProofType ?? null,
  //       otherProofType: data.otherProofType ?? null,
  //       travelProofComments: data.travelProofComments ?? null,
  //       lodgingProofComments: data.lodgingProofComments ?? null,
  //       otherProofComments: data.otherProofComments ?? null,
  //     };
  //     setInitialExpense(updatedExpense);
  //     setSearchedCityList([
  //       {
  //         id: data.cityCategory ?? '',
  //         title: data.city ?? '',
  //       },
  //     ]);
  //     if (data.otherExpenses && Array.isArray(data.otherExpenses)) {
  //       setOtherPhotos(Array(data.otherExpenses.length).fill([]));
  //     } else {
  //       setOtherPhotos([[]]);
  //     }
  //   } else {
  //     resetFormData();
  //   }
  // }, [selectedExpenseToBeModified]);

  const handleAddMoreProof = (
    proofType: 'travel' | 'lodging' | 'other',
    idx?: number,
  ) => {
    setCurrentProofType(proofType);
    if (proofType === 'other' && typeof idx === 'number') {
      setCurrentOtherIdx(idx);
    } else {
      setCurrentOtherIdx(null);
    }
    setShowUploadImageBottomSheet(true);
  };

  // Comment out the API-based city search
  // const handleCitySearch = debounce((searchText: string) => {
  //   getCityList(searchText, setSearchedCityList);
  // }, 1000);

  // Add a mock city search function
  const handleCitySearch = (searchText: string) => {
    const filtered = MOCK_CITY_DATA.filter(city =>
      city.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchedCityList(filtered);
  };

  // Mock getCityRate for demo/testing
  const getCityRate = (selectedCity: string) => {
    if (!selectedCity) return;
    // Mock city rate data]

    type CityKey = keyof typeof MOCK_CITY_RATES;
    const cityKey = selectedCity as CityKey;
    setCityRate(MOCK_CITY_RATES[cityKey] || MOCK_CITY_RATES['Mumbai']);
    // For real API, uncomment below:
    // getCityRateData(selectedCity, setCityRate);
  };

  const combinedImageCountExceedsLimit = (
    currentPhotos: any[] = [],
    uploadedProofs: any[] = [],
    limit = 5,
  ) => {
    return (
      (currentPhotos?.length ?? 0) + (uploadedProofs?.length ?? 0) >= limit
    );
  };

  // const getTransportUploadTitle = (values: IExpenseFormState) => {
  //   if (values.modeOfTransport === ModeOfTransport.OWN_VEHICLE) {
  //     return 'Upload fuel bill';
  //   } else if (values.modeOfTransport === ModeOfTransport.OUTSTATION_TRAVEL) {
  //     return 'Upload train ticket';
  //   } else if (values.modeOfTransport === ModeOfTransport.LOCAL_TRAVEL) {
  //     return 'Upload bus ticket ';
  //   }
  // };

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

  const resetFormData = () => {
    const freshExpense = getInitialExpense();
    setInitialExpense(freshExpense);
    if (formikRef?.current?.resetForm) {
      formikRef.current.resetForm({values: freshExpense});
    } else {
      const setFieldValue = formikRef?.current?.setFieldValue;
      Object.entries(freshExpense).forEach(([key, val]) => {
        setFieldValue?.(key, val);
      });
    }
    setTravelPhotos([]);
    setLodgingPhotos([]);
    setOtherPhotos([[]]);
    setExpenseProofList([]);
    setOtherExpenses([getInitialExpense()]);
    setOtherProofDropdowns([false]);
    setSearchedCityList([]);
  };

  const handleAddOtherExpense = () => {
    setOtherExpenses(prev => [...prev, getInitialExpense()]);
    setOtherProofDropdowns(prev => [...prev, false]);
    setOtherPhotos(prev => [...prev, []]);
  };

  const updateOtherExpense = (index: number, field: string, value: any) => {
    setOtherExpenses(prev =>
      prev.map((item, idx) =>
        idx === index ? {...item, [field]: value} : item,
      ),
    );
  };

  const handleDeleteOtherExpense = (index: number) => {
    setOtherExpenses(prev => prev.filter((_, idx) => idx !== index));
    setOtherProofDropdowns(prev => prev.filter((_, idx) => idx !== index));
    setOtherPhotos(prev => prev.filter((_, idx) => idx !== index));
  };

  // Toggle dropdown for a specific section
  const toggleOtherProofDropdown = (idx: number) => {
    setOtherProofDropdowns(prev =>
      prev.map((open, i) => (i === idx ? !open : false)),
    );
  };
  const dispatch = useDispatch();
  const createReqBody = (isDraft: boolean) => {
    console.log('called');
    try {
      const values = formikRef?.current?.values;
      if (!values) {
        Alert.alert('Unexpected Error', 'Form data is missing');
        return;
      }

      const {
        otherAmount,
        otherTaxAmount,
        otherProofType,
        otherProofComments,
        otherComments,
        ...mainValues
      } = values;

      const travel_expense_proof = travelPhotos.map(photo => photo.uri);
      const lodging_expense_proof = lodgingPhotos.map(photo => photo.uri);
      const other_expense_proofs = otherPhotos.map(photoArr =>
        photoArr.map(photo => photo.uri),
      );

      const otherExpensesReq = otherExpenses.map(oe => ({
        otherAmount:
          Number(oe.otherAmount || 0) + Number(oe.otherTaxAmount || 0),
        otherTaxAmount: Number(oe.otherTaxAmount || 0),
        otherProofType: oe.otherProofType,
        otherProofComments: oe.otherProofComments,
        otherComments: oe.otherComments,
      }));

      const requestBody = {
        ...mainValues,
        travel_expense_proof,
        lodging_expense_proof,
        other_expense_proofs,
        calculatedAmount: Number(values?.calculatedAmount),
        lodgingAmount:
          Number(values?.lodgingAmount || 0) +
          Number(values?.lodgingTaxAmount || 0),
        beatDistance: Number(values?.beatDistance),
        fromDate: moment(values?.fromDate).format(DateFormats.YYYY_MM_DD),
        toDate: moment(values?.toDate).format(DateFormats.YYYY_MM_DD),
        otherExpenses: otherExpensesReq,
        status: isDraft ? 'Draft' : 'Submitted',
        draftSavedAt: isDraft ? new Date().toISOString() : undefined,
      };
      //save to redux
      if (selectedExpenseToBeModified) {
        console.log('Updating existing expense:', selectedExpenseToBeModified);
        dispatch(
          updateExpenseFormWithFlag({
            id: selectedExpenseIndex,
            form: requestBody,
            isDraft: true,
          }),
        );
      } else {
        console.log('Updating:', selectedExpenseToBeModified);
        dispatch(setExpenseFormWithFlag({form: requestBody, isDraft}));
      }
      if (isDraft) {
        Alert.alert('Draft Saved', 'Your draft has been saved.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('ExpenseManagement');
              resetFormData();
            },
          },
        ]);
      } else {
        setShowSuccessModal(true);
        setShowWarningModal(false);
      }
      //setShowSuccessModal(true);
      //setShowWarningModal(false);
      // addNewOrUpdateExpense(
      //   selectedExpenseToBeModified ? 'Update' : 'Create',
      //   requestBody,
      //   () => {
      //     setIsSubmitted(true);
      //     setShowSuccessModal(true);
      //   },
      //   () => {
      //     setIsSubmitted(false);
      //     setShowSuccessModal(true);
      //   },
      // );
    } catch (error) {
      console.error('Error in createReqBody:', error);
      if (isDraft) {
        Alert.alert('Error', 'Failed to save draft.');
      }
    }
  };

  // Save Draft handler
  const handleDraft = () => {
    try {
      const values = formikRef?.current?.values;
      if (!values) {
        Alert.alert('Unexpected Error', 'Form data is missing');
        return;
      }
      // You can add any draft-specific logic here, e.g., mark as draft, skip validations, etc.
      const draftRequest = {
        ...values,
        status: 'Draft',
        draftSavedAt: new Date().toISOString(),
      };
      // For now, just log the draft data
      console.log('Draft saved:', draftRequest);
      Alert.alert('Draft Saved', 'Your draft has been saved locally.');
      // Optionally, you can persist this to local storage or call an API
      resetFormData(); // Reset the form after saving draft
    } catch (error) {
      console.error('Error in handleDraft:', error);
      Alert.alert('Error', 'Failed to save draft.');
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
          value={values?.beatStartPoint ?? ''}
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
          value={values?.beatEndPoint ?? ''}
          onChangeText={val => setFieldValue('beatEndPoint', val)}
          placeHolder={'Enter End Point'}
          onBlur={() => handleBlur('beatEndPoint')}
          errorText={touched?.beatEndPoint ? errors?.beatEndPoint : ''}
        />

        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Actual Beat Distance'}
          value={values?.beatDistance ?? ''}
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
          list={TRAVEL_PROOF_TYPE}
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
        {/* Remove Other Proof Type input for now */}
        {/* {values.travelProofType === 'other' && (
          <PrimaryTextInput
            titleText={'Other Proof Type'}
            value={values.travelProofComments ?? ''}
            onChangeText={val => setFieldValue('travelProofComments', val)}
            placeHolder={'Enter Other Proof Type'}
            onBlur={() => handleBlur('travelProofComments')}
            errorText={
              touched?.travelProofComments ? errors?.travelProofComments : ''
            }
          />
        )} */}
        {values?.modeOfTransport !== '' && (
          <>
            <Spacer size={15} />
            {/* <Text variant="bodyMedium">{getTransportUploadTitle(values)}</Text> */}
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
          value={formatAmount(values?.calculatedAmount)}
          isRequired
          onChangeText={val =>
            setFieldValue('calculatedAmount', parseAmount(val))
          }
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
          value={values?.noOfNight ?? ''}
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
          initialValue={initialExpense.city ?? ''}
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
          icon={<TextInput.Icon icon={ArrowDown} />}
          clearOnFocus={false}
          isRequired
          closeOnBlur={true}
          closeOnSubmit={false}
        />

        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Amount (excl. tax)'}
          value={formatAmount(values?.lodgingAmount)}
          onChangeText={val => setFieldValue('lodgingAmount', parseAmount(val))}
          placeHolder={'Enter Amount (excl. tax)'}
          isRequired
          onBlur={() => handleBlur('lodgingAmount')}
          keyboardType="decimal-pad"
          errorText={touched?.lodgingAmount ? errors?.lodgingAmount : ''}
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Tax Amount'}
          value={formatAmount(values?.lodgingTaxAmount)}
          onChangeText={val =>
            setFieldValue('lodgingTaxAmount', parseAmount(val))
          }
          placeHolder={'Enter Tax Amount'}
          onBlur={() => handleBlur('lodgingTaxAmount')}
          isRequired
          keyboardType="decimal-pad"
          errorText={touched?.lodgingTaxAmount ? errors?.lodgingTaxAmount : ''}
        />
        <Spacer size={15} />
        <DropDown
          list={LODGING_PROOF_TYPE}
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
        {/* Remove Other Proof Type input for now */}
        {/* {values.lodgingProofType === 'other' && (
          <PrimaryTextInput
            titleText={'Other Proof Type'}
            value={values.lodgingProofComments ?? ''}
            onChangeText={val => setFieldValue('lodgingProofComments', val)}
            placeHolder={'Enter Other Proof Type'}
            onBlur={() => handleBlur('lodgingProofComments')}
            errorText={
              touched?.lodgingProofComments ? errors?.lodgingProofComments : ''
            }
          />
        )} */}
        <Spacer size={15} />
        <PrimaryTextInput
          multiline
          numberOfLines={4}
          titleText="Comments"
          value={values?.lodgingComments ?? ''}
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
            textStyle={{color: COLORS.black}}
            onPress={() => handleAddMoreProof('lodging')}
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
    otherExpense: IExpenseFormState,
    idx: number,
    updateOtherExpense: (index: number, field: string, value: any) => void,
    deleteOtherExpense: (index: number) => void,
    touched: any,
    errors: any,
    handleBlur: (field: string) => void,
  ) => {
    return (
      <>
        <Spacer size={15} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text variant="bodyMedium" theme={GREY_TEXT_THEME}>
            Other Expense {otherExpenses.length > 1 ? `#${idx + 1}` : ''}
          </Text>
          {otherExpenses.length > 1 && (
            <TouchableOpacity onPress={() => deleteOtherExpense(idx)}>
              <DeleteIcon fill={COLORS.red2} height={22} width={22} />
            </TouchableOpacity>
          )}
        </View>
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Amount (excl. tax)'}
          value={formatAmount(
            otherExpense?.otherAmount !== undefined &&
              otherExpense?.otherAmount !== null
              ? otherExpense.otherAmount
              : '',
          )}
          onChangeText={val =>
            updateOtherExpense(idx, 'otherAmount', parseAmount(val))
          }
          placeHolder={'Enter Amount (excl. tax)'}
          isRequired
          keyboardType="decimal-pad"
        />
        <Spacer size={15} />
        <PrimaryTextInput
          titleText={'Tax Amount'}
          value={formatAmount(
            otherExpense?.otherTaxAmount !== undefined &&
              otherExpense?.otherTaxAmount !== null
              ? otherExpense.otherTaxAmount
              : '',
          )}
          isRequired
          onChangeText={val =>
            updateOtherExpense(idx, 'otherTaxAmount', parseAmount(val))
          }
          placeHolder={'Enter Tax Amount'}
          keyboardType="decimal-pad"
        />
        <Spacer size={15} />
        <DropDown
          list={OTHER_PROOF_TYPE}
          label={'Proof Type'}
          placeholder={'Select Proof Type'}
          value={otherExpense.otherProofType}
          visible={otherProofDropdowns[idx]}
          onChangeDropdownState={() => toggleOtherProofDropdown(idx)}
          setValue={data => {
            updateOtherExpense(idx, 'otherProofType', data);
            if (data !== 'Other')
              updateOtherExpense(idx, 'otherProofComments', undefined);
            setTimeout(() => {
              setOtherProofDropdowns(prev =>
                prev.map((open, i) => (i === idx ? false : open)),
              );
            }, 0);
          }}
        />
        <Spacer size={15} />
        {/* Remove Other Proof Type input for now */}
        {/* {otherExpense.otherProofType === 'other' && (
          <PrimaryTextInput
            titleText={'Other Proof Type'}
            value={otherExpense.otherProofComments ?? undefined}
            onChangeText={val =>
              updateOtherExpense(idx, 'otherProofComments', val)
            }
            placeHolder={'Enter Other Proof Type'}
          />
        )} */}
        <Spacer size={15} />
        <PrimaryTextInput
          multiline
          numberOfLines={4}
          titleText="Comment"
          value={otherExpense?.otherComments ?? undefined}
          onChangeText={val => updateOtherExpense(idx, 'otherComments', val)}
          placeHolder="Type Comments"
          textInputStyle={styles.textInput}
        />
        <Spacer size={15} />

        <ImageUpload
          title="Upload Other Proof"
          imageData={otherPhotos[idx] || []}
          rightIcon
          openBottomSheet={() => handleAddMoreProof('other', idx)}
          onRightIconPress={indexToRemove =>
            setOtherPhotos(prev =>
              prev.map((arr, i) =>
                i === idx
                  ? [
                      ...arr.slice(0, indexToRemove),
                      ...arr.slice(indexToRemove + 1),
                    ]
                  : arr,
              ),
            )
          }
        />
        {otherPhotos[idx] && otherPhotos[idx].length > 0 && (
          <CustomButton
            type={ButtonTypes.outline}
            textStyle={{color: COLORS.black}}
            onPress={() => handleAddMoreProof('other', idx)}
            text="Add More Proof"
            isDisabled={combinedImageCountExceedsLimit(
              otherPhotos[idx],
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
          validationSchema={travelExpenseValidation.concat(
            lodgingExpenseValidation,
          )}
          initialValues={initialExpense}
          enableReinitialize
          onSubmit={values => {
            const exceedsTravel = checkIfAmountExceedLimit(values, 'travel');
            const exceedsLodging = checkIfAmountExceedLimit(values, 'lodging');
            const exceedsOther = checkIfAmountExceedLimit(values, 'other');
            if (exceedsTravel || exceedsLodging || exceedsOther) {
              setShowWarningModal(true);
            } else {
              createReqBody(false);
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
              <>
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
                {otherExpenses.map((otherExpense, idx) => (
                  <View key={idx} style={{marginBottom: 20}}>
                    {renderOtherAllowance(
                      otherExpense,
                      idx,
                      updateOtherExpense,
                      handleDeleteOtherExpense,
                      touched,
                      errors,
                      handleBlur,
                    )}
                  </View>
                ))}
                <CustomButton
                  type={ButtonTypes.outline}
                  onPress={handleAddOtherExpense}
                  text="Add Other Expense"
                  style={[
                    {borderColor: COLORS.dgreen, backgroundColor: COLORS.white},
                    CommonStyles.flexOne,
                  ]}
                  textStyle={{color: COLORS.dgreen}}
                />

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

                <CustomButton
                  type={ButtonTypes.contained}
                  text="Submit"
                  onPress={handleSubmit}
                  style={CommonStyles.flexOne}
                />
                <Spacer size={15} />

                <CustomButton
                  type={ButtonTypes.text}
                  text="Save Draft"
                  onPress={() => createReqBody(true)}
                  style={CommonStyles.flexOne}
                  textStyle={{color: COLORS.dgreen}}
                />
                <Spacer size={25} />
              </>
            );
          }}
        </Formik>
        <SuccessModal
          visible={showSuccessModal}
          onDismiss={() => setShowSuccessModal(false)}
          title="Submitted"
          message="You have successfully submitted your expenses."
          buttonText="Dismiss"
          onButtonPress={() => {
            navigation.navigate('ExpenseManagement');
            setShowSuccessModal(false);
          }}
        />

        {/* <SuccessFailureModal
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
        /> */}

        <SuccessFailureModal
          btnType="both"
          showModal={showWarningModal}
          isSuccess={false}
          icon={<WarningIcon />}
          title={'Confirmation'}
          label={'Calculated amount exceeds limit. Continue to submit?'}
          secondaryBtnTitle={'Continue'}
          onSecondaryBtnHandler={() => {
            createReqBody(false);
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
          } else if (
            currentProofType === 'other' &&
            newPhoto &&
            currentOtherIdx !== null
          ) {
            setOtherPhotos(prev =>
              prev.map((arr, i) =>
                i === currentOtherIdx ? [...arr, newPhoto as IPhotoProps] : arr,
              ),
            );
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
