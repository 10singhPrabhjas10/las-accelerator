import React from 'react';
import DashboardCard from '../index';
import {styles} from '../beatPlanCard/styles';
import {commonStyles} from '../commonStyles';
import {StyleSheet} from 'react-native';

const mergedStyles = StyleSheet.flatten([commonStyles, styles]);

const data = {
  dashboardTitle: 'Beat Plan Dashboard',
  metrics: [
    {key: 'totalOrder', label: 'Total Orders', value: 20},
    {key: 'totalBeats', label: 'Total Beats', value: 5},
    {key: 'totalSales', label: 'Total Sales', value: '₹20,000'},
  ],
  footerLabel: 'Total Duration',
  footerValue: '10:30 AM - 7:30 PM',
};

const BeatPlanCard = () => {
  return <DashboardCard data={data} styles={mergedStyles} />;
};
export default BeatPlanCard;
