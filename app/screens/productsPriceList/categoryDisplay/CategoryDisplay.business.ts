import {GET, HttpStatusCode} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {getProductCategoryApi} from 'services/methods/misc';
import NetworkRequest from 'services/networkRequest';
import {handleApiError} from 'utils/CommonReduxMethods';

export const getProductCategoryData = async (
  setCategoryData: SetStateAction<any>,
  pageNumber: number,
  pageSize: number,
  setTotalPages: SetStateAction<any>,
) => {
  try {
    const result = await NetworkRequest(
      GET,
      getProductCategoryApi(pageNumber, pageSize),
    );
    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      setCategoryData &&
        setCategoryData((prev: ICategoryResponseData[]) => [...prev, ...data]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  }
};
