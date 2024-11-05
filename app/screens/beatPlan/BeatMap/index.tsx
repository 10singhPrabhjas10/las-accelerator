import React from 'react';
import {FlatList} from 'react-native';
import MapView from 'react-native-maps';
import {TodaysBeatPlan} from '@/utils/dummyData';
import MapCard from '../cardComponents/mapCard/mapCard';
import {styles} from './styles';
function BeatMap() {
  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        //  showsUserLocation={true}
        //showsMyLocationButton={false}
        zoomEnabled={true}
        loadingEnabled={true}
      />
      <FlatList
        data={TodaysBeatPlan}
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <MapCard
            count={index + 1}
            name={item.name}
            customStyle={styles.card}
            address={item.location.street + ',' + item.location.city}
            distance={item.distance}
            time={item.eta}
            number={item.mobile_number}
          />
        )}
      />
    </>
  );
}

export default BeatMap;
