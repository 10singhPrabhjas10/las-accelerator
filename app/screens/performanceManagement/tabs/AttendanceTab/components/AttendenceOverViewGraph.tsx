import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Rect, G, Line} from 'react-native-svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Types for the component props
type AttendanceData = {
  months: string[];
  workDays: number[];
  presentDays: number[];
};

type AttendanceOverviewProps = AttendanceData & {
  highlightMonth?: string;
  currentMonth?: string;
};

// Chart constants
const CHART_HEIGHT = 200;
const PADDING = 16;
const Y_AXIS_WIDTH = 56;
const Y_AXIS_MARGIN = 8;
const BAR_WIDTH = 6;
const GROUP_GAP = 28;
const BAR_GAP = 2;
const LEFT_MARGIN = 8;
const RIGHT_MARGIN = 8;

const CHART_WIDTH = SCREEN_WIDTH - PADDING * 2 - Y_AXIS_WIDTH - Y_AXIS_MARGIN;

export default function AttendanceOverview({
  months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  workDays = [29, 30, 29, 30, 31, 29],
  presentDays = [24, 27, 26, 27, 29, 25],
  highlightMonth = 'Feb',
  currentMonth = 'Feb 2024',
}: AttendanceOverviewProps) {
  // Calculate max Y value dynamically based on data
  const MAX_Y = Math.max(...workDays, ...presentDays, 40); // Use at least 40 for grid lines

  // Calculate bar positions
  const bars = months.map((month, i) => {
    // Shift all bars to the right by LEFT_MARGIN
    const groupX = LEFT_MARGIN + i * (BAR_WIDTH * 2 + BAR_GAP + GROUP_GAP);
    return {
      work: {
        x: groupX,
        y: CHART_HEIGHT - (workDays[i] / MAX_Y) * CHART_HEIGHT,
        height: (workDays[i] / MAX_Y) * CHART_HEIGHT,
      },
      present: {
        x: groupX + BAR_WIDTH + BAR_GAP,
        y: CHART_HEIGHT - (presentDays[i] / MAX_Y) * CHART_HEIGHT,
        height: (presentDays[i] / MAX_Y) * CHART_HEIGHT,
      },
    };
  });

  // Calculate total chart width dynamically
  const totalBarGroups = months.length;
  const chartContentWidth =
    LEFT_MARGIN +
    totalBarGroups * (BAR_WIDTH * 2 + BAR_GAP + GROUP_GAP) -
    GROUP_GAP +
    RIGHT_MARGIN;

  // Calculate y-axis ticks dynamically
  const yAxisTicks = [MAX_Y, MAX_Y * 0.75, MAX_Y * 0.5, MAX_Y * 0.25, 0].map(
    value => Math.round(value),
  );

  // Get the current month's work and present days for the legend
  const currentMonthIndex = months.indexOf(highlightMonth);
  const currentWorkDays =
    currentMonthIndex >= 0
      ? workDays[currentMonthIndex]
      : workDays[workDays.length - 1];
  const currentPresentDays =
    currentMonthIndex >= 0
      ? presentDays[currentMonthIndex]
      : presentDays[presentDays.length - 1];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Attendance Overview</Text>
        <TouchableOpacity style={styles.monthBtn}>
          <Text style={styles.monthBtnText}>{currentMonth}</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Row: Y-Axis + Chart */}
      <View style={styles.chartRow}>
        {/* Y-Axis Labels */}
        <View style={styles.yAxisLabels}>
          {yAxisTicks.map((v, i) => (
            <Text key={i} style={styles.yAxisText}>
              {v} Days
            </Text>
          ))}
        </View>

        {/* Chart and Month Labels */}
        <View>
          <Svg width={chartContentWidth} height={CHART_HEIGHT}>
            {/* Horizontal grid lines */}
            {yAxisTicks.map((v, i) => (
              <Line
                key={i}
                x1={0}
                x2={chartContentWidth}
                y1={CHART_HEIGHT - (v / MAX_Y) * CHART_HEIGHT}
                y2={CHART_HEIGHT - (v / MAX_Y) * CHART_HEIGHT}
                stroke="#CBD5E1"
                strokeWidth={0.5}
              />
            ))}

            {/* Bars */}
            <G>
              {bars.map((bar, i) => (
                <React.Fragment key={i}>
                  <Rect
                    x={bar.work.x}
                    y={bar.work.y}
                    width={BAR_WIDTH}
                    height={bar.work.height}
                    rx={4}
                    fill="#5DD39E"
                  />
                  <Rect
                    x={bar.present.x}
                    y={bar.present.y}
                    width={BAR_WIDTH}
                    height={bar.present.height}
                    rx={4}
                    fill="#6C63FF"
                  />
                </React.Fragment>
              ))}
            </G>
          </Svg>

          {/* Month Labels */}
          <View
            style={[
              styles.monthLabels,
              {width: chartContentWidth, position: 'relative'},
            ]}>
            {bars.map((bar, i) => (
              <Text
                key={i}
                style={[
                  styles.monthText,
                  {
                    position: 'absolute',
                    left: (bar.work.x + bar.present.x + BAR_WIDTH) / 2 - 18, // 18 = half of label width (36)
                  },
                  months[i] === highlightMonth
                    ? {color: '#22223B', fontWeight: '400'}
                    : {color: '#A0AEC0', fontWeight: 'normal'},
                ]}>
                {months[i]}
              </Text>
            ))}
            <View style={{width: RIGHT_MARGIN}} />
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#5DD39E'}]} />
          <Text style={styles.legendtext}>
            <Text style={styles.legendNumber}>{currentWorkDays}</Text> Work Days
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#6C63FF'}]} />
          <Text style={styles.legendtext}>
            <Text style={styles.legendNumber}>{currentPresentDays}</Text>{' '}
            Present Days
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 18,
    margin: 0,
    marginTop: 4,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#22223B',
  },
  monthBtn: {
    backgroundColor: '#E6EDEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  monthBtnText: {
    color: '#004F59',
    fontWeight: '400',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  yAxisLabels: {
    width: 56,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  yAxisText: {
    fontSize: 15,
    color: '#A0AEC0',
    textAlign: 'right',
    fontWeight: '500',
  },
  monthLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    width: CHART_WIDTH,
    alignSelf: 'flex-start',
  },
  monthText: {
    fontSize: 14,
    color: '#22223B',
    width: 36,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'column',
    marginTop: 36,
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  legendNumber: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  legendtext: {
    fontSize: 12,
  },
});
