import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import RetailersComponent from '../components/RetailersComponent';
import DateRangePicker from '../../../../utils/DateRangePicker';
import {useAttendance} from '@/hooks/usePerformanceTabs';
import AttendenceMetricView from '../components/AttendenceMetricView';
import RetailerOverview from '../components/ProductivityRetailerOverView';
import RetailOrderView from '../components/RetailOrderView';

const {width} = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export default function ProductivityDashBoard() {
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

  // Show error state
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
          <RetailerOverview
            months={data.productRetailerTabData.retailerOverview.months}
            target={data.productRetailerTabData.retailerOverview.targetData}
            covered={data.productRetailerTabData.retailerOverview.coveredData}
            maxY={800}
            yStep={200}
            highlightIndex={
              data.productRetailerTabData.retailerOverview.defaultSelectedIndex
            }
            highlightValue={
              data.productRetailerTabData.retailerOverview.currentValue
            }
            highlightChange={
              data.productRetailerTabData.retailerOverview.percentChange
            }
          />
          <View style={styles.cardsRow}>
            <RetailOrderView
              title={data.commonTabData.retailersChart.title}
              value={data.commonTabData.retailersChart.value}
              cardStyle={{width: CARD_WIDTH, height: 320}}
              sections={data.commonTabData.retailersChart.sections}
            />

            <RetailOrderView
              title={data.commonTabData.ordersChart.title}
              value={data.commonTabData.ordersChart.value}
              cardStyle={{width: CARD_WIDTH, height: 320}}
              sections={data.commonTabData.ordersChart.sections}
            />
          </View>

          <AttendenceMetricView
            productivity={data.commonTabData.metricData.productivity}
            beatAdherence={data.commonTabData.metricData.beatAdherence}
            retailerCoverage={data.commonTabData.metricData.retailerCoverage}
            maxBeatAdherence={data.commonTabData.metricData.maxBeatAdherence}
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
