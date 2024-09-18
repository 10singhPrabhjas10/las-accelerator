import React, {useEffect, useState, useRef} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {StyleSheet, View, Image} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {ImageOrVideo} from 'react-native-image-crop-picker';

import {getProfileData, uploadProfile} from './Profile.business';
import {IProfileResponse} from './Profile.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {updateTabIndex} from 'store/redux/modalSlice';
import {Text} from 'react-native-paper';
import Spacer from 'components/spacer';
import {COLORS} from '../../theme/colors';
import ScreenHeader from '@/components/headers/ScreenHeader';
import SubHeader from '@/components/subHeader/subHeader';
import Accordion from '@/components/accordion/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import ProfileSubHeader from '../../components/profilesubHeader/profileSubHeader';
import {
  heightToRatio,
  getTranslationLabel,
  widthToRatio,
  pickFromCamera,
  pickFromGallery,
} from 'utils/commonMethods';
import {ButtonTypes} from '../../types/buttons';

import SvgImagePlaceholder from '@/../assets/icons/ImagePlaceholder.svg';
import CustomButton from '../../components/button/CustomButton';
import SvgCamera from '@/../assets/icons/camera.svg';
import SvgGallery from '@/../assets/icons/gallery.svg';
import SvgPencil from '@/../assets/icons/pencil.svg';
import SvgDelete from '@/../assets/icons/delete.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const activeDp = useRef<string>('');
  const user = useSelector((state: RootState) => state.user.user);
  const [profileData, setProfileData] = useState<IProfileResponse[]>([]);
  const [profilePicture, setProfilePicture] = useState<any | null>(null);
  const [isUpdatingPicture, setIsUpdatingPicture] = useState<boolean>(false);

  const dispatch = useDispatch();

  console.log('----ProfileData--', profileData);

  useEffect(() => {
    getProfileData(setProfileData);
  }, []);

  const bottomSheetHandler = (): void => {
    bottomSheetModalRef.current?.present();
  };

  const renderProfilesDetailsSection = () => {
    return (
      <View style={CommonStyles.marginBottom20}>
        <SubHeader
          shouldShowCardView={true}
          otherSubHeaderContent={
            <ProfileSubHeader
              title="Gururaj Chandrea"
              imageUrl={activeDp.current}
              isImageEdit
              imageUploadHandler={bottomSheetHandler}
              children={
                <>
                  <Text style={styles.titleText}>Gururaj Chandrea</Text>
                  {/*  add view mapped channel partner button code here */}
                </>
              }
            />
          }>
          <View style={styles.profileBodyView}>
            <DataCard
              shouldShowCardWrapper={false}
              data={[
                {
                  title: getTranslationLabel('empId'),

                  text: '45789' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('sf_id'),
                  text: 'HIp0213521' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('contact_no'),
                  text: '+91 9869456902' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('emailId'),
                  text: 'xyz@deloitte.com' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('dateOfjoining'),
                  text: '12-01-2022' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('designation'),
                  text: 'Executive' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('reportingMgmr'),
                  text: 'Prakhar Saha' ?? EMPTY_DATA_DASH,
                },
                {
                  title: getTranslationLabel('branch'),
                  text: 'delhi' ?? EMPTY_DATA_DASH,
                },

                {
                  title: getTranslationLabel('officeAddress'),
                  text:
                    'Plot-D567, G.T. Tilak Road, Mahavir Nagar, Mumbai-400067 Maharashtra' ??
                    EMPTY_DATA_DASH,
                },
              ]}
            />
          </View>
          <Spacer size={10} />
          <View style={styles.viewLine} />
          <View style={CommonStyles.rowCenter}>
            <Text
              theme={{colors: {onSurface: COLORS.black}}}
              variant="bodyMedium">
              To update your details,
            </Text>
            <Text
              style={[
                CommonStyles.marginHorizontal10,
                {textDecorationLine: 'underline'},
              ]}
              theme={{colors: {onSurface: COLORS.green}}}
              variant="bodyMedium">
              Contact Admin
            </Text>
          </View>
          <Spacer size={10} />
        </SubHeader>
      </View>
    );
  };

  const renderlanguageIcon = () => (
    <Icon2 style={styles.iconStyle} name="language" size={25} color="#000" />
  );
  const renderLanguageSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion leftComponent={renderlanguageIcon} title="Language">
          <View style={{height: 100, width: 200}} />
        </Accordion>
      </View>
    );
  };

  const renderKycSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion title="KYC">
          <View style={{height: 100, width: 200}} />
        </Accordion>
      </View>
    );
  };
  const renderNotificationIcon = () => (
    <Icon
      style={styles.iconStyle}
      name="notifications-outline"
      size={25}
      color="#000"
    />
  );
  const renderNotificationSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion leftComponent={renderNotificationIcon} title="Notification">
          <View style={{height: 100, width: 200}} />
        </Accordion>
      </View>
    );
  };

  const renderLogoutIcon = () => (
    <Icon1 style={styles.iconStyle} name="logout" size={25} color="#000" />
  );

  const renderLogoutSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion leftComponent={renderLogoutIcon} title="Logout">
          <View style={{height: 100, width: 200}} />
        </Accordion>
      </View>
    );
  };

  const getPictureHandler = async (type: string) => {
    try {
      let result;
      if (type === 'camera') {
        result = await pickFromCamera();
      } else {
        result = await pickFromGallery();
      }
      if (result) {
        setIsUpdatingPicture(true);
        setProfilePicture(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updatePictureHandler = (): void => {
    activeDp.current = profilePicture?.path;
    bottomSheetModalRef.current?.dismiss();
    setIsUpdatingPicture(false);
  };

  const deleteIconHandler = () => {
    setProfilePicture(null);
  };

  const renderUploadProfileContent = () => {
    return (
      <View style={styles.bottomSheetContainer}>
        <View>
          {!isUpdatingPicture && (
            <Text style={styles.description}>
              {getTranslationLabel('camera-gallery-description')}
            </Text>
          )}
          <View style={styles.imageContainer}>
            {profilePicture?.path ? (
              <>
                <Image
                  source={{uri: profilePicture?.path}}
                  style={styles.image}
                />
                {!isUpdatingPicture && (
                  <TouchableOpacity
                    onPress={deleteIconHandler}
                    activeOpacity={0.8}
                    style={styles.deleteIconContainer}>
                    <SvgDelete
                      height={heightToRatio(18)}
                      width={widthToRatio(14)}
                    />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <SvgImagePlaceholder width="100%" />
            )}
          </View>
        </View>
        {isUpdatingPicture ? (
          <CustomButton
            type={ButtonTypes.contained}
            style={styles.updateButton}
            // textStyle={styles.buttonText}
            icon={
              <SvgPencil width={heightToRatio(20)} height={heightToRatio(20)} />
            }
            text={getTranslationLabel('upload-profile-pic')}
            onPress={updatePictureHandler}
          />
        ) : (
          <View style={styles.buttonContainer}>
            <CustomButton
              type={ButtonTypes.outline}
              style={styles.ButtonStyleBS}
              textStyle={styles.buttonText}
              icon={
                <SvgCamera
                  width={heightToRatio(24)}
                  height={heightToRatio(24)}
                />
              }
              text={getTranslationLabel('camera')}
              onPress={() => getPictureHandler('camera')}
            />
            <CustomButton
              type={ButtonTypes.outline}
              style={styles.ButtonStyleBS}
              textStyle={styles.buttonText}
              icon={
                <SvgGallery
                  width={heightToRatio(24)}
                  height={heightToRatio(24)}
                />
              }
              text={getTranslationLabel('gallery')}
              onPress={() => getPictureHandler('gallery')}
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <>
      <Layout
        style={
          (CommonStyles.flexGrow,
          {backgroundColor: COLORS.lightGreenBackground})
        }
        onBackPress={() => {
          dispatch(updateTabIndex(0));
          navigation.navigate('TabNavigator');
        }}
        isScrollable>
        <ScreenHeader showScreenName={false} />
        {renderProfilesDetailsSection()}

        {renderKycSection()}
        {renderLanguageSection()}
        {renderNotificationSection()}
        {renderLogoutSection()}
        <BottomSheetModalComponent
          maxHeight={'75%'}
          minHeight={'75%'}
          enableClose={true}
          title={
            isUpdatingPicture
              ? getTranslationLabel('profile-pic')
              : getTranslationLabel('upload-profile-pic')
          }
          titleTextVariant="headlineSmall"
          ref={bottomSheetModalRef}>
          {renderUploadProfileContent()}
        </BottomSheetModalComponent>
      </Layout>
    </>
  );

  //-----old ui
  // return (
  //   <>
  //     <Layout
  //       style={CommonStyles.flexGrow}
  //       onBackPress={() => {
  //         dispatch(updateTabIndex(0));
  //         navigation.navigate('TabNavigator');
  //       }}
  //       isScrollable>
  //       <ScreenHeader showScreenName={false} />
  //       <SubHeader shouldShowCardView={false} title={'fsdf'} />
  //       <ProfileHeader
  //         isEdit={true}
  //         imageUri={{uri: user?.profilePhoto}}
  //         header={user?.lasUserName}
  //         subTitle={`${getTranslationLabel('las_id')}: ${user?.lasId}`}
  //         onEditIconPress={() => setShowBottomSheet(true)}
  //       />
  //       <View style={styles.profileBodyView}>
  //         <DataCard
  //           data={[
  //             {
  //               title: getTranslationLabel('employee_code'),
  //               text: profileData[0]?.employeeCode ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('phone_no'),
  //               text: profileData[0]?.mobileNo
  //                 ? `+91 ${profileData[0]?.mobileNo}`
  //                 : EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('email_id'),
  //               text: profileData[0]?.emailId ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('designation'),
  //               text: profileData[0]?.lasType ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('date_of_joining'),
  //               text: profileData[0]?.dateOfJoining
  //                 ? convertDateToDisplay(
  //                     profileData[0]?.dateOfJoining,
  //                     DateFormats.DD_MM_YYYY,
  //                   )
  //                 : EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('branch'),
  //               text: profileData[0]?.branch ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('reporting_manager1'),
  //               text: profileData[0]?.reportingManager1 ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('reporting_manager2'),
  //               text: profileData[0]?.reportingManager2 ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('address'),
  //               text: profileData[0]?.address ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('aadhar_card_no'),
  //               text: profileData[0]?.aadharCardNo ?? EMPTY_DATA_DASH,
  //             },
  //             {
  //               title: getTranslationLabel('pan_card_num'),
  //               text: profileData[0]?.panCardNo ?? EMPTY_DATA_DASH,
  //             },
  //           ]}
  //         />
  //         <CustomButton
  //           type={ButtonTypes.outline}
  //           text={getTranslationLabel('view_mapped_channel_partner')}
  //           onPress={() => {
  //             navigation?.navigate('MappedChannelPartner');
  //           }}
  //           style={styles.buttonStyle}
  //           icon={<IconRight />}
  //           contentStyle={styles.contentStyle}
  //         />
  //       </View>
  //       <Spacer size={10} />
  //       <Text style={CommonStyles.paddingH10}>
  //         v{DeviceInfo.getVersion()} {Config.BASE_URL}
  //       </Text>
  //       {/* Remove this Later */}
  //       <ContactFooter />
  //     </Layout>
  //     <UploadImageBottomSheet
  //       setPhoto={setPhoto}
  //       visible={showBottomSheet}
  //       onDismiss={() => setShowBottomSheet(false)}
  //     />
  //   </>
  // );
};

const styles = StyleSheet.create({
  profileBodyView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },

  iconStyle: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  viewLine: {
    marginVertical: 16,
    height: 1,
    width: '100%',
    backgroundColor: COLORS.dividerGrey,
  },
  contentStyle: {flexDirection: 'row-reverse'},
  buttonStyle: {
    marginHorizontal: 4,
    marginTop: 15,
    borderColor: COLORS.dDarkGreen,
  },
  titleText: {
    fontWeight: '500',
    fontSize: heightToRatio(16),
    lineHeight: heightToRatio(20),
    color: COLORS.neutralLight,
  },
  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  imageContainer: {
    height: heightToRatio(314),
    width: 'auto',
    backgroundColor: COLORS.neutralLight,
    borderRadius: heightToRatio(8),
    marginTop: heightToRatio(8),
  },
  deleteIconContainer: {
    width: heightToRatio(40),
    height: heightToRatio(40),
    backgroundColor: COLORS.white,
    borderRadius: heightToRatio(20),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: heightToRatio(10),
    right: heightToRatio(10),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightToRatio(12),
  },
  ButtonStyleBS: {
    width: widthToRatio(150),
    height: heightToRatio(48),
    justifyContent: 'center',
  },
  updateButton: {
    height: heightToRatio(48),
    justifyContent: 'center',
    marginVertical: heightToRatio(18),
  },
  buttonText: {
    color: COLORS.dDarkGreen,
  },
  description: {
    fontWeight: '500',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(17.5),
  },
  image: {
    height: heightToRatio(314),
    borderRadius: heightToRatio(8),
    width: 'auto',
  },
});
export default ProfileScreen;
