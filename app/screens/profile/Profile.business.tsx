import NetworkRequest from 'services/networkRequest';

import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {
  getProfileDetails,
  getMappedChannelPartners,
  getMappedRetailers,
  uploadProfilePhoto,
} from 'services/methods/profile';
import {
  IMappedChannelPartnerReqBody,
  IMappedChannelPartnerResponse,
  IMappedRetailerReqBody,
  IMappedRetailerResponse,
  IProductDivisionResponse,
  IProfilePhotoReqBody,
  IRetailer,
  ITransformedRetailer,
} from './Profile.interface';
import {EMPTY_DATA_DASH, ID_ALL} from 'utils/Constants';
import {getMappedRetailerFilterApi} from 'services/methods/primaryChannelPartnerServices';
import {store} from 'store/redux/store';
import {updateUser} from 'store/redux/userSlice';
import {getTranslationLabel} from 'utils/commonMethods';
import { lasProfileRes, mappedChannelPartnersRes} from 'utils/dummyData';
export const getProfileData = async (setProfile: SetStateAction<any>) => {
  setReduxLoading(true);

  try {
    // const result = await NetworkRequest(GET, getProfileDetails());
    // if (result?.status === HttpStatusCode.OK && result?.data) {
    //   setProfile([result?.data]);
    // }
    const result = lasProfileRes;
    setProfile([result?.data]);
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Mapped Channel Partners
export const getMappedChannelPartnersData = async (
  body: IMappedChannelPartnerReqBody,
  setMappedData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    // const result = await NetworkRequest(POST, getMappedChannelPartners(), body);
    // if (result?.status === HttpStatusCode.OK && result?.data) {
    //   const {
    //     data,
    //     meta: {
    //       pagination: {pageCount},
    //     },
    //   } = result?.data;
    // setMappedData((prev: IMappedChannelPartnerResponse[]) => [
    //   ...prev,
    //   ...data,
    // ]);
    // setTotalPages(pageCount);
    const {data} = mappedChannelPartnersRes;
    setMappedData((prev: IMappedChannelPartnerResponse[]) => [
      ...prev,
      ...data,
    ]);
    setTotalPages(1);
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

const getData = (tempData: IMappedRetailerResponse) => {
  return tempData?.retailers?.map((item: IRetailer) => {
    return {
      cardData: [
        {
          title: getTranslationLabel('retailer_name'),
          text: item?.nameOfFirm ?? EMPTY_DATA_DASH,
        },
        {
          title: getTranslationLabel('area'),
          text: item?.areaName ?? EMPTY_DATA_DASH,
        },
      ],
    };
  });
};

//API to get Mapped Retailers
export const getMappedRetailersData = async (
  body: IMappedRetailerReqBody,
  setRetailerData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
  code: string,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(POST, getMappedRetailers(code), body);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      const transformedResponse = data?.map((card: IMappedRetailerResponse) => {
        return {
          category: card?.categoryName,
          categoryId: card?.categoryId,
          data: getData(card),
        };
      });
      setRetailerData((prev: ITransformedRetailer[]) => [
        ...prev,
        ...transformedResponse,
      ]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Product division filter
const mapApiResponseToCheckbox = (data: IProductDivisionResponse[]) => {
  let result = [{id: ID_ALL, name: 'Select All'}];
  data.map(item =>
    result.push({id: item?.categoryId, name: item?.categoryName}),
  );
  return result;
};

export const getMappedRetailerFilterData = async (
  setProductDivision: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(GET, getMappedRetailerFilterApi());
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const categoryNamesList = mapApiResponseToCheckbox(response.data);
      setProductDivision(categoryNamesList);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to upload profile photo
export const uploadProfile = async (
  body: IProfilePhotoReqBody,
  userData: any,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(PUT, uploadProfilePhoto(), body);
    if (result?.status === HttpStatusCode.OK) {
      store.dispatch(
        updateUser({...userData, profilePhoto: body?.profilePhoto}),
      );
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
