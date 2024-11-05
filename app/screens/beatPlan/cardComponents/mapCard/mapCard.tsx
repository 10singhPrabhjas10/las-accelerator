import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
import CardCommon from '../cardCommon';

import styles from './mapCard.style';
import NavIconImg from '@/../assets/icons/NavIconImg.svg';

interface MapCardProps {
  count: number;
  name: string;
  address: string;
  distance: string;
  time: string;
  number: string;
  customStyle?: StyleProp<ViewStyle>;
}

function MapCard({
  count,
  name,
  address,
  distance,
  time,
  number,
  customStyle = {},
}: MapCardProps) {
  const infoContainer = (
    <View style={styles.numberContainer}>
      <Text style={styles.numberText}>{count}</Text>
    </View>
  );
  const detailsContainer = (
    <View style={styles.navInfoContainer}>
      <NavIconImg style={styles.navImg} />
      <Text variant="labelLarge" style={styles.distanceTimeText}>
        {' '}
        {distance} | {time}
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <Text variant="labelLarge" style={styles.navigationlinkText}>
          Start Navigation
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <CardCommon
      infoContainer={infoContainer}
      name={name}
      address={address}
      distance={distance}
      number={number}
      time={time}
      customStyle={customStyle}
      detailsContainer={detailsContainer}
    />
  );
}

export default MapCard;
