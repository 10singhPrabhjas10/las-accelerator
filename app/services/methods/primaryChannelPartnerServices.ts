import {
  PRIMARY,
  SECONDARY_SALES,
  SECONDARY_SCHEMES,
  CHANNEL_PARTNER,
  CP_PROFILE,
  INVOICE_DETAILS,
  ORDER_DETAILS,
  ORDER_STATUS,
  REPLACEMENT,
  RETURNS,
  SEARCH_ORDER,
  PRIMARY_SALES,
  PRIMARY_SALES_PERFORMANCE,
} from 'services/constants';

export const getChannelPartnerSearchApi = (searchQuery: string) => {
  return CP_PROFILE + 'search/' + searchQuery;
};

export const getChannelPartnerDetailsApi = (code: string) => {
  return CP_PROFILE + `${code}/details`;
};

export const getGeneralInformationDetailsApi = (code: string) => {
  return CP_PROFILE + `${code}/generalinformation`;
};

export const getKeyContactsDetailsApi = (code: string) => {
  return CP_PROFILE + `${code}/key-contacts`;
};

export const getDmsInformationDetailsApi = (code: string) => {
  return CP_PROFILE + `${code}/dmsinformation`;
};

export const getShippingInformationListApi = (code: string) => {
  return CP_PROFILE + `${code}/shipping-information`;
};

export const getShippingDetailsApi = (
  code: string,
  customerAddressCode: string,
) => {
  return CP_PROFILE + code + '/shipping-information/' + customerAddressCode;
};

export const getRelatedCodeListApi = (code: string) => {
  return CP_PROFILE + `${code}/related-codes`;
};

export const getRelatedCodeDetailsApi = (
  code: string,
  channelPartnerId: string,
) => {
  return CP_PROFILE + `${code}/related-codes/${channelPartnerId}/view-detail`;
};

export const getRelatedCodesFilterApi = (code: string) => {
  return CP_PROFILE + `${code}/related-codes/filter-detail`;
};

export const getMappedRetailerApi = (channelPartnerId: string) => {
  return CP_PROFILE + `mapped-retailer/${channelPartnerId}`;
};

export const getMappedRetailerFilterApi = () => {
  return CP_PROFILE + 'mapped-retailer/filter-detail';
};

//Order Management
export const getOrderHistoryListApi = () => {
  return SEARCH_ORDER;
};

export const getOrderHistoryDetailsApi = (orderNo: string) => {
  return SEARCH_ORDER + '/' + orderNo;
};

export const getOrderHistoryFilterApi = (channelPartnerId: string) => {
  return ORDER_STATUS + `/search-order/${channelPartnerId}`;
};

export const getOrderHistoryLineItemsApi = () => {
  return ORDER_DETAILS + 'line-items';
};

export const getOrderInvoiceDetailsApi = () => {
  return INVOICE_DETAILS;
};

export const getOrderHistoryEpodApi = (invoiceNo: string) => {
  return INVOICE_DETAILS + 'epod-details/' + invoiceNo;
};

export const getInvoiceSummaryApi = (invoiceNo: string) => {
  return INVOICE_DETAILS + 'invoice-summary/' + invoiceNo;
};

export const getCpInvoiceDetailsApi = () => {
  return CHANNEL_PARTNER + 'invoice-details';
};

export const getCpInvoiceDetailsLineItemsApi = () => {
  return INVOICE_DETAILS + 'line-items';
};

export const getRequestInitiationApi = (customerCode: string) => {
  return RETURNS + '/' + customerCode;
};

export const getOrderReturnSubmitApi = () => {
  return RETURNS;
};

export const getRequestInitiationUpdateApi = () => {
  return RETURNS + '/request-initiation';
};

export const getUpdateSkuApi = () => {
  return RETURNS + '/sku-quantity';
};

export const getSkuDetailsApi = (sku: string) => {
  return RETURNS + '/sku/' + sku;
};

export const getSkuProductListApi = (categoryId: string, sku: string) => {
  return RETURNS + '/sku-search/' + categoryId + '/' + sku;
};

export const getInvoiceSelectionApi = () => {
  return RETURNS + '/invoice-selection';
};

export const getReturnStatusApi = (customerCode: string) => {
  return RETURNS + '/status/' + customerCode;
};

export const getReplacementUpdateApi = () => {
  return REPLACEMENT;
};

export const getReplacementReasonsApi = () => {
  return REPLACEMENT + '/reasons';
};

export const getReplacementStatusApi = (customerCode: string) => {
  return REPLACEMENT + '/status/' + customerCode;
};

export const getPrimaryCustomerSePic = () => {
  return PRIMARY + '/customer-se-pic';
};

export const getProductMapping = (customerCode: string) => {
  return CP_PROFILE + `${customerCode}/productMapping`;
};

//Secondary Schemes
export const getSecondarySchemes = (channelPartnerId: string) => {
  return SECONDARY_SCHEMES + `/primary-cp/${channelPartnerId}`;
};

export const getSchemeDetails = (schemeId: string) => {
  return SECONDARY_SCHEMES + `/primary-cp/scheme-details/${schemeId}`;
};

export const getSchemeSlabDetails = (schemeId: string) => {
  return SECONDARY_SCHEMES + `/primary-cp/scheme-slab-details/${schemeId}`;
};

export const getRetailersEligible = (
  channelPartnerId: string,
  schemeId: string,
  searchValue: string,
) => {
  return (
    SECONDARY_SCHEMES +
    `/${channelPartnerId}/primary-cp/eligibile-retailers/${schemeId}/${searchValue}`
  );
};

export const getEligibleRetailersDetails = (channelPartnerId: string) => {
  return (
    SECONDARY_SCHEMES +
    `/primary-cp/eligible-retailer-details/${channelPartnerId}`
  );
};

export const getSchemeRewards = (schemeId: string) => {
  return SECONDARY_SCHEMES + `/primary-cp/scheme-reward-details/${schemeId}`;
};

export const getRetailerEligibility = (
  channelPartnerId: string,
  schemeId: string,
) => {
  return (
    SECONDARY_SCHEMES +
    `/${channelPartnerId}/primary-cp/search-by-retailer/${schemeId}`
  );
};

export const getSecondarySalesApi = (customerCode: string) => {
  return SECONDARY_SALES + customerCode + '/retailers';
};

export const getSecondarySalesPerformanceApi = (
  customerCode: string,
  retailerChannelPartnerId: string,
  salesParam: string,
) => {
  return (
    SECONDARY_SALES +
    customerCode +
    '/retailers/' +
    retailerChannelPartnerId +
    '/' +
    salesParam
  );
};

export const getSecondarySalesRetailerSearchApi = (
  customerCode: string,
  searchValue: string,
) => {
  return SECONDARY_SALES + customerCode + '/' + searchValue;
};

export const getPrimarySalesApi = () => {
  return PRIMARY_SALES + 'filter';
};

export const getPrimarySalesDetailsApi = (
  channelPartnerId: string,
  categoryId: string,
) => {
  return PRIMARY_SALES + `performance/${channelPartnerId}/${categoryId}`;
};

export const getPrimarySalesFilter = (channelPartnerId: string) => {
  return PRIMARY_SALES + `${channelPartnerId}/filter`;
};

export const downloadSalesPerformanceReport = () => {
  return PRIMARY_SALES_PERFORMANCE + '/download';
};

export const getVolumeTarget = (
  channelPartnerId: string,
  categoryId: string,
) => {
  return PRIMARY_SALES + `volume-target/${channelPartnerId}/${categoryId}`;
};
