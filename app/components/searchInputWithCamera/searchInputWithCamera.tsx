import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/theme/colors';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import UploadImageBottomSheet from '@/bottomSheets/uploadImageBottomSheet/UploadImageBottomSheet';

const SearchInputWithCamera = ({
  onChangeText = () => {},
  placeholder = 'Search by product, category...',
  value = '',
  setPhoto = () => {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/search.png')}
        style={styles.icon}
      />
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
        }}>
        <Image
          source={require('../../../assets/images/camera_alt.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <UploadImageBottomSheet
        setPhoto={newPhoto =>
          setPhoto((prevPhoto: any) => [...prevPhoto, newPhoto])
        }
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SearchInputWithCamera;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 30,
    backgroundColor: COLORS.white,
    height: heightToRatio(40),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7C9C9',
  },
  textInputView: {
    backgroundColor: COLORS.white,
    borderWidth: 0,
    borderColor: COLORS.white,
    height: heightToRatio(38),
    marginRight: 'auto',
  },
  icon: {
    width: widthToRatio(24),
    aspectRatio: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    margin: 12,
  },
});
