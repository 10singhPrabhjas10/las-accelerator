import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import ProfileHeader from 'components/headers/ProfileHeader';
import DataCard from 'components/dataCard/DataCard';
import {StyleSheet, View} from 'react-native';
import CustomButton from 'components/button/CustomButton';
import {ButtonTypes} from 'types/buttons';
import ContactFooter from 'components/contactFooter/ContactFooter';
import CommonStyles from 'utils/commonStyle';
import IconRight from '../../../assets/icons/iconRight.svg';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {getProfileData, uploadProfile} from './Profile.business';
import {IPhotoProps, IProfileResponse} from './Profile.interface';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import UploadImageBottomSheet from 'bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';
import {updateTabIndex} from 'store/redux/modalSlice';
import {Text} from 'react-native-paper';
import Config from 'react-native-config';
import Spacer from 'components/spacer';
import DeviceInfo from 'react-native-device-info';

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const user = useSelector((state: RootState) => state.user.user);
  const [profileData, setProfileData] = useState<IProfileResponse[]>([]);
  const [photo, setPhoto] = useState<IPhotoProps | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProfileData(setProfileData);
  }, []);

  useEffect(() => {
    if (photo) {
      const reqBody = {
        profilePhoto: photo?.uri,
      };
      uploadProfile(reqBody, user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  return (
    <>
      <Layout
        style={CommonStyles.flexGrow}
        headerTitle={getTranslationLabel('profile')}
        onBackPress={() => {
          dispatch(updateTabIndex(0));
          navigation.navigate('TabNavigator');
        }}
        isScrollable>
        <ProfileHeader
          isEdit={true}
          imageUri={{uri: user?.profilePhoto}}
          header={user?.lasUserName}
          subTitle={`${getTranslationLabel('las_id')}: ${user?.lasId}`}
          onEditIconPress={() => setShowBottomSheet(true)}
        />
        <View style={styles.profileBodyView}>
          <DataCard
            data={[
              {
                title: getTranslationLabel('employee_code'),
                text: profileData[0]?.employeeCode ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('phone_no'),
                text: profileData[0]?.mobileNo
                  ? `+91 ${profileData[0]?.mobileNo}`
                  : EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('email_id'),
                text: profileData[0]?.emailId ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('designation'),
                text: profileData[0]?.lasType ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('date_of_joining'),
                text: profileData[0]?.dateOfJoining
                  ? convertDateToDisplay(
                      profileData[0]?.dateOfJoining,
                      DateFormats.DD_MM_YYYY,
                    )
                  : EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('branch'),
                text: profileData[0]?.branch ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('reporting_manager1'),
                text: profileData[0]?.reportingManager1 ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('reporting_manager2'),
                text: profileData[0]?.reportingManager2 ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('address'),
                text: profileData[0]?.address ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('aadhar_card_no'),
                text: profileData[0]?.aadharCardNo ?? EMPTY_DATA_DASH,
              },
              {
                title: getTranslationLabel('pan_card_num'),
                text: profileData[0]?.panCardNo ?? EMPTY_DATA_DASH,
              },
            ]}
          />
          <CustomButton
            type={ButtonTypes.outline}
            text={getTranslationLabel('view_mapped_channel_partner')}
            onPress={() => {
              navigation?.navigate('MappedChannelPartner');
            }}
            style={styles.buttonStyle}
            icon={<IconRight />}
            contentStyle={styles.contentStyle}
          />
        </View>
        <Spacer size={10} />
        <Text style={CommonStyles.paddingH10}>
          v{DeviceInfo.getVersion()} {Config.BASE_URL}
        </Text>
        {/* Remove this Later */}
        <ContactFooter />
      </Layout>
      <UploadImageBottomSheet
        setPhoto={setPhoto}
        visible={showBottomSheet}
        onDismiss={() => setShowBottomSheet(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  profileBodyView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  contentStyle: {flexDirection: 'row-reverse'},
  buttonStyle: {
    marginHorizontal: 4,
    marginTop: 15,
  },
});
export default ProfileScreen;
