import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import DeviceInfo from 'react-native-device-info';

import NetworkRequest from 'services/networkRequest';
import {HttpStatusCode, POST} from 'constants/httpConstants';
import {USER_DEVICES} from 'services/constants';
import {store} from 'store/redux/store';
import {showForceUpdateModal} from 'store/redux/forceUpdateSlice';

export const sendUserDetails = async (fcmToken: string) => {
  const requestBody = {
    data: {
      deviceId: await DeviceInfo.getUniqueId(),
      fcmToken,
      platform: Platform.OS,
      currentVersion: await DeviceInfo.getVersion(),
      latestVersion: await DeviceInfo.getVersion(),
      retailerId: store.getState().user.user.retailerId,
    },
  };
  NetworkRequest(POST, USER_DEVICES, requestBody)
    .then(result => {
      if (result.status === HttpStatusCode.OK && result.data) {
        const {isUpdateRequired, versionRequired, appLink} = result.data;
        if (isUpdateRequired || isUpdateRequired === 'true') {
          store.dispatch(
            showForceUpdateModal({isUpdateRequired, versionRequired, appLink}),
          );
        }
      }
    })
    .catch(() => {}); //Not showing error to user as this API will run in background
};

export const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    console.log(newFcmToken); //To get user FCM token
    sendUserDetails(newFcmToken);
  } catch (error) {
    console.error('FCM Token Error', error);
  }
};

export const notificationListener = () => {
  // To handle different scenarios
  // App is open on click of notification
  // messaging().onNotificationOpenedApp(remoteMessage => {});

  // Quiet and Background State -> Check whether an initial notification is available
  // messaging()
  //   .getInitialNotification()
  //   .then(onMessageReceived)
  //   .catch(error => console.log('failed', error));

  // Foreground State
  messaging().onMessage(onMessageReceived);
};

export async function onMessageReceived(message: any) {
  if (message) {
    const {messageId, notification, data} = message;
    // console.log('inisde if', message); //To check notification message

    const channelId = await notifee.createChannel({
      id: messageId,
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: notification?.title ?? '',
      body: notification?.body ?? '',
      data,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
      },
    });
  }
}
