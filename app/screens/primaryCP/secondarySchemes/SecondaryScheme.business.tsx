import {
  getEligibleRetailersDetails,
  getRetailerEligibility,
  getRetailersEligible,
  getSchemeDetails,
  getSchemeRewards,
  getSchemeSlabDetails,
  getSecondarySchemes,
} from 'services/methods/primaryChannelPartnerServices';
import NetworkRequest from 'services/networkRequest';
import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, POST} from 'constants/httpConstants';
import {
  IRetailerDetailsResponse,
  IRetailerEligibilityPerformance,
  IRetailerSearchResponse,
  IRewardQualification,
  ISchemeDetailsResponse,
  ISchemeRewardsResponse,
  ISchemeSlabDetailsResponse,
  ISecondarySchemeReqBody,
  ISecondarySchemeResponse,
} from './SecondaryScheme.interface';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  convertDateToDisplay,
  convertRupeesIntoLakhs,
  formatNumberWithCommas,
} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

//API to fetch all secondary schemes
const transformSecondarySchemes = (data: ISecondarySchemeResponse[]) => {
  return data?.map(item => ({
    schemeName: item?.name ?? EMPTY_DATA_DASH,
    id: item?.id,
    schemeId: item?.secondarySchemeId,
    data: [
      {
        title: 'Description',
        text: item?.schemeDescription ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Scheme Type',
        text: item?.schemeType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Activation Date',
        text: item?.targetActivationDate
          ? convertDateToDisplay(
              item?.targetActivationDate,
              DateFormats.DD_MM_YYYY,
            )
          : EMPTY_DATA_DASH,
      },
      {
        title: 'End Date',
        text: item?.endDate
          ? convertDateToDisplay(item?.endDate, DateFormats.DD_MM_YYYY)
          : EMPTY_DATA_DASH,
      },
    ],
  }));
};

