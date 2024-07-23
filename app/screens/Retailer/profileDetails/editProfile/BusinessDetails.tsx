import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageUpload, {
  IPhotoProps,
} from 'screens/beat/StoreCheckIn/components/imageUpload/ImageUpload';
import {Formik} from 'formik';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import UploadImageBottomSheet from 'bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';
import Spacer from 'components/spacer';
import PrimaryTextInput from 'components/textInput/PrimaryTextInput';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {TextInput} from 'react-native-paper';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import {StyleSheet} from 'react-native';
import {hasLocationPermission} from 'utils/commonMethods';
import {IBusinessDetailsResponse} from '../ProfileDetails.interface';
import {
  getAreaNameData,
  getBusinessDetailsData,
  updateBusinessDetails,
} from '../ProfileDetails.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';

interface IBusinessDetailsProps {
  onSubmit: (item: any) => void;
  navigationFrom: string;
}

const BusinessDetails = ({onSubmit, navigationFrom}: IBusinessDetailsProps) => {
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.retailerCustomerCode,
  );

  const relationId = useSelector(
    (state: RootState) => state?.channelPartner?.relationId,
  );

  const code = navigationFrom === 'Profile' ? customerCode : relationId;
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const [photo, setPhoto] = useState<IPhotoProps[] | null>([]);
  const [location, setLocation] = useState<GeolocationResponse>();
  const initialValues = {
    storeImage: '',
    latitude: '',
    longitude: '',
    contactPerson: '',
    phoneNo: '',
    nameOfFirm: '',
    storeAddress: '',
    streetName: '',
    landmark: '',
    pincode: '',
    area: '',
    state: '',
    district: '',
    invitationDate: '',
    address: '',
    retailerName: '',
    retailerPhoneNo: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [businessDetails, setBusinessDetails] =
    useState<IBusinessDetailsResponse>();
  const [areaName, setAreaName] = useState('');

  useEffect(() => {
    getBusinessDetailsData(setBusinessDetails, code);
  }, []);

  const formikRef = React.useRef<any>(null);

  const handleReset = () => {
    if (formikRef.current) {
      formikRef?.current?.resetForm();
      setPhoto([]);
      setButtonDisabled(true);
    }
  };

  const getLocation = async () => {
    try {
      const hasPermission = await hasLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos);
          },
          error => console.log('err', error),
          {enableHighAccuracy: true},
        );
      } else {
        throw new Error('Location permission not granted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (photo) {
      getLocation();
    }
  }, [photo]);

  const latitude = location?.coords?.latitude
    ? Math.round(location?.coords?.latitude * 10000) / 10000
    : 0;
  const longitude = location?.coords?.longitude
    ? Math.round(location?.coords?.longitude * 10000) / 10000
    : 0;

  const handleSubmit = (photo: IPhotoProps[] | null) => {
    const reqBody: {storeImage?: string} = {};
    if (photo) {
      reqBody.storeImage = photo?.[0]?.uri;
    }
    updateBusinessDetails(reqBody, code, () => {
      setButtonDisabled(true);
    });
  };

  useEffect(() => {
    if (photo?.[0]?.uri !== undefined) {
      setButtonDisabled(false);
    }
  }, [photo]);

  useEffect(() => {
    if (businessDetails?.area !== '' && businessDetails) {
      getAreaNameData(businessDetails?.area, setAreaName);
    }
  }, [businessDetails?.area]);

  return (
    <View>
      <Formik
        innerRef={formikRef}
        validationSchema={''}
        initialValues={businessDetails ?? initialValues}
        validateOnBlur={false}
        validateOnMount
        validateOnChange={true}
        enableReinitialize
        onSubmit={values => {
          handleSubmit(photo);
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
              <PrimaryTextInput
                titleText={'Geo-Location'}
                value={
                  latitude > 0
                    ? `${latitude?.toString()}° N, ${longitude?.toString()}° E`
                    : EMPTY_DATA_DASH
                }
                onChangeText={val => setFieldValue('geoLocation', val)}
                placeHolder={'Geo-location'}
                onBlur={handleBlur('geoLocation')}
                disabled
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Contact Person Name'}
                value={values?.retailerName ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('contactPerson', val)}
                placeHolder={'Contact Person Name'}
                onBlur={handleBlur('contactPerson')}
                disabled
                errorText={touched?.contactPerson ? errors?.contactPerson : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                placeHolder={'Contact Person Phone No.'}
                titleText={'Contact Person Phone No.'}
                value={values?.retailerPhoneNo ?? EMPTY_DATA_DASH}
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={10}
                left={values.phoneNo && <TextInput.Affix text="+91 |" />}
                onChangeText={val => setFieldValue('phoneNo', val)}
                errorText={touched?.phoneNo ? errors?.phoneNo : ''}
                disabled
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Store Name'}
                value={values?.nameOfFirm ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('nameOfFirm', val)}
                placeHolder={'Store Name'}
                onBlur={handleBlur('nameOfFirm')}
                disabled
                errorText={touched?.nameOfFirm ? errors?.nameOfFirm : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Store Name and Address'}
                value={
                  [
                    values?.addressLine1,
                    values?.addressLine2,
                    values?.addressLine3,
                  ]
                    ?.filter(Boolean)
                    ?.join(',')
                    ?.toString() ?? EMPTY_DATA_DASH
                }
                onChangeText={val => setFieldValue('storeAddress', val)}
                placeHolder={'Store/Block No.'}
                onBlur={handleBlur('storeAddress')}
                disabled
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Street/Colony/Locality Name'}
                value={areaName ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('area', val)}
                placeHolder={'Street Name'}
                onBlur={handleBlur('area')}
                disabled
                errorText={touched?.area ? errors?.area : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Pin Code'}
                value={values?.pincode ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('pincode', val)}
                placeHolder={'PinCode'}
                onBlur={handleBlur('pincode')}
                disabled
                errorText={touched?.pincode ? errors?.pincode : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'State'}
                value={values?.state ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('state', val)}
                placeHolder={'State'}
                onBlur={handleBlur('state')}
                disabled
                errorText={touched?.state ? errors?.state : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'District'}
                value={values?.district ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('district', val)}
                placeHolder={'District'}
                onBlur={handleBlur('district')}
                disabled
                errorText={touched?.district ? errors?.district : ''}
              />
              <Spacer size={15} />
              <PrimaryTextInput
                titleText={'Invited On'}
                value={values?.invitationDate ?? EMPTY_DATA_DASH}
                onChangeText={val => setFieldValue('invitationDate', val)}
                placeHolder={'Invited On'}
                onBlur={handleBlur('invitationDate')}
                disabled
                errorText={
                  touched?.invitationDate ? errors?.invitationDate : ''
                }
              />
              <Spacer size={15} />
              <ImageUpload
                imageData={photo}
                rightIcon={true}
                onRightIconPress={() => {
                  setPhoto([]);
                  setButtonDisabled(true);
                }}
                openBottomSheet={() => setShowBottomSheet(true)}
              />
              <Spacer size={30} />
              <View style={styles.buttonView}>
                <CustomButton
                  type={ButtonTypes.outline}
                  text="Clear"
                  onPress={handleReset}
                  style={styles.button}
                />
                <CustomButton
                  type={ButtonTypes.contained}
                  text="Save"
                  onPress={() => {
                    handleSubmit();
                  }}
                  isDisabled={buttonDisabled}
                  style={styles.button}
                />
              </View>
            </View>
          );
        }}
      </Formik>
      <UploadImageBottomSheet
        setPhoto={newPhoto =>
          setPhoto((prevPhoto: any) => [...prevPhoto, newPhoto])
        }
        showGalleryOption={true}
        visible={showBottomSheet}
        onDismiss={() => setShowBottomSheet(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  button: {
    flex: 1,
  },
});

export default BusinessDetails;
