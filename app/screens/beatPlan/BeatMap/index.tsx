import BottomSheetModalComponent from '@/bottomSheets/bottomSheetModal/BottomSheetModalComponent';
import CommonStyles from '@/utils/commonStyle';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import {Text} from 'react-native-paper';

function BeatMap() {
  return (
    <>
      <MapView
        style={{width: '100%', height: '100%'}}
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
    </>
  );
}

export default BeatMap;
