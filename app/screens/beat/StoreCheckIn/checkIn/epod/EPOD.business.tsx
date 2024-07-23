import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {ID_ALL} from 'utils/Constants';
import {
  getCategoryDropdown,
  getInvoices,
  sumbitEpodDate,
} from 'services/methods/storeCheckIn';
import {
  IEPODRequestBody,
  IInvoiceResponse,
  IInvoicesRequestBody,
  IProductDivisionResponse,
} from './EPOD.interface';

//API to fetch Invoices Data

export const getInvoicesData = async (
  body: IInvoicesRequestBody,
  setInvoicesData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(POST, getInvoices(), body);
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      setInvoicesData((prev: IInvoiceResponse[]) => [...prev, ...data]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to Submit EPOD Date

export const submitEpodDateData = async (
  invoiceNo: string,
  body: IEPODRequestBody,
  onDismiss: () => void,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(PUT, sumbitEpodDate(invoiceNo), body);
    if (result.status === HttpStatusCode.OK && result?.data) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const mapApiResponseToCheckbox = (
  data: IProductDivisionResponse[],
  isSendCategoryNameAsID: boolean,
) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item =>
    result.push({
      id: isSendCategoryNameAsID ? item?.categoryName : item?.categoryId,
      name: item?.categoryName,
    }),
  );
  return result;
};

//API to get Product Division
export const getProductDivisionData = async (
  channelPartnerCode: string,
  setProductDivisionData: SetStateAction<any>,
  isSendCategoryNameAsID: boolean,
) => {
  setReduxLoading(true);

  try {
    const result = await NetworkRequest(
      GET,
      getCategoryDropdown(channelPartnerCode),
    );
    if (result.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      const formattedData = mapApiResponseToCheckbox(
        data,
        isSendCategoryNameAsID,
      );
      setProductDivisionData(formattedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
