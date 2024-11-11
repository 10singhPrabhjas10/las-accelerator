import React from 'react';
import {BarChart, stackDataItem} from 'react-native-gifted-charts';
import {StyleSheet, View} from 'react-native';
import {ISalesData, performanceData} from '@/utils/dummyData';
import {heightToRatio} from '@/utils/commonMethods';
import CardWrapper from '../card/Card';
import {Text} from 'react-native-paper';
import {COLORS} from '@/theme/colors';
import CommonStyles from '@/utils/commonStyle';
const CustomBarChart = () => {
  const transformedData = (data: ISalesData[]) => {
    return data.map(item => ({
      value: item.sales,
      label: item.date,
      frontColor: '#76CAFF',
    }));
  };
  const transformedData2 = (data: ISalesData[]) => {
    return data.map(item => ({
      value: item.sales - item.sales * Math.random(),
      label: item.date,
      frontColor: '#76CAFF',
    }));
  };

  return (
    <CardWrapper cardStyle={styles.container}>
      <View style={styles.title}>
        <Text variant="headlineSmall">Total Sales</Text>
        <View style={CommonStyles.flexRow}>
          <View style={[styles.subTitle, CommonStyles.marginHorizontal10]}>
            <View
              style={[styles.squareBox, {backgroundColor: COLORS.powderBlue}]}
            />
            <Text variant="bodySmall">Achived</Text>
          </View>
          <View style={styles.subTitle}>
            <View
              style={[styles.squareBox, {backgroundColor: COLORS.bondiBlue}]}
            />
            <Text variant="bodySmall">Target</Text>
          </View>
        </View>
      </View>
      <View style={{}}>
        <BarChart
          barWidth={10}
          noOfSections={3}
          showLine
          color={COLORS.powderBlue}
          lineConfig={{
            curved: true,
            thickness: 2,
            color: COLORS.bondiBlue,
            dataPointsColor: COLORS.white,
          }}
          lineData={transformedData2(performanceData.salesReport.salesData)}
          barBorderRadius={4}
          frontColor="lightgray"
          data={transformedData(performanceData.salesReport.salesData)}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
    </CardWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  squareBox: {
    width: 10,
    borderRadius: 2,
    aspectRatio: 1,
    marginHorizontal: 5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomBarChart;
