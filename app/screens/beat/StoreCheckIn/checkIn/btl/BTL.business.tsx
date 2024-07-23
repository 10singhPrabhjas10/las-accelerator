import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  getCategoryDropdown,
  getSubCategoryDropdown,
  getSeriesDropdown,
  getBTLFilters,
  createBTLPlan,
  getSkuDropdown,
  creatBTLStatus,
} from 'services/methods/storeCheckIn';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import {
  BTLItem,
  IBTLListRequestBody,
  IBTLStatusReqBody,
  IBeatPlanRequestBody,
  IBtlFilterResponse,
  ICategoryDropdownResponse,
  ISeriesDropdownResponse,
  ISubCategoryDrodownResponse,
} from './BTL.interface';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

export const mapApiResponseToCheckbox = (data: string[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item => result.push({id: item, name: item}));
  return result;
};

const convertToDropdownFormat = (data: ICategoryDropdownResponse[]) => {
  const transformedCategory = data.map(item => ({
    value: item?.categoryId,
    label: item?.categoryName,
  }));

  return transformedCategory;
};

//API to get Category Dropdown
export const getCategoryDropdownData = async (
  channelPartnerCode: string,
  setDropdownData: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getCategoryDropdown(channelPartnerCode),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formattedData = convertToDropdownFormat(data);

      setDropdownData(formattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get sub category dropdown Data

const formatSubCategoryDropdown = (data: ISubCategoryDrodownResponse[]) => {
  const transformedSubCategory = data?.map(item => ({
    value: item?.attributes?.subCategoryId,
    label: item?.attributes?.subCategoryName,
  }));
  return transformedSubCategory;
};

export const getSubCategoryDropdownData = async (
  categoryId: string,
  setSubCategoryDropdownData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setTotalPages: SetStateAction<any>,
  setCurrentPage: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getSubCategoryDropdown(categoryId, pageNumber, pageSize),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount, page},
        },
      } = result?.data;
      const formattedData = formatSubCategoryDropdown(data);
      setSubCategoryDropdownData((prev: any) => [...prev, ...formattedData]);
      setTotalPages(pageCount || 1);
      setCurrentPage(page || 1);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get series dropdown data

const formatSeriesDropdown = (data: ISeriesDropdownResponse[]) => {
  const uniqueSeriesCodes = new Set<number>();
  const transformedSeries = [];

  for (const item of data) {
    if (!uniqueSeriesCodes.has(item.attributes.seriesCode)) {
      uniqueSeriesCodes.add(item.attributes.seriesCode);
      transformedSeries.push({
        value: item.attributes.seriesCode,
        label: item.attributes.seriesDescription,
      });
    }
  }

  return transformedSeries;
};

export const getSeriesDropdownData = async (
  categoryId: string,
  subCategoryId: string,
  setSeriesDropdownData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setTotalPages: SetStateAction<any>,
  setCurrentPage: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getSeriesDropdown(categoryId, subCategoryId, pageNumber, pageSize),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount, page},
        },
      } = result?.data;
      const formattedData = formatSeriesDropdown(data);
      setSeriesDropdownData((prev: any) => [...prev, ...formattedData]);
      setTotalPages(pageCount || 1);
      setCurrentPage(page || 1);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get SKU dropdown

const formatSkuDropdown = (data: ISeriesDropdownResponse[]) => {
  const transformedSkuCategory = data?.map(item => ({
    value: item?.attributes?.skuProduct,
    label: item?.attributes?.skuProductName,
    uom: item?.attributes?.uom,
  }));
  return transformedSkuCategory;
};

export const getSKuDropdownData = async (
  categoryId: string,
  subCategoryId: string,
  seriesId: string,
  setSkuDropdownData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setTotalPages: SetStateAction<any>,
  setSkuPageNo: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getSkuDropdown(
        categoryId,
        subCategoryId,
        seriesId,
        pageNumber,
        pageSize,
        '',
      ),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount, page},
        },
      } = result?.data;
      const formattedData = formatSkuDropdown(data);

      setSkuDropdownData((prev: any) => [...prev, ...formattedData]);
      setTotalPages(pageCount || 1);
      setSkuPageNo(page || 1);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get BTL type Dropdown

const formatBtlTypeDropdown = (data: IBtlFilterResponse) => {
  const transformedBtlType = data?.btlTypeEnum?.map(item => ({
    value: item,
    label: item,
  }));

  const transformedStatusType = data?.statusEnum?.map(item => ({
    value: item,
    label: item,
  }));

  return {btlType: transformedBtlType, statusType: transformedStatusType};
};

export const getBTLTypeDropdownData = async (
  setBtlTypeDropdownData: SetStateAction<any>,
  setStatusFilter?: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getBTLFilters());
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formattedData = formatBtlTypeDropdown(data);
      setBtlTypeDropdownData && setBtlTypeDropdownData(formattedData);

      if (data?.statusEnum?.length > 0) {
        const response = mapApiResponseToCheckbox(data?.statusEnum);
        setStatusFilter && setStatusFilter(response);
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit BTL Plan

export const submitBTLPlan = async (
  body: IBeatPlanRequestBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, createBTLPlan(), body);
    if (result.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const transformedRequestList = (data: BTLItem[]) => {
  return data.map(item => ({
    id: item.id.toString(),
    btlMaterialCode: item?.btlMaterialCode,
    btlNo: item?.appRequestNo
      ? `${getTranslationLabel(
          'btl_request',
        )}: ${item?.appRequestNo?.toString()}`
      : EMPTY_DATA_DASH,
    data: [
      {
        title: getTranslationLabel('cp_name'),
        text: item.channelPartnerName
          ? item?.channelPartnerName
          : item?.retailerName ?? EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('request_date'),
        text: item?.requestDate
          ? convertDateToDisplay(item?.requestDate, DateFormats.DD_MM_YYYY)
          : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('status'),
        text: item.status ?? EMPTY_DATA_DASH,
      },
    ],
  }));
};

//API to get BTL Request List

export const getBTLRequestList = async (
  body: IBTLListRequestBody,
  setBTLRequestList: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getBTLFilters(), body);
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        pagination: {pageCount},
      } = result?.data;
      const formattedData = transformedRequestList(data);
      setBTLRequestList((prev: any) => [...prev, ...formattedData]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit BTL Status

export const submitBTLStatus = async (
  body: IBTLStatusReqBody,
  btlMaterialCode: string,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      PUT,
      creatBTLStatus(btlMaterialCode),
      body,
    );
    if (result.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
