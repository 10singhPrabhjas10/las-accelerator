import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  getCategories,
  getInventoryDetails,
  submitDiscrepancy,
} from 'services/methods/storeCheckIn';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {
  ICategoriesResponse,
  IDiscrepancyReqBody,
  IInventoryDetailsResponse,
} from './InventoryCheck.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';

//API to get Categories & Sub Categories
const transformCategoryData = (data: ICategoriesResponse[]) => {
  return data?.map(item => ({
    accordionHeader: item?.categoryName,
    accordionSubHeader: item?.subCategories,
  }));
};

export const getCategoriesData = async (
  channelPartnerId: string,
  setCategoriesData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getCategories(channelPartnerId));
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormattedData = transformCategoryData(data);
      setCategoriesData(finalFormattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Inventory Details
const transformInventoryDetails = (data: IInventoryDetailsResponse[]) => {
  return data?.map(item => ({
    data: [
      {
        title: 'Series Name',
        text:
          item?.seriesName === null
            ? EMPTY_DATA_DASH
            : item?.seriesName || EMPTY_DATA_DASH,
      },
      {
        title: 'SKU Name',
        text: item?.skuDescription ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Qty',
        text: item?.closingStock ?? EMPTY_DATA_DASH,
      },
    ],
    categoryName: item?.categoryName ?? EMPTY_DATA_DASH,
    skuCode: item?.skuCode ?? EMPTY_DATA_DASH,
    skuName: item?.skuDescription ?? EMPTY_DATA_DASH,
    quantity: item?.closingStock ?? EMPTY_DATA_DASH,
  }));
};

export const getInventoryDetailsData = async (
  category: string,
  subCategory: string,
  setInventoryData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getInventoryDetails(category, subCategory),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormattedData = transformInventoryDetails(data);
      setInventoryData(finalFormattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit Discrepancy
export const submitDiscrepancyData = async (
  channelPartnerId: string,
  body: IDiscrepancyReqBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      submitDiscrepancy(channelPartnerId),
      body,
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
