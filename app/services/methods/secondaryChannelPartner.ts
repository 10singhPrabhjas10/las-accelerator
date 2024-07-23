import {
  AREA_MASTERS,
  CP_PROFILE,
  RETAILER,
  RETAILER_PERFORMANCE,
  RETAILER_PROFILE,
  SECONDARY,
} from 'services/constants';

//API to get secondary customer SE-Pic
export const getCustomerSePic = () => {
  return SECONDARY + 'customer-se-pic';
};

export const getRetailerPrimaryCpListApi = (channelPartnerId: string) => {
  return SECONDARY + channelPartnerId + '/primary-cp-list';
};

//Profile Details API
//API to get Retailer Personal Details
export const getPersonalDetails = (channelPartnerId: string) => {
  return RETAILER_PROFILE + `/${channelPartnerId}/personalDetails`;
};

//API to get Retailer Business Details
export const getBusinessDetails = (channelPartnerId: string) => {
  return RETAILER_PROFILE + `/${channelPartnerId}/businessDetails`;
};

//API to get Retailer Store Details
export const getStoreDetails = (channelPartnerId: string) => {
  return RETAILER_PROFILE + `/${channelPartnerId}/storeDetails`;
};

//API to get Retailer BankKyc Details
export const getBankKycDetails = (channelPartnerId: string) => {
  return RETAILER_PROFILE + `/${channelPartnerId}/bankKycDetails`;
};

//API to get Influencer Details
export const getInfluencerDetails = (channelPartnerId: string) => {
  return RETAILER_PROFILE + `/${channelPartnerId}/influencerMappingDetails`;
};

//API to get Channel partners
export const getSecondaryChannelPartner = (searchQuery: string) => {
  return CP_PROFILE + `secondary-cp/search/${searchQuery}`;
};

//Invoice Details
//API to get Invoice Details
export const getInvoiceDetails = () => {
  return RETAILER + '/invoice-details';
};

//API to get Each Invoice Details
export const getEachInvoiceDetails = (invoiceNo: string) => {
  return RETAILER + `/${invoiceNo}/invoice-details`;
};

//API to submit live location
export const submitLiveLocation = (channelPartnerId: string) => {
  return RETAILER_PROFILE + `/${channelPartnerId}/live-location`;
};

//Performance
//API to get Retailer Performance
export const getRetailerPerformance = (channelPartnerId: string) => {
  return RETAILER_PERFORMANCE + `/${channelPartnerId}`;
};

//API to download Retailer Performance Report
export const downloadRetailerReport = (channelPartnerId: string) => {
  return (
    RETAILER_PERFORMANCE + `/${channelPartnerId}/downloadPerformanceReport`
  );
};

//API to get areaName
export const getAreaName = (areaMasterId: string) => {
  return AREA_MASTERS + `?filters[areaMasterId][$eq]=${areaMasterId}`;
};
