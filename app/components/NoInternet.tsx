import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {COLORS} from 'theme/colors';
import {
  getTranslationLabel,
  heightToRatio,
  widthToRatio,
} from 'utils/commonMethods';
import {fontConfig} from '@/theme/fonts';
import {Image} from 'react-native';
import CustomButton from './button/CustomButton';
import {ButtonTypes} from '@/types/buttons';
import {Text} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

export const NoInternetToast = ({
  imageSource = require('../../assets/images/nointernet.png'),
  title = 'No Internet Connection',
  description = " It looks like you're offline. Please check your connection and refresh.",
}) => {
  const netInfo = useNetInfo();
  return !netInfo.isConnected ? (
    <View style={styles.offlineContainer}>
      <Image source={imageSource} style={styles.imageStyles} />
      <Text style={styles.offlineText}>{title}</Text>
      <Text style={styles.offlineSubText}>{description}</Text>
      <CustomButton
        style={styles.refreshBtn}
        type={ButtonTypes.contained}
        text={'Refresh'}
        onPress={() => {}}
        textStyle={styles.textStyle}
        icon={
          <Image
            source={require('../../assets/images/refresh.png')}
            style={styles.refeshIcon}
          />
        }
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: COLORS.white,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  offlineText: {...fontConfig.labelLarge, fontSize: 20, color: COLORS.black},
  offlineSubText: {
    ...fontConfig.bodyMedium,
    color: COLORS.black,
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 8,
  },
  imageStyles: {
    marginBottom: 16,
  },
  refreshBtn: {
    width: widthToRatio(88),
    height: heightToRatio(32),
    marginTop: 8,
  },
  textStyle: {
    color: COLORS.white,
  },
  refeshIcon: {
    width: widthToRatio(16),
    aspectRatio: 1,
    marginTop: 'auto',
    top: 2,
  },
});
