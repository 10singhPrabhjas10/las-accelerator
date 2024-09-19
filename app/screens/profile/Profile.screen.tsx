import React, {useState, useRef} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {StyleSheet, View, Image} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';

import BottomSheetModalComponent from 'bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {TouchableOpacity} from 'react-native-gesture-handler';

// import {getProfileData, uploadProfile} from './Profile.business';
// import {IProfileResponse} from './Profile.interface';
// import {EMPTY_DATA_DASH} from 'utils/Constants';
import {useDispatch} from 'react-redux';
// import {RootState} from 'store/redux/store';
import {updateTabIndex} from 'store/redux/modalSlice';
import {Text} from 'react-native-paper';
import Spacer from 'components/spacer';
import {COLORS} from '../../theme/colors';
// import ScreenHeader from '@/components/headers/ScreenHeader';
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

import ModalComponent from '../../modals/ModalComponent';

import SvgImagePlaceholder from '@/../assets/icons/ImagePlaceholder.svg';
import SvgCamera from '@/../assets/icons/camera.svg';
import SvgGallery from '@/../assets/icons/gallery.svg';
import SvgPencil from '@/../assets/icons/pencil.svg';
import SvgDelete from '@/../assets/icons/delete.svg';
import SvgClose from '@/../assets/icons/closeIcon.svg';
import SvgCall from '@/../assets/icons/callIcon.svg';
import SvgEmail from '@/../assets/icons/email.svg';

