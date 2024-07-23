import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import styles from './Loader.style';
import {COLORS} from 'theme/colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer} />
      <ActivityIndicator animating={true} color={COLORS.yellow} size="large" />
    </View>
  );
};

export default Loader;
