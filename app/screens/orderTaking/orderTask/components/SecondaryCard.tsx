import {StyleSheet, View} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import {Formik} from 'formik';
import DropDown from 'components/dropdown/Dropdown';
import Spacer from 'components/spacer';
import {Divider, Icon, Text} from 'react-native-paper';
import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {SecondaryOrderSchema} from 'validations/activity';

export const DATA = [
  {value: 'Storage Water Heater', label: 'Storage Water Heater'},
  {value: 'Pebble Water Heater', label: 'Pebble Water Heater'},
  {value: 'Pebble Watfer Heater', label: 'Pebble Watfer Heater'},
  {value: 'Pebble 3610', label: 'Pebble 3610'},
];

interface ISecondarCardProps {
  isLastIndex?: boolean;
  onSubmit: (item: any) => void;
  enableRemoveBtn: boolean;
  setSkuIndex: SetStateAction<any>;
  skuIndex: number;
  onRemove: () => void;
  showSubmitButton: () => void;
}

const SecondaryCard = ({
  onSubmit,
  isLastIndex,
  enableRemoveBtn,
  onRemove,
  setSkuIndex,
  skuIndex,
  showSubmitButton,
}: ISecondarCardProps) => {
  const initialData = {
    productDivision: '',
    subCategory: '',
    series: '',
    sku: '',
    quantity: '',
    uom: '',
  };
  const [showProductDropdown, setShowProuctDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [showSKUDropdown, setShowSKUDropdown] = useState(false);

  return (
    <View style={CommonStyles.flexOne}>
      <Formik
        initialValues={initialData}
        validationSchema={SecondaryOrderSchema}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => onSubmit(values)}>
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
                list={DATA}
                label={'Product Division'}
                placeholder={'Select Product Division '}
                // isDisabled={false}
                value={values.productDivision}
                visible={showProductDropdown}
                isRequired
                onChangeDropdownState={() =>
                  setShowProuctDropdown(!showProductDropdown)
                }
                setValue={data => {
                  setFieldValue('productDivision', data);
                }}
                error={touched.productDivision ? errors.productDivision : ''}
              />
              <Spacer size={24} />
              <DropDown
                list={DATA}
                label={'Sub-Category'}
                placeholder={'Select Sub-Category '}
                // isDisabled={false}
                value={values.subCategory}
                visible={showSubCategoryDropdown}
                onChangeDropdownState={() =>
                  setShowSubCategoryDropdown(!showSubCategoryDropdown)
                }
                setValue={data => {
                  setFieldValue('subCategory', data);
                }}
                error={touched.subCategory ? errors.subCategory : ''}
              />
              <Spacer size={24} />
              <DropDown
                list={DATA}
                label={'Series'}
                placeholder={'Select Series'}
                // isDisabled={false}
                value={values.series}
                visible={showSeriesDropdown}
                onChangeDropdownState={() =>
                  setShowSeriesDropdown(!showSeriesDropdown)
                }
                setValue={data => {
                  setFieldValue('series', data);
                }}
                error={touched.series ? errors.series : ''}
              />
              <Spacer size={24} />
              <DropDown
                list={DATA}
                label={'SKU'}
                placeholder={'Select SKU'}
                isRequired
                // isDisabled={false}
                value={values.sku}
                visible={showSKUDropdown}
                onChangeDropdownState={() =>
                  setShowSKUDropdown(!showSKUDropdown)
                }
                setValue={data => {
                  setFieldValue('sku', data);
                }}
                error={touched.sku ? errors.sku : ''}
              />
              {values?.sku && (
                <>
                  <Spacer size={8} />
                  <Divider style={CommonStyles.horizontalDivider} />
                  <Text style={styles.skuText} variant="labelLarge">
                    {values?.sku}
                  </Text>
                </>
              )}
              <Spacer size={20} />
              <PrimaryTextInput
                titleText="Quantity Needed"
                value={values.quantity}
                onChangeText={val => setFieldValue('quantity', val)}
                isRequired
                placeHolder="Enter Quantity"
                keyboardType="numeric"
                onBlur={handleBlur('quantity')}
                errorText={touched.quantity ? errors.quantity : ''}
              />
              <Spacer size={24} />
              <PrimaryTextInput
                titleText="UoM"
                value={values.uom}
                onChangeText={val => setFieldValue('uom', val)}
                isRequired
                placeHolder="Enter UoM"
                onBlur={handleBlur('uom')}
                errorText={touched.uom ? errors.uom : ''}
              />
              <Spacer size={24} />
              {!isLastIndex && (
                <>
                  <Spacer size={8} />
                  <Divider style={CommonStyles.horizontalDivider} />
                </>
              )}
              {isLastIndex && (
                <>
                  {enableRemoveBtn && (
                    <CustomButton
                      type={ButtonTypes.outline}
                      text="Remove"
                      onPress={() => onRemove()}
                    />
                  )}
                  <Spacer size={24} />
                  <View style={CommonStyles.flexRowGap}>
                    <CustomButton
                      type={ButtonTypes.outline}
                      onPress={() => {
                        handleSubmit();
                        setSkuIndex(skuIndex + 1);
                      }}
                      icon={<Icon size={16} source={'plus'} />}
                      text="Add More SKU"
                      style={styles.button}
                      isDisabled={!isValid}
                    />
                    <CustomButton
                      type={ButtonTypes.contained}
                      onPress={() => {
                        handleSubmit();
                        if (isValid) {
                          showSubmitButton();
                        }
                      }}
                      text="Save"
                      isDisabled={!isValid}
                      style={styles.button}
                    />
                  </View>
                  <Spacer size={24} />
                </>
              )}
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  skuText: {
    color: COLORS.grey2,
    marginTop: 8,
  },
  button: {
    width: '48%',
  },
});

export default SecondaryCard;
