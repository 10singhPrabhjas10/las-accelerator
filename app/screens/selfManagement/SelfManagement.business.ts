import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {mapApiResponseToDropdown} from 'screens/primaryCP/orderManagement/OrderManagement.helper';
import {
  getExitProcessReasonsApi,
  getExitProcessSubmitApi,
} from 'services/methods/selfManagement';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';

export interface IExitProcessRequestBody {
  reason: string;
  comments: string;
}

export const getExitProcessReasons = async (
  setReasonData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const response = await NetworkRequest(GET, getExitProcessReasonsApi());
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const dropdownData = mapApiResponseToDropdown(response?.data);
      setReasonData(dropdownData);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const submitExitProcess = async (
  requestBody: IExitProcessRequestBody,
  onSuccess: () => void,
) => {
  try {
    setReduxLoading(true);
    const response = await NetworkRequest(
      POST,
      getExitProcessSubmitApi(),
      requestBody,
    );
    if (response?.status === HttpStatusCode.OK) {
      onSuccess();
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};
