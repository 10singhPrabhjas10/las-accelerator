import {SetStateAction} from 'react';

import NetworkRequest from 'services/networkRequest';

import {GET} from 'constants/httpConstants';
import {inAppNotificationDetailApi} from 'services/methods/inAppNotification';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

export const getNotificationDetail = (
  id: string,
  setNotificationDetail: SetStateAction<any>,
) => {
  setReduxLoading(true);
  NetworkRequest(GET, inAppNotificationDetailApi(id))
    .then(response => {
      const {attributes} = response?.data?.data;
      const {notificationType, title, description, date} = attributes;
      const result = {
        title: notificationType?.data?.name,
        subTitle: title,
        message: description,
        date: date,
      };
      setNotificationDetail(result);
    })
    .catch(err => {
      handleApiError(err?.message);
    })
    .finally(() => setReduxLoading(false));
};
