import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Layout from 'components/Layout';
import CustomTabBar from '../../../components/customTabBar/CustomTabBar';
import {Tabs, TabScreen, TabsProvider} from 'react-native-paper-tabs';
import {COLORS} from '@/theme/colors';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';

import {PieChart} from 'react-native-svg-charts';
import styles from './../PerformanceStyle.ts';
import CommonStyles from '../../../utils/commonStyle.ts';
import CustomListItem from '../../../components/listItem/CommonListItem.tsx';
import {performanceData} from '../../../utils/dummyData.ts';
import {BarChart} from 'react-native-gifted-charts';
import {lightBlue100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const SalesReport = () => {
  const salesData = [82, 112];
  const colors = ['#5ED1B1', '#007354'];
  const barData = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T'},
    {value: 745, label: 'W'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
  ];
  const pieData = salesData
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: colors[index], // Use color based on index
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

  const transformedData = data => {
    return data.map(item => ({
      value: item.sales,
      label: item.date,
      frontColor: '#76CAFF',
    }));
  };

  const topProductList = () => {
    return (
      <View style={styles.cardSales}>
        <View style={CommonStyles.rowSpaceBetween}>
          <Text style={styles.cardTitle}>Top Product Sold</Text>
          <Text>Fab 2024</Text>
        </View>
        <FlatList
          data={performanceData.salesReport.topProductSold.topSoldProductList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CustomListItem
              title={item.productName}
              value={item.sale}
              icon={<Icon2 name="cube-outline" size={25} color="#000" />}
              percentageChange={item.salesIncreaseDecrease}
              otherData={
                <View style={styles.changeContainer}>
                  <Text style={true ? styles.increase : styles.decrease}>
                    {true ? '↑' : '↓'} {item.salesIncreaseDecrease}%
                  </Text>
                </View>
              }
            />
          )}
        />
        <Text style={styles.viewAll}>View all</Text>
      </View>
    );
  };

  const topRetailerList = () => {
    return (
      <View style={styles.cardSales}>
        <View style={CommonStyles.rowSpaceBetween}>
          <Text style={styles.cardTitle}>Top Retailers</Text>
          <Text>Fab 2024</Text>
        </View>
        <FlatList
          data={performanceData.salesReport.topRetailers.topRetailersList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CustomListItem
              title={item.retailerName}
              value={'retailer id :' + item.retailerId}
              otherData={
                <View style={styles.changeContainer}>
                  <Icon1 name="mail" size={20} color="gray" />
                </View>
              }
              // percentageChange={item.percentageChange}
              // isIncrease={item.isIncrease}
            />
          )}
        />
        <Text style={styles.viewAll}>View all</Text>
      </View>
    );
  };

  return (
    <View style={styles.containerSales}>
      <View style={styles.dateRange}>
        <Text>Date Range: </Text>
        <View style={[CommonStyles.rowSpaceBetween, {gap: 10}]}>
          <Text>7/4/2024 - 7/19/2024</Text>
          <Icon3 name="calendar" size={20} color="#000" />
        </View>
      </View>
      <View style={styles.cardSales}>
        <Text style={styles.cardTitle}>Sales Statistics</Text>
        <View style={styles.chartContainer}>
          <BarChart
            barWidth={22}
            noOfSections={3}
            showLine
            lineConfig={{
              curved: true,
              thickness: 2,
              color: '#0097A9',
              dataPointsColor: 'white',
            }}
            barBorderRadius={4}
            frontColor="lightgray"
            data={transformedData(performanceData.salesReport.salesData)}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
        <View style={styles.salesGoal}>
          <Text>₹58 Lakhs Sales goal</Text>
          <Text>₹52 Lakhs Achieved</Text>
        </View>
      </View>

      {/* Top Products Sold */}
      <View style={styles.cardSales}>
        <Text style={styles.cardTitle}>Top Products Sold</Text>
        <View style={styles.statsRow}>
          <CircularProgressBase
            value={10}
            radius={30}
            activeStrokeColor={'#f39c12'}
            inActiveStrokeColor={'#f39c1233'}>
            <Text>1%</Text>
          </CircularProgressBase>
          <Text>Returns</Text>
          <CircularProgressBase
            value={70}
            radius={30}
            activeStrokeColor={'#e74c3c'}
            inActiveStrokeColor={'#e74c3c33'}>
            <Text>2%</Text>
          </CircularProgressBase>
          <Text>Claims</Text>
        </View>
        {/* Product list */}
        <View style={styles.productList}>{/* Add product items here */}</View>
      </View>
      {topProductList()}
      {topRetailerList()}

      {/* Effective Coverage Area */}
      <View style={styles.cardSales}>
        <Text style={styles.cardTitle}>Effective Coverage Area</Text>
        <PieChart style={{height: 200}} data={pieData} innerRadius={80}>
          <Text style={styles.totalRetailers}>200</Text>
        </PieChart>
        <View style={styles.retailerStats}>
          <View style={styles.dotView}>
            <View style={[styles.dot, {backgroundColor: '#5ED1B1'}]}></View>
            <Text>82 Unique Bill Retailers</Text>
          </View>
          <View style={styles.dotView}>
            <View style={[styles.dot, {backgroundColor: '#007354'}]}></View>
            <Text>112 Zero Bill Retailers</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SalesReport;
