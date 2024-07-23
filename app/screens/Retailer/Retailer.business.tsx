import NetworkRequest from 'services/networkRequest';
import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {
  getSecondaryChannelPartner,
  submitLiveLocation,
} from 'services/methods/secondaryChannelPartner';
import {getChannelPartnerDetailsApi} from 'services/methods/primaryChannelPartnerServices';
import {store} from 'store/redux/store';
import {setRetailerProfileData} from 'store/redux/channelPartnerSlice';
import {
  getSecondarySchemesCategoriesApi,
  getSecondarySchemesDashboardApi,
  getSecondarySchemesRewardsApi,
} from 'services/methods/schemesPerformance';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {convertDateToDisplay, getTranslationLabel} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

const mapApiResponseToSearch = (data: IResSecondaryPartner[]) => {
  return data.map(item => ({
    title: item.nameOfFirm,
    subTitle: item.code,
    channelPartnerId: item.channelPartnerId,
    retailerCode: item?.retailerCode || '',
  }));
};

export const fetchChannelSecondarySearch = async (
  searchQuery: string,
  setSecondaryPartnerData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const response = await NetworkRequest(
      GET,
      getSecondaryChannelPartner(searchQuery),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      const updatedData = mapApiResponseToSearch(response?.data.data);
      setSecondaryPartnerData(updatedData);
    }
  } catch (error: any) {
    handleApiError(error?.data?.error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getSecondaryCustomerDetails = async (
  customerCode: string,
  setCustomerData?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const response = await NetworkRequest(
      GET,
      getChannelPartnerDetailsApi(customerCode),
    );
    if (response?.status === HttpStatusCode.OK && response?.data) {
      store.dispatch(setRetailerProfileData(response?.data[0]));
      setCustomerData && setCustomerData(response?.data[0]);
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to submit Live Location
export const submitLiveLocationData = async (
  channelPartnerId: string,
  body: ILiveLocationReqBody,
  onDismiss: () => void,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(
      PUT,
      submitLiveLocation(channelPartnerId),
      body,
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getSecondarySchemesCategories = async (
  setCategoryData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const channelPartnerId =
      store.getState()?.channelPartner?.retailerCustomerCode;
    const result = await NetworkRequest(
      POST,
      getSecondarySchemesCategoriesApi(),
      {channelPartnerId},
    );

    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      setCategoryData(result?.data?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const mapApiResponseToSchemesList = (
  categoryName: string,
  data: ISchemesResponse[],
) => {
  return data.map(item => ({
    schemeName: categoryName + item?.schemeName || EMPTY_DATA_DASH,
    schemeCode: item?.schemeCode,
    data: [
      {
        title: getTranslationLabel('scheme_name_secschemes'),
        text: item?.schemeName || EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('startdate_secschemes'),
        text: item?.schemeStartDate
          ? convertDateToDisplay(
              item?.schemeStartDate,
              DateFormats.DD_MMM_YYYY_2,
            )
          : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('enddate_secschemes'),
        text: item?.schemeEndDate
          ? convertDateToDisplay(item?.schemeEndDate, DateFormats.DD_MMM_YYYY_2)
          : EMPTY_DATA_DASH,
      },
      {
        title: getTranslationLabel('schemetype_secschemes'),
        text: item?.schemeName || EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const getSecondarySchemesDashboardData = async (
  productCategory: string,
  filterData: ISecondarySchemesPerformance,
  setSchemesData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const channelPartnerId =
      store.getState()?.channelPartner?.retailerCustomerCode;
    const result = await NetworkRequest(
      POST,
      getSecondarySchemesDashboardApi(),
      {
        channelPartnerId,
        productCategory,
        date: {
          from: filterData.startDate,
          to: filterData.endDate,
        },
      },
    );

    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const schemeList = mapApiResponseToSchemesList(
        productCategory,
        result?.data?.data?.schemeList,
      );
      const dashboard = result?.data?.data?.dashboard;
      setSchemesData({schemeList, dashboard});
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getSecondarySchemesRewardsData = async (
  schemeCode: string,
  setDashboardData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const channelPartnerId =
      store.getState()?.channelPartner?.retailerCustomerCode;
    const result = await NetworkRequest(POST, getSecondarySchemesRewardsApi(), {
      schemeCode,
      channelPartnerId,
    });

    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      setDashboardData(result?.data?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
