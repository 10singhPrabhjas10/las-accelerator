import {COLORS} from '@/theme/colors';
import {widthToRatio} from '@/utils/commonMethods';
import CommonStyles from '@/utils/commonStyle';
import React from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
const gradientColors = [
  '#26890D',
  '#008D34',
  '#00914F',
  '#009467',
  '#00957D',
  '#00978F',
  '#00979E',
  '#0097A9',
];
interface IOfferCard {
  title: string;
  subTitle: string;
  actionText: string;
  image: ImageProps;
  onAction: () => void;
}
const OfferCard = ({
  title = '12% OFF *',
  subTitle = 'On Master Water Heater',
  actionText = 'Place a Order',
  image = require('../../../assets/images/offer_dummy_image.png'),
  onAction = () => {},
}: IOfferCard) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={gradientColors}
      style={styles.parent}>
      <View style={[CommonStyles.flexOne, styles.textContainer]}> 
        <Text style={[styles.textColor, styles.textFont]} variant="titleMedium">
          {title}
        </Text>
        <Text style={styles.textColor} variant="titleSmall">
          {subTitle}
        </Text>
        <TouchableOpacity onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText} variant="titleSmall">
            {actionText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  parent: {
    minWidth: widthToRatio(262),
    height: widthToRatio(155),
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: widthToRatio(100),
    paddingLeft: 30,
    aspectRatio: 1,
  },
  textContainer: {
    width: widthToRatio(135)
  },
  textFont: {
    fontWeight: 'bold', 
    fontSize: 26
  },
  textColor: {
    color: COLORS.white,
  },
  button: {
    width: 100,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 11,
  },
  buttonText: {
    color: COLORS.dgreen,
  },
});
export default OfferCard;
