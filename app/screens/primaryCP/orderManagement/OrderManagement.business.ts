import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  getOrderHistoryDetailsApi,
  getOrderHistoryFilterApi,
  getOrderInvoiceDetailsApi,
  getOrderHistoryLineItemsApi,
  getOrderHistoryListApi,
  getInvoiceSummaryApi,
  getOrderHistoryEpodApi,
  getCpInvoiceDetailsApi,
  getRequestInitiationApi,
  getRequestInitiationUpdateApi,
  getSkuProductListApi,
  getReplacementReasonsApi,
  getReplacementUpdateApi,
  getInvoiceSelectionApi,
  getSkuDetailsApi,
  getReplacementStatusApi,
  getReturnStatusApi,
  getCpInvoiceDetailsLineItemsApi,
  getOrderReturnSubmitApi,
} from 'services/methods/primaryChannelPartnerServices';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {
  mapApiProductDivisionResponseToCheckbox,
  mapApiProductDivisionResponseToDropdown,
  mapSkuApiResponseToAutoComplete,
  mapApiResponseToDropdown,
  mapApiResponseToInvoiceDetails,
  mapApiResponseToOrderEpodDetails,
  mapApiResponseToOrderHistoryDetails,
  mapApiResponseToOrderHistoryLineItems,
  mapApiResponseToOrderHistoryList,
  mapApiResponseToOrderInvoiceMoreDetails,
  mapApiResponseToOrderInvoiceSummary,
  mapApiResponseToInvoiceSelection,
  mapApiResponseToReplacementInformation,
  mapApiResponseToReturnInformation,
} from './OrderManagement.helper';
import {store} from 'store/redux/store';
import {ID_ALL} from 'utils/Constants';

