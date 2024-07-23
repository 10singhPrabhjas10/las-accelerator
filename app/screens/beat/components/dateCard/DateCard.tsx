import {View} from 'react-native';
import React from 'react';
import styles from './DateCard.style';

import DateIcon from '../../../../../assets/icons/date.svg';
import {Text} from 'react-native-paper';

const DateCard = ({date}: {date: string}) => {
  return (
    <View style={styles.card}>
      <DateIcon width={20} height={20} style={styles.dateIcon} />
      <Text variant="titleSmall">Date: </Text>
      <Text variant="titleSmall" style={styles.dateText}>
        {date}
      </Text>
    </View>
  );
};

export default DateCard;
