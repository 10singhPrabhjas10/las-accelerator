import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import { commonStyles } from './styles/commonStyles';

const MetricCircle = ({
  value,
  maxValue = 100,
  size = 80,
  strokeWidth = 5,
  color,
  icon,
  primaryLabel,
  secondaryLabel,
  isPercentage = true,
}) => {
  // Calculate the progress for the circle
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = isPercentage ? value : (value / maxValue) * 100;
  const strokeDashoffset =
    circumference - (circumference * progressValue) / 100;

  return (
    <View style={styles.metricContainer}>
      <View style={styles.circleContainer}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#E6E8F0"
            fill="transparent"
          />

          {/* Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
        <View style={styles.iconContainer}>{icon}</View>
      </View>

      <Text style={styles.primaryLabel}>
        {isPercentage ? `${value}%` : value}
      </Text>

      <View style={styles.labelsContainer}>
        <Text style={styles.secondaryLabel}>{primaryLabel}</Text>
        {secondaryLabel ? (
          <Text style={styles.secondaryLabel}>{secondaryLabel}</Text>
        ) : (
          <View style={styles.emptyLabelSpace} />
        )}
      </View>
    </View>
  );
};

// Icons as SVG components
const BadgeIcon = ({}) => (
  <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
    <G id="award 1" clip-path="url(#clip0_5487_15210)">
      <Path
        id="Vector"
        d="M10.2433 12.5002C13.465 12.5002 16.0767 9.88849 16.0767 6.66683C16.0767 3.44517 13.465 0.833496 10.2433 0.833496C7.02168 0.833496 4.41 3.44517 4.41 6.66683C4.41 9.88849 7.02168 12.5002 10.2433 12.5002Z"
        stroke="#5ED1B1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        id="Vector_2"
        d="M7.08499 11.5752L6.07666 19.1669L10.2433 16.6669L14.41 19.1669L13.4017 11.5669"
        stroke="#5ED1B1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_5487_15210">
        <Rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0.243332)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

const ChartIcon = ({}) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <G id="ic_Goal Copy">
      <Path
        id="Shape"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.3999 2H11.5999C12.4836 2 13.1999 2.71634 13.1999 3.6V9.2H16.3999C17.2836 9.2 17.9999 9.91634 17.9999 10.8V17.2C17.9999 17.6418 17.6417 18 17.1999 18H2.7999C2.35807 18 1.9999 17.6418 1.9999 17.2V7.2C1.9999 6.31634 2.71625 5.6 3.5999 5.6H6.7999V3.6C6.7999 2.71634 7.51625 2 8.3999 2ZM8.3999 16.4H11.5999V3.6H8.3999V16.4ZM6.7999 7.2H3.5999V16.4H6.7999V7.2ZM13.1999 16.4H16.3999V10.8H13.1999V16.4Z"
        fill="#009DFF"
      />
    </G>
  </Svg>
);

const MapIcon = ({}) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <G id="map 1" clip-path="url(#clip0_5487_15224)">
      <Path
        id="Vector"
        d="M0.833332 4.99984V18.3332L6.66667 14.9998L13.3333 18.3332L19.1667 14.9998V1.6665L13.3333 4.99984L6.66667 1.6665L0.833332 4.99984Z"
        stroke="#33727A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        id="Vector_2"
        d="M6.66667 1.6665V14.9998"
        stroke="#33727A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        id="Vector_3"
        d="M13.3333 5V18.3333"
        stroke="#33727A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_5487_15224">
        <Rect width="20" height="20" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const MetricsDashboard = ({
  productivity = 88,
  beatAdherence = 128,
  retailerCoverage = 75,
  maxBeatAdherence = 150,
}) => {
  return (
    <View style={[commonStyles.card, styles.container]}>
      <MetricCircle
        value={productivity}
        color="#6FCFB5"
        icon={<BadgeIcon color="#6FCFB5" />}
        primaryLabel="Productivity"
        isPercentage={true}
      />

      <MetricCircle
        value={beatAdherence}
        maxValue={maxBeatAdherence}
        color="#4285F4"
        icon={<ChartIcon color="#4285F4" />}
        primaryLabel="Beat"
        secondaryLabel="Adherence"
        isPercentage={false}
      />

      <MetricCircle
        value={retailerCoverage}
        color="#546E7A"
        icon={<MapIcon color="#546E7A" />}
        primaryLabel="Retailer"
        secondaryLabel="Coverage"
        isPercentage={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  metricContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  circleContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
    color: '#333333',
  },
  labelsContainer: {
    alignItems: 'center',
    minHeight: 40,
  },
  secondaryLabel: {
    fontSize: 14,
    color: '#74787B',
    textAlign: 'center',
  },
  emptyLabelSpace: {
    height: 20, // Approximately the height of a secondary label
  },
});

export default MetricsDashboard;
