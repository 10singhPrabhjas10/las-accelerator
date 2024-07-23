import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {Formik} from 'formik';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {BtlPlanSchema} from 'validations/activity';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {
  getBTLTypeDropdownData,
  getCategoryDropdownData,
  getSubCategoryDropdownData,
  getSeriesDropdownData,
  getSKuDropdownData,
  submitBTLPlan,
} from '../BTL.business';
import {IBTLData, IBtlPlanInitialValues} from '../BTL.interface';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {NavigationFrom} from 'utils/Constants';
import {getSecondaryCategoryDropdownData} from 'screens/orderTaking/orderCreation/primaryOrderCreation/PrimaryOrderCreation.business';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import DropDown from 'components/beatDropdown/Dropdown';

const BtlPlanningScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'BtlPlanning'>>();
  const {navigationFrom, relation} = route.params;

  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const secondaryCustomerId = useSelector(
    (state: RootState) => state?.channelPartner?.retailerCustomerCode,
  );

  const initialValues = {
    mappedCategory: '',
    subCategory: '',
    series: '',
    sku: '',
    btlType: '',
    comments: '',
  };

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryData, setSelectedCategoryData] = useState('');
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [bTLTypeData, setBTLTypeData] = useState<IBTLData>();
  const [seriesData, setSeriesData] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState('');
  const [skuData, setSkuData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState({
    mappedCategory: false,
    subCategory: false,
    series: false,
    sku: false,
    btlType: false,
    comments: false,
  });
  const [subCategoryPageNo, setSubCategoryPageNo] = useState(1);
  const [seriesPageNo, setSeriesPageNo] = useState(1);
  const [skuPageNo, setSkuPageNo] = useState(1);
  const [subCategoryPages, setSubCategoryPages] = useState(1);
  const [seriesPages, setSeriesPages] = useState(1);
  const [skuPages, setSkuPages] = useState(1);

  const code =
    navigationFrom === NavigationFrom.PRIMARY_CP
      ? customerCode
      : navigationFrom === NavigationFrom.SECONDARY_CP
      ? secondaryCustomerId
      : relationId;

  useEffect(() => {
    if (relation === Relation.PRIMARY_CHANNEL_PARTNER) {
      getCategoryDropdownData(code, setCategoryData);
    } else {
      getSecondaryCategoryDropdownData(code, setCategoryData);
    }
    getBTLTypeDropdownData(setBTLTypeData);
  }, [relation]);

  useEffect(() => {
    if (selectedCategoryData !== '') {
      getSubCategoryDropdownData(
        selectedCategoryData,
        setSubCategoryData,
        subCategoryPageNo,
        25,
        setSubCategoryPages,
        setSubCategoryPageNo,
      );
    }
  }, [selectedCategoryData]);

  useEffect(() => {
    if (selectedCategoryData !== '' && selectedSubCategoryId !== '') {
      getSeriesDropdownData(
        selectedCategoryData,
        selectedSubCategoryId,
        setSeriesData,
        seriesPageNo,
        25,
        setSeriesPages,
        setSeriesPageNo,
      );
    }
  }, [selectedCategoryData, selectedSubCategoryId]);

  useEffect(() => {
    if (
      selectedCategoryData !== '' &&
      selectedSubCategoryId !== '' &&
      selectedSeries !== ''
    ) {
      getSKuDropdownData(
        selectedCategoryData,
        selectedSubCategoryId,
        selectedSeries,
        setSkuData,
        skuPageNo,
        25,
        setSkuPages,
        setSkuPageNo,
      );
    }
  }, [selectedCategoryData, selectedSubCategoryId, selectedSeries]);

  const handleSubmit = (values: IBtlPlanInitialValues) => {
    const requestBody = {
      channelPartnerId: code,
      categoryId: values.mappedCategory,
      subCategoryId: values.subCategory,
      series: values.series,
      skuProductId: values.sku,
      btlType: values.btlType,
      comment: values.comments,
      requestDate: convertDateToDisplay(new Date(), DateFormats.YYYY_MM_DD),
      status: 'BTL Requested',
    };
    submitBTLPlan(requestBody, () => setShowSuccessModal(true));
  };

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle={getTranslationLabel('btl_planning')}>
      <Formik
        initialValues={initialValues}
        validationSchema={BtlPlanSchema}
        validateOnBlur={false}
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
                list={categoryData}
                label={getTranslationLabel('mapped_category')}
                placeholder={getTranslationLabel('select_category')}
                // isDisabled={false}
                value={values.mappedCategory}
                visible={showDropdown.mappedCategory}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    mappedCategory: !showDropdown.mappedCategory,
                  });
                  values.subCategory = '';
                  setSelectedSubCategoryId('');
                  values.series = '';
                  setSelectedSeries('');
                  values.sku = '';
                }}
                setValue={data => {
                  setSelectedCategoryData(data);
                  setFieldValue('mappedCategory', data);
                  setSubCategoryData([]);
                  setSubCategoryPageNo(1);
                  setSubCategoryPages(1);
                }}
                error={touched.mappedCategory ? errors.mappedCategory : ''}
              />
              <Spacer size={20} />
              <DropDown
                list={subCategoryData}
                label={getTranslationLabel('sub_category')}
                placeholder={getTranslationLabel('select_sub_category')}
                // isDisabled={false}
                value={values.subCategory}
                visible={showDropdown.subCategory}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    subCategory: !showDropdown.subCategory,
                  });
                  values.series = '';
                }}
                setValue={data => {
                  setSelectedSubCategoryId(data);
                  setFieldValue('subCategory', data);
                  setSeriesData([]);
                  setSeriesPages(1);
                  setSeriesPageNo(1);
                }}
                error={touched.subCategory ? errors.subCategory : ''}
                onScrollEnd={() => {
                  if (subCategoryData?.length > 0) {
                    if (subCategoryPageNo < subCategoryPages) {
                      getSubCategoryDropdownData(
                        selectedCategoryData,
                        setSubCategoryData,
                        subCategoryPageNo + 1,
                        25,
                        setSubCategoryPages,
                        setSubCategoryPageNo,
                      );
                    }
                  }
                }}
              />
              <Spacer size={20} />
              <DropDown
                list={seriesData}
                label={getTranslationLabel('series')}
                placeholder={getTranslationLabel('select_series')}
                // isDisabled={false}
                value={values.series}
                visible={showDropdown.series}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    series: !showDropdown.series,
                  });
                  values.sku = '';
                }}
                setValue={data => {
                  setSelectedSeries(data);
                  setFieldValue('series', data);
                  setSkuData([]);
                  setSkuPages(1);
                  setSkuPageNo(1);
                }}
                error={touched.series ? errors.series : ''}
                onScrollEnd={() => {
                  if (seriesData?.length > 0) {
                    if (seriesPageNo < seriesPages) {
                      getSeriesDropdownData(
                        selectedCategoryData,
                        selectedSubCategoryId,
                        setSeriesData,
                        seriesPageNo + 1,
                        25,
                        setSeriesPages,
                        setSeriesPageNo,
                      );
                    }
                  }
                }}
              />
              <Spacer size={20} />
              <DropDown
                list={skuData}
                label={getTranslationLabel('sku')}
                placeholder={getTranslationLabel('select_sku')}
                // isDisabled={false}
                value={values.sku}
                visible={showDropdown.sku}
                onChangeDropdownState={() =>
                  setShowDropdown({
                    ...showDropdown,
                    sku: !showDropdown.sku,
                  })
                }
                setValue={data => {
                  setFieldValue('sku', data);
                }}
                error={touched.sku ? errors.sku : ''}
                onScrollEnd={() => {
                  if (skuData?.length > 0) {
                    if (skuPageNo < skuPages) {
                      getSKuDropdownData(
                        selectedCategoryData,
                        selectedSubCategoryId,
                        selectedSeries,
                        setSkuData,
                        skuPageNo + 1,
                        25,
                        setSkuPages,
                        setSkuPageNo,
                      );
                    }
                  }
                }}
              />
              <Spacer size={20} />
              <DropDown
                list={bTLTypeData?.btlType ?? []}
                label={getTranslationLabel('btl_type')}
                placeholder={getTranslationLabel('select_type')}
                // isDisabled={false}
                value={values.btlType}
                isRequired
                visible={showDropdown.btlType}
                onChangeDropdownState={() =>
                  setShowDropdown({
                    ...showDropdown,
                    btlType: !showDropdown.btlType,
                  })
                }
                setValue={data => {
                  setFieldValue('btlType', data);
                }}
                error={touched.btlType ? errors.btlType : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                multiline
                numberOfLines={4}
                titleText={getTranslationLabel('comments')}
                isRequired
                value={values.comments}
                onChangeText={val => {
                  setFieldValue('comments', val);
                }}
                placeHolder={getTranslationLabel('type_comments')}
                onBlur={handleBlur('comments')}
                errorText={touched.comments ? errors.comments : ''}
                textInputStyle={styles.textInput}
                maxLength={250}
              />
              <Spacer size={24} />
              <View style={CommonStyles.flexOne} />
              <CustomButton
                text={getTranslationLabel('submit')}
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
        btnType="confirm"
        showModal={showSuccessModal}
        isSuccess
        title={getTranslationLabel('request_submitted')}
        label={getTranslationLabel('btl_planning_success_msg')}
        secondaryBtnTitle={getTranslationLabel('dismiss')}
        onSecondaryBtnHandler={() => {
          navigation.goBack();
        }}
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
});

export default BtlPlanningScreen;
