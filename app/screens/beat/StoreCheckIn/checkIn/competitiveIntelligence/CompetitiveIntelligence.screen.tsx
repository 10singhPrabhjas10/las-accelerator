import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {Formik} from 'formik';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';

import LandscapeIcon from '../../../../../../assets/icons/landscape.svg';
import ImageUpload, {
  IPhotoProps,
} from '../../components/imageUpload/ImageUpload';
import UploadImageBottomSheet from 'bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';
import {CompetitiveSchema} from 'validations/activity';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {
  getBTLTypeDropdownData,
  getCompetitorNameData,
  getProductDivisionDropdownData,
  getSeriesDropdownData,
  getSkuNameDropdownData,
  submitCompetitiveData,
} from './CompetitiveIntelligence.business';
import {
  IInitialValues,
  IRequestBody,
} from './CompetitiveIntelligence.interface';
import {
  ISfdcRecords,
  ISfdcRequestBody,
  uploadDataToSFDC,
} from 'services/sfdcApi';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {Relation} from '../../StoreCheckIn.interface';
import {getCategoryData} from 'screens/performanceManagement/PerformanceMgmt.business';
import DropDown from 'components/beatDropdown/Dropdown';

const imageType = [
  {value: 'Price List', label: 'Price List'},
  {value: 'Catalogue', label: 'Catalogue'},
  {value: 'Poster', label: 'Poster'},
  {value: 'Scheme Collateral', label: 'Scheme Collateral'},
  {value: 'BTL Display', label: 'BTL Display'},
];

const CompetitiveIntelligenceScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );
  const route =
    useRoute<RouteProp<RootNavigationTypes, 'CompetitiveIntelligence'>>();
  const {relation} = route.params;
  const isPrimaryCP = relation === Relation.PRIMARY_CHANNEL_PARTNER;

  const initialValues = {
    competitorName: '',
    productDivision: '',
    series: '',
    skuName: '',
    mop: '',
    distributorSellingPrice: '',
    retailerSellingPrice: '',
    btlType: '',
    imageType: '',
    remarks: '',
  };

  const [productDivision, setProductDivision] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [seriesData, setSeriesData] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [skuNameData, setSkuNameData] = useState([]);
  const [skuId, setSkuId] = useState('');
  const [compName, setCompName] = useState([]);
  const [bTLTypeData, setBTLTypeData] = useState([]);
  const [entityId, setEntityId] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [skuPageNumber, setSkuPageNumber] = useState(1);
  const [skuTotalPages, setSkuTotalPages] = useState(1);

  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [photo, setPhoto] = useState<IPhotoProps[] | null>([]);
  const [showDropdown, setShowDropdown] = useState({
    competitorDropdown: false,
    productDivision: false,
    series: false,
    skuName: false,
    btlType: false,
    imageType: false,
  });

  const uploadImage = () => {
    if (photo && photo?.length > 0) {
      let items: ISfdcRecords[] = [];
      const recordItem = photo?.map((item, index) => ({
        attributes: {
          type: 'ContentVersion',
          referenceId: entityId + index,
        },
        FirstPublishLocationId: entityId,
        Title: item.name ?? 'Product Image',
        VersionData: item.uri,
        PathOnClient: item.name ?? 'Product Image' + item.mime,
      }));
      items?.push(...recordItem);
      const requestBody: ISfdcRequestBody = {
        records: items,
      };
      uploadDataToSFDC(requestBody, () => {
        setPhoto(null);
      });
    }
  };

  const handleOnSubmit = (values: IInitialValues) => {
    const requestBody: IRequestBody = {
      mop: parseInt(values?.mop),
      distributorSellingPrice: parseInt(values?.distributorSellingPrice),
      retailerSellingPrice: parseInt(values?.retailerSellingPrice),
      btlType: values?.btlType,
      remarks: values?.remarks,
    };
    uploadImage();
    submitCompetitiveData(values?.competitorName, requestBody, () =>
      setShowSuccessModal(true),
    );
  };

  useEffect(() => {
    if (isPrimaryCP) {
      getProductDivisionDropdownData(relationId, setProductDivision);
    } else {
      getCategoryData(setProductDivision);
    }
    getBTLTypeDropdownData(setBTLTypeData);
  }, [relation]);

  useEffect(() => {
    if (categoryId !== '') {
      getSeriesDropdownData(
        categoryId,
        setSeriesData,
        pageNumber,
        25,
        setTotalPages,
        setPageNumber,
      );
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId !== '' && seriesId !== '') {
      getSkuNameDropdownData(
        categoryId,
        seriesId,
        setSkuNameData,
        skuPageNumber,
        25,
        setSkuTotalPages,
        setSkuPageNumber,
      );
    }
  }, [categoryId, seriesId]);

  useEffect(() => {
    if (categoryId !== '' && seriesId !== '' && skuId !== '') {
      getCompetitorNameData(categoryId, skuId, seriesId, setCompName);
    }
  }, [categoryId, seriesId, skuId]);

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle="Competitive Intelligence">
      <Formik
        initialValues={initialValues}
        validationSchema={CompetitiveSchema}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
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
        }) => {
          return (
            <View>
              <DropDown
                list={productDivision}
                label={'Product Division'}
                placeholder={'Select Category'}
                isRequired
                value={values.productDivision}
                visible={showDropdown.productDivision}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    productDivision: !showDropdown.productDivision,
                  });
                  values.series = '';
                  values.skuName = '';
                  values.competitorName = '';
                  setSeriesId('');
                  setSkuId('');
                  setEntityId('');
                }}
                setValue={data => {
                  setCategoryId(data);
                  setFieldValue('productDivision', data);
                  setSeriesData([]);
                  setPageNumber(1);
                  setTotalPages(1);
                }}
                error={touched.productDivision ? errors.productDivision : ''}
              />
              <Spacer size={20} />
              <DropDown
                list={seriesData}
                label={'Product Series'}
                placeholder={'Select Series'}
                isRequired
                value={values.series}
                visible={showDropdown.series}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    series: !showDropdown.series,
                  });
                  values.skuName = '';
                  setSkuId('');
                }}
                setValue={data => {
                  setSeriesId(data);
                  setFieldValue('series', data);
                  setSkuNameData([]);
                  setSkuPageNumber(1);
                  setSkuTotalPages(1);
                }}
                error={touched.series ? errors.series : ''}
                onScrollEnd={() => {
                  if (seriesData?.length > 0) {
                    if (pageNumber < totalPages) {
                      getSeriesDropdownData(
                        categoryId,
                        setSeriesData,
                        pageNumber + 1,
                        25,
                        setTotalPages,
                        setPageNumber,
                      );
                    }
                  }
                }}
              />
              <Spacer size={20} />
              <DropDown
                list={skuNameData}
                label={'SKU Name'}
                placeholder={'Select Name'}
                isRequired
                value={values.skuName}
                visible={showDropdown.skuName}
                onChangeDropdownState={() => {
                  setShowDropdown({
                    ...showDropdown,
                    skuName: !showDropdown.skuName,
                  });
                  values.competitorName = '';
                  setEntityId('');
                }}
                setValue={data => {
                  setSkuId(data);
                  setFieldValue('skuName', data);
                }}
                error={touched.skuName ? errors.skuName : ''}
                onScrollEnd={() => {
                  if (skuNameData?.length > 0) {
                    if (skuPageNumber < skuTotalPages) {
                      getSkuNameDropdownData(
                        categoryId,
                        seriesId,
                        setSkuNameData,
                        skuPageNumber + 1,
                        25,
                        setSkuTotalPages,
                        setSkuPageNumber,
                      );
                    }
                  }
                }}
              />
              <Spacer size={20} />
              <DropDown
                list={compName}
                label={'Competitor Name'}
                placeholder={'Select Name'}
                isRequired
                value={values.competitorName}
                visible={showDropdown.competitorDropdown}
                onChangeDropdownState={() =>
                  setShowDropdown({
                    ...showDropdown,
                    competitorDropdown: !showDropdown.competitorDropdown,
                  })
                }
                setValue={data => {
                  setFieldValue('competitorName', data);
                  setEntityId(data);
                }}
                error={touched.competitorName ? errors.competitorName : ''}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                titleText="MOP"
                value={values.mop}
                onChangeText={val => setFieldValue('mop', val)}
                placeHolder="Enter MOP"
                onBlur={handleBlur('mop')}
                errorText={touched.mop ? errors.mop : ''}
                keyboardType="number-pad"
                isRequired
              />
              <Spacer size={20} />
              <PrimaryTextInput
                titleText="Distributor Selling Price"
                value={values.distributorSellingPrice}
                onChangeText={val =>
                  setFieldValue('distributorSellingPrice', val)
                }
                placeHolder="Enter Price"
                onBlur={handleBlur('distributorSellingPrice')}
                keyboardType="number-pad"
                isRequired
                errorText={
                  touched.distributorSellingPrice
                    ? errors.distributorSellingPrice
                    : ''
                }
              />
              <Spacer size={20} />
              <PrimaryTextInput
                titleText="Retailer Selling Price"
                value={values.retailerSellingPrice}
                onChangeText={val => setFieldValue('retailerSellingPrice', val)}
                placeHolder="Enter Price"
                onBlur={handleBlur('retailerSellingPrice')}
                keyboardType="number-pad"
                isRequired
                errorText={
                  touched.retailerSellingPrice
                    ? errors.retailerSellingPrice
                    : ''
                }
              />
              <Spacer size={20} />
              <DropDown
                list={bTLTypeData}
                label={'BTL Type'}
                placeholder={'Select BTL Type'}
                value={values.btlType}
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
                isRequired
                error={touched.btlType ? errors.btlType : ''}
              />
              <Spacer size={20} />
              <DropDown
                list={imageType}
                label={'Select Image Type'}
                placeholder={'Select Image Type'}
                // isDisabled={false}
                value={values.imageType}
                visible={showDropdown.imageType}
                onChangeDropdownState={() =>
                  setShowDropdown({
                    ...showDropdown,
                    imageType: !showDropdown.imageType,
                  })
                }
                setValue={data => {
                  setFieldValue('imageType', data);
                }}
                error={touched.imageType ? errors.imageType : ''}
              />
              <Spacer size={16} />
              <ImageUpload
                imageData={photo}
                openBottomSheet={() => setShowBottomSheet(true)}
              />
              <CustomButton
                text="Add More Images"
                type={ButtonTypes.outline}
                icon={<LandscapeIcon />}
                onPress={() => setShowBottomSheet(true)}
              />
              <Spacer size={20} />
              <PrimaryTextInput
                multiline
                numberOfLines={4}
                titleText="Remarks"
                isRequired
                value={values.remarks}
                onChangeText={val => {
                  setFieldValue('remarks', val);
                }}
                placeHolder="Type Remark"
                onBlur={handleBlur('remark')}
                errorText={touched.remarks ? errors.remarks : ''}
                textInputStyle={styles.textInput}
              />
              <Spacer size={30} />
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
      <UploadImageBottomSheet
        setPhoto={newPhoto =>
          setPhoto((prevPhoto: any) => [...prevPhoto, newPhoto])
        }
        visible={showBottomSheet}
        onDismiss={() => setShowBottomSheet(false)}
      />
      <SuccessFailureModal
        btnType="confirm"
        showModal={showSuccessModal}
        isSuccess
        title="Information Saved"
        label="New competitor information is captured for a category"
        secondaryBtnTitle="Dismiss"
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

export default CompetitiveIntelligenceScreen;
