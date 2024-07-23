import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'components/Layout';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import DateCard from 'screens/beat/components/dateCard/DateCard';
import styles from './AddActivity.style';
import Spacer from 'components/spacer';

import {Formik} from 'formik';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import CommonStyles from 'utils/commonStyle';
import {ActivitySchema, validateForm} from 'validations/activity';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {getAreaDropdownData, submitBeatPlanItem} from '../Beat.business';
import {
  IActivityData,
  IAreaData,
  IAreaMapping,
  IAreaPincodeDropdownData,
} from 'screens/beat/Beat.interface';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import DropDown from 'components/beatDropdown/Dropdown';

const activityData = [
  {value: 'Influencer meet', label: 'Influencer meet'},
  // {value: "Project site visit", label: "Project site visit"},
  {value: 'Training', label: 'Training'},
  {value: 'Branch visit', label: 'Branch visit'},
];

const influencerTypeData = [
  {value: 'Electrician/Plumber', label: 'Electrician/Plumber'},
  {value: 'Retailer', label: 'Retailer'},
  {value: 'Counter salesman', label: 'Counter salesman'},
  {value: 'Service technician', label: 'Service technician'},
];

const AddActivityScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'AddActivity'>>();
  const {date, beatPlanId} = route.params;
  const salesOffice = useSelector((state: RootState) => state.user.user);
  const formatedDate = moment(date, DateFormats.Do_MMMM_YYYY);

  const initialValues = {
    districtPinCode: '',
    activity: '',
    influencer: '',
    area: '',
    salesOffice: '',
  };
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showInfluencerDropdown, setShowInfluencerDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [districtData, setDistrictData] = useState([]);
  const [dropdownData, setDropdownData] = useState<IAreaPincodeDropdownData[]>(
    [],
  );

  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const [searchText, setSearchText] = useState('');

  const getAreaData = useCallback(
    (searchPageNumber: number, searchValue?: string) => {
      getAreaDropdownData(
        salesOffice.salesOffice,
        setDistrictData,
        setDropdownData,
        setTotalPages,
        searchPageNumber,
        25,
        searchValue,
      );
    },
    [pageNumber],
  );
  useEffect(() => {
    if (pageNumber <= totalPages) {
      getAreaData(pageNumber, searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const populateArea = (selectedPincodes: string[]): IAreaMapping[] => {
    const areas: IAreaData[] = [];

    selectedPincodes.forEach(selectedPincode => {
      dropdownData.forEach(item => {
        if (item.attributes.pincode === selectedPincode) {
          areas.push({
            value: item.attributes.area,
            label: item.attributes.area,
          });
        }
      });
    });
    return areas;
  };

  const formatCityName = (data: string) => {
    if (!data || typeof data !== 'string') {
      return '';
    }
    const parts = data.split('-');
    if (parts.length > 0) {
      return parts[0];
    } else {
      return '';
    }
  };

  const handleOnSubmit = (values: IActivityData) => {
    const requestBody = {
      beatplanId: beatPlanId,
      relation: 'Activity',
      items: [
        {
          date: formatedDate.format(DateFormats.YYYY_MM_DD),
          relation: 'Activity',
          activity: values.activity,
          influencerType:
            values.influencer?.length <= 0 ? null : values.influencer,
          salesOffice: salesOffice?.salesOffice,
          beatItemPincodes: values.districtPinCode
            ?.split(',')
            ?.map(item => item?.split('-')?.[1]),
          beatItemAreas: values.area,
        },
      ],
    };

    submitBeatPlanItem(requestBody, () => setShowSuccessModal(true));
  };

  return (
    <Layout style={CommonStyles.padding} headerTitle="Add Activity">
      <DateCard date={date} />
      <Formik
        validateOnBlur
        validateOnMount
        validateOnChange={true}
        validate={validateForm}
        enableReinitialize
        validationSchema={ActivitySchema}
        onSubmit={values => {
          handleOnSubmit(values);
        }}
        initialValues={initialValues}>
        {({handleSubmit, values, errors, isValid, touched, setFieldValue}) => {
          return (
            <View style={CommonStyles.flexOne}>
              <Spacer size={24} />
              <DropDown
                value={values.districtPinCode}
                multiSelect={true}
                list={districtData}
                label="District & Pin-Code"
                placeholder="Enter District"
                isRequired
                updateDisplayValue={value => {
                  //logics
                  return formatCityName(value);
                }}
                visible={showDistrictDropdown}
                onChangeDropdownState={() => {
                  setShowDistrictDropdown(!showDistrictDropdown);
                }}
                setValue={data => {
                  setFieldValue('districtPinCode', data);
                }}
                labelRequired
                error={touched.districtPinCode ? errors?.districtPinCode : ''}
                onScrollEnd={searchText => {
                  if (districtData?.length > 0) {
                    setPageNumber(prev => prev + 1);
                    setSearchText(searchText);
                  }
                }}
                isSearchRequired={false}
              />

              <Spacer size={24} />
              <DropDown
                value={values.area}
                list={
                  populateArea(
                    values.districtPinCode
                      ?.split(',')
                      ?.map(item => item?.split('-')?.[1]),
                  ) ?? []
                }
                label="Area"
                placeholder="Enter Area"
                isRequired
                visible={showAreaDropdown}
                onChangeDropdownState={() => {
                  setShowAreaDropdown(!showAreaDropdown);
                }}
                setValue={data => {
                  setFieldValue('area', data);
                }}
                error={touched.area ? errors?.area : ''}
                isSearchRequired={false}
              />
              <Spacer size={24} />
              <DropDown
                value={values.activity}
                error={touched.activity ? errors?.activity : ''}
                list={activityData}
                label="Activity"
                placeholder="Select Activity"
                isRequired
                visible={showActivityDropdown}
                onChangeDropdownState={() => {
                  setShowActivityDropdown(!showActivityDropdown);
                }}
                setValue={data => {
                  setFieldValue('activity', data);
                }}
              />
              {values?.activity === 'Influencer meet' && (
                <>
                  <Spacer size={24} />
                  <DropDown
                    value={values.influencer}
                    error={touched.influencer ? errors?.influencer : ''}
                    list={influencerTypeData}
                    label="Influencer Type"
                    placeholder="Select Influencer Type"
                    isRequired
                    visible={showInfluencerDropdown}
                    onChangeDropdownState={() => {
                      setShowInfluencerDropdown(!showInfluencerDropdown);
                    }}
                    setValue={data => {
                      setFieldValue('influencer', data);
                    }}
                  />
                </>
              )}
              {(values.activity === 'Training' ||
                values.activity === 'Branch visit') && (
                <>
                  <Spacer size={24} />
                  <PrimaryTextInput
                    titleText="Sales Office"
                    placeHolder=""
                    onChangeText={() => {}}
                    value={salesOffice?.salesOffice}
                    disabled
                  />
                </>
              )}

              <View style={CommonStyles.flexOne} />
              <CustomButton
                type={ButtonTypes.contained}
                onPress={() => {
                  handleSubmit();
                }}
                isDisabled={!isValid}
                text="Save"
                style={styles.button}
              />
            </View>
          );
        }}
      </Formik>
      <SuccessFailureModal
        btnType="confirm"
        secondaryBtnTitle={'Dismiss'}
        title={'Successful'}
        label={'You have successfully added Activity'}
        onSecondaryBtnHandler={() => {
          setShowSuccessModal(false);
          navigation?.goBack();
        }}
        setShowModal={() => setShowSuccessModal(false)}
        showModal={showSuccessModal}
        isSuccess
      />
    </Layout>
  );
};

export default AddActivityScreen;
