import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchInputWithCamera from '../searchInputWithCamera/searchInputWithCamera';
import CommonStyles from '@/utils/commonStyle';
import {heightToRatio} from '@/utils/commonMethods';
import {COLORS} from '@/theme/colors';
import {Text} from 'react-native-paper';
interface IOrderSearch {
  onChangeText: (img: any) => void;
  onChangeImage: (text: string) => void;
  title?: string;
}
const OrderSearch = ({
  onChangeImage = (img: any = {}) => {},
  onChangeText = (text: string = '') => {},
  title = '',
}: IOrderSearch) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchImg, setSearchImg] = useState<any>();
  const textHandle = (text: string) => {
    setSearchText(text);
    onChangeText(text);
  };
  const ImageHandle = (img: any) => {
    setSearchImg(img);
    onChangeImage(img);
  };
  return (
    <View style={styles.searchView}>
      {title && (
        <Text variant="headlineSmall" style={styles.text}>
          {title}
        </Text>
      )}
      <SearchInputWithCamera
        onChangeText={text => textHandle(text)}
        value={searchText}
        setPhoto={ImageHandle}
        containerStyles={CommonStyles.padding10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    backgroundColor: COLORS.dDarkGreen,
    minHeight: heightToRatio(88),
    paddingVertical: heightToRatio(15),
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: COLORS.white,
    paddingHorizontal: 10,
  },
});
export default OrderSearch;
