import React from 'react';
import DashboardCard from '../index';
import {styles} from './styles';
import {commonStyles} from '../commonStyles';
import {StyleSheet} from 'react-native';

const mergedStyles = StyleSheet.flatten([commonStyles, styles]);

const data = {
  dashboardTitle: 'Retailer Sales Dashboard',
  metrics: [
    {key: 'mtdOrder', label: 'MTD Orders', value: '₹4.12 L'},
    {key: 'totalOrders', label: 'Total Orders', value: '₹11.2 L'},
  ],
  footerLabel: 'Last Order Date',
  footerValue: '13-08-2023',
};

const RetailerSalesCard = () => {
  return <DashboardCard data={data} styles={mergedStyles} />;
};

export default RetailerSalesCard;
