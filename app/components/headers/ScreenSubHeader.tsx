import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import {IScreenSubHeaderProps} from 'types/headers';

const ScreenSubHeader = ({title, subTitle}: IScreenSubHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text variant="labelLarge">{title}</Text>
      <Text variant="bodyMedium">{subTitle}</Text>
    </View>
  );
};

export default ScreenSubHeader;

const styles = StyleSheet.create({
  headerContainer: {paddingHorizontal: 20, marginTop: 20},
});
