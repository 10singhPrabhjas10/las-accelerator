import NetworkRequest from 'services/networkRequest';

import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {HttpStatusCode, POST} from 'constants/httpConstants';
import {getCustomerSePic} from 'services/methods/secondaryChannelPartner';
import {
  ICustomerSePicBody,
  ICustomerSePicResponse,
} from './CustomerSePic.interface';

//API to get Secondary Customer SEPIC Data

export const getCustomerSePicData = async (
  setCustomerData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  body: ICustomerSePicBody,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getCustomerSePic(), body);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      setCustomerData((prev: ICustomerSePicResponse[]) => [...prev, ...data]);
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
