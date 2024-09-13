import React, {useEffect, useState} from 'react';
import Layout from 'components/Layout';
import DataCard from 'components/dataCard/DataCard';
import {StyleSheet, View} from 'react-native';
import CommonStyles from 'utils/commonStyle';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from 'routes/RootNavigation';
import {getProfileData, uploadProfile} from './Profile.business';
import {IProfileResponse} from './Profile.interface';
import {getTranslationLabel} from 'utils/commonMethods';
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

const ProfileScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const user = useSelector((state: RootState) => state.user.user);
  const [profileData, setProfileData] = useState<IProfileResponse[]>([]);

  const dispatch = useDispatch();

  console.log('----ProfileData--', profileData);

  useEffect(() => {
    getProfileData(setProfileData);
  }, []);

  const renderProfilesDetailsSection = () => {
    return (
      <View style={CommonStyles.marginBottom20}>
        <SubHeader shouldShowCardView={true} title={'Gururaj Chandrea'}>
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

  const renderLogoutSection = () => {
    return (
      <View style={CommonStyles.marginHorizontal24}>
        <Accordion leftComponent={renderLogoutIcon} title="Logout">
          <View style={{height: 100, width: 200}} />
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
        <ScreenHeader showScreenName={false} />
        {renderProfilesDetailsSection()}

        {renderKycSection()}
        {renderLanguageSection()}
        {renderNotificationSection()}
        {renderLogoutSection()}
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
});
export default ProfileScreen;
