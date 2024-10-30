import {COLORS} from '@/theme/colors';
import {heightToRatio} from '@/utils/commonMethods';
import React from 'react';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles';

function BeatList() {
  const array = [1, 2, 3, 4]; //dummy array
  return (
    <>
      <View style={styles.headText}>
        <Text style={{color: COLORS.svgGrey}} variant="bodyMedium">
          5 Total Visits
        </Text>
        <Text style={{color: COLORS.greyText}} variant="bodyMedium">
          Bengaluru East
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={array}
        renderItem={item => <Text>{item.item}</Text>}
      />
    </>
  );
}

export default BeatList;
