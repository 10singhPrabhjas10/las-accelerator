import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomRadioButton from 'components/radioButton/CustomRadioButton';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {Formik} from 'formik';
import {bankAndKycValidation} from 'validations/activity';
import {IBankDetailsResponse} from '../ProfileDetails.interface';
import {getBankKycDetailsData} from '../ProfileDetails.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

interface IBankDetails {
  gstStatus: string;
  gstIn: string;
  businessPanCardNo: string;
  aadharNumber: string;
  accountNumber: string;
  accountHolderName: string;
  bankName: string;
  ifscCode: string;
}

interface IBankDetailsProps {
  onSubmit: (item: IBankDetails) => void;
  navigationFrom: string;
}

const BankDetails = ({onSubmit, navigationFrom}: IBankDetailsProps) => {
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code = navigationFrom === 'Profile' ? customerCode : relationId;
  const initialValues = {
    gstStatus: 'Yes',
    gstIn: '',
    businessPanCardNo: '',
    aadharNumber: '',
    accountNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
  };

  const radioButtonData = [
    {value: 'Yes', label: 'Yes'},
    {value: 'No', label: 'No'},
  ];

  const [bankDetails, setBankDetails] = useState<IBankDetailsResponse>();

  useEffect(() => {
    getBankKycDetailsData(setBankDetails, code);
  }, []);

  const formikRef = React.useRef<any>(null);

  return (
    <View>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={bankAndKycValidation}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => {
          onSubmit(values);
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
            <View>
              <CustomRadioButton
                title="GST No."
                onChange={val => {}}
                value={bankDetails?.retailerGstIn ? 'Yes' : 'No'}
                data={radioButtonData}
                disabled
                isRequired
                containerStyle={{
                  alignItems: 'flex-start',
                }}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'GSTIN'}
                value={
                  bankDetails?.gstin
                    ? bankDetails?.gstin.slice(0, -4).replace(/./g, 'x') +
                      bankDetails?.gstin.slice(-4)
                    : EMPTY_DATA_DASH
                }
                onChangeText={() => {}}
                placeHolder={'GSTIN'}
                onBlur={handleBlur('gstIn')}
                disabled
                errorText={touched?.gstIn ? errors?.gstIn : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Business PAN Card No.'}
                value={bankDetails?.retailerPanCardNo ?? EMPTY_DATA_DASH}
                onChangeText={() => {}}
                placeHolder={'Business PAN Card No.'}
                onBlur={handleBlur('businessPanCardNo')}
                disabled
                errorText={
                  touched?.businessPanCardNo ? errors?.businessPanCardNo : ''
                }
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default BankDetails;
