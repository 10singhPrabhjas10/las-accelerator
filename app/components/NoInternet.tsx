import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {COLORS} from 'theme/colors';
import {getTranslationLabel} from 'utils/commonMethods';

const {width} = Dimensions.get('window');
export const NoInternetToast = () => {
  const netInfo = useNetInfo();
  if (!netInfo.isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>
          {getTranslationLabel('no_internet')}
        </Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
  offlineContainer: {
    backgroundColor: COLORS.red,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
  offlineText: {fontSize: 11, color: COLORS.white},
});
