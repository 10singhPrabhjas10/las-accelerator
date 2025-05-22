import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import { commonStyles } from '../styles/commonStyles';

interface EffectiveCoverageAreaProps {
  total: number;
  uniqueBill: number;
  zeroBill: number;
  date?: string;
  uniqueColor?: string;
  zeroColor?: string;
}

const EffectiveCoverageArea: React.FC<EffectiveCoverageAreaProps> = ({
  total,
  uniqueBill,
  zeroBill,
  date = 'Feb 2024',
  uniqueColor = '#2C6B5A',
  zeroColor = '#5ED1B1',
}) => {
  // Chart dimensions
  const size = 300;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Calculate percentages
  const uniquePercent = uniqueBill / total;
  const zeroPercent = zeroBill / total;

  // Gap in degrees
  const gapDegrees = 3;

  // Calculate arc angles with gaps
  const totalDegrees = 360 - gapDegrees * 2; // Reserve space for 2 gaps
  const uniqueDegrees =
    totalDegrees * (uniquePercent / (uniquePercent + zeroPercent));
  const zeroDegrees =
    totalDegrees * (zeroPercent / (uniquePercent + zeroPercent));

  // Create SVG arcs
  const createArc = (startAngle, endAngle, color) => {
    // Convert angles to radians
    const start = ((startAngle - 90) * Math.PI) / 180;
    const end = ((endAngle - 90) * Math.PI) / 180;

    // Calculate points
    const x1 = center + radius * Math.cos(start);
    const y1 = center + radius * Math.sin(start);
    const x2 = center + radius * Math.cos(end);
    const y2 = center + radius * Math.sin(end);

    // Determine if arc is more than 180 degrees
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    // Create path
    return (
      <Path
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        fill="none"
      />
    );
  };

  // Calculate start and end angles for each arc
  const uniqueStartAngle = gapDegrees;
  const uniqueEndAngle = uniqueStartAngle + uniqueDegrees;

  const zeroStartAngle = uniqueEndAngle + gapDegrees;
  const zeroEndAngle = zeroStartAngle + zeroDegrees;

  return (
    <View style={styles.container}>
      <View style={commonStyles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Effective Coverage Area</Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <Svg width={size} height={size}>
            {createArc(uniqueStartAngle, uniqueEndAngle, uniqueColor)}
            {createArc(zeroStartAngle, zeroEndAngle, zeroColor)}
          </Svg>

          {/* Center Text */}
          <View style={styles.centerText}>
            <Text style={styles.centerLabel}>Total Retailers</Text>
            <Text style={styles.centerValue}>{total}</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: uniqueColor}]} />
            <Text style={styles.legendText}>
              <Text style={styles.bold}>{uniqueBill}</Text> Unique Bill
              Retailers
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: zeroColor}]} />
            <Text style={styles.legendText}>
              <Text style={styles.bold}>{zeroBill}</Text> Zero Bill Retailers
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    width: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    fontSize: 12,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  centerText: {
    position: 'absolute',
    top: '38%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerLabel: {
    color: '#615E83',
    fontSize: 16,
    fontWeight: '400',
  },
  centerValue: {
    color: '#232A36',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginRight: 6,
    marginLeft: 6,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    color: '#8B8BA7',
    fontSize: 14,
  },
  bold: {
    fontWeight: '700',
    color: '#232A36',
  },
});

export default EffectiveCoverageArea;
