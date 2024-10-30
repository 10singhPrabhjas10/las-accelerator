import {COLORS} from '@/theme/colors';
import {heightToRatio} from '@/utils/commonMethods';
import React from 'react';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import {TodaysBeatPlan} from '@/utils/dummyData';
function BeatList() {
  return (
    <>
      <View style={styles.headText}>
        <Text style={{color: COLORS.svgGrey}} variant="bodyMedium">
          {TodaysBeatPlan.length} Total Visits
        </Text>
        <Text style={{color: COLORS.greyText}} variant="bodySmall">
          Bengaluru East
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={TodaysBeatPlan}
        renderItem={item => <Text>{item.item.name}</Text>}
      />
    </>
  );
}

export default BeatList;
