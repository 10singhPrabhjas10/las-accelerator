import {COLORS} from '@/theme/colors';
import React from 'react';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import {TodaysBeatPlan} from '@/utils/dummyData';
import ListCard from '../cardComponents/listCard/listCard';
import {getDeviceWidth} from '@/utils/commonMethods';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@/routes/RootNavigation';
function BeatList() {
  const navigation = useNavigation<RootNavigationProp>();
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
        showsVerticalScrollIndicator={false}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RetailerDetails')}>
            <ListCard
              image={''}
              name={item.item.name}
              address={
                item.item.location.street + ',' + item.item.location.city
              }
              distance={item.item.distance}
              time={item.item.eta}
              number={item.item.mobile_number}
              customStyle={{width: getDeviceWidth(0.85)}}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
}

export default BeatList;
