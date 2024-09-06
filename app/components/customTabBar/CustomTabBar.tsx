import {COLORS} from '@/theme/colors';
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomTabBarProps {
  periods: string[]; // Array of period strings
  selectedIndex: number; // The index of the currently selected period
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>; // Function to update the selected index
}
const CustomTabBar: React.FC<CustomTabBarProps> = ({
  periods,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <View style={styles.periodContainer}>
      {periods.map((period, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedIndex(index)}
          style={[
            styles.periodButton,
            index === selectedIndex ? styles.activePeriodButton : null,
          ]}>
          <Text
            style={[
              styles.periodText,
              index === selectedIndex ? styles.activePeriodText : null,
            ]}>
            {period}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#2c4248',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
  },
  periodText: {
    fontSize: 16,
    color: COLORS.white,
  },
  activePeriodText: {
    color: '#fff',
  },
});

export default CustomTabBar;
