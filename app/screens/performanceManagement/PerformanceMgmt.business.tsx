import {
  getCategories,
  getChannelPartners,
  getComplianceReport,
  getPrimarySales,
  getSecondarySales,
  getSecondaryStoreDetails,
} from 'services/methods/performanceMgmt';
import NetworkRequest from 'services/networkRequest';
import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {
  IChannelDropdownResponse,
  IComplianceReqBody,
  IPrimarySalesResponse,
} from './PerformanceMgmt.interface';
import {formatNumber} from 'utils/commonMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {ICategoryDropdownResponse} from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.interface';

//API to get Primary Sales (Yearly, Monthly)
export const transformTarget = (data: IPrimarySalesResponse) => {
  return [
    {
      leftTitle:
        data?.target >= 0 ? `₹ ${formatNumber(data.target)}` : EMPTY_DATA_DASH,
      rightTitle:
        data?.acheivedValue >= 0
          ? `₹ ${formatNumber(data.acheivedValue)}`
          : EMPTY_DATA_DASH,
    },
  ];
};

export const getPrimarySalesData = async (
  reportType: string,
  setTargetData: SetStateAction<any>,
  channelPartnerId?: string,
  categoryId?: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getPrimarySales(reportType, channelPartnerId, categoryId),
    );

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformTarget(data);
      setTargetData(finalFormatedData?.[0]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get channel Partner Dropdown
const convertChannelDropdown = (data: IChannelDropdownResponse[]) => {
  const transformedCategory = data.map(item => ({
    value: item?.channelPartnerId,
    label: item?.nameOfFirm,
  }));

  return transformedCategory;
};

export const getChannelPartnersData = async (
  setChannelPartnerId: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getChannelPartners());

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = convertChannelDropdown(data);
      setChannelPartnerId(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Category
const convertToDropdownFormat = (data: ICategoryDropdownResponse[]) => {
  const transformedCategory = data.map(item => ({
    value: item?.categoryId,
    label: item?.categoryName,
  }));

  return transformedCategory;
};

export const getCategoryData = async (setCategory: SetStateAction<any>) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getCategories());

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = convertToDropdownFormat(data);
      setCategory(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Secondary Sales
export const getSecondarySalesData = async (
  reportType: string,
  setTargetData: SetStateAction<any>,
  channelPartnerId?: string,
  categoryId?: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getSecondarySales(reportType, channelPartnerId, categoryId),
    );

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformTarget(data);
      setTargetData(finalFormatedData?.[0]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Store Details
export const transformStoreTarget = (data: IPrimarySalesResponse) => {
  return [
    {
      leftTitle: data?.target ?? EMPTY_DATA_DASH,
      rightTitle: data?.acheivedValue ?? EMPTY_DATA_DASH,
    },
  ];
};
export const getStoreDetails = async (
  setStoreData: SetStateAction<any>,
  channelPartnerId?: string,
  categoryId?: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getSecondaryStoreDetails(channelPartnerId, categoryId),
    );

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformStoreTarget(data);
      setStoreData(finalFormatedData?.[0]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getComplianceData = async (
  body: IComplianceReqBody,
  setTargetData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getComplianceReport(), body);

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      setTargetData(data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
