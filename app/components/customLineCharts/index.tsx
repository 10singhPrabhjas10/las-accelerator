import React from 'react';
import {
  BarChart,
  LineChart,
  lineDataItem,
  stackDataItem,
} from 'react-native-gifted-charts';
import {StyleSheet, View} from 'react-native';
import {ISalesData, performanceData} from '@/utils/dummyData';
import {heightToRatio} from '@/utils/commonMethods';
import CardWrapper from '../card/Card';
import {Text} from 'react-native-paper';
import {COLORS} from '@/theme/colors';
import CommonStyles from '@/utils/commonStyle';
const CustomLineChart = () => {
  const transformedData = (data: ISalesData[]) => {
    return data.map(item => ({
      value: item.sales,
      label: item.date,
    }));
  };
  const transformedData2 = (data: ISalesData[]) => {
    return data.map(item => {
      let item_: lineDataItem = {
        value: item.sales - item.sales * Math.random(),
        label: item.date,
      };
      return item_;
    });
  };
  const CustomLable = item => {
    return (
      <CardWrapper cardStyle={styles.toolTip}>
        <Text variant="labelLarge" numberOfLines={1}>
          {item.item[0].value}
        </Text>
        <Text variant="labelSmall" style={{color: COLORS.shamrock}}>
          2%
        </Text>
      </CardWrapper>
    );
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
        <LineChart
          noOfSections={3}
          thickness1={4}
          thickness={4}
          dataPointsColor={COLORS.powderBlue}
          dataPointsColor1={COLORS.bondiBlue}
          curved={true}
          showDataPointLabelOnFocus
          color={COLORS.powderBlue}
          pointerConfig={{
            showPointerStrip: false,
            pointerColor: 'transparent',
            pointerLabelComponent: items => {
              return <CustomLable item={items} />;
            },
          }}
          color1={COLORS.bondiBlue}
          data={transformedData(performanceData.salesReport.salesData)}
          data2={transformedData2(performanceData.salesReport.salesData)}
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
  toolTip: {
    width: 100,
    aspectRatio: 3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});
export default CustomLineChart;
