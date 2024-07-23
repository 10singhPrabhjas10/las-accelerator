import {
  createPrimaryOrder,
  getAddress,
  getSecondaryCPAddress,
  getSecondaryCategoryDropdown,
} from 'services/methods/storeCheckIn';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {
  IPrimaryOrderRequestBody,
  IShipToAddressResponse,
} from 'screens/orderTaking/OrderTaking.interface';
import {ICategoryDropdownResponse} from 'screens/beat/StoreCheckIn/checkIn/btl/BTL.interface';
import {ISecondaryAddress} from 'screens/beat/StoreCheckIn/checkIn/CheckIn.interface';

const transformedAddress = (data: IShipToAddressResponse[]) => {
  let result = data?.map((item: IShipToAddressResponse) => ({
    value: item?.attributes?.customerAddressId,
    label: [
      item?.attributes?.addressLine1,
      item?.attributes?.state,
      item?.attributes?.pincode,
    ]
      .filter(Boolean)
      .join(','),
  }));
  return result;
};

//API to get Ship to Address
export const getAddressData = async (
  channelPartnerId: string,
  setAddressData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(GET, getAddress(channelPartnerId));

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const formattedAddress = transformedAddress(data);
      setAddressData(formattedAddress);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
//API to create Primary Order
export const submitPrimaryOrder = async (
  body: IPrimaryOrderRequestBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, createPrimaryOrder(), body);
    if (result?.status === HttpStatusCode.CREATED) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.data?.errorMessage);
  } finally {
    setReduxLoading(false);
  }
};

const convertToDropdownFormat = (data: ICategoryDropdownResponse[]) => {
  const transformedCategory = data.map(item => ({
    value: item?.categoryId,
    label: item?.categoryName,
  }));

  return transformedCategory;
};

//API to get Category Dropdown
export const getSecondaryCategoryDropdownData = async (
  channelPartnerCode: string,
  setDropdownData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getSecondaryCategoryDropdown(channelPartnerCode),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formattedData = convertToDropdownFormat(data);

      setDropdownData(formattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const transformedSecondaryAddress = (data: ISecondaryAddress[]) => {
  let result = data?.map((item: ISecondaryAddress) => ({
    value: item?.pinCode,
    label: [item?.addressLine1, item?.addressLine2].filter(Boolean).join(','),
  }));
  return result;
};

export const getSecondaryCPAddressData = async (
  channelPartnerId: string,
  setAddressData: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getSecondaryCPAddress(channelPartnerId),
    );

    if (result?.status === HttpStatusCode.OK && result?.data) {
      const address = transformedSecondaryAddress([result?.data]);
      setAddressData(address);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
