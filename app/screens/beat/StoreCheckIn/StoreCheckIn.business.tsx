import {GET, HttpStatusCode, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  ICheckInRequestBody,
  ICheckOutRequestBody,
  IStoreBeatPlanItem,
  Relation,
} from './StoreCheckIn.interface';
import {
  getBeatPlanDetails,
  getStoreCheckInList,
  submitCheckInTime,
} from 'services/methods/storeCheckIn';

//API to get Beat Plan ID, Name & status
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
      setBeatPlan(result?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const formatBeatPlanItem = (data: IStoreBeatPlanItem[]) => {
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
      relation: item?.relation,
      activity: item?.activity,
      relationId: item?.relationId,
      email: item?.email ?? EMPTY_DATA_DASH,
      title: title,
      subTitle: subTitle,
      subActivity:
        item?.activity?.activity === 'Influencer meet'
          ? item?.activity?.influencerType
          : null,
      address:
        item.relation === Relation.ACTIVITY
          ? item?.activity?.salesOffice
          : [item?.addressLine1, item?.addressLine2, item?.addressLine3]
              .filter(Boolean)
              .join(', ') || EMPTY_DATA_DASH,
      geoLocation: item?.geoLocation,
      mobileNumber: item.mobileNumber,
      checkInDate: item?.checkInDate,
      checkOutDate: item?.checkOutDate,
      beatplanItemId: item?.beatplanItemId,
      leadType: item?.leadType,
      userLatitude: item?.userLatitude,
      userLongitude: item?.userLongitude,
      orderTaken: item?.orderTaken,
      orderValue: item?.orderValue,
    };
  });
  return result;
};

//API to Item List of Pending, Scheduled & Completed

export const getStoreBeatPlanItemData = async (
  setBeatPlanData: SetStateAction<any>,
  setTotalPage: SetStateAction<any>,
  filters: string,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getStoreCheckInList(filters));
    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const {
        data,
        pagination: {pageCount},
      } = result?.data;
      const formattedData = formatBeatPlanItem(data);

      setBeatPlanData((prev: IStoreBeatPlanItem[]) => [
        ...prev,
        ...formattedData,
      ]);
      setTotalPage(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const mergeDatesFromApiResponse = (
  initialData: IStoreBeatPlanItem[],
  apiResponse: IStoreBeatPlanItem[],
) => {
  // Create a map to store the initial data by beatplanItemId for easier access
  const initialDataMap: Record<string, IStoreBeatPlanItem> = {};
  initialData.forEach(item => {
    initialDataMap[item.beatplanItemId] = item;
  });

  // Merge the data from the API response into the initial data
  apiResponse.forEach(item => {
    const {beatplanItemId, checkInDate, checkOutDate} = item;
    if (beatplanItemId && initialDataMap[beatplanItemId]) {
      initialDataMap[beatplanItemId].checkInDate = checkInDate;
      initialDataMap[beatplanItemId].checkOutDate = checkOutDate;
    }
  });

  // Convert the map back into an array
  const mergedData = Object.values(initialDataMap);
  return mergedData;
};

//API to submit checkIn Time

export const createCheckInTime = async (
  beatPlanId: string,
  initialData: IStoreBeatPlanItem[],
  body: ICheckInRequestBody,
  setUpdatedData: SetStateAction<any>,
  onSuccess: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      PUT,
      submitCheckInTime(beatPlanId),
      body,
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const mergedData = mergeDatesFromApiResponse(initialData, [result?.data]);

      setUpdatedData(mergedData);
      onSuccess();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit checkout Time

export const createCheckOutTime = async (
  beatPlanId: string,
  body: ICheckOutRequestBody,
  onSuccess: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      PUT,
      submitCheckInTime(beatPlanId),
      body,
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      onSuccess();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