import LogoutIcon from '../../../assets/icons/logoutIcon.svg';
import {fontConfig} from '@/theme/fonts';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import SuccessFailureModal from '@/modals/SuccessFailureModal';
import {clearUser} from '@/store/redux/userSlice';
import {clearStorage} from '@/utils/AppStorage';
// import {boolean} from 'yup';

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const activeDp = useRef<string>('');
  // const user = useSelector((state: RootState) => state.user.user);
  // const [profileData, setProfileData] = useState<IProfileResponse[]>([]);
  const [profilePicture, setProfilePicture] = useState<any | null>(null);
  const [isUpdatingPicture, setIsUpdatingPicture] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getProfileData(setProfileData);
  // }, []);

  const bottomSheetHandler = (): void => {
    bottomSheetModalRef.current?.present();
  };

  const contactAdminHandler = (): void => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    await clearStorage();
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
                  <CustomButton
                    type={ButtonTypes.outline}
                    text={'View mapped channel partner'}
                    onPress={() => {
                      navigation.navigate('MappedChannelPartner');
                    }}
                    textStyle={{color: 'green'}}
                  />
                  {/*  add view mapped channel partner button code here */}
                </>
              }
            />
          }>
          <View style={styles.profileBodyView}>
            <DataCard
              shouldShowCardWrapper={false}
              data={[
                {title: getTranslationLabel('empId'), text: '45789'},
                {title: getTranslationLabel('sf_id'), text: 'HIp0213521'},
                {
                  title: getTranslationLabel('contact_no'),
                  text: '+91 9869456902',
                },
                {
                  title: getTranslationLabel('emailId'),
                  text: 'xyz@deloitte.com',
                },
                {
                  title: getTranslationLabel('dateOfjoining'),
                  text: '12-01-2022',
                },
                {title: getTranslationLabel('designation'), text: 'Executive'},
                {
                  title: getTranslationLabel('reportingMgmr'),
                  text: 'Prakhar Saha',
                },
                {title: getTranslationLabel('branch'), text: 'delhi'},
                {
                  title: getTranslationLabel('officeAddress'),
                  text: 'Plot-D567, G.T. Tilak Road, Mahavir Nagar, Mumbai-400067 Maharashtra',
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
            <TouchableOpacity activeOpacity={0.8} onPress={contactAdminHandler}>
              <Text
                style={[
                  CommonStyles.marginHorizontal10,
                  {textDecorationLine: 'underline'},
                ]}
                theme={{colors: {onSurface: COLORS.green}}}
                variant="bodyMedium">
                Contact Admin
              </Text>
            </TouchableOpacity>
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
  const renderKycIcon = () => {
    return (
      <>
        <Image
          source={require('../../../assets/images/kycIcon.png')}
          style={[styles.iconStyle, styles.top]}
        />
      </>
    );
  };
  const customRightKyc = (expanded: boolean) => {
    return (
      <View style={CommonStyles.flexRow}>
        <Image
          source={require('../../../assets/images/pendingKyc.png')}
          style={[styles.iconStyle, styles.top]}
        />
        <Image
          source={
            expanded
              ? require('../../../assets/images/downArrow.png')
              : require('../../../assets/images/upArrow.png')
          }
          style={styles.iconStyle}
        />
      </View>
    );
  };
  const renderKycSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion
          title="KYC"
          leftComponent={renderKycIcon}
          customRight={customRightKyc}
          childrenStyles={styles.accordionchildrenStyles}>
          <View style={CommonStyles.flexRow}>
            <Text style={[fontConfig.labelLarge, styles.kyctextStyle]}>
              KYC not done yet?
            </Text>
            <CustomButton
              style={styles.kycButton}
              type={ButtonTypes.contained}
              text={'Complete KYC'}
              onPress={() => {}}
              textStyle={styles.kycBtntextStyle}
            />
          </View>
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
  const onCustomPressLogout = () => {
    setShowLogoutModal(true);
  };
  const renderLogoutSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion
          leftComponent={renderLogoutIcon}
          title="Logout"
          // customRight={() => {}}
          onCustomPress={onCustomPressLogout}>
          <></>
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
    activeDp.current = '';
  };

  const renderModalContent = () => {
    return (
      <ModalComponent showModal={showModal}>
        <View style={styles.modalTopContainer}>
          <TouchableOpacity
            onPress={() => setShowModal(!showModal)}
            style={CommonStyles.selfFlexEnd}>
            <SvgClose width={16} height={16} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.modalHeading}>
              {getTranslationLabel('profile-modal-heading1')}
            </Text>
            <Text style={styles.modalHeading}>
              {getTranslationLabel('profile-modal-heading2')}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.modalSubHeading}>
              {getTranslationLabel('profile-modal-subHeading')}
            </Text>
            <View style={styles.contactContainer}>
              <View style={[CommonStyles.flexRow, CommonStyles.center]}>
                <SvgCall width={heightToRatio(18)} height={heightToRatio(18)} />
                <Text style={styles.modalContact}>
                  {getTranslationLabel('profile-modal-email')}
                </Text>
              </View>
              <View style={[CommonStyles.flexRow, CommonStyles.center]}>
                <SvgEmail
                  width={heightToRatio(18)}
                  height={heightToRatio(18)}
                />
                <Text style={styles.modalContact}>
                  {getTranslationLabel('profile-modal-contact')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ModalComponent>
    );
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
        {renderProfilesDetailsSection()}

        {renderKycSection()}
        {renderLanguageSection()}
        {renderNotificationSection()}
        {renderLogoutSection()}
        {renderModalContent()}
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
        <SuccessFailureModal
          btnType="both"
          primaryButtonTitle={getTranslationLabel('dismiss')}
          secondaryBtnTitle={getTranslationLabel('logout')}
          title={getTranslationLabel('logout')}
          icon={<LogoutIcon width="40" height="40" />}
          label={getTranslationLabel('logout_description')}
          onPrimaryBtnHandler={() => setShowLogoutModal(false)}
          onSecondaryBtnHandler={() => {
            handleLogout();
          }}
          setShowModal={() => setShowLogoutModal(false)}
          showModal={showLogoutModal}
          theme={{colors: {onSurface: COLORS.black}}}
        />
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
  modalTopContainer: {
    height: heightToRatio(237),
    width: widthToRatio(312),
    paddingHorizontal: widthToRatio(12),
    paddingVertical: heightToRatio(12),
  },
  modalSubHeading: {
    fontWeight: '500',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(17.5),
    color: COLORS.grey500,
  },
  modalHeading: {
    fontWeight: '700',
    fontSize: heightToRatio(20),
    lineHeight: heightToRatio(25),
    color: COLORS.grey500,
  },
  divider: {
    width: '100%',
    height: heightToRatio(1),
    backgroundColor: COLORS.dividerGrey,
    marginVertical: heightToRatio(12),
  },
  contactContainer: {
    marginTop: heightToRatio(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContact: {
    color: COLORS.green,
    fontWeight: '400',
    fontSize: heightToRatio(14),
    lineHeight: heightToRatio(21),
    marginLeft: widthToRatio(6),
    textAlignVertical: 'center',
  },
  top: {
    top: 2,
  },
  accordionchildrenStyles: {
    paddingVertical: 0,
  },
  kyctextStyle: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  kycButton: {
    marginLeft: 'auto',
    marginRight: 24,
    marginVertical: 16,
    height: heightToRatio(32),
  },
  kycBtntextStyle: {
    height: 46,
    ...fontConfig.labelMedium,
    color: COLORS.white,
  },
});
export default ProfileScreen;
