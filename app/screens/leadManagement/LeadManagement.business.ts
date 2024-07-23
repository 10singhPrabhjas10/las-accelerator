import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  createPrimaryLead,
  createSecondaryLead,
  getLeadDropdown,
  getPinCodeDetailsApi,
} from 'services/methods/leadManagement';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {getTranslationLabel} from 'utils/commonMethods';

interface IAreaMapping {
  area: string;
  areaMasterId: string;
}

const formatCategoryDropdown = (data: ICategoryDropdown[]) => {
  return data.map(item => ({
    value: item?.categoryId,
    label: item?.categoryName,
  }));
};

const formatDropdown = (data: IAreaMapping[]) => {
  return data.map(item => ({
    value: item?.areaMasterId,
    label: item?.area,
  }));
};

//API to GET Category Dropdown

export const getCategoryDropdown = async (
  setCategoryDropdown: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getLeadDropdown());
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;

      const finalResult = formatCategoryDropdown(data?.categoryNames);
      setCategoryDropdown(finalResult);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to create Primary Lead

export const submitPrimaryLead = async (
  requestBody: IPrimaryLeadData,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, createPrimaryLead(), requestBody);
    if (result.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to Validate Pin Code

export const getPincodeData = async (
  pincode: string,
  setFieldValue: SetStateAction<any>,
  setPinCodeError: SetStateAction<any>,
  setFieldError?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getPinCodeDetailsApi(pincode));

    if (result?.status === HttpStatusCode.OK) {
      const data = result?.data?.data;

      if (data?.length !== 0) {
        setFieldValue('pincode', pincode);
        setPinCodeError(false);
      } else {
        setFieldError('pincode', getTranslationLabel('no_record_found'));
        handleApiError(getTranslationLabel('no_record_found'));
        setPinCodeError(true);
      }
    }
  } catch (error: any) {
    handleApiError(getTranslationLabel('no_record_found'));
  } finally {
    setReduxLoading(false);
  }
};

//API to create Secondary Lead

export const submitSecondaryLead = async (
  requestBody: ISecondaryLeadRequestBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      POST,
      createSecondaryLead(),
      requestBody,
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

export const getSecondaryPincodeData = async (
  pincode: string,
  setFieldValue: (field: string, value: string | string[]) => void,
  setAreas: SetStateAction<any>,
  setFieldError?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getPinCodeDetailsApi(pincode));

    if (result?.status === HttpStatusCode.OK) {
      const {
        data: {data},
      } = result;

      const fields = ['district', 'state', 'pincode', 'salesOffice'];

      if (result?.data?.data?.length !== 0) {
        const areas = data.map((item: IAreaResponse) => item.attributes);
        const formattedValue = formatDropdown(areas);
        setAreas(formattedValue);

        const firstItem: any = data[0]?.attributes;
        fields.forEach(field => setFieldValue(field, firstItem[field] || ''));
      } else {
        setFieldError('pincode', getTranslationLabel('no_record_found'));
        handleApiError(getTranslationLabel('no_record_found'));
      }
    }
  } catch (error: any) {
    handleApiError(getTranslationLabel('no_record_found'));
  } finally {
    setReduxLoading(false);
  }
};
