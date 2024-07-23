import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';
import {Text} from 'react-native-paper';
import {PieChart} from 'react-native-charts-wrapper';

import Spacer from 'components/spacer';

import {COLORS, PIE_CHART_COLORS} from 'theme/colors';
import {convertRupeesIntoLakhs} from 'utils/commonMethods';
import CommonStyles from 'utils/commonStyle';
import {ViewStyle} from 'react-native';

interface IPieChartData {
  color?: string;
  value: number;
  label: string;
}

interface IPieChartProps {
  data: IPieChartData[];
  legendColumnStyle?: ViewStyle;
  skipNumberFormat?: boolean;
}

const Legend = ({
  data,
  legendColumnStyle,
  skipNumberFormat = false,
}: IPieChartProps) => {
  return (
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={[styles.column, legendColumnStyle]}>
          <View
            key={index}
            style={[styles.colorBox, {backgroundColor: item.color}]}
          />
          <Text variant="titleMedium" style={styles.value}>
            {skipNumberFormat
              ? item.value.toLocaleString()
              : '₹' + item.value + 'L'}
          </Text>
          <Text variant="bodySmall" style={styles.value}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const CustomPieChart = ({
  data,
  legendColumnStyle,
  skipNumberFormat = false,
}: IPieChartProps) => {
  const subData = data.map((item, index) => ({
    label: item.label,
    value: skipNumberFormat
      ? item.value
      : convertRupeesIntoLakhs(Math.abs(item.value)),
    color: PIE_CHART_COLORS[index],
  }));

  const tempData = {
    dataVal: subData,
  };
  const testColor = tempData.dataVal?.map(item => item.color);

  const pieChartData = {
    dataSets: [
      {
        values: tempData.dataVal,
        label: 'Pie dataset',
        config: {
          colors: testColor?.map(color => processColor(color)),
          valueTextSize: 12,
          valueTextColor: processColor(COLORS.black),
          sliceSpace: 5,
          ...(!skipNumberFormat && {valueFormatter: "₹#.##'L'"}),
        },
      },
    ],
  };

  return (
    <View style={CommonStyles.center}>
      <PieChart
        holeRadius={3}
        holeColor={processColor('transparent')}
        legend={{
          enabled: false,
          orientation: 'HORIZONTAL',
          horizontalAlignment: 'CENTER',
        }}
        transparentCircleRadius={0}
        style={styles.pieChart}
        data={pieChartData}
        chartDescription={{text: ''}}
        drawEntryLabels={false}
        rotationEnabled={false}
      />
      <Spacer size={10} />
      <Legend
        legendColumnStyle={legendColumnStyle}
        data={tempData.dataVal}
        skipNumberFormat={skipNumberFormat}
      />
    </View>
  );
};

export default CustomPieChart;

const styles = StyleSheet.create({
  legendContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  column: {
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  value: {
    textAlign: 'center',
  },
  pieChart: {width: 250, height: 250},
});