export const getSecondarySchemesData = async (
  channelPartnerId: string,
  body: ISecondarySchemeReqBody,
  setSchemeData: SetStateAction<any>,
  setTotalPages: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(
      POST,
      getSecondarySchemes(channelPartnerId),
      body,
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {
        data,
        meta: {
          pagination: {pageCount},
        },
      } = result?.data;
      const finalFormatedData = transformSecondarySchemes(data);
      setSchemeData((prev: ISecondarySchemeResponse[]) => [
        ...prev,
        ...finalFormatedData,
      ]);
      setTotalPages(pageCount);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Scheme Details
const transformSchemeDetails = (data: ISchemeDetailsResponse) => {
  return {
    schemeName: data?.name ?? EMPTY_DATA_DASH,
    id: data?.id,
    schemeId: data?.secondarySchemeId,
    categoryId: data?.categoryId,
    data: [
      {
        title: 'Description',
        text: data?.schemeDescription ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Scheme Type',
        text: data?.schemeType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Activation Date',
        text: data?.targetActivationDate
          ? convertDateToDisplay(
              data?.targetActivationDate,
              DateFormats.DD_MM_YYYY,
            )
          : EMPTY_DATA_DASH,
      },
      {
        title: 'End Date',
        text: data?.endDate
          ? convertDateToDisplay(data?.endDate, DateFormats.DD_MM_YYYY)
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Slab Units',
        text: data?.slabNumber ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Applicable Category',
        text: data?.categoryName ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Beneficiary',
        text: data?.beneficiaryType ?? EMPTY_DATA_DASH,
      },
    ],
  };
};

export const getSchemeDetailsData = async (
  schemeId: string,
  setSchemeData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(GET, getSchemeDetails(schemeId));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformSchemeDetails(data[0]);
      setSchemeData(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get slab details
const transformSlabDetails = (data: ISchemeSlabDetailsResponse[]) => {
  return data?.map((item, index) => ({
    id: index,
    data: [
      {
        title: 'Slab From',
        text: item?.slabThresholdFrom ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Slab To',
        text: item?.slabThresholdTo ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Type',
        text: item?.rewardType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Description',
        text: item?.description ?? EMPTY_DATA_DASH,
      },
    ],
  }));
};
export const getSchemeSlabDetailsData = async (
  schemeId: string,
  setSlabData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(GET, getSchemeSlabDetails(schemeId));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformSlabDetails(data);
      setSlabData(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Retailers Eligible
export const mapApiResponseToSearch = (data: IRetailerSearchResponse[]) => {
  return data.map(item => ({
    title: item.nameOfFirm,
    mobile: item.customerMobile,
    channelPartnerId: item.channelPartnerId,
  }));
};

export const getRetailersEligibleData = async (
  searchQuery: string,
  schemeId: string,
  channelPartnerId: string,
  setRetailersData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(
      GET,
      getRetailersEligible(channelPartnerId, schemeId, searchQuery),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const updatedData = mapApiResponseToSearch(data);
      setRetailersData(updatedData);
    }
  } catch (error: any) {
    handleApiError(error?.data?.error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to Eligible Retailers Data
const transformRetailerDetails = (data: IRetailerDetailsResponse) => {
  return {
    header: data?.retailerCode
      ? `Retailer Id: ${data?.retailerCode}`
      : EMPTY_DATA_DASH,
    data: [
      {
        title: 'Retailer Name',
        text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Owner Name',
        text: data?.contactPerson ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Contact No.',
        text: data?.customerMobile
          ? `+91 ${data?.customerMobile}`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Address',
        text: data?.address ?? EMPTY_DATA_DASH,
      },
    ],
  };
};
export const getRetailersEligibleDetails = async (
  channelPartnerId: string,
  setRetailersData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(
      GET,
      getEligibleRetailersDetails(channelPartnerId),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformRetailerDetails(data);
      setRetailersData(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Scheme Rewards
const transformSchemeRewards = (data: ISchemeRewardsResponse) => {
  let rewards = {
    foc: data?.rewards?.FOC ? `${data?.rewards?.FOC} Units` : EMPTY_DATA_DASH,
    gold: data?.rewards?.Gold
      ? `${data?.rewards?.Gold} Coins`
      : EMPTY_DATA_DASH,
    creditNotes: data?.rewards?.['Abs. discount']
      ? convertRupeesIntoLakhs(data?.rewards?.['Abs. discount'])
      : EMPTY_DATA_DASH,
    tour: data?.rewards?.Tour ?? EMPTY_DATA_DASH,
    gift: data?.rewards?.Gift
      ? `${data?.rewards?.Gift} Units`
      : EMPTY_DATA_DASH,
  };
  let slabDetails = [];
  const slabs = data?.slabDetails?.map(item => ({
    header: item?.slabNumber ? `Slab No. ${item?.slabNumber}` : EMPTY_DATA_DASH,
    schemeId: item?.schemeId,
    slabFrom: item?.slabFrom,
    slabTo: item?.slabTo,
    data: [
      {
        title: 'Slab From',
        text: item?.slabFrom,
      },
      {
        title: 'Slab To',
        text: item?.slabTo,
      },
      {
        title: 'Qualified Retailers',
        text: item?.noOfRetailers ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Qualified Invoices',
        text: item?.qualifiedInvoices ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sales Volume',
        text: item?.salesVolume
          ? `${item?.salesVolume} Units`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Sales Value',
        text: item?.salesValue
          ? `₹ ${formatNumberWithCommas(item?.salesValue)}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Type',
        text: item?.rewardType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Details',
        text: item?.rewardDetails ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Unit',
        text: item?.rewardUnit ? `${item?.rewardUnit} Units` : EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Value',
        text: item?.rewardValue ? `₹ ${item?.rewardValue}/-` : EMPTY_DATA_DASH,
      },
    ],
  }));
  slabDetails.push(...slabs);
  return {slabDetails, rewards};
};

export const getSchemeRewardsData = async (
  schemeId: string,
  setRewardsData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(GET, getSchemeRewards(schemeId));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformSchemeRewards(data);
      setRewardsData(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Scheme Qualification
const transformQualification = (data: IRewardQualification) => {
  return {
    schemeId: data?.scheme,
    slabFrom: data?.slabThresholdFrom,
    slabTo: data?.slabThresholdTo,
    data: [
      {
        title: 'Qualified Retailers',
        text: data?.noOfRetailers ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Qualified Invoices',
        text: data?.qualifiedInvoices ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sales Volume',
        text: data?.salesVolume
          ? `${data?.salesVolume} Units`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Sales Value',
        text: data?.salesValue
          ? `₹ ${formatNumberWithCommas(data?.salesValue)}/-`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Type',
        text: data?.rewardType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Details',
        text: data?.description ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Unit',
        text: data?.rewardUnit ? `${data?.rewardUnit} Units` : EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Value',
        text: data?.schemeRewardValue
          ? `₹ ${data?.schemeRewardValue}/-`
          : EMPTY_DATA_DASH,
      },
    ],
  };
};

//API to get Retailer eligibility in scheme Performance
const transformRetailerPerformance = (
  data: IRetailerEligibilityPerformance,
) => {
  return {
    header: data?.retailerCode
      ? `Retailer Id: ${data?.retailerCode}`
      : EMPTY_DATA_DASH,
    data: [
      {
        title: 'Retailer Name',
        text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Sales Volume',
        text: data?.salesVolume
          ? `₹ ${data?.salesVolume} Units`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Qualified Slabs',
        text: data?.exceptionSlabNumber ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Exception',
        text: data?.schemeExceptions ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Type',
        text: data?.rewardType ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Details',
        text: data?.description ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Unit',
        text: data?.rewardUnit ? `${data?.rewardUnit} Units` : EMPTY_DATA_DASH,
      },
      {
        title: 'Reward Value',
        text: data?.schemeRewardValue
          ? `₹ ${data?.schemeRewardValue}/-`
          : EMPTY_DATA_DASH,
      },
    ],
  };
};

export const getRetailersEligiblePerformanceDetails = async (
  channelPartnerId: string,
  schemeId: string,
  setRetailersData: SetStateAction<any>,
) => {
  try {
    setReduxLoading(true);
    const result = await NetworkRequest(
      GET,
      getRetailerEligibility(channelPartnerId, schemeId),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      const finalFormatedData = transformRetailerPerformance(data);
      setRetailersData(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
