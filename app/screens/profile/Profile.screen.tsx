import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {Image, StyleSheet, View} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {getProfileData, uploadProfile} from './Profile.business';
import {IProfileResponse} from './Profile.interface';
import {getTranslationLabel, heightToRatio} from 'utils/commonMethods';
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
import LogoutIcon from '../../../assets/icons/logoutIcon.svg';
import {fontConfig} from '@/theme/fonts';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import SuccessFailureModal from '@/modals/SuccessFailureModal';
import {clearUser} from '@/store/redux/userSlice';
import {clearStorage} from '@/utils/AppStorage';
import {boolean} from 'yup';
const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  // const user = useSelector((state: RootState) => state.user.user);
  // const [profileData, setProfileData] = useState<IProfileResponse[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getProfileData(setProfileData);
  // }, []);

  const handleLogout = async () => {
    dispatch(clearUser());
    await clearStorage();
  };
  const renderProfilesDetailsSection = () => {
    return (
      <View style={CommonStyles.marginBottom20}>
        <SubHeader shouldShowCardView={true} title={'Gururaj Chandrea'}>
          <CustomButton
            type={ButtonTypes.outline}
            text={'View mapped channel partner'}
            onPress={() => {
              navigation.navigate('MappedChannelPartner');
            }}
            textStyle={{color: 'green'}}
          />
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
          <View style={styles.viewLine}></View>
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
        <Accordion
          // eslint-disable-next-line react/no-unstable-nested-components
          leftComponent={renderNotificationIcon}
          title="Notification">
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
