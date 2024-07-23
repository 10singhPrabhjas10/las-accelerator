import {SetStateAction} from 'react';

import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {
  downloadSalesPerformanceReport,
  getChannelPartnerDetailsApi,
  getChannelPartnerSearchApi,
  getDmsInformationDetailsApi,
  getGeneralInformationDetailsApi,
  getKeyContactsDetailsApi,
  getPrimarySalesApi,
  getPrimarySalesDetailsApi,
  getPrimarySalesFilter,
  getRelatedCodeDetailsApi,
  getRelatedCodeListApi,
  getRelatedCodesFilterApi,
  getSecondarySalesApi,
  getSecondarySalesPerformanceApi,
  getSecondarySalesRetailerSearchApi,
  getShippingDetailsApi,
  getShippingInformationListApi,
  getVolumeTarget,
} from 'services/methods/primaryChannelPartnerServices';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {
  mapApiResponseToCustomerDetails,
  mapApiResponseToDmsInformation,
  mapApiResponseToGeneralInformation,
  mapApiResponseToKeyContacts,
  mapApiResponseToPrimarySales,
  mapApiResponseToRelatedCodeList,
  mapApiResponseToRelatedCodes,
  mapApiResponseToSearch,
  mapApiResponseToSecondarySales,
  mapApiResponseToSecondarySalesPerformance,
  mapApiResponseToSecondarySalesRetailerSearch,
  mapApiResponseToShippingDetails,
  mapApiResponseToShippingList,
} from './PrimaryChannelPartner.helper';
import {store} from 'store/redux/store';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import moment from 'moment';
import {formatNumberWithCommas, getTranslationLabel} from 'utils/commonMethods';
import {generatedSalesHtml} from './primarySales/primarySalesPerformance/PrimarySales.helper';
import {createPDF} from './financialInformation/FinancialInformation.helper';
import {getRetailerPerformance} from 'services/methods/secondaryChannelPartner';

