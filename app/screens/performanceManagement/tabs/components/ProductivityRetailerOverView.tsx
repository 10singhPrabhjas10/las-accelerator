/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Svg, {Line, Path, Circle} from 'react-native-svg';
import {commonStyles} from '../styles/commonStyles';

const {width: screenWidth} = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 40;
const CHART_HEIGHT = 300;
const PADDING_LEFT = 50;
const PADDING_RIGHT = 30;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 40;

interface RetailerOverviewProps {
  months: string[];
  target: number[];
  covered: number[];
  maxY?: number;
  yStep?: number;
  title?: string;
  date?: string;
  highlightIndex?: number;
  highlightValue?: string;
  highlightChange?: string;
}

const RetailerOverview: React.FC<RetailerOverviewProps> = ({
  months,
  target,
  covered,
  maxY = 800,
  yStep = 200,
  title = 'Retailer Overview',
  date = 'Feb 2024',
  highlightIndex = 5,
  highlightValue = 489,
  highlightChange = 2.0,
}) => {
  const chartHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  //const chartWidth = CARD_WIDTH - PADDING_LEFT - PADDING_RIGHT;

  const chartWidth = CARD_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const xStep = chartWidth / (months.length - 1);
  // Y axis labels
  const yLabels = [];
  for (let y = maxY; y >= 0; y -= yStep) yLabels.push(y);

  // X positions for each month
  //const xStep = chartWidth / (months.length - 1);

  // Helper to get (x, y) for a value
  const getPoint = (i: number, value: number) => {
    const x = PADDING_LEFT + i * xStep;
    const y = PADDING_TOP + chartHeight - (value / maxY) * chartHeight;
    return {x, y};
  };

  // Helper to create smooth path (cubic Bezier)
  const getSmoothPath = (data: number[]) => {
    return data
      .map((v, i, arr) => {
        const {x, y} = getPoint(i, v);
        if (i === 0) return `M${x},${y}`;
        const prev = getPoint(i - 1, arr[i - 1]);
        const cpx = (prev.x + x) / 2;
        return `C${cpx},${prev.y} ${cpx},${y} ${x},${y}`;
      })
      .join(' ');
  };

  // Highlight point - use the provided highlightValue for positioning
  const highlight = getPoint(highlightIndex, highlightValue);

  return (
    <View style={[commonStyles.card]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={{height: CHART_HEIGHT, width: CARD_WIDTH}}>
        <Svg width={CARD_WIDTH} height={CHART_HEIGHT}>
          {/* Grid lines */}
          {yLabels.map((y, i) => {
            const yPos = PADDING_TOP + (chartHeight * i) / (yLabels.length - 1);
            return (
              <Line
                key={y}
                x1={PADDING_LEFT - 8}
                y1={yPos}
                x2={CARD_WIDTH - PADDING_RIGHT}
                y2={yPos}
                stroke="#E6E9F0"
                strokeWidth={1}
              />
            );
          })}

          {/* Y-axis line */}
          {/* <Line
            x1={PADDING_LEFT - 8}
            y1={PADDING_TOP}
            x2={PADDING_LEFT - 8}
            y2={PADDING_TOP + chartHeight}
            stroke="#E6E9F0"
            strokeWidth={1}
          /> */}

          {/* Target Line */}
          <Path
            d={getSmoothPath(target)}
            stroke="#7EDFC3"
            strokeWidth={3}
            fill="none"
          />

          {/* Covered Line */}
          <Path
            d={getSmoothPath(covered)}
            stroke="#723DFD"
            strokeWidth={3}
            fill="none"
          />

          {/* Highlight vertical line (solid) */}
          <Line
            x1={highlight.x}
            y1={highlight.y}
            x2={highlight.x}
            y2={PADDING_TOP + chartHeight}
            stroke="#723DFD"
            strokeWidth={2}
          />

          {/* Highlight dot (filled) */}
          <Circle
            cx={highlight.x}
            cy={highlight.y}
            r={10}
            fill="#723DFD"
            stroke="#fff"
            strokeWidth={3}
          />
        </Svg>

        {/* Y axis labels - perfectly centered on grid lines */}
        {yLabels.map((y, i) => {
          const yPos = PADDING_TOP + (chartHeight * i) / (yLabels.length - 1);
          return (
            <Text
              key={y}
              style={{
                position: 'absolute',
                left: 0,
                top: yPos - 12, // Center text vertically on line
                color: '#444',
                fontSize: 16,
                width: PADDING_LEFT - 16,
                textAlign: 'right',
                fontWeight: '500',
              }}>
              {y}
            </Text>
          );
        })}

        {/* Value box (absolutely positioned, moved up) */}
        <View
          style={[
            styles.valueBox,
            {
              left: highlight.x - 45,
              top: highlight.y - 80,
              shadowColor: '#000',
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            },
          ]}>
          <Text style={styles.valueText}>{highlightValue}</Text>
          <Text style={styles.valueChange}>{highlightChange}</Text>
        </View>
      </View>

      {/* X axis labels - positioned below 0 line */}
      <View
        style={{
          height: 24,
          marginTop: -8,
          marginBottom: 18,
          position: 'relative',
        }}>
        {months.map((m, i) => (
          <Text
            key={m}
            style={{
              position: 'absolute',
              left:
                i === 0
                  ? PADDING_LEFT + i * xStep - 10 // shift first label right a bit
                  : i === months.length - 1
                  ? PADDING_LEFT + i * xStep - 30 // shift last label left a bit
                  : PADDING_LEFT + i * xStep - 20,
              color: '#4A4E52',
              fontSize: 15,
              width: 40,
              textAlign: 'center',
              fontWeight: '400',
              paddingLeft: 4,
              paddingRight: 4,
            }}>
            {m}
          </Text>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#7EDFC3'}]} />
          <Text style={styles.legendText}>
            <Text style={styles.legendBold}>Unique Retailers Target</Text>
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#723DFD'}]} />
          <Text style={styles.legendText}>
            <Text style={styles.legendBold}>Unique Retailers Covered</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282C3B',
  },
  dateBadge: {
    backgroundColor: '#E6EDEE',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  dateText: {
    color: '#004F59',
    fontWeight: '400',
    fontSize: 14,
  },
  valueBox: {
    position: 'absolute',
    width: 90,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  valueText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#232A36',
    textAlign: 'center',
  },
  valueChange: {
    fontSize: 16,
    color: '#3CB371',
    fontWeight: '600',
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 8,
    padding: 8,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    marginBottom: 2,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendText: {
    color: '#4A4E52',
    fontSize: 16,
  },
  legendBold: {
    fontWeight: '400',
    color: '#4A4E52',
  },
});

export default RetailerOverview;
