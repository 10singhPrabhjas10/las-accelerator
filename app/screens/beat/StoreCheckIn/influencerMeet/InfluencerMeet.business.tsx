import {
  addInfluencer,
  getInfluencerDropdown,
} from 'services/methods/storeCheckIn';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {
  IBranchVisitReqBody,
  IInfluencerDropdownResponse,
  IInfluencerMeetReqBody,
} from './InfluencerMeet.interface';

//API to get Influencer Dropdown
const transformDropdown = (data: IInfluencerDropdownResponse) => {
  const idType = data?.idTypeEnum?.map(item => ({
    value: item,
    label: item,
  }));
  const contactType = data?.contactTypeEnum?.map(item => ({
    value: item,
    label: item,
  }));
  return {idType, contactType};
};
export const getInfluencerDropdownData = async (
  setDropdownData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getInfluencerDropdown());
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormattedData = transformDropdown(data);
      setDropdownData(finalFormattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to Add Influencers
export const submitInfluencer = async (
  body: IInfluencerMeetReqBody,
  onDismiss: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, addInfluencer(), body);
    if (result.status === HttpStatusCode.CREATED && result?.data) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to Add Influencers
export const submitBranchVisit = async (
  body: IBranchVisitReqBody,
  onDismiss: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, addInfluencer(), body);
    if (result.status === HttpStatusCode.CREATED && result?.data) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
