import NetworkRequest from 'services/networkRequest';

import {SetStateAction} from 'react';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  getChannelPartners,
  getDistrictAreaDropdown,
  getSelectedBeatPlanItem,
  createBeatPlanItem,
  createBeatPlan,
  getBeatPlanDetails,
  getBeatPlanItemList,
  getBeatPreConditions,
  submitBeatStatus,
  submitBeatDeviation,
  getBeatLeads,
} from 'services/methods/addModifyBeat';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {
  IAreaPincodeDropdownData,
  IBeatPlanItemData,
  IChannelPartnerRequest,
  IChannelPartnersResponse,
  IDeviationRequestBody,
  IFormatedChannelPartnerData,
  IGetBeatPlanItemResponse,
  ILeadsResponse,
  ISubmitBeatPlanItemRequest,
  LeadType,
} from '../Beat.interface';
import moment from 'moment';
import {DateFormats} from 'constants/dateFormat';
import {Relation} from '../StoreCheckIn/StoreCheckIn.interface';

export const getFormatedDate = (date: string) => {
  const newDate = moment(date, DateFormats.Do_MMMM_YYYY);
  const formattedDate = newDate.format(DateFormats.YYYY_MM_DD);
  return formattedDate;
};

const formatDistrictPinCodeDropdown = (data: IAreaPincodeDropdownData[]) => {
  return data.map(item => ({
    value: item.attributes.district + '-' + item?.attributes?.pincode,
    label: item.attributes.pincode,
  }));
};

