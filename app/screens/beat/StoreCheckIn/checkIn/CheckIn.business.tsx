import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {ID_ALL} from 'utils/Constants';
import {
  ICollectionReqBody,
  IPrimaryData,
  IPrimaryDropdownResponse,
  IPrimaryRedressalReqBody,
  ISecondaryAddress,
  ISecondaryData,
  ISecondaryDropdownResponse,
  ISupportTicketReqBody,
  ITicketHistoryReqBody,
  ITicketHistoryResponse,
} from './CheckIn.interface';
import {
  createSupportTicket,
  createTicket,
  getLastVisitDate,
  getPrimaryDropdown,
  getRaiseTicketDropdown,
  getSurveyResponse,
  getTicketHistory,
  submitCollections,
} from 'services/methods/storeCheckIn';

const convertToDropdownFormat = (
  data: IPrimaryDropdownResponse,
): IPrimaryData => {
  const transformedProductCategory = data.productCategory.map(item => ({
    value: item?.categoryId,
    label: item?.categoryName,
  }));

  const transformedSupportType = data.supportType.map(item => ({
    value: item,
    label: item,
  }));

  return {
    subType: data.subType,
    productCategory: transformedProductCategory,
    supportType: transformedSupportType,
  };
};

//API to fetch Primary Dropdown Details

export const getPrimaryDropdownData = async (
  setDropdownData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getPrimaryDropdown());
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data: {data},
      } = result;
      const formattedData = convertToDropdownFormat(data);
      setDropdownData(formattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API To Raise Ticket

export const submitPrimaryTicket = async (
  body: IPrimaryRedressalReqBody,
  channelPartnerId: string,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      createTicket(channelPartnerId),
      body,
    );
    if (result?.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.data?.errorMessage);
  } finally {
    setReduxLoading(false);
  }
};

export const mapApiResponseToCheckbox = (data: string[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item => result.push({id: item, name: item}));
  return result;
};

//API to get secondary GRedressal drodpown

const convertToSecondaryDropdownFormat = (
  data: ISecondaryDropdownResponse,
): ISecondaryData => {
  const transformedProductCategory = data?.productCategory?.map(category => {
    return {
      label: category.categoryId,
      value: category.categoryName,
    };
  });

  const transformedSupportType = data.supportType.map(item => ({
    value: item,
    label: item,
  }));

  let dateFilter;

  if (data.dateFilter) {
    dateFilter = data?.dateFilter?.map(item => ({
      label: item,
      value: item,
    }));
  }

  return {
    subType: data.subType,
    productCategory: transformedProductCategory,
    supportType: transformedSupportType,
    dateFilter: dateFilter,
  };
};

export const getRaiseTicketDropdownData = async (
  relationId: string,
  setDropdownData: SetStateAction<any>,
  setRequestData?: SetStateAction<any>,
  setStatusData?: SetStateAction<any>,
  setDateFilter?: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getRaiseTicketDropdown(relationId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data: {data},
      } = result;
      const formattedData = convertToSecondaryDropdownFormat(data);
      setDropdownData && setDropdownData(formattedData);

      if (data?.supportType) {
        const response = mapApiResponseToCheckbox(data?.supportType);
        setRequestData && setRequestData(response);
      }
      if (data?.status) {
        const response = mapApiResponseToCheckbox(data?.status);
        setStatusData && setStatusData(response);
      }
      if (data?.dateFilter) {
        const response = convertToSecondaryDropdownFormat(data);
        setDateFilter && setDateFilter(response?.dateFilter);
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit support Raise Ticket

export const submitRaiseTicket = async (
  relationId: string,
  body: ISupportTicketReqBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      createSupportTicket(relationId),
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

//API to get Ticket History (Sec GRedressal)

export const getTicketHistoryData = async (
  relationId: string,
  body: ITicketHistoryReqBody,
  setTicketHistory: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      getTicketHistory(relationId),
      body,
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;

      setTicketHistory((prev: ITicketHistoryResponse[]) => [...prev, ...data]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Survey Responses
export const getSurveyResponses = async (
  channelPartnerId: string,
  setSurveyData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getSurveyResponse(channelPartnerId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data: {data},
      } = result;
      setSurveyData(data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API for Collections
export const submitCollection = async (
  beatPlanItemId: string,
  body: ICollectionReqBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      PUT,
      submitCollections(beatPlanItemId),
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

const transformedAddress = (data: ISecondaryAddress[]) => {
  let result = data?.map((item: ISecondaryAddress) => ({
    value: item?.pinCode,
    label: [item?.addressLine1, item?.addressLine2].filter(Boolean).join(','),
  }));
  return result;
};

export const getLeadsAddress = async (
  channelPartnerId: string,
  setSecondaryAddress?: SetStateAction<any>,
  setLeadsData?: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getLastVisitDate(channelPartnerId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data: {data},
      } = result;
      const address = transformedAddress([data]);
      setSecondaryAddress && setSecondaryAddress(address);
      setLeadsData && setLeadsData(data?.lastVisitDate);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
