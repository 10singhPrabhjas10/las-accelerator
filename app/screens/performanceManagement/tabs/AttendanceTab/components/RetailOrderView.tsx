import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

type DonutSection = {
  percent: number;
  color: string;
  label: string;
  bold?: boolean;
  legend?: string;
};

type DonutChartCardProps = {
  title: string;
  value: number;
  sections: DonutSection[];
  cardStyle?: object;
};

const RADIUS = 48;
const STROKE = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP_DEGREES = 18;
const GAP_LENGTH = (GAP_DEGREES / 360) * CIRCUMFERENCE;

function DonutChartCard({
  title,
  value,
  sections,
  cardStyle,
}: DonutChartCardProps) {
  const totalArcPercent = sections.reduce((sum, s) => sum + s.percent, 0);
  const gapPercent = 100 - totalArcPercent;
  const sectionsWithGap =
    totalArcPercent < 100
      ? [
          ...sections,
          {
            percent: gapPercent,
            color: 'transparent',
            label: '',
          },
        ]
      : sections;
  let startAngle = 0;
  const arcs = sectionsWithGap.map(section => {
    const arcLength = (section.percent / 100) * CIRCUMFERENCE - GAP_LENGTH;
    const arc = {
      ...section,
      strokeDasharray: [arcLength, CIRCUMFERENCE - arcLength],
      rotation: (startAngle / CIRCUMFERENCE) * 360,
    };
    startAngle += (section.percent / 100) * CIRCUMFERENCE;
    return arc;
  });

  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <Svg width={120} height={120}>
          <G rotation={-90} origin="60,60">
            {arcs.map((arc, i) => (
              <Circle
                key={i}
                cx={60}
                cy={60}
                r={RADIUS}
                stroke={arc.color}
                strokeWidth={STROKE}
                fill="none"
                strokeDasharray={arc.strokeDasharray}
                strokeLinecap="round"
                rotation={arc.rotation}
                origin="60,60"
              />
            ))}
          </G>
        </Svg>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
      <View style={styles.legend}>
        {sections.map((section, i) => (
          <View key={i} style={styles.legendRow}>
            <View style={[styles.dot, {backgroundColor: section.color}]} />
            <Text>
              <Text style={styles.labelTitle}>{section.percent}%</Text>{' '}
              <Text style={styles.labelSubTitle}>{section.label}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222426',
    marginBottom: 8,
    paddingLeft: 4,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  valueContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22223B',
  },
  legend: {
    marginTop: 12,
    paddingLeft: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  labelTitle: {
    fontWeight: '700',
    color: '#22223B',
    fontSize: 12,
  },
  labelSubTitle: {
    fontSize: 12,
    fontWeight: 'normal',
  },
});

export default DonutChartCard;
