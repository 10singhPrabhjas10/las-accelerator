import NetworkRequest from 'services/networkRequest';

import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {HttpStatusCode, POST} from 'constants/httpConstants';
import {getProductMapping} from 'services/methods/primaryChannelPartnerServices';

export interface IProductMappingRequestBody {
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface IProductMappingResponse {
  categoryId: string;
  channelPartnerGroup: string;
  categoryName: string;
}

//API to get Product Mapping Data
export const getProductMappingData = async (
  setProductMappingData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  body: IProductMappingRequestBody,
  customerCode: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      getProductMapping(customerCode),
      body,
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      setProductMappingData((prev: IProductMappingResponse[]) => [
        ...prev,
        ...data,
      ]);
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
