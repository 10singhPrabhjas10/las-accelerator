import {GET, HttpStatusCode, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  getBTLFilters,
  getCategoryDropdown,
  getCompetitiveSeries,
  getCompetitorName,
  getSKUName,
  submitCompetitiveIntelligence,
} from 'services/methods/storeCheckIn';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

import {
  IBtlFilterResponse,
  ICategoryDropdownResponse,
  ICompetitiveIntelligenceResponse,
  IRequestBody,
  ISeriesDropdownResponse,
} from './CompetitiveIntelligence.interface';

const convertToDropdownFormat = (data: ICategoryDropdownResponse[]) => {
  const transformedCategory = data.map(item => ({
    value: item?.categoryId,
    label: item?.categoryName,
  }));

  return transformedCategory;
};

//API to get Product Division Dropdown
export const getProductDivisionDropdownData = async (
  channelPartnerCode: string,
  setDropdownData: SetStateAction<any>,
) => {
  setReduxLoading(true);

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

const formatSeriesDropdown = (data: ISeriesDropdownResponse[]) => {
  const uniqueSeriesCodes = new Set<number>();
  const transformedSeries = [];

  for (const item of data) {
    if (
      item.attributes.seriesCode !== null &&
      !uniqueSeriesCodes.has(item.attributes.seriesCode)
    ) {
      uniqueSeriesCodes.add(item.attributes.seriesCode);
      transformedSeries.push({
        value: item.attributes.seriesCode,
        label: item.attributes.seriesDescription,
      });
    }
  }

  return transformedSeries;
};

//API to fetch Series dropdown

export const getSeriesDropdownData = async (
  categoryId: string,
  setDropdownData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setPageCount: SetStateAction<any>,
  setCurrentPage: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getCompetitiveSeries(categoryId, pageNumber, pageSize),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount, page},
        },
      } = result?.data;
      const formatedData = formatSeriesDropdown(data);
      setDropdownData((prev: any) => [...prev, ...formatedData]);
      setPageCount(pageCount || 1);
      setCurrentPage(page || 1);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch SKU Name Dropdown

const formatSkuDropdown = (data: ISeriesDropdownResponse[]) => {
  const tranformedSkuCategory = data?.map(item => ({
    value: item?.attributes?.skuProduct,
    label: item?.attributes?.skuProductName,
  }));
  return tranformedSkuCategory;
};

export const getSkuNameDropdownData = async (
  categoryId: string,
  seriesId: string,
  setDropdownData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setPageCount: SetStateAction<any>,
  setCurrentPage: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getSKUName(categoryId, seriesId, pageNumber, pageSize),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount, page},
        },
      } = result?.data;

      const formatedData = formatSkuDropdown(data);
      setDropdownData((prev: any) => [...prev, ...formatedData]);
      setPageCount(pageCount || 1);
      setCurrentPage(page || 1);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch Competitor Name

const formatCompetitorDropdown = (data: ICompetitiveIntelligenceResponse[]) => {
  const tranformedSkuCategory = data?.map(item => ({
    value: item?.competitiveIntelligenceId,
    label: item?.name,
  }));
  return tranformedSkuCategory;
};

export const getCompetitorNameData = async (
  categoryId: string,
  skuProductId: string,
  seriesId: string,
  setDropdownData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getCompetitorName(categoryId, skuProductId, seriesId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formattedData = formatCompetitorDropdown(data);
      setDropdownData(formattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to fetch BTL Type

const formatBtlTypeDropdown = (data: IBtlFilterResponse) => {
  const transformedBtlType = data?.btlTypeEnum?.map(item => ({
    value: item,
    label: item,
  }));

  return transformedBtlType;
};

export const getBTLTypeDropdownData = async (
  setBtlTypeDropdownData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getBTLFilters());
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formatedData = formatBtlTypeDropdown(data);
      setBtlTypeDropdownData(formatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit Competitive Data

export const submitCompetitiveData = async (
  competitiveIntelligenceId: string,
  reqBody: IRequestBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      PUT,
      submitCompetitiveIntelligence(competitiveIntelligenceId),
      reqBody,
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
