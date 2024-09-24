import {ImageProps, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthToRatio} from '@/utils/commonMethods';
import {Image} from 'react-native';
import {COLORS} from '@/theme/colors';
import {fontConfig} from '@/theme/fonts';
interface CategoriesCardProps {
  title: String;
  imagePath: ImageProps;
  onPress: () => void;
}
const CategoriesCard = ({
  title = 'Water Heaters',
  imagePath = require('../../../assets/images/demoCategorieItem.png'),
  onPress,
}: CategoriesCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.continer}
      onPress={onPress}>
      <Image source={imagePath} style={styles.imagestyle} />
      <Text style={styles.titleName}>{title}</Text>
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
    shadowColor: COLORS.black,
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
