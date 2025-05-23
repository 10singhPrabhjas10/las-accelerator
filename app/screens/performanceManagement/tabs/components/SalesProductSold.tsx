import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle, Defs, G, Path, ClipPath, Rect} from 'react-native-svg';
import {commonStyles} from '../styles/commonStyles';

const RuppesIcon = ({}) => (
  <Svg width="32" height="32" viewBox="0 0 20 21" fill="none">
    <Path
      d="M4.67012 5.17012L4.31656 4.81656V4.81656L4.67012 5.17012ZM3.6148 6.22543L3.11481 6.22795C3.11618 6.50212 3.33811 6.72405 3.61229 6.72543L3.6148 6.22543ZM5.73358 6.73609C6.00972 6.73748 6.2347 6.51475 6.23609 6.23861C6.23748 5.96247 6.01475 5.73749 5.73861 5.7361L5.73358 6.73609ZM4.10413 4.10163C4.10275 3.82549 3.87777 3.60276 3.60163 3.60415C3.32549 3.60553 3.10276 3.83051 3.10415 4.10665L4.10413 4.10163ZM3.065 9.47046C3.1025 9.19687 2.91111 8.94469 2.63753 8.90719C2.36394 8.86969 2.11176 9.06107 2.07426 9.33466L3.065 9.47046ZM15.6301 4.86986C12.4946 1.73435 7.42935 1.70378 4.31656 4.81656L5.02367 5.52367C7.73924 2.8081 12.1713 2.82526 14.923 5.57697L15.6301 4.86986ZM4.36986 16.1301C7.50538 19.2657 12.5707 19.2962 15.6834 16.1834L14.9763 15.4763C12.2608 18.1919 7.82868 18.1747 5.07697 15.423L4.36986 16.1301ZM15.6834 16.1834C18.7962 13.0707 18.7657 8.00538 15.6301 4.86986L14.923 5.57697C17.6747 8.32868 17.6919 12.7608 14.9763 15.4763L15.6834 16.1834ZM4.31656 4.81656L3.26125 5.87188L3.96835 6.57899L5.02367 5.52367L4.31656 4.81656ZM3.61229 6.72543L5.73358 6.73609L5.73861 5.7361L3.61731 5.72544L3.61229 6.72543ZM4.11479 6.22292L4.10413 4.10163L3.10415 4.10665L3.11481 6.22795L4.11479 6.22292ZM2.07426 9.33466C1.74486 11.7379 2.51193 14.2722 4.36986 16.1301L5.07697 15.423C3.44788 13.7939 2.77656 11.5747 3.065 9.47046L2.07426 9.33466Z"
      fill="#E88904"
    />
    <G transform="translate(7,7)">
      <Path
        d="M5.49499 2.03635L5.2427 2.98931H0.5L0.757317 2.03635H5.49499ZM3.13371 7.6665L0.646317 4.66857L0.641272 3.84439H1.84208C2.13471 3.84439 2.37522 3.78944 2.56358 3.67956C2.7553 3.56623 2.89826 3.41341 2.99244 3.22111C3.08998 3.0288 3.13875 2.81245 3.13875 2.57207C3.13875 2.32138 3.09503 2.09988 3.00758 1.90757C2.92012 1.71183 2.78053 1.55902 2.5888 1.44913C2.39708 1.33924 2.14313 1.28429 1.82695 1.28429H0.505045L0.792634 0.166504H1.82695C2.42567 0.166504 2.92349 0.259224 3.32039 0.444661C3.72066 0.626671 4.02002 0.892807 4.21848 1.24309C4.42029 1.58993 4.5212 2.00888 4.5212 2.49995C4.5212 2.92921 4.45057 3.30867 4.30929 3.63834C4.17138 3.96458 3.94771 4.23072 3.63825 4.43676C3.3288 4.64281 2.9218 4.78017 2.41726 4.84885L4.67256 7.5944V7.6665H3.13371ZM5.5 0.166504L5.2427 1.11946H1.34259L1.5999 0.166504H5.5Z"
        fill="#E88904"
      />
    </G>
  </Svg>
);

const RecieptIcon = ({}) => (
  <Svg width="20" height="20" viewBox="0 0 16 16" fill="none">
    <G clip-path="url(#clip0_5487_14663)">
      <Path
        d="M13.1428 1.14307H3.42854C2.82233 1.14307 2.24095 1.38388 1.8123 1.81254C1.38363 2.24119 1.14282 2.82257 1.14282 3.42878V14.8574L3.71425 13.1431L6.28568 14.8574L8.85711 13.1431L11.4285 14.8574V2.85735C11.4285 2.4027 11.6091 1.96665 11.9306 1.64517C12.2521 1.32368 12.6882 1.14307 13.1428 1.14307ZM13.1428 1.14307C13.5975 1.14307 14.0336 1.32368 14.3551 1.64517C14.6765 1.96665 14.8571 2.4027 14.8571 2.85735V5.71449H11.4285"
        stroke="#E32413"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.23784 5.0004L2.99976 5.00391"
        stroke="#E32413"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.99976 9H2.99976"
        stroke="#E32413"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.2378 5.0004L8.99976 5.00391"
        stroke="#E32413"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.99976 7L2.99976 7"
        stroke="#E32413"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_5487_14663">
        <Rect width="16" height="16" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

interface ProductMetric {
  percent: number;
  label: string;
  color: string;
  bgColor: string;
}

interface TopProductsSoldProps {
  metrics: ProductMetric[];
  title?: string;
}

const TopProductsSold: React.FC<TopProductsSoldProps> = ({
  metrics,
  title = 'Top Products Sold',
}) => {
  // Map label to icon
  const getIcon = (label: string) => {
    if (label.toLowerCase().includes('return')) return <RuppesIcon />;
    if (label.toLowerCase().includes('claim')) return <RecieptIcon />;
    return null;
  };
  return (
    <View style={[commonStyles.card]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.metricsContainer}>
        {metrics.map((metric, idx) => (
          <View style={styles.metricItem} key={metric.label}>
            <View style={styles.iconAndCircleContainer}>
              <View style={styles.iconContainer}>{getIcon(metric.label)}</View>
              <View style={styles.circleContainer}>
                <Svg height="60" width="60" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <Circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={metric.bgColor}
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Progress Arc */}
                  <Path
                    d={describeArc(50, 50, 40, metric.percent)}
                    stroke={metric.color}
                    strokeWidth="12"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.percentageText}>{metric.percent}%</Text>
              <Text style={styles.labelText}>{metric.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

// Draws an arc from 0 to (percent * 360) degrees
function describeArc(cx: number, cy: number, r: number, percent: number) {
  const angle = (percent * 360) / 100;
  const startAngle = -90;
  const endAngle = startAngle + angle;

  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = angle > 180 ? 1 : 0;

  return [
    'M',
    start.x,
    start.y,
    'A',
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#222426',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconAndCircleContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricTextContainer: {
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  labelText: {
    fontSize: 14,
    color: '#400',
  },
});

export default TopProductsSold;