export const getPrimaryCustomerDetails = async (
  customerCode: string,
  setCustomerData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      getChannelPartnerDetailsApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToCustomerDetails(response?.data[0]);
      setCustomerData(data);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getGeneralInformationDetails = async (
  setGeneralInfo: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getGeneralInformationDetailsApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToGeneralInformation(response?.data[0]);
      setGeneralInfo(data);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getKeyContactsDetails = async (
  setKeyContactDetails: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getKeyContactsDetailsApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToKeyContacts(response?.data);
      setKeyContactDetails(data);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const fetchChannelPrimarySearch = async (
  searchQuery: string,
  setPrimaryPartnerData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const response = await NetworkRequest(
      GET,
      getChannelPartnerSearchApi(searchQuery),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const updatedData = mapApiResponseToSearch(response?.data.data);
      setPrimaryPartnerData(updatedData);
    }
  } catch (error: any) {
    handleApiError(error?.data?.error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getDmsInformationDetails = async (
  setDmsData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getDmsInformationDetailsApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToDmsInformation(response?.data.results[0]);
      setDmsData(data);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getShippingInformationListData = async (
  setShippingData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getShippingInformationListApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToShippingList(response?.data);
      setShippingData(data);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getShippingDetails = async (
  customerAddressCode: string,
  setShippingData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getShippingDetailsApi(customerCode, customerAddressCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToShippingDetails(response?.data[0]);
      setShippingData(data);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getRelatedCodeListData = async (
  requestBody: IRelatedCodeRequestBody,
  setShippingData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      POST,
      getRelatedCodeListApi(customerCode),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data, meta} = response?.data;
      const result = mapApiResponseToRelatedCodeList(data);
      setShippingData((prev: IRelatedCodesData[]) => [...prev, ...result]);
      setTotalPages(meta?.pagination?.pageCount || 1);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const mapApiResponseToCheckbox = (data: string[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item => result.push({id: item, name: item}));
  return result;
};

export const getRelatedCodesFilterData = async (
  setProductDivision: SetStateAction<any>,
  setRelationship: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getRelatedCodesFilterApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const relationshipList = mapApiResponseToCheckbox(
        response.data.relationshipList,
      );
      const categoryNamesList = mapCategoryResponse(
        response.data.catgeoryNamesList,
      );
      setProductDivision(categoryNamesList);
      setRelationship(relationshipList);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const gerRelatedCodesDetails = async (
  relatedCodeUserId: string,
  setRelatedCodeData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getRelatedCodeDetailsApi(customerCode, relatedCodeUserId),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = mapApiResponseToRelatedCodes(response.data);
      setRelatedCodeData(data);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const gerSecondarySalesDetails = async (
  requestBody: ISecondarySalesRequestBody,
  setSalesData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      POST,
      getSecondarySalesApi(customerCode),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data, meta} = response?.data;
      const updatedData = mapApiResponseToSecondarySales(data);
      setSalesData((prev: ISecondarySalesData[]) => [...prev, ...updatedData]);
      setTotalPages(meta?.pagination?.pageCount || 1);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const gerSecondarySalesPerformanceData = async (
  retailerChannelPartnerId: string,
  type: string,
  setSalesData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getSecondarySalesPerformanceApi(
        customerCode,
        retailerChannelPartnerId,
        type,
      ),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const updatedData = mapApiResponseToSecondarySalesPerformance(
        response.data.data[0],
      );
      setSalesData(updatedData);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const gerSecondarySalesRetailerData = async (
  searchQuery: string,
  setRetailerData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const customerCode = store.getState().channelPartner.customerCode;
  try {
    const response = await NetworkRequest(
      GET,
      getSecondarySalesRetailerSearchApi(customerCode, searchQuery),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const updatedData = mapApiResponseToSecondarySalesRetailerSearch(
        response?.data.data,
      );
      setRetailerData(updatedData);
    }
  } catch (error: any) {
    handleApiError(error?.data?.error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getPrimarySalesData = async (
  requestBody: IPrimarySalesRequestBody,
  setSalesData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      getPrimarySalesApi(),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data, meta} = response?.data;
      const updatedData = mapApiResponseToPrimarySales(data);
      setSalesData((prev: IPrimarySalesData[]) => [...prev, ...updatedData]);
      setTotalPages(meta?.pagination?.pageCount || 1);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const transformPrimarySalesDetails = (
  data: IPrimarySalesDetailsResponse,
  salesData: IPrimarySalesResponse,
) => {
  const previousYearShort = moment().subtract(1, 'year').format('YY');
  const currentYearShort = moment().format('YY');
  const currentMonthShort = moment().format('MMM');
  return {
    categoryName: data?.category,
    categoryId: data?.categoryId,
    data: [
      {
        title: `${getTranslationLabel('target')} (FY ${currentYearShort})`,
        text: salesData?.fy_target
          ? `₹ ${formatNumberWithCommas(parseInt(salesData?.fy_target, 10))}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: `${getTranslationLabel('ytd _target')} (FY ${currentYearShort})`,
        text: salesData?.total_target
          ? `₹ ${formatNumberWithCommas(
              parseInt(salesData?.total_target, 10),
            )}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: `${getTranslationLabel('ytd_sales')} (FY ${currentYearShort})`,
        text: salesData?.total_achievement
          ? `₹ ${formatNumberWithCommas(
              parseInt(salesData?.total_achievement, 10),
            )}/-`
          : EMPTY_DATA_DASH,
      },

      {
        title: getTranslationLabel('ytd_achievement_percentage'),
        text:
          salesData?.ytdAchievementPercentage === null
            ? EMPTY_DATA_DASH
            : `${salesData?.ytdAchievementPercentage?.toFixed(2)}%` ||
              EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('ytd_achievement_vs_fy_target'),
        text:
          salesData?.ytdAchievementvsfyTarget === null
            ? EMPTY_DATA_DASH
            : `${salesData?.ytdAchievementvsfyTarget.toFixed(2)}%` ||
              EMPTY_DATA_DASH,
      },
      {
        title: `Current Month Target (${currentMonthShort} '${currentYearShort})`,
        text:
          data?.target >= 0
            ? `₹ ${formatNumberWithCommas(data?.target)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: `${getTranslationLabel(
          'mtd_sales',
        )} (${currentMonthShort} '${currentYearShort})`,
        text:
          data?.achievement >= 0
            ? `₹ ${formatNumberWithCommas(data?.achievement)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: `PFY Sales ${previousYearShort})`,
        text:
          data?.previousYearSales >= 0
            ? `₹ ${formatNumberWithCommas(data?.previousYearSales)}/-`
            : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('mom_growth'),
        text: data?.mom >= 0 ? `${data?.mom} %` : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('qoq_growth'),
        text: data?.qoq >= 0 ? `${data?.qoq} %` : EMPTY_DATA_DASH,
      },
    ],
  };
};

export const getPrimarySalesDetails = async (
  channelPartnerId: string,
  categoryId: string,
  setSalesData: SetStateAction<any>,
  salesData: IPrimarySalesResponse,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      getPrimarySalesDetailsApi(channelPartnerId, categoryId),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data} = response?.data;
      const finalFormattedData = transformPrimarySalesDetails(data, salesData);
      setSalesData(finalFormattedData);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const mapCategoryResponse = (data: IProductDivision[]) => {
  return data?.map(item => ({
    id: item?.categoryId,
    name: item?.categoryName,
  }));
};

const mapMonthResponse = (data: string[]) => {
  return data?.map(item => ({
    value: item,
    label: item,
  }));
};

export const getPrimarySalesFilterData = async (
  channelPartnerId: string,
  setCategoryfilter: SetStateAction<any>,
  setMonthFilter: SetStateAction<any>,
  fromRetailerPerformance?: boolean,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      fromRetailerPerformance
        ? getRetailerPerformance(channelPartnerId)
        : getPrimarySalesFilter(channelPartnerId),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data} = response;

      const productDivisionData = fromRetailerPerformance
        ? mapApiResponseToCheckbox(data?.data?.categoryNames)
        : mapCategoryResponse(data?.productdivision);
      const monthFilter = mapMonthResponse(data?.month);
      setCategoryfilter(productDivisionData);
      setMonthFilter(monthFilter);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const downloadSalesReportData = async (
  requestBody: IDownloadSalesReportRequestBody,
  startDate: string,
  endDate: string,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      downloadSalesPerformanceReport(),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const html = generatedSalesHtml(response?.data, startDate, endDate);
      createPDF(html);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

const transformVolumeTarget = (data: IVolumeTarget) => {
  const upcomingYear = moment().add(1, 'year').format('YY');
  const currentYearShort = moment().format('YY');
  const currentMonthShort = moment().format('MMM');
  return {
    data: [
      {
        title: `Target (FY ${upcomingYear})`,
        text: EMPTY_DATA_DASH,
      },
      {
        title: `YTD Vol. (FY ${currentYearShort})`,
        text: data?.ytdVol ?? EMPTY_DATA_DASH,
      },
      {
        title: `YTD Vol. Target (FY ${currentYearShort})`,
        text: EMPTY_DATA_DASH,
      },
      {
        title: 'YTD Vol. Achievement %',
        text: EMPTY_DATA_DASH,
      },
      {
        title: 'YTD Achv. vs FY Target',
        text: EMPTY_DATA_DASH,
      },
      {
        title: `MTD Vol. (${currentMonthShort} ${currentYearShort})`,
        text: data?.mtdVol ?? EMPTY_DATA_DASH,
      },
      {
        title: `MTD Vol. Target (${currentMonthShort} ${currentYearShort})`,
        text: EMPTY_DATA_DASH,
      },
      {
        title: 'MoM Growth',
        text: EMPTY_DATA_DASH,
      },
      {
        title: 'QoQ Growth',
        text: EMPTY_DATA_DASH,
      },
    ],
  };
};

export const getVolumeTargetData = async (
  channelPartnerId: string,
  categoryId: string,
  setVolumeTargetData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      getVolumeTarget(channelPartnerId, categoryId),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data} = response?.data;
      const finalFormattedData = transformVolumeTarget(data);
      setVolumeTargetData(finalFormattedData);
    }
  } catch (error: any) {
    console.log(error);
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
