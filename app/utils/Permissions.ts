import {PermissionStatus, PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const requestCameraPermission = async () => {
  try {
    const granted: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return 'granted';
    } else {
      return '';
    }
  } catch (err) {
    console.warn(err);
    return '';
  }
};

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to external storage.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

// export const requestLocationPermission = async () => {
//   try {
//     const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//     if (result !== RESULTS.GRANTED) {
//       const requestResult = await request(
//         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       );

//       if (requestResult === RESULTS.GRANTED) {
//         return true; // Permission granted
//       } else {
//         throw new Error('Location permission denied');
//       }
//     }

//     return true; // Permission already granted
//   } catch (error) {
//     console.error(error);
//     return false; // Handle the error case
//   }
// };

export const requestLocationPermission = async () => {
  let permission;

  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }

  const result = await check(permission);

  if (result === RESULTS.DENIED) {
    const requestResult = await request(permission);

    if (requestResult !== RESULTS.GRANTED) {
      throw new Error('Location permission denied');
      // return false;
    }
  }
  return true;
};

export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    return; // Exit if permission is not granted
  }

  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
      // Handle position here (e.g., display coordinates)
    },
    error => {
      console.error(error);
      // Handle error case
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
