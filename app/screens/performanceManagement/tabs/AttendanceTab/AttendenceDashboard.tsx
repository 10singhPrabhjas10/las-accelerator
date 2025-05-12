import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import RetailOrderView from './components/RetailOrderView';
import RetailersComponent from './components/RetailersComponent';
import AttendenceOverViewGraph from './components/AttendenceOverViewGraph';
import DateRangePicker from '../../../../utils/DateRangePicker';
import AttendenceMetricView from './components/AttendenceMetricView';

const {width} = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const myRetailers = [
  {
    id: '00222',
    name: 'Lakshmi Traders',
    initials: 'LT',
    email: 'example@example.com',
    avatar: '',
  },
  {
    id: '00223',
    name: 'HG Wells Electrical Ltd',
    initials: 'HG',
    email: 'example@example.com',
    avatar: null,
  },
  {
    id: '00224',
    name: 'ZMT Traders Ltd',
    initials: 'ZT',
    email: 'example@example.com',
    avatar: null,
  },
];

export default function AttendenceView() {
  const [range, setRange] = useState({
    startDate: new Date('2024-07-04'),
    endDate: new Date('2024-07-19'),
  });
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DateRangePicker value={range} onChange={setRange} />
      <AttendenceOverViewGraph
        months={['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']}
        workDays={[29, 30, 29, 30, 31, 29]}
        presentDays={[24, 27, 26, 27, 29, 25]}
        highlightMonth="Feb"
        currentMonth="Feb 2024"
      />
      <View style={styles.cardsRow}>
        <RetailOrderView
          title="Retailers"
          value={248}
          // eslint-disable-next-line react-native/no-inline-styles
          cardStyle={{width: CARD_WIDTH, height: 320}}
          sections={[
            {percent: 62, color: '#276749', label: 'New', bold: true},
            {percent: 13, color: '#81E6D9', label: 'Returning'},
            {percent: 23, color: '#4299E1', label: 'Inactive'},
          ]}
        />
        <RetailOrderView
          title="Orders"
          value={6874}
          // eslint-disable-next-line react-native/no-inline-styles
          cardStyle={{width: CARD_WIDTH, height: 320}}
          sections={[
            {
              percent: 40,
              color: '#276749',
              label: 'Unique Retailers Billed',
              bold: true,
            },
            {
              percent: 60,
              color: '#81E6D9',
              label: 'Unique Retailers Order Placed',
            },
          ]}
        />
      </View>
      <AttendenceMetricView
        productivity={88}
        beatAdherence={128}
        retailerCoverage={75}
        maxBeatAdherence={200}
      />
      <RetailersComponent
        title="New Retailers"
        dateLabel="Feb 2024"
        retailers={myRetailers}
        onViewAll={() => console.log('View all retailers clicked')}
        onEmail={retailer =>
          console.log('Custom email action for', retailer.name)
        }
      />
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
});
