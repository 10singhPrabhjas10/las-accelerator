import {SetStateAction} from 'react';

import {GET, HttpStatusCode, POST} from 'constants/httpConstants';

import {
  getMappedRetailerApi,
  getMappedRetailerFilterApi,
} from 'services/methods/primaryChannelPartnerServices';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {mapApiResponseToCheckbox} from '../PrimaryChannelPartner.helper';
import {formatNumberWithCommas} from 'utils/commonMethods';

export const mapApiResponseToMappedRetailer = (data: IMappedRetailer[]) => {
  return data.map(item => ({
    retailerId: item?.retailerCode,
    data: [
      {
        title: 'Retailer Name',
        text: item?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Product Division',
        text: item?.productDivision ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sales',
        text: item?.sales
          ? `₹ ${formatNumberWithCommas(parseInt(item?.sales))}/-`
          : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const getMappedRetailerListData = async (
  requestBody: IMappedRetailerRequestBody,
  channelPartnerId: string,
  setMappedRetailerData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      getMappedRetailerApi(channelPartnerId),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data, meta} = response?.data;
      const result = mapApiResponseToMappedRetailer(data);
      setMappedRetailerData((prev: IMappedRetailer[]) => [...prev, ...result]);
      setTotalPages(meta?.paginationData?.pageCount || 1);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getMappedRetailerFilterData = async (
  setProductDivision: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(GET, getMappedRetailerFilterApi());
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const categoryNamesList = mapApiResponseToCheckbox(response.data);
      setProductDivision(categoryNamesList);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};
