import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {heightToRatio, widthToRatio} from '@/utils/commonMethods';
import {Image} from 'react-native';
import {COLORS} from '@/theme/colors';
import {fontConfig} from '@/theme/fonts';

const CategoriesCard = ({title, imagePath, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.continer}>
      <Image
        source={require('../../../assets/images/demoCategorieItem.png')}
        style={styles.imagestyle}
      />
      <Text style={styles.titleName}>Water Heaters</Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  continer: {
    width: widthToRatio(148),
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.white,
    marginBottom: 50,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15.46,

    elevation: 20,
  },
  imagestyle: {
    width: widthToRatio(78),
    aspectRatio: 1,
  },
  titleName: {
    ...fontConfig.labelMedium,
    color: COLORS.black,
    textAlign: 'center',
  },
});
