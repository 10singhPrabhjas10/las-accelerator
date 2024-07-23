import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Checkbox, Text} from 'react-native-paper';

import {COLORS} from 'theme/colors';
import CloseIcon from '../../../assets/icons/closeIcon.svg';

const FilterBottomSheetModal = ({onDismiss}: any) => {
  const data = [
    'Water Heaters',
    'Voltage Stabilisers',
    'Fans',
    'Electric Motors',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="headlineMedium">Filters</Text>
        <CloseIcon height={20} width={20} onPress={onDismiss} />
      </View>
      <View style={styles.bodyContainer}>
        <Text variant="bodyMedium" style={styles.filterTitleText}>
          Product Category
        </Text>
        {data.map(item => {
          return (
            <View style={styles.filterItemContainer}>
              <Checkbox.Android status={'unchecked'} />
              <Text variant="bodySmall">{item}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.container}
          theme={{colors: {outline: COLORS.orange}, roundness: 1}}
          mode="outlined"
          onPress={() => {}}>
          <Text variant="bodySmall">Clear</Text>
        </Button>
        <Button
          style={styles.container}
          theme={{roundness: 1}}
          mode="contained"
          onPress={() => {}}>
          <Text variant="bodySmall">Apply</Text>
        </Button>
      </View>
    </View>
  );
};

export default FilterBottomSheetModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  filterTitleText: {paddingBottom: 15},
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  buttonContainer: {flexDirection: 'row', gap: 30},
});
