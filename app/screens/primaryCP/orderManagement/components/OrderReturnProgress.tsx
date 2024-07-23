import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {COLORS} from 'theme/colors';

const OrderReturnProgress = ({activeIndex}: IOrderReturnProgress) => {
  if (activeIndex === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.activeBg}>1</Text>
        <Text variant="bodyMedium" style={styles.text}>
          Request Initiation
        </Text>
        <View style={styles.longDashLine} />
        <Text style={styles.inactiveBg}>2</Text>
      </View>
    );
  }

  if (activeIndex === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.completedBg}>1</Text>
        <View style={styles.longDashLine} />
        <Text style={styles.activeBg}>2</Text>
        <Text variant="bodyMedium" style={styles.text}>
          SKU Details
        </Text>
      </View>
    );
  }
};

export default OrderReturnProgress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeBg: {
    backgroundColor: COLORS.orange,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: COLORS.white,
  },
  completedBg: {
    backgroundColor: COLORS.green,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: COLORS.white,
  },
  inactiveBg: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: COLORS.grey4,
  },
  longDashLine: {
    flex: 1,
    borderStyle: 'dashed',
    borderTopWidth: 1,
    color: COLORS.black,
    marginHorizontal: 5,
  },
  text: {color: COLORS.grey4, paddingHorizontal: 8},
});
