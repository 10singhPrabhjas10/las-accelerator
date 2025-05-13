import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import RetailersComponent from './components/RetailersComponent';
import DateRangePicker from '../../../../utils/DateRangePicker';
import {useAttendance} from '@/hooks/useAttendance';
import MetricsDashboard from './components/AttendenceMetricView';
import AttendanceOverview from './components/AttendenceOverViewGraph';
import DonutChartCard from './components/RetailOrderView';

const {width} = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export default function AttendenceView() {
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
        <Text style={styles.loadingText}>Loading attendance data...</Text>
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DateRangePicker value={range} onChange={handleDateRangeChange} />

      {data && (
        <>
          <AttendanceOverview
            months={data.attendanceOverview.months}
            workDays={data.attendanceOverview.workDays}
            presentDays={data.attendanceOverview.presentDays}
            highlightMonth={data.attendanceOverview.highlightMonth}
            currentMonth={data.attendanceOverview.currentMonth}
          />

          <View style={styles.cardsRow}>
            <DonutChartCard
              title={data.retailersChart.title}
              value={data.retailersChart.value}
              cardStyle={{width: CARD_WIDTH, height: 320}}
              sections={data.retailersChart.sections}
            />

            <DonutChartCard
              title={data.ordersChart.title}
              value={data.ordersChart.value}
              cardStyle={{width: CARD_WIDTH, height: 320}}
              sections={data.ordersChart.sections}
            />
          </View>

          <MetricsDashboard
            productivity={data.metrics.productivity}
            beatAdherence={data.metrics.beatAdherence}
            retailerCoverage={data.metrics.retailerCoverage}
            maxBeatAdherence={data.metrics.maxBeatAdherence}
          />

          <RetailersComponent
            title="New Retailers"
            dateLabel={data.attendanceOverview.currentMonth}
            retailers={data.retailers}
            onViewAll={() => console.log('View all retailers clicked')}
            onEmail={retailer =>
              console.log('Custom email action for', retailer.name)
            }
          />
        </>
      )}
    </ScrollView>
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
