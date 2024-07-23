import {getBalanceConfirmation} from 'services/methods/storeCheckIn';
import {GET, HttpStatusCode} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

//API to get Balance Confirmation
export const getBalanceConfirmationData = async (
  channelPartnerCode: string,
  setBalanceConfirmationData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getBalanceConfirmation(channelPartnerCode),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      setBalanceConfirmationData(data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
