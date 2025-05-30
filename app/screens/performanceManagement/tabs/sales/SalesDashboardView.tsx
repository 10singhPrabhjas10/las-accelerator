import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import RetailersComponent from '../components/RetailersComponent';
import DateRangePicker from '../../../../utils/DateRangePicker';
import {useAttendance} from '@/hooks/usePerformanceTabs';
import EffectiveCoverageArea from '../components/SalesEffective';
import SalesStatistics from '../components/SalesStatisticsView';
import TopProductsSold from '../components/SalesProductSold';
import TopProductsListItem from '../components/TotalProductList';
const CARD_MARGIN = 16;

export default function SalesReportTabData({dateRange}: any) {
  const [range, setRange] = useState(() => ({
    startDate: dateRange?.start
      ? new Date(dateRange.start)
      : new Date('2024-07-04'),
    endDate: dateRange?.end ? new Date(dateRange.end) : new Date('2024-07-19'),
  }));

  useEffect(() => {
    if (dateRange?.start && dateRange?.end) {
      setRange({
        startDate: new Date(dateRange.start),
        endDate: new Date(dateRange.end),
      });
    }
  }, [dateRange]);

  const {data, loading, error, setDateRange} = useAttendance(range);

  const handleDateRangeChange = (
    newRange:
      | {startDate: Date; endDate: Date}
      | ((prevState: {startDate: Date; endDate: Date}) => {
          startDate: Date;
          endDate: Date;
        }),
  ) => {
    setRange(newRange);
    setDateRange(newRange);
  };

  // Show loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  // Show error state once data is fetched from api
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
        <Text>{error.message}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setDateRange(range)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (data) {
    const {sales, topProductsSold, topProductsList, effectiveCoverage} =
      data.salesPerformanceTabData;

    const {retailers} = data.commonTabData;

    return (
      <View style={styles.scrollContainer}>
        <DateRangePicker value={range} onChange={handleDateRangeChange} />
        <SalesStatistics
          months={sales.months}
          salesGoals={sales.salesGoals}
          achieved={sales.achieved}
          title={sales.title}
          date={sales.date}
        />
        <TopProductsSold
          metrics={topProductsSold.metrics}
          title="Top Products Sold"
        />
        <TopProductsListItem
          products={topProductsList.products}
          title={topProductsList.title}
          date={topProductsList.date}
        />
        <RetailersComponent
          title="Top Retailers"
          dateLabel="Feb 2024"
          retailers={retailers}
          onViewAll={() => console.log('View all retailers clicked')}
          onEmail={retailer =>
            console.log('Custom email action for', retailer.name)
          }
        />
        <EffectiveCoverageArea
          total={effectiveCoverage.total}
          uniqueBill={effectiveCoverage.uniqueBill}
          zeroBill={effectiveCoverage.zeroBill}
          date={effectiveCoverage.date}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: CARD_MARGIN,
    gap: CARD_MARGIN,
  },
  scrollContainer: {
    padding: CARD_MARGIN,
    backgroundColor: '#EDF2F7',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: CARD_MARGIN,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EDF2F7',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EDF2F7',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53e3e',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
