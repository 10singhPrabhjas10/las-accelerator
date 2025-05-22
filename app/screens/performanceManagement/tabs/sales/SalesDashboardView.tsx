import React, {useState} from 'react';
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

export default function SalesReportTabData() {
  const [range, setRange] = useState({
    startDate: new Date('2024-07-04'),
    endDate: new Date('2024-07-19'),
  });

  const {data, loading, error, setDateRange} = useAttendance(range);

  const handleDateRangeChange = newRange => {
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

  return (
    <View style={styles.scrollContainer}>
      <DateRangePicker value={range} onChange={handleDateRangeChange} />
      {data && (
        <>
          <SalesStatistics
            months={data.salesPerformanceTabData.sales.months}
            salesGoals={data.salesPerformanceTabData.sales.salesGoals}
            achieved={data.salesPerformanceTabData.sales.achieved}
            title={data.salesPerformanceTabData.sales.title}
            date={data.salesPerformanceTabData.sales.date}
          />
          <TopProductsSold
            metrics={data.salesPerformanceTabData.topProductsSold.metrics}
            title="Top Products Sold"
          />
          <TopProductsListItem
            products={data.salesPerformanceTabData.topProductsList.products}
            title={data.salesPerformanceTabData.topProductsList.title}
            date={data.salesPerformanceTabData.topProductsList.date}
          />
          <RetailersComponent
            title="Top Retailers"
            dateLabel="Feb 2024"
            retailers={data.commonTabData.retailers}
            onViewAll={() => console.log('View all retailers clicked')}
            onEmail={retailer =>
              console.log('Custom email action for', retailer.name)
            }
          />
          <EffectiveCoverageArea
            total={data.salesPerformanceTabData.effectiveCoverage.total}
            uniqueBill={
              data.salesPerformanceTabData.effectiveCoverage.uniqueBill
            }
            zeroBill={data.salesPerformanceTabData.effectiveCoverage.zeroBill}
            date={data.salesPerformanceTabData.effectiveCoverage.date}
          />
        </>
      )}
    </View>
  );
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
