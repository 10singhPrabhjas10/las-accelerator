import {View, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {Text} from 'react-native-paper';

import Spacer from 'components/spacer';

import {COLORS} from 'theme/colors';
import CommonStyles from 'utils/commonStyle';

interface InfoSectionProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const CardInfoSection = ({title, value, icon}: InfoSectionProps) => {
  return (
    <View style={styles.infoSection}>
      {icon}
      <Spacer size={5} />
      <Text
        variant="titleMedium"
        style={CommonStyles.textAlignCenter}
        theme={{colors: {onSurface: COLORS.darkGreen2}}}>
        {value}
      </Text>
      <Spacer size={3} />
      <Text
        variant="labelMedium"
        ellipsizeMode="tail"
        numberOfLines={2}
        style={CommonStyles.textAlignCenter}>
        {title}
      </Text>
    </View>
  );
};

export default CardInfoSection;

const styles = StyleSheet.create({
  infoSection: {
    flex: 1,
    alignItems: 'center',
  },
});
