import NetworkRequest from 'services/networkRequest';

import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {HttpStatusCode, POST} from 'constants/httpConstants';
import {getPrimaryCustomerSePic} from 'services/methods/primaryChannelPartnerServices';

export interface ICustomerSePicBody {
  channelPartnerId: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}
export interface IPrimaryCustomerResponse {
  id: number;
  retailerPartnerName: string;
  categoryId: string;
  channelPartnerGroup: string;
  lastOrderDate: string;
  channelPartnerId: string;
  categories: string;
  salesUserId: string;
  salesUser: {
    name: string;
    mobileNumber: string;
  };
}

//API to get Primary Customer SEPIC Data
export const getCustomerSePicData = async (
  setCustomerData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  body: ICustomerSePicBody,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getPrimaryCustomerSePic(), body);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      if (result?.data?.data) {
        setCustomerData((prev: IPrimaryCustomerResponse[]) => [
          ...prev,
          ...result?.data?.data,
        ]);
      }
      if (result?.data?.meta?.pagination) {
        setPageCount(result?.data?.meta?.pagination?.pageCount || 1);
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
