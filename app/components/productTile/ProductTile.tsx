import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';

import {COLORS} from 'theme/colors';

interface IProductTileProps {
  imageSource?: string;
  onPress: () => void;
  title: string;
}

const ProductTile = ({imageSource, onPress, title}: IProductTileProps) => {
  const dynamicSource = imageSource
    ? {uri: imageSource}
    : require('./../../../assets/images/defaultCategory.png');
  return (
    <Card style={styles.tile} onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        <Image source={dynamicSource} style={styles.icon} />
        <Text variant="bodyMedium" style={styles.tileText}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  cardContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tile: {
    backgroundColor: COLORS.white,
    width: '46%',
    height: 150,
    marginVertical: 12,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 1,
    alignSelf: 'center',
  },
  tileText: {
    textAlign: 'center',
    color: COLORS.black,
    paddingTop: 6,
  },
});
