import {COLORS} from '@/theme/colors';
import {heightToRatio} from '@/utils/commonMethods';
import React from 'react';
import {View, Image, StyleSheet, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import CardWrapper from '../card/Card';

interface ListItemProps {
  title1: string;
  title2: string;
  image: string;
  customContainerStyle: ViewStyle;
}

const ListItem: React.FC<ListItemProps> = ({
  title1,
  title2,
  image,
  customContainerStyle,
}: ListItemProps) => {
  return (
    <CardWrapper cardStyle={customContainerStyle}>
      <Image source={image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text theme={{colors: {onSurface: COLORS.black}}} variant="labelMedium">
          {title1}
        </Text>
        <Text variant="labelMedium">{title2}</Text>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  image: {
    width: heightToRatio(72),
    height: heightToRatio(72),
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
});

export default ListItem;
