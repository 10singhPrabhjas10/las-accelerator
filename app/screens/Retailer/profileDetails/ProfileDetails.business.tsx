import NetworkRequest from 'services/networkRequest';
import {SetStateAction} from 'react';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {GET, HttpStatusCode, PUT} from 'constants/httpConstants';
import {
  getPersonalDetails,
  getBusinessDetails,
  getStoreDetails,
  getBankKycDetails,
  getInfluencerDetails,
  getAreaName,
} from 'services/methods/secondaryChannelPartner';
import {
  IBankDetailsResponse,
  IBusinessDetailsReqyBody,
  IBusinessDetailsResponse,
  IInfluncerMappingResponse,
  IPersonalDetailsReqyBody,
  IPersonalDetailsResponse,
  IStoreDetailsResponse,
} from './ProfileDetails.interface';
import {store} from 'store/redux/store';
import {EMPTY_DATA_DASH} from 'utils/Constants';
import {
  convertDateToDisplay,
  formatNumberWithCommas,
} from 'utils/commonMethods';
import {DateFormats} from 'constants/dateFormat';

//API to get Retailer Personal Details
const transformPersonalDetails = (data: IPersonalDetailsResponse) => {
  let result = [
    {
      title: 'Retailer Name',
      text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Phone No.',
      text: data?.customerMobile
        ? `+91 ${data?.customerMobile}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Email-ID',
      text: data?.emailId ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Alternate Phone No.',
      text: data?.retailerAlternativePhoneNo
        ? `+91 ${data?.retailerAlternativePhoneNo}`
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Date of Birth',
      text: data?.dateOfBirth
        ? convertDateToDisplay(data?.dateOfBirth, DateFormats.DD_MM_YYYY)
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Gender',
      text: data?.gender ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Marital Status',
      text: data?.maritalStatus ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Marriage Anniversary',
      text: data?.marriageAnniversary
        ? convertDateToDisplay(
            data?.marriageAnniversary,
            DateFormats.DD_MM_YYYY,
          )
        : EMPTY_DATA_DASH,
    },
  ];
  return result;
};
export const getPersonalDetailsData = async (
  setPersonalDetails: SetStateAction<any>,
  channelPartnerId: string,
  setFormatedPersonalDetails?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getPersonalDetails(channelPartnerId),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      setPersonalDetails && setPersonalDetails(data);
      const finalFormatedData = transformPersonalDetails(data);
      setFormatedPersonalDetails &&
        setFormatedPersonalDetails(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Retailer Business Details
const transformedBusinessDetails = (data: IBusinessDetailsResponse) => {
  let result = {
    storeImage: data?.storeImage,
    areaId: data?.area,
    data: [
      {
        title: 'Geo-Location',
        text:
          data?.latitude !== null && data?.longitude !== null
            ? `${data?.latitude?.toFixed(4)}° N, ${data?.longitude?.toFixed(
                4,
              )}° E `
            : EMPTY_DATA_DASH,
      },
      {
        title: 'Cont. Person Name',
        text: data?.retailerName ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Cont. Person Phone No.',
        text: data?.retailerPhoneNo
          ? `+91 ${data?.retailerPhoneNo}`
          : EMPTY_DATA_DASH,
      },
      {
        title: 'Store Name',
        text: data?.nameOfFirm ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Address',
        text:
          [data?.addressLine1, data?.addressLine2, data?.addressLine3]
            .filter(Boolean)
            ?.join(',') ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Pin Code',
        text: data?.pincode ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Area',
        text: data?.area ?? EMPTY_DATA_DASH,
      },
      {
        title: 'District',
        text: data?.district ?? EMPTY_DATA_DASH,
      },
      {
        title: 'State',
        text: data?.state ?? EMPTY_DATA_DASH,
      },
      {
        title: 'Invited on Retailer App',
        text: data?.invitationDate
          ? convertDateToDisplay(data?.invitationDate, DateFormats.DD_MM_YYYY)
          : EMPTY_DATA_DASH,
      },
    ],
  };
  return result;
};
export const getBusinessDetailsData = async (
  setBusinessDetails: SetStateAction<any>,
  channelPartnerId: string,
  setTransformedBusinessDetails?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getBusinessDetails(channelPartnerId),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      setBusinessDetails && setBusinessDetails(data);
      const finalFormatedData = transformedBusinessDetails(data);
      setTransformedBusinessDetails &&
        setTransformedBusinessDetails(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Retailer Store Details
const transformedStoreDetails = (data: IStoreDetailsResponse) => {
  let result = [
    {
      title: 'Entity Type',
      text: data?.entityType ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Store Type',
      text: data?.storeType ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Last 6M Sales',
      text:
        `₹ ${formatNumberWithCommas(data?.lastSixMonthsSales ?? 0)}` ??
        EMPTY_DATA_DASH,
    },
    {
      title: 'Frequency of Purchase',
      text: data?.frequencyOfPurchase ?? EMPTY_DATA_DASH,
    },
  ];
  return result;
};
export const getStoreDetailsData = async (
  setStoreDetails: SetStateAction<any>,
  channelPartnerId: string,
  setTransformedStoreDetails?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getStoreDetails(channelPartnerId));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      setStoreDetails && setStoreDetails(data);
      const finalFormatedData = transformedStoreDetails(data);
      setTransformedStoreDetails &&
        setTransformedStoreDetails(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Retailer BankKyc Details
const transformedBankDetails = (data: IBankDetailsResponse) => {
  let result = [
    {
      title: 'GSTIN No.',
      text: data?.retailerGstIn ? 'Yes' : 'No' ?? EMPTY_DATA_DASH,
    },
    {
      title: 'GSTIN',
      text: data?.gstin
        ? data?.gstin.slice(0, -4).replace(/./g, 'x') + data?.gstin.slice(-4)
        : EMPTY_DATA_DASH,
    },
    {
      title: 'Business PAN Card No.',
      text: data?.retailerPanCardNo ?? EMPTY_DATA_DASH,
    },
  ];
  return result;
};
export const getBankKycDetailsData = async (
  setBankDetails: SetStateAction<any>,
  channelPartnerId: string,
  setTransformedBankDetails?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getBankKycDetails(channelPartnerId),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      setBankDetails && setBankDetails(data);
      const finalFormatedData = transformedBankDetails(data);
      setTransformedBankDetails && setTransformedBankDetails(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to get Retailer Influencer Details
const transformedInfluencerDetails = (data: IInfluncerMappingResponse) => {
  let result = [
    {
      title: 'Influencer Name',
      text: data?.influencerName ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Influencer Type',
      text: data?.influencerType ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Status',
      text: data?.status ?? EMPTY_DATA_DASH,
    },
    {
      title: 'Date of Joining',
      text: data?.dateOfJoining
        ? convertDateToDisplay(data?.dateOfJoining, DateFormats.DD_MM_YYYY)
        : EMPTY_DATA_DASH,
    },
  ];
  return result;
};
export const getInfluencerDetailsData = async (
  setInfluencerDetails: SetStateAction<any>,
  channelPartnerId: string,
  setTransformedInfluencerDetails?: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      GET,
      getInfluencerDetails(channelPartnerId),
    );
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      setInfluencerDetails && setInfluencerDetails(data);
      const finalFormatedData = transformedInfluencerDetails(data);
      setTransformedInfluencerDetails &&
        setTransformedInfluencerDetails(finalFormatedData);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to update Personal Details
export const updatePersonalDetails = async (
  body: IPersonalDetailsReqyBody,
  channelPartnerId: string,
  onDismiss: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      PUT,
      getPersonalDetails(channelPartnerId),
      body,
    );
    if (result?.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to update Business Details
export const updateBusinessDetails = async (
  body: IBusinessDetailsReqyBody,
  channelPartnerId: string,
  onDismiss: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      PUT,
      getBusinessDetails(channelPartnerId),
      body,
    );
    if (result?.status === HttpStatusCode.OK) {
      onDismiss();
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getAreaNameData = async (
  areaMasterId: string,
  setAreaName: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getAreaName(areaMasterId));
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result?.data;
      setAreaName(data?.[0]?.attributes?.area);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
