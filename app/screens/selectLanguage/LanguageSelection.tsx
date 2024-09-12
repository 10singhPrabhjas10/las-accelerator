// External Dependencies
import React, {useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Text} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

// Internal Dependencies
import {RootState} from 'store/redux/store';
import Layout from 'components/Layout';
import useLanguageSelection from 'hooks/useLanguageSelection';

// Styles, constants and Interfaces
import styles from './LanguageSelection.style';
import {COLORS} from 'theme/colors';
import {LANGUAGES} from 'utils/Constants';
import {RootNavigationProp, RootNavigationTypes} from 'routes/RootNavigation';
import {handleLanguageChange} from './LanguageSelection.business';
import SubHeader from '@/components/subHeader/subHeader';
import ScreenHeader from '@/components/headers/ScreenHeader';
import CustomButton from '@/components/button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {getDeviceHeight} from '@/utils/commonMethods';
import {updateIsFirstTimeAppLaunch} from '@/store/redux/userSlice';

export interface ILanguage {
  id: string;
  icon: string;
  title: string;
}
const LanguageSelection = () => {
  const activeLanguage = useSelector(
    (state: RootState) => state?.localization?.selectedLanguage,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(
    activeLanguage ?? LANGUAGES[0],
  );
  const dispatch = useDispatch();

  const isFirstTimeAppLaunch = useSelector(
    (state: RootState) => state.user.isFirstTimeAppLaunch,
  );

  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'lSelection'>>();

  const buttonTheme = {
    roundness: 1,
    colors: {
      onSurface: COLORS.white,
    },
  };

  return (
    <Layout>
      <ScreenHeader showScreenName={false} />
      <SubHeader>
        <View style={styles.container}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            {useLanguageSelection('choose_language').label || 'Choose Language'}
          </Text>
          <FlatList
            data={LANGUAGES}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card
                style={
                  selectedLanguage.id === item.id
                    ? styles.activeSubCardContainer
                    : styles.subCardContainer
                }
                onPress={() => {
                  console.log('SubCard clicked');
                  setSelectedLanguage(item);
                }}>
                <Card.Content style={styles.cardContent}>
                  <Image source={item.icon} />
                  <Text
                    variant="bodySmall"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      </SubHeader>
      <CustomButton
        type={ButtonTypes.contained}
        style={styles.button}
        text={'Proceed'}
        // loading={isLoading}
        onPress={() => {
          dispatch(updateIsFirstTimeAppLaunch(false));
          // handleLanguageChange(selectedLanguage, () => {
          //   const navigateTo = route?.params?.navigateTo
          //     ? route?.params?.navigateTo
          //     : 'OnboardingScreens';

          //   navigation.navigate(navigateTo as never);
          // });
        }}
      />
    </Layout>
  );
};

export default LanguageSelection;
