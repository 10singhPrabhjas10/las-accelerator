import {StyleSheet, View} from 'react-native';
import React, {SetStateAction} from 'react';
import CardWrapper from 'components/card/Card';
import {Divider, SegmentedButtons, Text} from 'react-native-paper';
import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import Spacer from 'components/spacer';

interface IComplianceCardProps {
  title: string;
  subTitle?: string;
  buttons: {value: string; label: string}[];
  data: {leftTitle: string; rightTitle: string; thirdTitle: string};
  leftValue: string;
  rightValue: string;
  thirdValue: string;
  onClick: (value: string) => void;
}

const ComplianceCard = ({
  title,
  subTitle,
  buttons,
  data,
  leftValue,
  rightValue,
  thirdValue,
  onClick,
}: IComplianceCardProps) => {
  const theme = {colors: {onSurface: COLORS.darkGreen2}};
  const [beatValue, setBeatValue] = React.useState('Monthly');
  return (
    <CardWrapper cardStyle={styles.container}>
      <Text style={CommonStyles.textAlignCenter} variant="titleMedium">
        {title}
      </Text>
      {subTitle && (
        <Text style={styles.subTitle} variant="bodySmall">
          {subTitle}
        </Text>
      )}
      <Spacer size={16} />
      <SegmentedButtons
        value={beatValue}
        onValueChange={value => {
          setBeatValue(value);
          onClick?.(value);
        }}
        theme={{colors: {secondaryContainer: COLORS.lightYellow}}}
        buttons={buttons}
      />
      <Spacer size={20} />
      <View style={CommonStyles.flexRow}>
        <View style={styles.rowSubContainer}>
          <Text variant="bodyLarge" theme={theme}>
            {data?.leftTitle}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={CommonStyles.textAlignCenter}>
            {leftValue}
          </Text>
        </View>
        <Divider style={CommonStyles.verticalDivider} />
        <View style={styles.rowSubContainer}>
          <Text variant="bodyLarge" theme={theme}>
            {data?.rightTitle}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={CommonStyles.textAlignCenter}>
            {rightValue}
          </Text>
        </View>
        <Divider style={CommonStyles.verticalDivider} />
        <View style={styles.rowSubContainer}>
          <Text variant="bodyLarge" theme={theme}>
            {data?.thirdTitle}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={CommonStyles.textAlignCenter}>
            {thirdValue}
          </Text>
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {padding: 5},
  rowSubContainer: {flex: 1, alignItems: 'center', paddingHorizontal: 10},
  subTitle: {color: COLORS.grey2, textAlign: 'center'},
});

export default ComplianceCard;
