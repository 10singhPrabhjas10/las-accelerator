import {COLORS} from '@/theme/colors';
import {heightToRatio} from '@/utils/commonMethods';
import React from 'react';
import {StyleSheet, View} from 'react-native';
export default function BackgroundHeader(props: any) {
  return <View style={styles.parent}>{props.children}</View>;
}
const styles = StyleSheet.create({
  parent: {
    width: '100%',
    minHeight: heightToRatio(50),
    backgroundColor: COLORS.dDarkGreen,
  },
});
