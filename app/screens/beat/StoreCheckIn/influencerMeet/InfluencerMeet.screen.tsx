import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import CommonStyles from 'utils/commonStyle';
import {Formik, FieldArray, FormikErrors} from 'formik';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import Spacer from 'components/spacer';
import {Divider, Icon, TextInput} from 'react-native-paper';
import DropDown from 'components/dropdown/Dropdown';
import {Influencer} from '../StoreCheckIn.interface';
import {InfluencerSchema} from 'validations/activity';
import ArrowLeftIcon from '../../../../../assets/icons/leftArrow.svg';
import {
  AADHAR_REGEX,
  DL_NO_REGEX,
  INDIAN_MOBILE_REGEX,
  PAN_NO_REGEX,
} from 'utils/Constants';
import {
  getInfluencerDropdownData,
  submitInfluencer,
} from './InfluencerMeet.business';
import {
  IInfluencer,
  IInfluencerMeetReqBody,
  IInfluencerValues,
  ITransformedDropdownResponse,
} from './InfluencerMeet.interface';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {createCheckOutTime} from '../StoreCheckIn.business';
const initialValues = {
  influencer: [
    {
      influencerName: '',
      mobileNo: '',
      idType: '',
      idNo: '',
      contactType: '',
    },
  ],
};

const InfluencerMeetScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'InfluencerMeet'>>();
  const {beatPlanItemId, date} = route.params;

  const [isCheckOutDisabled, setIsCheckoutDisabled] = useState(true);
  const [dropdownVisibility, setDropdownVisibility] = useState([
    {idType: false, contactType: false},
  ]);
  const [dropdownData, setDropdownData] =
    useState<ITransformedDropdownResponse>();

  useEffect(() => {
    getInfluencerDropdownData(setDropdownData);
  }, []);

  const handleSubmit = (values: IInfluencerValues, resetForm: () => void) => {
    const influencerData: IInfluencer[] = [];
    values?.influencer?.map(item => {
      influencerData.push({
        beatplanItemId: beatPlanItemId,
        activity: 'Influencer meet',
        influencerName: item?.influencerName,
        mobileNumber: item?.mobileNo,
        idType: item?.idType,
        idNumber: item?.idNo,
        contactType: item?.contactType,
      });
    });
    const requestBody: IInfluencerMeetReqBody = {
      data: influencerData,
    };
    submitInfluencer(requestBody, () => {
      resetForm();
      setIsCheckoutDisabled(false);
    });
  };

  const checkout = () => {
    const requestBody = {
      checkOutDate: date,
    };
    if (date !== '') {
      createCheckOutTime(beatPlanItemId, requestBody, () => {
        navigation?.goBack();
      });
    }
  };

  return (
    <Layout
      isScrollable
      style={CommonStyles.padding}
      headerTitle="Influencer Meet">
      <Formik
        initialValues={initialValues}
        validationSchema={InfluencerSchema}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={(values, {resetForm}) => {
          handleSubmit(values, resetForm);
        }}>
        {({
          values,
          setFieldValue,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          isValid,
          setFieldError,
        }) => {
          const handleMobileValidation = (index: number) => {
            const mobileNo = values?.influencer[index]?.mobileNo;
            const isMobileNoValid = INDIAN_MOBILE_REGEX?.test(mobileNo);

            if (!isMobileNoValid) {
              setFieldError(
                `influencer[${index}].idNo`,
                'Invalid Mobile Number',
              );
            }
          };
          const handleValidation = (index: number) => {
            const idType = values?.influencer[index]?.idType;
            console.log(`Validating ${idType} with value: ${index}`);
            if (idType === 'PAN') {
              const panValue = values.influencer[index].idNo?.toUpperCase();
              const isPanValid = PAN_NO_REGEX.test(panValue);
              console.log('PAN Valid:', isPanValid, 'Value:', panValue);
              if (!isPanValid) {
                setFieldError(
                  `influencer[${index}].idNo`,
                  'Invalid PAN Number',
                );
              }
            } else if (idType === 'Aadhaar') {
              const adhaarValue = values?.influencer[index]?.idNo;
              const isAadhaarValid = AADHAR_REGEX?.test(adhaarValue);
              if (!isAadhaarValid) {
                setFieldError(
                  `influencer[${index}].idNo`,
                  'Invalid Aadhaar Number',
                );
              }
            } else {
              const dlValue = values?.influencer[index]?.idNo;
              const isDlValid = DL_NO_REGEX?.test(dlValue);
              if (!isDlValid) {
                setFieldError(`influencer[${index}].idNo`, 'Invalid DL Number');
              }
            }
          };

          return (
            <View style={CommonStyles.flexOne}>
              <FieldArray name="influencer">
                {({push, remove}) => (
                  <View style={CommonStyles.flexOne}>
                    {values.influencer.map((_, index) => (
                      <View key={index}>
                        <PrimaryTextInput
                          titleText="Influencer Name"
                          value={values.influencer[index].influencerName}
                          onChangeText={val =>
                            setFieldValue(
                              `influencer[${index}].influencerName`,
                              val,
                            )
                          }
                          isRequired
                          placeHolder="Enter Name"
                          onBlur={handleBlur(
                            `influencer[${index}].influencerName`,
                          )}
                          errorText={
                            touched?.influencer?.[index]?.influencerName
                              ? (
                                  errors?.influencer as FormikErrors<
                                    Influencer[]
                                  >
                                )?.[index]?.influencerName
                              : ''
                          }
                        />
                        <Spacer size={20} />
                        <PrimaryTextInput
                          placeHolder={'Enter Mobile No.'}
                          titleText={'Mobile No.'}
                          onChangeText={val =>
                            setFieldValue(`influencer[${index}].mobileNo`, val)
                          }
                          onEndEditing={() => handleMobileValidation(index)}
                          onBlur={handleBlur(`influencer[${index}].mobileNo`)}
                          value={values.influencer[index].mobileNo}
                          keyboardType="numeric"
                          returnKeyType="done"
                          maxLength={10}
                          left={
                            values.influencer[index].mobileNo && (
                              <TextInput.Affix text="+91 |" />
                            )
                          }
                          errorText={
                            touched?.influencer?.[index]?.mobileNo
                              ? (
                                  errors?.influencer as FormikErrors<
                                    Influencer[]
                                  >
                                )?.[index]?.mobileNo
                              : ''
                          }
                        />
                        <Spacer size={20} />
                        <DropDown
                          list={dropdownData?.idType ?? []}
                          label={'ID Type'}
                          placeholder={'Select ID Type'}
                          // isDisabled={false}
                          isRequired
                          value={values.influencer[index].idType}
                          visible={dropdownVisibility[index].idType}
                          onChangeDropdownState={() => {
                            const newVisibility = [...dropdownVisibility];
                            newVisibility[index].idType =
                              !newVisibility[index].idType;
                            setDropdownVisibility(newVisibility);
                            values.influencer[index].idNo = '';
                          }}
                          setValue={data => {
                            setFieldValue(`influencer[${index}].idType`, data);
                          }}
                          error={
                            touched?.influencer?.[index]?.idType
                              ? (
                                  errors?.influencer as FormikErrors<
                                    Influencer[]
                                  >
                                )?.[index]?.idType
                              : ''
                          }
                        />
                        <Spacer size={20} />
                        <PrimaryTextInput
                          titleText="ID No."
                          value={values.influencer[index].idNo}
                          onChangeText={val => {
                            setFieldValue(`influencer[${index}].idNo`, val);
                          }}
                          disabled={values?.influencer?.[index].idType === ''}
                          isRequired
                          placeHolder="Enter Id No."
                          onEndEditing={() => handleValidation(index)}
                          autoCapitalize="characters"
                          onBlur={handleBlur(`influencer[${index}].idNo`)}
                          errorText={
                            touched?.influencer?.[index]?.idNo
                              ? (
                                  errors?.influencer as FormikErrors<
                                    Influencer[]
                                  >
                                )?.[index]?.idNo
                              : ''
                          }
                        />
                        <Spacer size={20} />
                        <DropDown
                          list={dropdownData?.contactType ?? []}
                          label={'Contact Type'}
                          placeholder={'Select Contact Type'}
                          // isDisabled={false}
                          isRequired
                          value={values.influencer[index].contactType}
                          visible={dropdownVisibility[index].contactType}
                          onChangeDropdownState={() => {
                            const newVisibility = [...dropdownVisibility];
                            newVisibility[index].contactType =
                              !newVisibility[index].contactType;
                            setDropdownVisibility(newVisibility);
                          }}
                          setValue={data => {
                            setFieldValue(
                              `influencer[${index}].contactType`,
                              data,
                            );
                          }}
                          error={
                            touched?.influencer?.[index]?.contactType
                              ? (
                                  errors?.influencer as FormikErrors<
                                    Influencer[]
                                  >
                                )?.[index]?.contactType
                              : ''
                          }
                        />
                        <Divider style={CommonStyles.horizontalDivider} />
                        {values.influencer.length - 1 === index && (
                          <>
                            <Spacer size={16} />
                            <CustomButton
                              type={ButtonTypes.outline}
                              text="Add Influencer"
                              isDisabled={!isValid}
                              onPress={() => {
                                push({
                                  influencerName: '',
                                  mobileNo: '',
                                  idType: '',
                                  idNo: '',
                                  contactType: '',
                                });
                                setDropdownVisibility([
                                  ...dropdownVisibility,
                                  {idType: false, contactType: false},
                                ]);
                              }}
                              icon={<Icon size={16} source={'plus'} />}
                            />
                            {index !== 0 && (
                              <>
                                <Spacer size={16} />
                                <CustomButton
                                  type={ButtonTypes.outline}
                                  text="Remove Influencer"
                                  onPress={() => remove(index)}
                                />
                              </>
                            )}
                          </>
                        )}
                        <Spacer size={20} />
                      </View>
                    ))}
                    <View style={CommonStyles.flexOne} />
                    <CustomButton
                      type={ButtonTypes.outline}
                      text={'Check-Out'}
                      onPress={() => {
                        checkout();
                      }}
                      isDisabled={isCheckOutDisabled}
                      icon={<ArrowLeftIcon />}
                      style={CommonStyles.marginTop}
                    />
                    <Spacer size={20} />
                    <CustomButton
                      type={ButtonTypes.contained}
                      text="Submit"
                      onPress={() => {
                        handleSubmit();
                      }}
                      isDisabled={!isValid}
                    />
                  </View>
                )}
              </FieldArray>
            </View>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default InfluencerMeetScreen;