export const getOrderHistoryListData = async (
  requestBody: IOrderHistoryRequestBody,
  setOrderHistoryData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      getOrderHistoryListApi(),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {data, meta} = response?.data;
      const result = mapApiResponseToOrderHistoryList(data);
      setOrderHistoryData((prev: IOrderHistoryListProps[]) => [
        ...prev,
        ...result,
      ]);
      setTotalPages(meta?.pagination?.pageCount || 1);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getOrderHistoryDetailsData = async (
  orderNo: string,
  setOrderHistoryData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      getOrderHistoryDetailsApi(orderNo),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const result = mapApiResponseToOrderHistoryDetails(response?.data);
      setOrderHistoryData(result);
    }
  } catch (error: any) {
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

export const getOrderHistoryFilterData = async (
  setOrderStatus: SetStateAction<any>,
  setCategoryIds: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const customerCode = store.getState().channelPartner.customerCode;
    const response = await NetworkRequest(
      GET,
      getOrderHistoryFilterApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const {orderStatus, productdivision} = response?.data;
      const orderStatusResult = mapApiResponseToCheckbox(orderStatus);
      setOrderStatus(orderStatusResult);
      const productDivisionResult =
        mapApiProductDivisionResponseToCheckbox(productdivision);
      setCategoryIds(productDivisionResult);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getOrderHistoryLineItemsData = async (
  requestBody: IOrderLineItemsRequest | IOrderInvoiceItemsRequest,
  setOrderLineData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
  fromOrderDetails: boolean,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      fromOrderDetails
        ? getOrderHistoryLineItemsApi()
        : getCpInvoiceDetailsLineItemsApi(),
      requestBody,
    );
    if (
      response?.status === HttpStatusCode.OK &&
      response?.data &&
      response?.data?.data
    ) {
      const result = mapApiResponseToOrderHistoryLineItems(
        response?.data?.data,
        fromOrderDetails,
      );
      setOrderLineData((prev: IDataResponse[]) => [...prev, ...result]);
      setTotalPages(response?.data?.meta?.pagination?.pageCount ?? 1);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getOrderInvoicesData = async (
  requestBody: IOrderLineItemsRequest | IInvoiceItemsRequest,
  setOrderInvoiceData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
  isOrderInvoice: boolean,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      isOrderInvoice ? getOrderInvoiceDetailsApi() : getCpInvoiceDetailsApi(),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const result = mapApiResponseToInvoiceDetails(
        response?.data?.data,
        isOrderInvoice,
      );
      setOrderInvoiceData((prev: IOrderInvoiceData[]) => [...prev, ...result]);
      setTotalPages(response?.data?.meta?.pagination?.pageCount ?? 1);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getOrderInvoiceSummaryData = async (
  orderNo: string,
  setInvoiceSummaryData: SetStateAction<any>,
  isSummaryScreen: boolean,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(GET, getInvoiceSummaryApi(orderNo));
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const result = isSummaryScreen
        ? mapApiResponseToOrderInvoiceMoreDetails(response?.data)
        : mapApiResponseToOrderInvoiceSummary(response?.data);
      setInvoiceSummaryData(result);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getOrderInvoiceEpodData = async (
  orderNo: string,
  setEpodData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(GET, getOrderHistoryEpodApi(orderNo));
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const result = mapApiResponseToOrderEpodDetails(response?.data);
      setEpodData(result);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getReturnRequestInitiationData = async (
  customerCode: string,
  setRequestData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      getRequestInitiationApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const data = response?.data;
      const result = {
        customerCode: data?.customerCode,
        salesOffice: data?.salesOffice,
        categoryData: mapApiProductDivisionResponseToDropdown(
          data?.categoryDetails,
        ),
        returnReasonData: mapApiResponseToDropdown(data?.reasonsForReturn),
      };
      setRequestData(result);
    }
  } catch (error: any) {
    handleApiError(error?.data?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const updateRequestInitiationData = async (
  requestBody: IRequestInitiationRequest,
  onSuccess: (category: string) => void,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      getRequestInitiationUpdateApi(),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      onSuccess(requestBody.productCategory);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getProductSkuData = async (
  categoryId: string,
  productSku: string,
  setProductSkuData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getSkuProductListApi(categoryId, productSku),
    );
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      const dropdownData = mapSkuApiResponseToAutoComplete(data);
      setProductSkuData(dropdownData);
    }
  } catch (error: any) {
    handleApiError(error?.data?.error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getSkuDetailData = async (
  productSku: string,
  setProductSkuData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getSkuDetailsApi(productSku));
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      setProductSkuData(data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const updateAddNewSkuData = async (
  requestBody: IAddNewSkuRequest,
  onSuccess: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      POST,
      getOrderReturnSubmitApi(),
      requestBody,
    );
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      onSuccess();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getReplacementReasonsData = async (
  setReturnReasonData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getReplacementReasonsApi());
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      const dropdownData = mapApiResponseToDropdown(data);
      setReturnReasonData(dropdownData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const submitReplacementData = async (
  requestBody: IReplacementRequest,
  onSuccess: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      POST,
      getReplacementUpdateApi(),
      requestBody,
    );
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      onSuccess();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getInvoiceSelectionData = async (
  requestBody: IInvoiceSelectionRequest,
  setInvoiceSelectionData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      POST,
      getInvoiceSelectionApi(),
      requestBody,
    );
    if (
      response?.status === HttpStatusCode.OK &&
      response?.data &&
      response?.data?.data
    ) {
      const responseData = mapApiResponseToInvoiceSelection(
        response?.data?.data,
      );
      setInvoiceSelectionData((prev: IInvoiceSelectionData[]) => [
        ...prev,
        ...responseData,
      ]);
      setTotalPages(response?.data?.meta?.pagination?.pageCount ?? 1);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getReplacementSubmitInformationData = async (
  setInformationData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const customerCode = store.getState().channelPartner.customerCode;
    const result = await NetworkRequest(
      GET,
      getReplacementStatusApi(customerCode),
    );
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      const response = mapApiResponseToReplacementInformation(data);
      setInformationData(response?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getReturnSubmitInformationData = async (
  setInformationData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const customerCode = store.getState().channelPartner.customerCode;
    const result = await NetworkRequest(GET, getReturnStatusApi(customerCode));
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      const response = mapApiResponseToReturnInformation(data);
      setInformationData(response?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
