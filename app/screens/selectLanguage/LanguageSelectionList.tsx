import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CommonStyles from '../../utils/commonStyle';
import {Button, Card, Text} from 'react-native-paper';
import {LANGUAGES, ILanguage} from 'utils/Constants';
import styles from './LanguageSelection.style';
import {useDispatch, useSelector} from 'react-redux';
// Internal Dependencies
import {RootState} from 'store/redux/store';
import Layout from 'components/Layout';
import useLanguageSelection from 'hooks/useLanguageSelection';
import SvgUri from 'react-native-svg-uri';
import CheckCircle from '../../../assets/icons/check_circle.svg';
import appStringsLocal from '@/utils/appStringsLocal';
import {store} from '../../store/redux/store';
import {setCurrentLanguage} from '@/store/redux/localizationSlice';
interface ILanguage {
  onlanguageChange: (lan: ILanguage) => void;
}

const LanguageSelectionList = ({onlanguageChange}: ILanguage) => {
  const activeLanguage = useSelector(
    (state: RootState) => state?.localization?.selectedLanguage,
  );
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(
    activeLanguage ?? LANGUAGES[0],
  );

  const changeLanguage = (item: ILanguage) => {
    setSelectedLanguage(item);
    store.dispatch(
      setCurrentLanguage({
        selectedLanguageTranslation: appStringsLocal[item.id],
        language: item,
      }),
    );
    onlanguageChange(item);
  };

  return (
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
          elevation={0}
          onPress={() => {
            changeLanguage(item);
          }}>
          <Card.Content style={styles.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                width: '40%',
                justifyContent: 'space-between',
              }}>
              <Text variant="bodyMedium" ellipsizeMode="tail" numberOfLines={1}>
                {item.title}
              </Text>
              {selectedLanguage.id === item.id ? <CheckCircle /> : null}
            </View>
            <Image style={styles.icon} source={item.icon} />
          </Card.Content>
        </Card>
      )}
    />
  );
};
export default LanguageSelectionList;
