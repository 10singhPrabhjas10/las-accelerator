import {SetStateAction} from 'react';

import NetworkRequest from 'services/networkRequest';

import {POST} from 'constants/httpConstants';
import {
  INotificationList,
  INotificationResponse,
  IRequestBodyData,
} from './NotificationList.interface';
import {inAppNotificationListApi} from 'services/methods/inAppNotification';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

export const getNotificationList = (
  setNotificationList: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  requestBody: IRequestBodyData,
) => {
  setReduxLoading(true);
  NetworkRequest(POST, inAppNotificationListApi(), requestBody)
    .then(response => {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = response?.data;
      const result = data?.map((item: INotificationResponse) => {
        return {
          icon: item?.attributes?.notificationType?.data?.attributes?.icon,
          title: item?.attributes?.notificationType?.data?.attributes?.name,
          subTitle: item?.attributes?.title,
          date: item?.attributes?.date,
          message: item?.attributes?.description,
          isRead: item?.attributes?.isOpened,
          id: item?.id,
          notificationTypeId: item?.attributes?.notificationType?.data?.id,
        };
      });
      setNotificationList((prev: INotificationList[]) => [...prev, ...result]);
      setPageCount(pageCount);
    })
    .catch(err => {
      handleApiError(err?.message);
    })
    .finally(() => setReduxLoading(false));
};
