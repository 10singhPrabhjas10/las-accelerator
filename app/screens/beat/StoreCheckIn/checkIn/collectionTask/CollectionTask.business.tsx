import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {
  getCollectionAmounts,
  getOutstandingData,
  getChannelFinances,
  submitLasPayment,
} from 'services/methods/storeCheckIn';
import {
  ICollectionAmountResponse,
  IPaymentCollectionReqBody,
} from './CollectionTask.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {formatNumber} from 'utils/commonMethods';

const transformCollectionAmount = (data: ICollectionAmountResponse) => {
  return {
    leftTitle: data?.currentOutstanding
      ? `₹ ${formatNumber(data.currentOutstanding)}`
      : EMPTY_DATA_DASH,
    rightTitle: data?.currentOverdue
      ? `₹ ${formatNumber(data.currentOverdue)}`
      : EMPTY_DATA_DASH,
  };
};

export const getCollectionAmountData = async (
  channelPartnerId: string,
  setCollectionData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getCollectionAmounts(channelPartnerId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormattedData = transformCollectionAmount(data);
      setCollectionData(finalFormattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Vigil Outstanding Data
export const getVigilOutstandingData = async (
  channelPartnerId: string,
  setVigilData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getOutstandingData(channelPartnerId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      setVigilData(data?.[0]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Channel finances Data
export const getChannelFinancesData = async (
  channelPartnerId: string,
  setChannelFinanceData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getChannelFinances(channelPartnerId),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      setChannelFinanceData(data?.[0]);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit Las Payment
export const submitLasPaymentData = async (
  body: IPaymentCollectionReqBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(POST, submitLasPayment(), body);
    if (result.status === HttpStatusCode.CREATED && result?.data) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
