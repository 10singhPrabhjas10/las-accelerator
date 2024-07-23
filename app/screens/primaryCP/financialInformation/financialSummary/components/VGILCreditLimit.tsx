import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

import Spacer from 'components/spacer';
import CardWrapper from 'components/card/Card';
import RowItem from 'components/rowItem/RowItem';

import CommonStyles from 'utils/commonStyle';
import {COLORS} from 'theme/colors';
import {IVgilCreditLimitProps} from '../../FinancialInformation.interface';
import {convertInLakhsRupees} from 'utils/commonMethods';

const VGILCreditLimit = ({data}: {data: IVgilCreditLimitProps}) => {
  const theme = {colors: {onSurface: COLORS.darkOrange2}};

  return (
    <CardWrapper cardStyle={styles.container}>
      <View style={styles.creditLimitContainer}>
        <Text variant="bodyLarge">Credit Limit</Text>
        <Spacer size={15} />
        <Text variant="titleLarge">
          {convertInLakhsRupees(data.totalCreditLimit)}
        </Text>
        <Spacer size={5} />
        <Text variant="bodySmall">Total Credit Limit</Text>
      </View>
      <Spacer size={20} />
      <View style={CommonStyles.flexRow}>
        <View style={styles.rowSubContainer}>
          <Text variant="titleLarge" theme={theme}>
            {convertInLakhsRupees(data.utilizedCreditLimit)}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={styles.textCenter}>
            Total Credit Limit Utilised
          </Text>
        </View>
        <Divider style={CommonStyles.verticalDivider} />
        <View style={styles.rowSubContainer}>
          <Text variant="titleLarge" theme={theme}>
            {convertInLakhsRupees(data.availableCreditLimit)}
          </Text>
          <Spacer size={5} />
          <Text variant="bodySmall" style={styles.textCenter}>
            Total Credit Limit Available
          </Text>
        </View>
      </View>
      <Spacer size={10} />
      <Divider style={CommonStyles.horizontalDivider} />
      <RowItem
        keyContent={'PEI(Payment Efficiency Index):'}
        value={data.pei + '%'}
        showDivider={false}
      />
    </CardWrapper>
  );
};

export default VGILCreditLimit;

const styles = StyleSheet.create({
  container: {padding: 5},
  creditLimitContainer: {alignItems: 'center'},
  rowSubContainer: {flex: 1, alignItems: 'center', paddingHorizontal: 20},
  textCenter: {textAlign: 'center'},
});
