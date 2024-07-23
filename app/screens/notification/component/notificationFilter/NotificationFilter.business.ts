import {SetStateAction} from 'react';

import NetworkRequest from 'services/networkRequest';

import {GET} from 'constants/httpConstants';
import {ID_ALL} from 'utils/Constants';
import {IResponseProps} from './NotificationFilter.interface';
import {inAppNotificationTypeApi} from 'services/methods/inAppNotification';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

const mapNotificationTypeApiToCheckbox = (data: IResponseProps[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item => {
    result.push({
      id: `${item.id}`,
      name: item.attributes.name,
    });
  });
  return result;
};

export const getNotificationType = (
  setNotificationType: SetStateAction<any>,
) => {
  setReduxLoading(true);
  NetworkRequest(GET, inAppNotificationTypeApi())
    .then(response => {
      const result = mapNotificationTypeApiToCheckbox(response?.data?.data);
      setNotificationType(result);
    })
    .catch(err => {
      handleApiError(err?.message);
    })
    .finally(() => setReduxLoading(false));
};
