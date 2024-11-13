import React from 'react';
import {Text} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import CardWrapper from '@/components/card/Card';

import GridVector from '@/../assets/icons/gridBackground.svg';
import ChartPieImg from '@/../assets/icons/ChartPieImg.svg';
import ArrowForwardImg from '@/../assets/icons/arrow_forward_img.svg';

const DashboardCard = ({data, styles}) => {
  return (
    <CardWrapper cardStyle={styles.cardContainer}>
      <View style={styles.cardFirstRow}>
        <GridVector style={styles.gridvector} />
        <View style={styles.firstRowContent}>
          <View style={styles.firstRowContentImg}>
            <ChartPieImg style={styles.chartpie} />
            <TouchableOpacity onPress={() => {}}>
              <ArrowForwardImg style={styles.arrow} />
            </TouchableOpacity>
          </View>
          <Text variant="titleMedium" style={styles.firstRowContentText}>
            {data.dashboardTitle}
          </Text>
        </View>
      </View>
      <View style={styles.cardSecondRow}>
        {data.metrics.map((metric, index) => (
          <View key={index} style={styles[`${metric.key}Container`]}>
            <Text variant="labelLarge" style={styles[`${metric.key}Text`]}>
              {metric.value}
            </Text>
            <Text variant="titleSmall">{metric.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cardThirdRow}>
        <Text variant="titleSmall">{data.footerLabel}</Text>
        <Text variant="labelLarge">{data.footerValue}</Text>
      </View>
    </CardWrapper>
  );
};

export default DashboardCard;
