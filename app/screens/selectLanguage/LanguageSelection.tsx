// External Dependencies
import React, {useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
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
  const isFirstTimeAppLaunch = useSelector(
    (state: RootState) => state.user.isFirstTimeAppLaunch,
  );

  const navigation = useNavigation<RootNavigationProp>();
  const route = useRoute<RouteProp<RootNavigationTypes, 'lSelection'>>();

  const buttonTheme = {
    roundness: 1,
    colors: {
      onSurface: COLORS.black,
    },
  };

  console.log(selectedLanguage);

  return (
    <Layout hideStatusBar>
      <View style={styles.mainContainer}>
        <Image
          source={require('../../../assets/images/languageScreenHeader.png')}
          style={styles.imageHeader}
        />
        <View style={styles.container}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            {useLanguageSelection('choose_language').label || 'Choose Language'}
          </Text>
          <FlatList
            data={LANGUAGES}
            keyExtractor={item => item.id}
            numColumns={3}
            style={styles.flatlist}
            renderItem={({item, index}) =>
              item?.id ? (
                <Card
                  style={
                    index >= 1
                      ? styles.disabledSubCardContainer
                      : selectedLanguage.id === item.id
                      ? styles.activeSubCardContainer
                      : styles.subCardContainer
                  }
                  disabled={index >= 1}
                  onPress={() => setSelectedLanguage(item)}>
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
              ) : (
                <View style={styles.subCardContainer} />
              )
            }
          />
        </View>
        <Button
          mode="contained"
          theme={buttonTheme}
          style={styles.button}
          onPress={() =>
            handleLanguageChange(selectedLanguage, () => {
              const navigateTo = route?.params?.navigateTo
                ? route?.params?.navigateTo
                : 'OnboardingScreens';

              navigation.navigate(navigateTo as never);
            })
          }>
          <Text variant="bodySmall">Proceed</Text>
        </Button>
      </View>
    </Layout>
  );
};

export default LanguageSelection;
