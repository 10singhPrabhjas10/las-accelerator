import {APP_NOTIFICATIONS, APP_NOTIFICATION_TYPE} from 'services/constants';

export const inAppNotificationDetailApi = (id: string) => {
  return APP_NOTIFICATIONS + '/' + id + '?populate=*';
};

export const inAppNotificationTypeApi = () => {
  return APP_NOTIFICATION_TYPE;
};

export const inAppNotificationListApi = () => {
  return APP_NOTIFICATIONS + '/filters';
};
