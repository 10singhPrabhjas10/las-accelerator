import {View, StyleSheet} from 'react-native';
import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {Formik, FormikProps} from 'formik';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {Divider, Icon} from 'react-native-paper';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import CommonStyles from 'utils/commonStyle';
import {PrimaryOrderSchema} from 'validations/activity';
import {
  getSeriesDropdownData,
  getSubCategoryDropdownData,
} from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.business';
import {Relation} from 'screens/beat/StoreCheckIn/StoreCheckIn.interface';
import {getSkuDropdownData} from 'screens/orderTaking/OrderTaking.business';
import DropDown from 'components/beatDropdown/Dropdown';
import {getTranslationLabel} from 'utils/commonMethods';

interface IProductDivision {
  label: string;
  value: string;
}
interface IProductCardProps {
  isPrimaryOrder: boolean;
  isLastIndex?: boolean;
  onSubmit: (item: any) => void;
  productDivision: string;
  enableRemoveBtn: boolean;
  setSkuIndex: SetStateAction<any>;
  skuIndex: number;
  onRemove: () => void;
  showSubmitButton: () => void;
  isSubmitDisabled: boolean;
  relation: string | undefined;
  productDivisionData: IProductDivision[];
  productDropdownChange?: boolean;
}

const AddProductCard = ({
  isPrimaryOrder,
  isLastIndex,
  onSubmit,
  enableRemoveBtn,
  productDivision,
  setSkuIndex,
  skuIndex,
  onRemove,
  showSubmitButton,
  isSubmitDisabled,
  relation,
  productDivisionData,
  productDropdownChange,
}: IProductCardProps) => {
  const initialData = {
    subCategory: '',
    series: '',
    sku: '',
    quantity: '',
    price: '',
    uom: '',
    productDivision: '',
    materialCode: '',
  };
  const formikRef = useRef<FormikProps<typeof initialData>>(null);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [showSKUDropdown, setShowSKUDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [category, setCategory] = useState('');

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState('');
  const [skuData, setSkuData] = useState([]);
  const [subCategoryPageNo, setSubCategoryPageNo] = useState(1);
  const [seriesPageNo, setSeriesPageNo] = useState(1);
  const [skuPageNo, setSkuPageNo] = useState(1);
  const [subCategoryPages, setSubCategoryPages] = useState(1);
  const [seriesPages, setSeriesPages] = useState(1);
  const [skuPages, setSkuPages] = useState(1);
  const product =
    relation === Relation.PRIMARY_CHANNEL_PARTNER ? productDivision : category;

  useEffect(() => {
    if (productDropdownChange) {
      setSelectedSubCategoryId('');
      setSeriesData([]);
      setSelectedSeries('');
      setSkuData([]);
      if (formikRef?.current) {
        const {setValues} = formikRef.current;
        setValues(initialData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDropdownChange]);

  useEffect(() => {
    if (product !== '') {
      getSubCategoryDropdownData(
        product,
        setSubCategoryData,
        subCategoryPageNo,
        25,
        setSubCategoryPages,
        setSubCategoryPageNo,
      );
    }
  }, [product]);

  useEffect(() => {
    if (product !== '' && selectedSubCategoryId !== '') {
      getSeriesDropdownData(
        product,
        selectedSubCategoryId,
        setSeriesData,
        seriesPageNo,
        25,
        setSeriesPages,
        setSeriesPageNo,
      );
    }
  }, [product, selectedSubCategoryId]);

  useEffect(() => {
    if (
      product !== '' &&
      selectedSubCategoryId !== '' &&
      selectedSeries !== ''
    ) {
      getSkuDropdownData(
        product,
        selectedSubCategoryId,
        selectedSeries,
        setSkuData,
        skuPageNo,
        25,
        setSkuPages,
        setSkuPageNo,
        '&fields[4]=materialCode',
      );
    }
  }, [product, selectedSubCategoryId, selectedSeries]);

  return (
    <View style={CommonStyles.flexOne}>
      <Formik
        initialValues={initialData}
        validationSchema={() => PrimaryOrderSchema(relation)}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        innerRef={formikRef}
        enableReinitialize
        onSubmit={values => onSubmit(values)}>
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
            <View style={CommonStyles.flexOne}>
              {relation !== Relation.PRIMARY_CHANNEL_PARTNER && (
                <>
                  <DropDown
                    list={productDivisionData}
                    label={getTranslationLabel('product_division')}
                    placeholder={getTranslationLabel('select_prod_division')}
                    isRequired
                    value={values.productDivision}
                    visible={showProductDropdown}
                    onChangeDropdownState={() =>
                      setShowProductDropdown(!showProductDropdown)
                    }
                    setValue={data => {
                      setCategory(data);
                      setFieldValue('productDivision', data);
                      setSubCategoryData([]);
                      setSubCategoryPageNo(1);
                      setSubCategoryPages(1);
                    }}
                    error={
                      touched.productDivision ? errors.productDivision : ''
                    }
                  />
                  <Spacer size={15} />
                </>
              )}
              <DropDown
                list={subCategoryData}
                label={getTranslationLabel('sub_category')}
                placeholder={getTranslationLabel('select_sub_category')}
                isDisabled={!product}
                value={values.subCategory}
                visible={showSubCategoryDropdown}
                onChangeDropdownState={() => {
                  setShowSubCategoryDropdown(!showSubCategoryDropdown);
                  values.series = '';
                  setSelectedSeries('');
                }}
                error={touched.subCategory ? errors.subCategory : ''}
                setValue={data => {
                  setSelectedSubCategoryId(data);
                  setFieldValue('subCategory', data);
                  setSeriesData([]);
                  setSeriesPageNo(1);
                  setSeriesPages(1);
                }}
                onScrollEnd={() => {
                  if (subCategoryData?.length > 0) {
                    if (subCategoryPageNo < subCategoryPages) {
                      getSubCategoryDropdownData(
                        product,
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
              <Spacer size={15} />
              <DropDown
                list={seriesData}
                label={getTranslationLabel('series')}
                placeholder={getTranslationLabel('select_series')}
                isRequired
                isDisabled={!selectedSubCategoryId}
                value={values.series}
                visible={showSeriesDropdown}
                onChangeDropdownState={() => {
                  setShowSeriesDropdown(!showSeriesDropdown);
                  values.sku = '';
                }}
                setValue={data => {
                  setSelectedSeries(data);
                  setFieldValue('series', data);
                  setSkuData([]);
                  setSkuPageNo(1);
                  setSkuPages(1);
                }}
                error={touched.series ? errors.series : ''}
                onScrollEnd={() => {
                  if (seriesData?.length > 0) {
                    if (seriesPageNo < seriesPages) {
                      getSeriesDropdownData(
                        product,
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
              <Spacer size={15} />
              <DropDown
                list={skuData}
                label={getTranslationLabel('sku')}
                placeholder={getTranslationLabel('select_sku')}
                isRequired
                isDisabled={!selectedSeries}
                value={values.sku}
                visible={showSKUDropdown}
                onChangeDropdownState={() => {
                  setShowSKUDropdown(!showSKUDropdown);
                  values.uom = '';
                }}
                setData={data => {
                  setFieldValue('materialCode', data?.materialCode);
                  setFieldValue('uom', data?.uom);
                }}
                setValue={data => {
                  setFieldValue('sku', data);
                }}
                error={touched.sku ? errors.sku : ''}
                onScrollEnd={() => {
                  if (skuData?.length > 0) {
                    if (skuPageNo < skuPages) {
                      getSkuDropdownData(
                        product,
                        selectedSubCategoryId,
                        selectedSeries,
                        setSkuData,
                        skuPageNo + 1,
                        25,
                        setSkuPages,
                        setSkuPageNo,
                        '&fields[4]=materialCode',
                      );
                    }
                  }
                }}
              />
              {values.sku !== '' && (
                <>
                  <Spacer size={15} />
                  <PrimaryTextInput
                    titleText={getTranslationLabel('qty_needed')}
                    value={values.quantity}
                    onChangeText={val => setFieldValue('quantity', val)}
                    isRequired
                    placeHolder={getTranslationLabel('enter_qty')}
                    keyboardType="numeric"
                    onBlur={handleBlur('quantity')}
                    errorText={touched.quantity ? errors.quantity : ''}
                  />
                  {relation !== Relation.PRIMARY_CHANNEL_PARTNER && (
                    <>
                      <Spacer size={15} />
                      <PrimaryTextInput
                        titleText={getTranslationLabel('price')}
                        value={values.price}
                        onChangeText={val => setFieldValue('price', val)}
                        isRequired
                        placeHolder={getTranslationLabel('enter_price')}
                        keyboardType="numeric"
                        onBlur={handleBlur('price')}
                        errorText={touched.price ? errors.price : ''}
                      />
                    </>
                  )}

                  <Spacer size={15} />
                  <PrimaryTextInput
                    titleText={getTranslationLabel('uom')}
                    value={values.uom}
                    onChangeText={() => {}}
                    disabled
                    isRequired
                    placeHolder={getTranslationLabel('enter_uom')}
                    errorText={touched.uom ? errors.uom : ''}
                  />
                </>
              )}
              {isLastIndex ? (
                <>
                  <Spacer size={15} />
                  {enableRemoveBtn && (
                    <CustomButton
                      type={ButtonTypes.outline}
                      text={getTranslationLabel('remove')}
                      onPress={() => onRemove()}
                    />
                  )}
                  <Spacer size={15} />
                  <View style={CommonStyles.flexRowGap}>
                    <CustomButton
                      type={ButtonTypes.outline}
                      onPress={() => {
                        handleSubmit();
                        setSkuIndex(skuIndex + 1);
                      }}
                      icon={<Icon size={16} source={'plus'} />}
                      text={getTranslationLabel('add_more_sku')}
                      style={styles.button}
                      isDisabled={!isValid || !isSubmitDisabled}
                    />
                    <CustomButton
                      type={ButtonTypes.contained}
                      onPress={() => {
                        handleSubmit();
                        if (isValid) {
                          showSubmitButton();
                        }
                      }}
                      text={getTranslationLabel('save')}
                      isDisabled={!isValid || !isSubmitDisabled}
                      style={styles.button}
                    />
                  </View>
                  <Spacer size={15} />
                </>
              ) : (
                <Divider style={CommonStyles.horizontalDivider} />
              )}
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
  },
});

export default AddProductCard;
