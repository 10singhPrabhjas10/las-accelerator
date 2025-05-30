import {COLORS} from '@/theme/colors';
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
interface CustomTabBarProps {
  periods?: string[]; // Array of period strings
  selectedIndex?: number; // The index of the currently selected period
  setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>; // Function to update the selected index
  style?: StyleProp<ViewStyle>;
  activeText?: StyleProp<TextStyle>;
}
const CustomTabBar: React.FC<CustomTabBarProps> = ({
  periods,
  selectedIndex,
  setSelectedIndex,
  style = {},
  activeText = {},
}: CustomTabBarProps) => {
  return (
    <View style={[styles.periodContainer, style]}>
      {periods.map((period, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedIndex(index)}
          style={[
            styles.periodButton,
            index === selectedIndex ? styles.activePeriodButton : null,
          ]}>
          <Text
            variant="labelMedium"
            style={[
              styles.periodText,
              activeText,
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
    backgroundColor: COLORS.insightBackground,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: COLORS.dgreen,
    borderRadius: 8,
  },
  periodText: {
    color: COLORS.white,
  },
  activePeriodText: {
    color: COLORS.white,
  },
});

export default CustomTabBar;
