import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {StyleSheet} from 'react-native';

import Layout from 'components/Layout';
import DropDown from 'components/dropdown/Dropdown';
import SuccessIcon from '../../../../../../../assets/icons/tick.svg';
import {COLORS} from 'theme/colors';

import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import ContactFooter from 'components/contactFooter/ContactFooter';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import CommonStyles from 'utils/commonStyle';
import {RaiseTicketSchema, validateRaiseTicketForm} from 'validations/activity';
import {
  DropdownItem,
  ISecondaryData,
  ISupportTicketReqBody,
} from '../../CheckIn.interface';
import {
  getRaiseTicketDropdownData,
  submitRaiseTicket,
} from '../../CheckIn.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {NavigationFrom} from 'utils/Constants';

interface IInitialValues {
  supportType: string;
  subType: string;
  productCategory: string;
  comments: string;
}

const RaiseTicket = () => {
  const route = useRoute<RouteProp<RootNavigationTypes, 'RaiseTicket'>>();
  const {navigationFrom} = route.params;

  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showSubTypeDropdown, setShowSubTypeDropdown] = useState(false);
  const [showProdCategoryDropdown, setShowProdCategoryDropdown] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [dropdownData, setDropdownData] = useState<ISecondaryData>({
    productCategory: [],
    subType: {},
    supportType: [],
  });

  const navigation = useNavigation<RootNavigationProp>();

  const secondaryCustomerId = useSelector(
    (state: RootState) => state?.channelPartner?.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code =
    navigationFrom === NavigationFrom.STORE_CHECKIN
      ? relationId
      : secondaryCustomerId;

  const raiseTicketData = {
    supportType: '',
    subType: '',
    productCategory: '',
    comments: '',
  };

  const getSubTypeOptions = (selectedSupportType: string) => {
    const subTypes = dropdownData?.subType?.[selectedSupportType] || [];
    const options = subTypes.map(subType => ({label: subType, value: subType}));
    return options;
  };

  useEffect(() => {
    if (!dropdownData?.productCategory?.length) {
      getRaiseTicketDropdownData(code, setDropdownData);
    }
  }, []);

  const handleOnSubmit = (values: IInitialValues) => {
    const reqBody: ISupportTicketReqBody = {
      supportType: values?.supportType,
      supportSubType: values?.subType,
      productCategory: values?.productCategory
        .split(',')
        .map((category: string) => {
          const mapping = dropdownData?.productCategory.find(
            (item: DropdownItem) => item?.value === category,
          );
          return mapping ? mapping.label : null;
        })
        .filter(label => label !== null),
      comments: values?.comments,
    };

    submitRaiseTicket(code, reqBody, () => setShowSuccessModal(true));
  };

  return (
    <Layout
      isScrollable
      headerTitle="Raise Ticket"
      style={CommonStyles.padding}>
      <Formik
        validateOnBlur
        validateOnMount
        validate={validateRaiseTicketForm}
        validateOnChange={true}
        enableReinitialize
        validationSchema={RaiseTicketSchema}
        initialValues={raiseTicketData}
        onSubmit={values => {
          handleOnSubmit(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
          setFieldValue,
        }) => {
          return (
            <>
              <View style={CommonStyles.flexOne}>
                <Spacer size={10} />
                <DropDown
                  value={values.supportType}
                  error={touched.supportType ? errors.supportType : ''}
                  list={dropdownData?.supportType}
                  label="Support Type"
                  placeholder="Select Service Type"
                  isRequired
                  visible={showSupportDropdown}
                  onChangeDropdownState={() => {
                    setShowSupportDropdown(!showSupportDropdown);
                    values.subType = '';
                  }}
                  setValue={data => {
                    setFieldValue('supportType', data);
                  }}
                />
                <Spacer size={20} />
                <DropDown
                  value={values.subType}
                  error={touched.subType ? errors.subType : ''}
                  list={getSubTypeOptions(values?.supportType)}
                  label="Sub-Type"
                  placeholder="Select Sub-Type"
                  isRequired
                  visible={showSubTypeDropdown}
                  onChangeDropdownState={() => {
                    setShowSubTypeDropdown(!showSubTypeDropdown);
                  }}
                  setValue={data => setFieldValue('subType', data)}
                />
                {values?.supportType === 'Product Related' && (
                  <>
                    <Spacer size={20} />
                    <DropDown
                      value={values.productCategory}
                      multiSelect={true}
                      error={
                        touched?.productCategory ? errors?.productCategory : ''
                      }
                      list={dropdownData?.productCategory}
                      label="Product Category"
                      placeholder="Select Product Type"
                      isRequired
                      visible={showProdCategoryDropdown}
                      onChangeDropdownState={() => {
                        setShowProdCategoryDropdown(!showProdCategoryDropdown);
                      }}
                      setValue={data => {
                        setFieldValue('productCategory', data);
                      }}
                    />
                  </>
                )}
                <Spacer size={20} />
                <PrimaryTextInput
                  multiline
                  isRequired
                  numberOfLines={4}
                  placeHolder={'Type comments'}
                  titleText={'Comments'}
                  value={values.comments}
                  onChangeText={handleChange('comments')}
                  onBlur={handleBlur('comments')}
                  textInputStyle={styles.textInputStyle}
                  errorText={touched.comments ? errors.comments : ''}
                />
              </View>
              <CustomButton
                type={ButtonTypes.contained}
                onPress={() => {
                  handleSubmit();
                }}
                isDisabled={!isValid}
                text="Proceed"
              />
            </>
          );
        }}
      </Formik>
      <ContactFooter />
      <SuccessFailureModal
        showModal={showSuccessModal}
        setShowModal={() => setShowSuccessModal(false)}
        title="Ticket Submitted"
        label="You have successfully raised a Service Ticket"
        btnType="confirm"
        secondaryBtnTitle="Dismiss"
        onSecondaryBtnHandler={() => {
          navigation.navigate('SecondaryGrivance', {navigationFrom});
          setShowSuccessModal(false);
        }}
        isSuccess
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    justifyContent: 'center',
    paddingTop: 15,
    textAlignVertical: 'center',
  },
});

export default RaiseTicket;
