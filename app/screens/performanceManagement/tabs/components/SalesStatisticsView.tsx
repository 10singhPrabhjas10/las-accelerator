import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Svg, {Rect, Line, Circle} from 'react-native-svg';
import {commonStyles} from '../styles/commonStyles';

interface SalesStatisticsProps {
  months: string[];
  salesGoals: number[];
  achieved: number[];
  title?: string;
  date?: string;
  maxY?: number;
  yStep?: number;
  goalLabel?: string;
  achievedLabel?: string;
  goalColor?: string;
  achievedColor?: string;
}

const SalesStatistics: React.FC<SalesStatisticsProps> = ({
  months,
  salesGoals,
  achieved,
  title = 'Sales Statistics',
  date = 'Feb 2024',
  maxY = 80,
  yStep = 20,
  goalLabel = 'Sales goal',
  achievedLabel = 'Achieved',
  goalColor = '#7cc8fa',
  achievedColor = '#6c5ce7',
}) => {
  const screenWidth = Dimensions.get('window').width - 40;
  const yLabels = [];
  for (let y = maxY; y >= 0; y -= yStep) {
    yLabels.push(y);
  }

  // Calculate legend values dynamically
  const maxGoal = Math.max(...salesGoals);
  const avgAchieved = Math.round(
    achieved.reduce((a, b) => a + b, 0) / achieved.length,
  );

  return (
    <View>
      <View style={commonStyles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            {yLabels.map((value, index) => (
              <Text
                key={`y-label-${index}`}
                style={[
                  styles.yAxisLabel,
                  {
                    position: 'absolute',
                    top: 40 + index * 50 - 8,
                    right: 5,
                  },
                ]}>
                {value === 0 ? '0' : `${value} Lac`}
              </Text>
            ))}
          </View>

          {/* Custom chart implementation */}
          <View style={styles.chartContent}>
            <Svg height={300} width={screenWidth - 80}>
              {/* Horizontal grid lines */}
              {yLabels.map((_, index) => (
                <Line
                  key={`grid-${index}`}
                  x1="0"
                  y1={50 + index * 50}
                  x2={screenWidth - 80}
                  y2={50 + index * 50}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}

              {/* Bars for sales goals */}
              {salesGoals.map((value, index) => {
                const barHeight = (value / maxY) * 210;
                const barWidth = 10;
                const x = index * ((screenWidth - 80) / months.length) + 15;
                return (
                  <Rect
                    key={`bar-${index}`}
                    x={x}
                    y={250 - barHeight}
                    width={barWidth}
                    height={barHeight}
                    fill={goalColor}
                    rx={4}
                    ry={4}
                  />
                );
              })}

              {/* Line and points for achieved values */}
              {achieved.map((value, index) => {
                const x = index * ((screenWidth - 80) / months.length) + 30;
                const y = 250 - (value / maxY) * 200;
                return (
                  <Circle
                    key={`point-${index}`}
                    cx={x}
                    cy={y}
                    r={5}
                    fill={achievedColor}
                  />
                );
              })}

              {/* Connect the dots with lines */}
              {achieved.map((value, index) => {
                if (index === achieved.length - 1) return null;

                const x1 = index * ((screenWidth - 80) / months.length) + 30;
                const y1 = 250 - (value / maxY) * 200;
                const x2 =
                  (index + 1) * ((screenWidth - 80) / months.length) + 30;
                const y2 = 250 - (achieved[index + 1] / maxY) * 200;

                return (
                  <Line
                    key={`line-${index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={achievedColor}
                    strokeWidth="2"
                  />
                );
              })}

              {/* X-axis labels */}
              {months.map((month, index) => {
                const x = index * ((screenWidth - 80) / months.length) + 20;
                return (
                  <View
                    key={`label-${index}`}
                    style={{position: 'absolute', top: 255, left: x - 8}}>
                    <Text style={styles.xAxisLabel}>{month}</Text>
                  </View>
                );
              })}
            </Svg>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: goalColor}]} />
            <View>
              <Text style={styles.legendValue}>₹{maxGoal} Lakhs</Text>
              <Text style={styles.legendLabel}>{goalLabel}</Text>
            </View>
          </View>

          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, {backgroundColor: achievedColor}]}
            />
            <View>
              <Text style={styles.legendValue}>₹{avgAchieved} Lakhs</Text>
              <Text style={styles.legendLabel}>{achievedLabel}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282C3B',
  },
  dateContainer: {
    backgroundColor: '#E6EDEE',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  date: {
    fontSize: 14,
    color: '#004F59',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 300,
    marginBottom: 12,
  },
  yAxis: {
    width: 54,
    height: 320,
    position: 'relative',
    paddingRight: 2,
  },
  yAxisLabel: {
    color: '#7f8c8d',
    fontSize: 16,
  },
  chartContent: {
    flex: 1,
  },
  xAxisLabel: {
    color: '#7f8c8d',
    fontSize: 16,
    marginRight: 16,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    gap: 40,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendColor: {
    width: 8,
    height: 60,
    borderRadius: 4,
    marginRight: 10,
  },
  legendValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#282C3B',
  },
  legendLabel: {
    fontSize: 16,
    color: '#4A4E52',
    fontWeight: '400',
  },
});

export default SalesStatistics;
