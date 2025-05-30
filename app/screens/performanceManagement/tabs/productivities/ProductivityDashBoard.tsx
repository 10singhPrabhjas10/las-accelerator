import React, {useState, useEffect} from 'react';
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

export default function ProductivityDashBoard({dateRange}: any) {
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

  const handleDateRangeChange = newRange => {
    setRange(newRange);
    setDateRange(newRange);
  };

  // Prepare data for RetailerOverview to avoid chart errors
  let safeRetailerOverview = data?.productRetailerTabData?.retailerOverview;
  if (safeRetailerOverview) {
    if (safeRetailerOverview.targetData.length < 2) {
      safeRetailerOverview = {
        ...safeRetailerOverview,
        targetData: [
          safeRetailerOverview.targetData[0],
          safeRetailerOverview.targetData[0],
        ],
        coveredData: [
          safeRetailerOverview.coveredData[0],
          safeRetailerOverview.coveredData[0],
        ],
        months: [
          safeRetailerOverview.months[0],
          safeRetailerOverview.months[0],
        ],
      };
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

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

      {data && safeRetailerOverview && (
        <>
          <RetailerOverview
            months={safeRetailerOverview.months}
            target={safeRetailerOverview.targetData}
            covered={safeRetailerOverview.coveredData}
            maxY={800}
            yStep={200}
            highlightIndex={safeRetailerOverview.defaultSelectedIndex}
            highlightValue={safeRetailerOverview.currentValue}
            highlightChange={safeRetailerOverview.percentChange}
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
