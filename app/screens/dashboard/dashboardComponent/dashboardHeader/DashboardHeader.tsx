import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {clearUser, updateIsAuthenticated} from 'store/redux/userSlice';

import styles from './DashboardHeader.style';
import {clearStorage, removeData} from 'utils/AppStorage';
import LogoSvg from '../../../../../assets/images/logo.svg';
import LanguageSvg from '../../../../../assets/icons/languageIcon.svg';
import LogoutSvg from '../../../../../assets/icons/logoutIcon.svg';
import UserProfileSvg from '../../../../../assets/icons/user.svg';
import {RootState} from 'store/redux/store';
import SuccessFailureModal from 'modals/SuccessFailureModal';
import LogoutIcon from '../../../../../assets/icons/logoutIcon.svg';
import {RootNavigationProp} from 'routes/RootNavigation';
import {COLORS} from 'theme/colors';
import {getTranslationLabel} from 'utils/commonMethods';

const DashboardHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const activeLanguage = useSelector(
    (state: RootState) => state?.localization?.selectedLanguage,
  );
  const userData = useSelector((state: RootState) => state?.user?.user);

  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation<RootNavigationProp>();

  const imgUri = userData?.profilePhoto;

  const handleLogout = async () => {
    dispatch(clearUser());
    dispatch(updateIsAuthenticated(false));
    await removeData('ACCESS_TOKEN');
    await removeData('IS_FIRST_TIME_APP_LAUNCH');
    await clearStorage();
  };

  const handleLanguageSelection = () => {
    navigation.navigate('lSelection', {navigateTo: route.name});
  };

  return (
    <>
      <Card style={styles.cardBackground}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            style={styles.languageContainer}
            onPress={handleLanguageSelection}>
            <View style={styles.logoContainer}>
              <LanguageSvg width={20} height={20} />
              <Text variant="bodyMedium" style={styles.header}>
                {activeLanguage.title}
              </Text>
            </View>
          </TouchableOpacity>
          <LogoSvg />
        </View>
        <Card.Content>
          <View style={styles.container}>
            <View style={styles.userIcon}>
              <View style={styles.profileView}>
                {imgUri && (
                  <Image style={styles.profileView} source={{uri: imgUri}} />
                )}
              </View>
              <View style={styles.profileIcon}>
                {!imgUri && <UserProfileSvg />}
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text variant="bodyLarge" style={styles.textStyle}>{getTranslationLabel('welcome')}</Text>
              <View style={styles.titleSecondContainer}>
                <Text variant="titleLarge" style={styles.textStyle}>{userData?.lasUserName}</Text>
              </View>

              <Text variant="bodySmall" style={styles.textStyle}>{`${getTranslationLabel('las_id')}: ${
                userData?.lasId
              }`}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
              <LogoutSvg height={24} width={24} style={styles.logo}/>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
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
    </>
  );
};

export default DashboardHeader;
