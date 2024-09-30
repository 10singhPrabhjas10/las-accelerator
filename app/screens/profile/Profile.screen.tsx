import React, {useRef, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {StyleSheet, View, Image} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import styles from './profileStyle';
import {useDispatch, useSelector} from 'react-redux';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {updateTabIndex} from 'store/redux/modalSlice';
import {Switch, Text} from 'react-native-paper';
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
  callNumber,
  sendMail,
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
import InApp from '@/../assets/icons/inApp.svg';
import SMS from '@/../assets/icons/sms.svg';

import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import LanguageSelectionList from '../selectLanguage/LanguageSelectionList';
import CloseIcon from '../../../assets/icons/closeIcon.svg';
import CheckCircle from '../../../assets/icons/check_circle.svg';
import Edit from '../../../assets/icons/edit.svg';
import LogoutIcon from '../../../assets/icons/logoutIcon.svg';
import {fontConfig} from '@/theme/fonts';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import SuccessFailureModal from '@/modals/SuccessFailureModal';
import {clearUser} from '@/store/redux/userSlice';
import {clearStorage} from '@/utils/AppStorage';
import RowItem from '@/components/rowItem/RowItem';
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
  const [emailToggle, setEmailToggle] = useState<boolean>(false);
  const [smsToggle, setSmsToggle] = useState<boolean>(false);
  const [inAppToggle, setInAppToggle] = useState<boolean>(false);
  const language = useSelector(
    (state: RootState) => state.localization.selectedLanguage,
  );
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  // const [profileData, setProfileData] = useState<IProfileResponse[]>([]);
  const bottomSheetref = useRef();
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
              imageUrl={profilePicture?.path}
              isImageEdit
              imageUploadHandler={bottomSheetHandler}
              children={
                <View>
                  <Text style={styles.titleText}>Gururaj Chandrea</Text>

                  <CustomButton
                    style={{
                      borderRadius: 10,
                      height: heightToRatio(32),
                      marginTop: 20,
                      // backgroundColor: 'blue',
                    }}
                    type={ButtonTypes.contained}
                    text={'View mapped channel partner'}
                    onPress={() => {
                      navigation.navigate('MappedChannelPartner');
                    }}
                    textStyle={styles.greenLabel}
                  />
                  {/*  add view mapped channel partner button code here */}
                </View>
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
          <View style={styles.languageDropDown}>
            <View style={CommonStyles.flexRow}>
              <CheckCircle />
              <Text
                style={CommonStyles.marginHorizontal10}
                variant="titleMedium">
                {language.title}
              </Text>
            </View>
            <TouchableOpacity onPress={() => bottomSheetref.current.present()}>
              <Edit />
            </TouchableOpacity>
          </View>
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
            !expanded
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
          <View
            style={[CommonStyles.flexRow, {marginRight: 16, marginLeft: -24}]}>
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
          <View style={{marginRight: 16, marginVertical: 16, marginLeft: -24}}>
            <View style={styles.notificationToggle}>
              <SvgEmail />
              <Text style={styles.switchText}>Email</Text>
              <Switch
                value={emailToggle}
                onValueChange={() => {
                  setEmailToggle(!emailToggle);
                }}
                style={styles.switchStyles}
              />
            </View>
            <View style={styles.notificationToggle}>
              <SMS />
              <Text style={styles.switchText}>SMS</Text>
              <Switch
                value={smsToggle}
                onValueChange={() => {
                  setSmsToggle(!smsToggle);
                }}
                style={styles.switchStyles}
              />
            </View>
            <View style={[CommonStyles.flexRow]}>
              <InApp />
              <Text style={styles.switchText}>In-App</Text>
              <Switch
                value={inAppToggle}
                onValueChange={() => {
                  setInAppToggle(!inAppToggle);
                }}
                style={styles.switchStyles}
              />
            </View>
          </View>
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
          // removeRightIcon={true}
          title="Logout"
          customRight={() => {}}
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
        // setIsUpdatingPicture(true);
        setProfilePicture(result);
        activeDp.current = result?.path;
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
              <TouchableOpacity
                onPress={() => {
                  callNumber(getTranslationLabel('profile-modal-contact'));
                }}
                style={[CommonStyles.flexRow, CommonStyles.center]}>
                <SvgCall width={heightToRatio(18)} height={heightToRatio(18)} />
                <Text style={styles.modalContact}>
                  {getTranslationLabel('profile-modal-contact')}
                </Text>
              </TouchableOpacity>
              <Spacer size={20} />
              <TouchableOpacity
                onPress={() => {
                  sendMail(getTranslationLabel('profile-modal-email'));
                }}
                style={[CommonStyles.flexRow, CommonStyles.center]}>
                <SvgEmail
                  width={heightToRatio(18)}
                  height={heightToRatio(18)}
                />
                <Text style={styles.modalContact}>
                  {getTranslationLabel('profile-modal-email')}
                </Text>
              </TouchableOpacity>
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
          maxHeight={'80%'}
          minHeight={'80%'}
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
          // label={getTranslationLabel('logout_description')}
          onPrimaryBtnHandler={() => setShowLogoutModal(false)}
          onSecondaryBtnHandler={() => {
            handleLogout();
          }}
          setShowModal={() => setShowLogoutModal(false)}
          showModal={showLogoutModal}
          theme={{colors: {onSurface: COLORS.black}}}
        />
      </Layout>
      <BottomSheetModalComponent
        minHeight={'50%'}
        maxHeight={'70%'}
        ref={bottomSheetref}>
        <View style={styles.languageContainer}>
          <View style={styles.languageHead}>
            <Text variant="headlineSmall">
              {getTranslationLabel('change_language')}
            </Text>
            <TouchableOpacity onPress={() => bottomSheetref.current.close()}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <LanguageSelectionList
            onlanguageChange={() => bottomSheetref.current.close()}
          />
        </View>
      </BottomSheetModalComponent>
    </>
  );
};

export default ProfileScreen;
