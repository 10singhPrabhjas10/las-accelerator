import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/theme/colors';
import {getTranslationLabel, heightToRatio} from '@/utils/commonMethods';
import UploadImageBottomSheet from '@/bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';
import Camera_alt from '../../../assets/images/camera_alt.svg';
import Search from '../../../assets/images/search.svg';

interface SearchInputWithCameraProps {
  onChangeText: (arg0: String) => void;
  placeholder: string;
  value: string;
  setPhoto: () => void;
  continerStyles: StyleProp<ViewStyle>;
}

const SearchInputWithCamera = ({
  onChangeText = () => {},
  placeholder = getTranslationLabel('search_by_product_category'),
  value = '',
  setPhoto = () => {},
  continerStyles = {},
}: SearchInputWithCameraProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={continerStyles}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Search />
        </View>
        <TextInput
          style={[styles.textInputView]}
          placeholder={placeholder}
          value={value}
          onChangeText={text => onChangeText(text)}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.icon}>
          <Camera_alt />
        </TouchableOpacity>
        <UploadImageBottomSheet
          setPhoto={newPhoto =>
            setPhoto((prevPhoto: any) => [...prevPhoto, newPhoto])
          }
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default SearchInputWithCamera;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
