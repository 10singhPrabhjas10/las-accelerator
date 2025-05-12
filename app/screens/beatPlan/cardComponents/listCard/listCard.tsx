import React from 'react';
import {View, Image, StyleProp, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import CardCommon from '../cardCommon';

import styles from './listCard.style';
import UserProfileImg from '@/../assets/icons/UserDefaultImg.svg';
import NavIconImg from '@/../assets/icons/NavIconImg.svg';
import {getDeviceWidth} from '@/utils/commonMethods';

interface ListCardProps {
  image: string;
  name: string;
  address: string;
  distance: string;
  time: string;
  number: string;
  customStyle: StyleProp<ViewStyle>;
  status: string;
}

function ListCard({
  image,
  name,
  address,
  distance,
  time,
  number,
  customStyle,
  status,
}: ListCardProps) {
  const infoContainer = (
    <View style={styles.imageContainer}>
      {image ? (
        <Image
          style={styles.image}
          source={typeof image === 'string' ? {uri: image} : image}
        />
      ) : (
        <UserProfileImg width={32} height={32} />
      )}
    </View>
  );
  const detailsContainer = (
    <View>
      <NavIconImg style={styles.navImg} />
      <Text variant="labelLarge" style={styles.distanceTimeText}>
        {distance} | {time}
      </Text>
    </View>
  );
  return (
    <CardCommon
      infoContainer={infoContainer}
      name={name}
      address={address}
      distance={distance}
      time={time}
      detailsContainer={detailsContainer}
      number={number}
      customStyle={customStyle}
      status={status}
    />
  );
}

export default ListCard;