export const getAreaDropdownData = async (
  salesOffice: string,
  setDistrictPinCode: SetStateAction<any>,
  setDropdownData: SetStateAction<any>,
  setPageCount: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  searchQuery?: string,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getDistrictAreaDropdown(salesOffice, pageNumber, pageSize, searchQuery),
    );
    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;

      const districtPinCodeData = formatDistrictPinCodeDropdown(data);
      setDistrictPinCode((prev: any) => [...prev, ...districtPinCodeData]);
      setDropdownData((prev: any) => [...prev, ...data]);
      setPageCount(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const formatChannelPartnerData = (
  data: IChannelPartnersResponse[],
  navigationFrom: string,
) => {
  let result = data?.map(item => ({
    id: item?.id,
    name: item?.nameOfFirm,
    code: item?.channelPartnerId,
    relationShip: item?.relationship ?? EMPTY_DATA_DASH,
    lastVisitDate: item?.lastVisitDate,
    lastOrderDate: item?.lastOrderDate,
    recurrence: item?.recurrencePattern ?? EMPTY_DATA_DASH,
  }));
  return result;
};

export const getChannelPartnersData = async (
  body: IChannelPartnerRequest,
  setChannelPartners: SetStateAction<any>,
  navigationFrom: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getChannelPartners(), body);
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formattedData = formatChannelPartnerData(data, navigationFrom);

      setChannelPartners(formattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const mergeSelectedData = (
  data1: IFormatedChannelPartnerData[],
  data2: Record<string, IGetBeatPlanItemResponse>,
): IFormatedChannelPartnerData[] => {
  data1.forEach(item1 => {
    item1.isChecked = !!data2?.[item1.code];
    item1.recurrence = data2?.[item1.code]?.recurrencePattern;
    item1.relation = data2?.[item1.code]?.relation;
    item1.beatplanItemId = data2?.[item1.code]?.beatplanItemId;
  });
  return data1;
};

export const getSelectedBeatPlanItemData = async (
  selectedDate: string,
  relation: string,
  setSelectedBeatItem: SetStateAction<any>,
  initialData: IFormatedChannelPartnerData[],
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getSelectedBeatPlanItem(selectedDate, relation),
    );
    const {
      data: {data},
    } = result;

    const selectedObj: Record<string, IGetBeatPlanItemResponse> = {};
    data?.forEach((each: IGetBeatPlanItemResponse) => {
      selectedObj[each.relationId] = each;
    });
    const finalData = mergeSelectedData(initialData, selectedObj);
    setSelectedBeatItem(finalData);
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const submitBeatPlanItem = async (
  body: ISubmitBeatPlanItemRequest,
  onDismiss: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(POST, createBeatPlanItem(), body);
    if (result?.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const submitBeatPlan = async (
  name: string,
  month: string,
  year: string,
  setBeatPlan: SetStateAction<any>,
) => {
  setReduxLoading(true);
  const requestBody = {
    name,
    month,
    year,
  };

  try {
    const result = await NetworkRequest(POST, createBeatPlan(), requestBody);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      setBeatPlan([result?.data]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getBeatPlanDetailsData = async (
  month: string,
  year: number,
  name: string,
  setBeatPlan: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getBeatPlanDetails(month, year));

    if (result?.status === HttpStatusCode.OK && result?.data) {
      if (result.data?.length === 0) {
        submitBeatPlan(name, month, year?.toString(), setBeatPlan);
      } else {
        setBeatPlan(result?.data);
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const formatBeatPlanItem = (data: IBeatPlanItemData[]) => {
  let result = data?.map(item => {
    let title;
    let subTitle;
    if (item?.relation === Relation.LEAD) {
      title =
        item?.leadType === Relation.PRIMARY_LEAD
          ? 'Primary Lead'
          : 'Secondary Lead';
      subTitle =
        item?.leadType === Relation.PRIMARY_LEAD ? item?.name : item?.firmName;
    } else {
      title = [Relation.ACTIVITY]?.includes(item?.relation as Relation)
        ? item?.relation
        : item?.relationship ?? EMPTY_DATA_DASH;
      subTitle =
        item?.relation === Relation.ACTIVITY
          ? item?.activity?.activity
          : item?.firmName ?? EMPTY_DATA_DASH;
    }
    return {
      id: item.id,
      title,
      subTitle: subTitle,
      address:
        item.relation === Relation.ACTIVITY
          ? item?.activity?.salesOffice
          : [item?.addressLine1, item?.addressLine2, item?.addressLine3]
              .filter(Boolean)
              .join(', ') || EMPTY_DATA_DASH,
      geoLocation: item?.geoLocation,
      mobileNumber: item.mobileNumber,
      latitude: item?.userLatitude,
      longitude: item?.userLongitude,
    };
  });
  return result;
};

//To Get Beat Plan Item List
export const getBeatPlanItemData = async (
  date: string,
  pageNumber: number,
  pageSize: number,
  setBeatPlanData: SetStateAction<any>,
  setTotalPage: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getBeatPlanItemList(date, pageNumber, pageSize),
    );
    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const {
        data,
        pagination: {pageCount},
      } = result?.data;
      const formatedData = formatBeatPlanItem(data);

      setBeatPlanData((prev: IBeatPlanItemData[]) => [
        ...prev,
        ...formatedData,
      ]);
      setTotalPage(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Beat Plan ID in My Beat Plan

export const getMyBeatPlanDetails = async (
  month: string,
  year: number,
  setBeatPlan: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getBeatPlanDetails(month, year));

    if (result?.status === HttpStatusCode.OK && result?.data) {
      setBeatPlan(result?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API To get Beat Pre-Conditions in My Beat Screen

export const getBeatPreConditionsData = async (
  startDate: string,
  endDate: string,
  beatPlanId: string,
  setBeatPreConditions: SetStateAction<any>,
  onDismiss: () => void,
  setBeatPlan: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getBeatPreConditions(startDate, endDate),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      if (result?.data?.length === 0) {
        const requestBody = {
          status: 'Sent for approval',
        };
        createBeatStatus(beatPlanId, requestBody, onDismiss, setBeatPlan);
      } else {
        setBeatPreConditions(result?.data);
      }
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit the Beat Status

export const createBeatStatus = async (
  beatPlanId: string,
  body: any,
  onDismiss: () => void,
  setBeatPlan: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      PUT,
      submitBeatStatus(beatPlanId),
      body,
    );
    if (result?.status === HttpStatusCode.OK) {
      setBeatPlan([result.data]);
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit Beat Plan Deviation

export const createBeatPlanDeviation = async (
  requestBody: IDeviationRequestBody,
  beatPlanId: string,
  setBeatPlan: SetStateAction<any>,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      POST,
      submitBeatDeviation(),
      requestBody,
    );
    if (result?.status === HttpStatusCode.OK) {
      const statusRequestBody = {
        status: 'Sent for approval',
      };
      onDismiss();
      createBeatStatus(beatPlanId, statusRequestBody, onDismiss, setBeatPlan);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const formatLeadsData = (data: ILeadsResponse[]) => {
  let result = data?.map(item => ({
    id: item?.id,
    name:
      item?.recordType?.name?.toLowerCase() === LeadType.CHANNEL?.toLowerCase()
        ? item?.businessName
        : item?.firmName,
    code: item?.leadId,
    relationShip: item?.relation ?? EMPTY_DATA_DASH,
    lastVisitDate: item?.lastVisitDate,
    noOfVisit: item?.noOfVisit ?? EMPTY_DATA_DASH,
    recurrence: item?.recurrence ?? EMPTY_DATA_DASH,
  }));
  return result;
};

//API to get Leads

export const getLeadsData = async (
  queryString: string,
  setLeads: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getBeatLeads(queryString));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const finalFormatedData = formatLeadsData(result?.data);
      setLeads(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
