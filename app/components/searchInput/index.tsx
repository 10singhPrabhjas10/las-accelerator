import {
  FlexAlignType,
  FlexStyle,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/theme/colors';
import {getTranslationLabel, heightToRatio} from '@/utils/commonMethods';
import UploadImageBottomSheet from '@/bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';
import Camera_alt from '../../../assets/images/camera_alt.svg';
import Search from '../../../assets/images/search.svg';
import {LayoutPropsType} from '@/types/components';

interface ISearchInput {
  onChangeText: (arg0: string) => void;
  placeholder: string;
  value: string;
  customStyles?: FlexStyle | FlexStyle[];
}

const SearchInput = ({
  onChangeText = () => {},
  placeholder = getTranslationLabel('search_by_product_category'),
  value = '',
  customStyles = {},
}: ISearchInput) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[styles.container, customStyles]}>
      <View style={styles.icon}>
        <Search />
      </View>
      <TextInput
        style={[styles.textInputView]}
        placeholder={placeholder}
        value={value}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 30,
    backgroundColor: COLORS.white,
    height: heightToRatio(40),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.dividerGrey,
  },
  textInputView: {
    backgroundColor: COLORS.white,
    borderWidth: 0,
    borderColor: COLORS.white,
    height: heightToRatio(38),
    marginRight: 'auto',
  },
  icon: {
    margin: 12,
    bottom: 2,
  },
});
