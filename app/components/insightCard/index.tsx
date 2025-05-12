import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '@/theme/colors';
import {widthToRatio} from '@/utils/commonMethods';

interface InsightCardProps {
  title: string;
  value: string | number;
}

const InsightCard: React.FC<InsightCardProps> = ({title, value}) => (
  <View style={styles.card}>
    <View style={styles.calenderBackground}>
      <Icon
        name="calendar-month-outline"
        size={widthToRatio(16)}
        color={COLORS.white}
      />
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default InsightCard;
