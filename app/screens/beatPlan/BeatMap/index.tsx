import React, {useState, useRef} from 'react';
import {FlatList, Platform, View} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Text} from 'react-native-paper';
import {TodaysBeatPlan} from '@/utils/dummyData';
import MapCard from '../cardComponents/mapCard/mapCard';
import {styles} from './styles';

import GreenMarker from '@/../assets/icons/GreenMarker.svg';
import GreyMarker from '@/../assets/icons/GreyMarker.svg';

const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_MAPS_API_KEY';

function BeatMap() {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const origin = {
    latitude: TodaysBeatPlan[0].coordinates.latitude,
    longitude: TodaysBeatPlan[0].coordinates.longitude,
  };

  const destination = {
    latitude: TodaysBeatPlan[TodaysBeatPlan.length - 1].coordinates.latitude,
    longitude: TodaysBeatPlan[TodaysBeatPlan.length - 1].coordinates.longitude,
  };

  const waypoints = TodaysBeatPlan.slice(1, -1).map(item => ({
    latitude: item.coordinates.latitude,
    longitude: item.coordinates.longitude,
  }));

  // Animates map to focus on selected marker with a slight offset and zoom level
  const focusOnMarker = coordinates => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coordinates.latitude - 0.002,
          longitude: coordinates.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000,
      );
    }
  };

  // Renders a custom numbered marker with dynamic color based on status (grey for pending, green for completed)
  const MyCustomMarkerView = ({index, status}) => {
    return (
      <View style={styles.markercontainer}>
        <Text style={styles.markerText}>{index + 1}</Text>
        {status === 'pending' ? <GreyMarker /> : <GreenMarker />}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude - 0.02,
            longitude: origin.longitude,
            latitudeDelta: 0.083,
            longitudeDelta: 0.032,
          }}
          zoomEnabled={true}
          //loadingEnabled={true}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="DRIVING"
            optimizeWaypoints={true}
            resetOnChange={false}
            timePrecision="now"
            region="in"
            precision="high"
            language="en"
            splitWaypoints={true}
            onStart={params => {
              console.log('Starting directions request with params:', params);
              //setIsLoading(true);
            }}
            onReady={result => {
              console.log('Directions ready:', {
                distance: result.distance,
                duration: result.duration,
                coordinates: result.coordinates?.length,
              });
              //setIsLoading(false);
            }}
            onError={errorMessage => {
              console.log('Directions API Error:', {
                error: errorMessage,
                timestamp: new Date().toISOString(),
                networkState: navigator?.onLine ? 'online' : 'offline',
              });
              console.log(errorMessage);
              //setIsLoading(false);
            }}
          />

          {/* Markers for stops */}
          {TodaysBeatPlan.map((item, index) => (
            <Marker
              key={index}
              coordinate={item.coordinates}
              onPress={() => focusOnMarker(item.coordinates)}
              title={item.name}
              description={`${item.location.street}, ${item.location.city}`}>
              <MyCustomMarkerView index={index} status={item.status} />
            </Marker>
          ))}
        </MapView>
      </View>

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
            address={`${item.location.street}, ${item.location.city}`}
            distance={item.distance}
            time={item.eta}
            number={item.mobile_number}
            status={item.status}
            onPress={() => focusOnMarker(item.coordinates)}
          />
        )}
      />
    </>
  );
}

export default BeatMap;
