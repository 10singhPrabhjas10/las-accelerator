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
import {getDeviceHeight, getTranslationLabel} from '@/utils/commonMethods';
import {updateIsFirstTimeAppLaunch} from '@/store/redux/userSlice';
import CommonStyles from '../../utils/commonStyle';
import LanguageSelectionList from './LanguageSelectionList';

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
      <View style={CommonStyles.rowSpaceBetweenFlex}>
        <SubHeader>
          <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.headerTitle}>
              {getTranslationLabel('select_language')}
            </Text>

            <LanguageSelectionList />
          </View>
        </SubHeader>
        <CustomButton
          type={ButtonTypes.contained}
          style={styles.button}
          text={'Proceed'}
          // loading={isLoading}
          onPress={() => {
            handleLanguageChange(selectedLanguage, () => {
              const navigateTo = route?.params?.navigateTo
                ? route?.params?.navigateTo
                : 'OnboardingScreens';

              navigation.navigate(navigateTo as never);
            });
          }}
        />
      </View>
    </Layout>
  );
};

export default LanguageSelection;
