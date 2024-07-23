import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Text} from 'react-native-paper';

import Spacer from 'components/spacer';
import CardWrapper from 'components/card/Card';

import CustomPieChart from 'components/pieChart/CustomPieChart';
import CommonStyles from 'utils/commonStyle';
import RowItem from 'components/rowItem/RowItem';
import {IOutstandingData} from '../../FinancialInformation.interface';
import {convertInLakhsRupees} from 'utils/commonMethods';
import {GREY_TEXT_THEME} from 'theme/theme';

const VGOutstanding = ({data}: {data: IOutstandingData}) => {
  if (data?.pieChartData?.length === 0) {
    return (
      <Text theme={GREY_TEXT_THEME} style={CommonStyles.textAlignCenter}>
        VG Outstanding data is not available
      </Text>
    );
  }
  return (
    <CardWrapper cardStyle={styles.container}>
      <Text variant="bodyLarge" style={styles.textCenter}>
        VG Outstanding
      </Text>
      <Spacer size={20} />
      <CustomPieChart data={data.pieChartData} />
      <Divider style={CommonStyles.horizontalDivider} />
      <RowItem
        keyContent={'VG Outstanding'}
        value={convertInLakhsRupees(data.totalOutstanding)}
      />
      <RowItem
        keyContent={'Max Overdue Days'}
        value={String(data?.maxOverdueDays)}
        showDivider={false}
      />
    </CardWrapper>
  );
};

export default VGOutstanding;

const styles = StyleSheet.create({
  container: {padding: 5},
  rowSubContainer: {flex: 1, alignItems: 'center', paddingHorizontal: 20},
  textCenter: {textAlign: 'center'},
});
