import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import Spacer from 'components/spacer';
import {IStoreDetailsResponse} from '../ProfileDetails.interface';
import {getStoreDetailsData} from '../ProfileDetails.business';
import {formatNumberWithCommas} from 'utils/commonMethods';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

const StoreDetails = ({navigationFrom}: {navigationFrom: string}) => {
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code = navigationFrom === 'Profile' ? customerCode : relationId;

  const initialValues = {
    entityType: '',
    storeType: '',
    lastSixMonthsSales: 0,
    frequencyOfPurchase: '',
  };

  const [storeData, setStoreData] = useState<IStoreDetailsResponse>();
  useEffect(() => {
    getStoreDetailsData(setStoreData, code);
  }, []);

  return (
    <View>
      <Formik
        validationSchema={''}
        initialValues={storeData ?? initialValues}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => {}}>
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
              <PrimaryTextInput
                titleText={'Entity Type'}
                value={values?.entityType ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('entityType', val)}
                placeHolder={'Entity Type'}
                onBlur={handleBlur('entityType')}
                disabled
                errorText={touched?.entityType ? errors?.entityType : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Store Type'}
                value={values?.storeType ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('storeType', val)}
                placeHolder={'Store Type'}
                onBlur={handleBlur('storeType')}
                disabled
                errorText={touched?.storeType ? errors?.storeType : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Last 6M Sales'}
                value={
                  values?.lastSixMonthsSales
                    ? `₹ ${formatNumberWithCommas(
                        values?.lastSixMonthsSales ?? 0,
                      )}`
                    : EMPTY_DATA_DASH
                }
                onChangeText={val => setFieldValue('lastSales1', val)}
                placeHolder={'Last 6M Sales'}
                onBlur={handleBlur('lastSales1')}
                disabled
                errorText={
                  touched?.lastSixMonthsSales ? errors?.lastSixMonthsSales : ''
                }
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Frequency of Purchase'}
                value={
                  values?.frequencyOfPurchase?.toString() ?? EMPTY_DATA_DASH
                }
                onChangeText={val => setFieldValue('freqPurchase', val)}
                placeHolder={'Frequency of Purchase'}
                onBlur={handleBlur('freqPurchase')}
                disabled
                errorText={
                  touched?.frequencyOfPurchase
                    ? errors?.frequencyOfPurchase
                    : ''
                }
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default StoreDetails;
