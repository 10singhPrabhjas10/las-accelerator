import CardWrapper from '@/components/card/Card';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {styles} from './styles';
import {COLORS} from '@/theme/colors';
import {CurrencyCode} from '@/utils/Constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PerformaceReport} from '@/utils/dummyData';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import CommonStyles from '@/utils/commonStyle';
interface IPerformanceCard {
  customStyle: StyleProp<ViewStyle>;
}
function PerformanceCard({customStyle = {}}: IPerformanceCard) {
  const Incentive = () => {
    return (
      <View style={styles.incentiveParent}>
        <Text variant="bodySmall" style={styles.incentiveTextColor}>
          ₹ You have an incentive amount of ₹12,000
        </Text>
      </View>
    );
  };
  function Frame({
    target = '53 lacs',
    achived = '53 lacs',
    change = '-2.5%',
    category = 'Sales',
  }) {
    const changeDirection = !change.includes('-');
    change = changeDirection
      ? change.replace('+', '')
      : change.replace('-', '');
    return (
      <View style={styles.frameParent}>
        <Text variant="labelLarge" style={styles.firstPart}>
          {category}
        </Text>
        <View style={styles.secondPart}>
          <View style={CommonStyles.flexRow}>
            <View
              style={[
                styles.changeBackground,
                changeDirection
                  ? {backgroundColor: COLORS.appliedGreen}
                  : {backgroundColor: COLORS.backgroundRed},
              ]}>
              <Icon
                color={changeDirection ? COLORS.greenLaurel : COLORS.errorRed}
                name={changeDirection ? 'arrowup' : 'arrowdown'}
              />
            </View>
            <Text
              variant="labelMedium"
              style={
                changeDirection
                  ? {color: COLORS.greenLaurel}
                  : {color: COLORS.errorRed}
              }>
              {change}%
            </Text>
          </View>
          <View>
            <Text variant="labelMedium">Achived</Text>
            <Text variant="headlineSmall" style={styles.fontSize12}>
              {CurrencyCode}
              {achived}
            </Text>
          </View>
          <View>
            <Text variant="labelMedium">Target</Text>
            <Text variant="headlineSmall" style={styles.fontSize12}>
              {CurrencyCode}
              {target}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <CardWrapper cardStyle={[styles.parent, customStyle]}>
      <View style={styles.headLine}>
        <Text variant="headlineSmall" style={styles.fontSize}>
          Your Performance- FY 2024
        </Text>
        <Text variant="headlineSmall" style={styles.fontSize}>
          {'>'}
        </Text>
      </View>
      <Incentive />
      <View>
        {PerformaceReport.data.categories.map(item => {
          return (
            <Frame
              achived={item.achieved}
              target={item.target}
              category={item.category}
              change={String(item.percentage_change)}
            />
          );
        })}
      </View>
    </CardWrapper>
  );
}
export default PerformanceCard;
