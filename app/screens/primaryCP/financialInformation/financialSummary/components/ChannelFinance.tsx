import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Divider, SegmentedButtons, Text} from 'react-native-paper';

import CustomPieChart from 'components/pieChart/CustomPieChart';
import CardWrapper from 'components/card/Card';
import RowItem from 'components/rowItem/RowItem';

import CommonStyles from 'utils/commonStyle';
import Spacer from 'components/spacer';
import {COLORS} from 'theme/colors';
import {IChannelFinanceData} from '../../FinancialInformation.interface';
import {convertInLakhsRupees} from 'utils/commonMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {getChannelFinanceData} from '../../FinancialInformation.business';
import {useSelector} from 'react-redux';
import {RootState} from 'store/redux/store';
import {GREY_TEXT_THEME} from 'theme/theme';

const segmentedButtonsTheme = {
  colors: {
    secondaryContainer: COLORS.lightYellow,
    onSecondaryContainer: COLORS.black,
    onSurface: COLORS.grey,
    primary: COLORS.grey3,
  },
};

const segmentedButtonsData = [
  {
    value: 'Finance',
    label: 'Finance',
  },
  {
    value: 'Outstanding',
    label: 'Outstanding',
  },
];

const ChannelFinance = () => {
  const [tabValue, setTabValue] = useState('Finance');
  const [channelFinanceData, setChannelFinanceData] =
    useState<IChannelFinanceData>();
  const customerCode = useSelector(
    (state: RootState) => state.channelPartner.customerCode,
  );

  useEffect(() => {
    getChannelFinanceData(customerCode, setChannelFinanceData);
  }, [customerCode]);

  const financeChartData = [
    {value: Number(channelFinanceData?.utilized ?? 0), label: 'Utilized'},
    {value: Number(channelFinanceData?.available ?? 0), label: 'Available'},
  ];

  const outstandingChartData = [
    {value: Number(channelFinanceData?.dueIn0To7Days ?? 0), label: '0-7 Days'},
    {
      value: Number(channelFinanceData?.dueIn8To15Days ?? 0),
      label: '8-15 Days',
    },
    {
      value: Number(channelFinanceData?.dueIn16To29Days ?? 0),
      label: '16-29 Days',
    },
    {
      value: Number(channelFinanceData?.dueIn30To59Days ?? 0),
      label: '30-59 Days',
    },
    {value: Number(channelFinanceData?.dueAfter60Days ?? 0), label: '>60 Days'},
  ];

  if (!channelFinanceData) {
    return (
      <Text theme={GREY_TEXT_THEME} style={CommonStyles.textAlignCenter}>
        Channel finance data is not available
      </Text>
    );
  }

  return (
    <CardWrapper cardStyle={styles.cardContainer}>
      <SegmentedButtons
        theme={segmentedButtonsTheme}
        value={tabValue}
        onValueChange={setTabValue}
        buttons={segmentedButtonsData}
      />
      <Spacer size={20} />
      {tabValue === 'Finance' ? (
        <View style={styles.container}>
          <CustomPieChart data={financeChartData} />
          <Divider style={CommonStyles.horizontalDivider} />
          <RowItem
            keyContent={'Total Channel Finance'}
            value={convertInLakhsRupees(
              Number(channelFinanceData?.totalChannelFinal ?? 0),
            )}
          />
          <RowItem
            keyContent={'Channel Finance Overdue'}
            value={convertInLakhsRupees(
              Number(channelFinanceData?.channelFinanceOverdue ?? 0),
            )}
          />
          <RowItem
            keyContent={'Bank Name'}
            value={channelFinanceData?.bankName ?? EMPTY_DATA_DASH}
            showDivider={false}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <CustomPieChart data={outstandingChartData} />
          <Divider style={CommonStyles.horizontalDivider} />
          <RowItem
            keyContent={'Channel Finance Outstanding'}
            value={convertInLakhsRupees(
              Number(channelFinanceData?.channelFinanceOutstanding ?? 0),
            )}
          />
          <RowItem
            keyContent={'Max Overdue Days'}
            value={channelFinanceData?.maxOutstandingDays ?? EMPTY_DATA_DASH}
            showDivider={false}
          />
        </View>
      )}
    </CardWrapper>
  );
};

export default ChannelFinance;

const styles = StyleSheet.create({
  cardContainer: {padding: 5},
  container: {
    alignContent: 'center',
  },
});
