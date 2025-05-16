import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import {Circle, Line} from 'react-native-svg';
import * as shape from 'd3-shape';
import {commonStyles} from './styles/commonStyles';

interface RetailerOverviewProps {
  // Chart data
  targetData: number[];
  coveredData: number[];
  months: string[];
  currentValue: number;
  percentChange: string;
  highlightIndex?: number;

  // Visual customization
  title?: string;
  dateBadge?: string;
  targetColor?: string;
  coveredColor?: string;
  maxYValue?: number;
  yAxisValues?: number[];

  // Labels
  targetLabel?: string;
  coveredLabel?: string;
}

const RetailerOverview: React.FC<RetailerOverviewProps> = ({
  targetData = [],
  coveredData = [],
  months = [],
  currentValue = 0,
  percentChange = '',
  highlightIndex = months.length - 2,

  title = 'Retailer Overview',
  dateBadge = 'Feb 2024',
  targetColor = '#1ABC9C',
  coveredColor = '#6C5CE7',
  maxYValue = 800,
  yAxisValues = [800, 600, 400, 200, 0],

  // Labels with defaults
  targetLabel = 'Unique Retailers Target',
  coveredLabel = 'Unique Retailers Covered',
}) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const HorizontalLines = () => {
    return (
      <>
        {yAxisValues.slice(0, -1).map(y => (
          <Line
            key={y}
            x1={'0%'}
            x2={'100%'}
            y1={y}
            y2={y}
            stroke={'#ECEFF1'}
            strokeWidth={1}
          />
        ))}
      </>
    );
  };

  // Decorator that includes only dot and line
  // eslint-disable-next-line react/no-unstable-nested-components
  const DataPointDecorator = ({x, y, data}) => {
    const dotRadius = 10;
    if (
      !data ||
      data.length === 0 ||
      highlightIndex < 0 ||
      highlightIndex >= data.length
    ) {
      return null;
    }

    return (
      <>
        {/* Blue circle */}
        <Circle
          key="current-value-dot"
          cx={x(highlightIndex)}
          cy={y(data[highlightIndex])}
          r={dotRadius}
          fill={coveredColor}
          stroke={'white'}
          strokeWidth={2}
        />

        {/* Vertical line from bottom of circle */}
        <Line
          key="vertical-line"
          x1={x(highlightIndex)}
          x2={x(highlightIndex)}
          y1={y(data[highlightIndex]) + dotRadius}
          y2={'100%'}
          stroke={coveredColor}
          strokeWidth={2}
        />
      </>
    );
  };

  return (
    <View style={[commonStyles.card, styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{dateBadge}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.yAxisLabels}>
          {yAxisValues.map(value => (
            <Text key={value} style={styles.yAxisLabel}>
              {value}
            </Text>
          ))}
        </View>

        <View style={styles.chartContent}>
          {targetData.length > 0 && (
            <LineChart
              style={styles.chart}
              data={targetData}
              svg={{stroke: targetColor, strokeWidth: 3}}
              contentInset={{top: 20, bottom: 20, left: 10, right: 10}}
              curve={shape.curveBasis}
              yMin={0}
              yMax={maxYValue}>
              <HorizontalLines />
            </LineChart>
          )}

          {coveredData.length > 0 && (
            <LineChart
              style={[styles.chart, styles.overlayChart]}
              data={coveredData}
              svg={{stroke: coveredColor, strokeWidth: 3}}
              contentInset={{top: 20, bottom: 20, left: 10, right: 10}}
              curve={shape.curveBasis}
              yMin={0}
              yMax={maxYValue}>
              <DataPointDecorator />
            </LineChart>
          )}

          {highlightIndex >= 0 &&
            highlightIndex < months.length &&
            coveredData.length > highlightIndex && (
              <View
                style={[
                  styles.tooltipContainer,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    left: `${(highlightIndex / (months.length - 1)) * 100}%`,
                    top: 20,
                    transform: [{translateX: -70}],
                  },
                ]}>
                <View style={styles.tooltipBubble}>
                  <Text style={styles.tooltipValue}>{currentValue}</Text>
                  <Text
                    style={[
                      styles.tooltipPercent,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        color: percentChange.includes('+')
                          ? targetColor
                          : '#FF6B6B',
                      },
                    ]}>
                    {percentChange}
                  </Text>
                  <View style={styles.tooltipArrow} />
                </View>
              </View>
            )}

          <View style={styles.xAxis}>
            {months.map((month, index) => (
              <Text
                key={index}
                style={[
                  styles.xAxisLabel,
                  index === highlightIndex && styles.xAxisLabelHighlighted,
                ]}>
                {month}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: targetColor}]} />
          <Text style={styles.legendText}>{targetLabel}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: coveredColor}]} />
          <Text style={styles.legendText}>{coveredLabel}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F9F9',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 0,
    elevation: 2,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#282C3B',
    marginLeft: 8,
  },
  badge: {
    backgroundColor: '#E6EDEE',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    color: '#004F59',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 320,
    marginBottom: 20,
  },
  yAxisLabels: {
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  yAxisLabel: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  chartContent: {
    flex: 1,
    position: 'relative',
  },
  chart: {
    height: '100%',
  },
  overlayChart: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  xAxisLabel: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  xAxisLabelHighlighted: {
    fontWeight: 'bold',
    color: '#2D3436',
  },
  tooltipContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 140,
    alignItems: 'center',
  },
  tooltipBubble: {
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -10,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    transform: [{rotate: '45deg'}],
  },
  tooltipValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  tooltipPercent: {
    fontSize: 12,
    marginTop: 5,
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#4A4E52',
  },
});

export default RetailerOverview;
