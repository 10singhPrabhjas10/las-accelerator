import {
  BEAT_PLAN_DETAILS,
  BEAT_PLAN_ITEM,
  CATEGORY_NAMES,
  GRIEVANCE_REDRESSAL,
  SECONDARY_SCHEMES,
  SUPPORT,
  CHANNEL_PARTNERS,
  SUB_CATEGORY,
  SKU_PRODUCTS,
  BTL_MATERIALS,
  COMPETITOR_NAME,
  EPOD,
  BALANCE_CONFIRMATION,
  ADDRESS,
  ORDERS,
  LAS_TARGET_PERFORMANCE,
  PRIMARY_SCHEMES,
  PRIMARY_SCHEME,
  PRODUCT_INVENTORY,
  BEAT_PLAN_COMPLIANCE,
  OUTSTANDINGS,
  LAS_PAYMENT_COLLECTION,
  CHANNEL_FINANCE,
  BEAT_PLAN_ACTIVITY,
  BEAT_LEADS,
} from 'services/constants';
import Config from 'react-native-config';

//Get Beat Plan Details
export const getBeatPlanDetails = (month: string, year: number) => {
  return BEAT_PLAN_DETAILS + `?filters[month]=${month}&filters[year]=${year}`;
};

//API to get store checkIn Item List(Schedule, Pending, Completed)
export const getStoreCheckInList = (filters: string) => {
  return BEAT_PLAN_ITEM + `?${filters}`;
};

//API for checkIn-checkOut Time

export const submitCheckInTime = (beatPlanId: string) => {
  return BEAT_PLAN_ITEM + `/${beatPlanId}`;
};

//CheckIn Screen methods

//API to get dropdowns of Primary GRedressal

export const getPrimaryDropdown = () => {
  return GRIEVANCE_REDRESSAL + '/dropdown-details';
};

//API to Raise Ticket in Primary

export const createTicket = (channelPartnerId: string) => {
  return GRIEVANCE_REDRESSAL + `/${channelPartnerId}/raise-ticket`;
};

//API to get dropdowns of secondary GRedressal (Raise Ticket)

export const getRaiseTicketDropdown = (relationId: string) => {
  return SUPPORT + `/${relationId}/details`;
};

//API to get ticket History (S Redressal)

export const getTicketHistory = (relationId: string) => {
  return SUPPORT + `/${relationId}/ticket-history`;
};

//API to create support ticket

export const createSupportTicket = (relationId: string) => {
  return SUPPORT + `/${relationId}/raise-ticket`;
};

//Secondary Schemes

//API to get secondary scheme List

export const getSecondarySchemes = (relationId: string) => {
  return SECONDARY_SCHEMES + `/${relationId}`;
};

//API to get view scheme details

export const getViewSchemeDetails = (relationId: string, schemeId: string) => {
  return SECONDARY_SCHEMES + `/${relationId}/detail/${schemeId}`;
};

//API to get Tnc in view scheme

export const getTncData = (schemeId: string) => {
  return SECONDARY_SCHEMES + `/tnc/${schemeId}`;
};

//API to get Eligible Products

export const getEligibleProducts = (
  relationId: string,
  schemeId: string,
  categoryId: string,
  type: string,
) => {
  return (
    SECONDARY_SCHEMES +
    `/${relationId}/products?secondarySchemeId=${schemeId}&categoryId=${categoryId}&type=${type}`
  );
};

//API to get SKU Details

export const getSkuDetails = (relationId: string, type: string) => {
  return SECONDARY_SCHEMES + `/${relationId}/products/sku?type=${type}`;
};

//API to get Scheme Name for Filter

export const getSchemeName = () => {
  return SECONDARY_SCHEMES + '/filters';
};

//API to get Category Names in Filter

export const getCategoryNames = (relationId: string) => {
  return CATEGORY_NAMES + `/${relationId}/categoryNames`;
};

//BTL

//API to get Category in BTL

export const getCategoryDropdown = (channelPartnerCode: string) => {
  return (
    CHANNEL_PARTNERS +
    `/${channelPartnerCode}/categories?pagination[pageSize]=100`
  );
};

//API to get subCategory in BTL

export const getSubCategoryDropdown = (
  categoryId: string,
  pageNumber: number,
  pageSize: number,
) => {
  return (
    SUB_CATEGORY +
    `?filters[categoryId]=${categoryId}&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`
  );
};

//API to get series in BTL

export const getSeriesDropdown = (
  categoryId: string,
  subCategoryId: string,
  pageNumber: number,
  pageSize: number,
) => {
  return (
    SKU_PRODUCTS +
    `?filters[categoryId]=${categoryId}&filters[subCategoryId]=${subCategoryId}&fields[0]=seriesCode&fields[1]=skuProduct&fields[2]=skuProductName&fields[3]=uom&fields[4]=seriesDescription&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&filters[inActive]=false`
  );
};

//API to get Sku in BTL

export const getSkuDropdown = (
  categoryId: string,
  subCategoryId: string,
  seriesId: string,
  pageNumber: number,
  pageSize: number,
  extraQuery?: string,
) => {
  return (
    SKU_PRODUCTS +
    `?filters[categoryId]=${categoryId}&filters[subCategoryId]=${subCategoryId}&filters[seriesCode]=${seriesId}&fields[0]=seriesCode&fields[1]=skuProduct&fields[2]=skuProductName&fields[3]=uom${extraQuery}&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&filters[inActive]=false`
  );
};

//API to get BTL Filters

export const getBTLFilters = () => {
  return BTL_MATERIALS + '/filters';
};

//API to create BTL Planning

export const createBTLPlan = () => {
  return BTL_MATERIALS;
};

//API to submit btl status

export const creatBTLStatus = (btlMaterialCode: string) => {
  return BTL_MATERIALS + `/${btlMaterialCode}`;
};

//Competitive Intelligence

//API to get Series products

export const getCompetitiveSeries = (
  categoryId: string,
  pageNumber: number,
  pageSize: number,
) => {
  return (
    SKU_PRODUCTS +
    `?filters[categoryId]=${categoryId}&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&sort[seriesDescription]=ASC&filters[inActive]=false`
  );
};

//API to get SKU Name

export const getSKUName = (
  categoryId: string,
  seriesId: string,
  pageNumber: number,
  pageSize: number,
) => {
  return (
    SKU_PRODUCTS +
    `?filters[categoryId]=${categoryId}&filters[seriesCode]=${seriesId}&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&filters[inActive]=false`
  );
};

//API to get Competitor Name

export const getCompetitorName = (
  categoryId: string,
  skuProductId: string,
  seriesId: string,
) => {
  return (
    COMPETITOR_NAME +
    `?filters[categoryId]=${categoryId}&filters[skuProductId]=${skuProductId}&filters[series]=${seriesId}`
  );
};

//API to submit Competitive Intelligence

export const submitCompetitiveIntelligence = (competitiveId: string) => {
  return COMPETITOR_NAME + `/${competitiveId}`;
};

//EPOD Screen

//API to fetch List of Invoices

export const getInvoices = () => {
  return EPOD + '/filters';
};

//API to submit Epod date

export const sumbitEpodDate = (invoiceNo: string) => {
  return EPOD + `/${invoiceNo}`;
};

//Balance Confirmation Screen

//API to get Balance Confirmation

export const getBalanceConfirmation = (relationId: string) => {
  return (
    BALANCE_CONFIRMATION +
    `?filters[channelPartnerId]=${relationId}&filters[acknowledged]=true`
  );
};

//Primary Order Creation
//API to Get Address
export const getAddress = (channelPartnerId: string) => {
  return ADDRESS + `/${channelPartnerId}`;
};

//API to create Primary Order
export const createPrimaryOrder = () => {
  return ORDERS;
};

//API to fetch order status
export const getOrderStatus = () => {
  return ORDERS + '/filter';
};

//API to fetch status filter
export const getStatusFilter = () => {
  return ORDERS + '/status-list';
};

//API to fetch LAS Target & Performance
export const getTargetPerformance = (
  channelPartnerId: string,
  reportType: string,
  categoryId?: string,
) => {
  const query = categoryId && `&categoryId=${categoryId}`;
  return (
    LAS_TARGET_PERFORMANCE +
    `?channelPartnerId=${channelPartnerId}&reportType=${reportType}${query}`
  );
};

//API to fetch invoice pdf
export const getInvoicePdf = (invoiceNo: string) => {
  return EPOD + `/${invoiceNo}/download`;
};

//Primary Scheme Launch
//API to get primary schemes
export const getPrimarySchemes = () => {
  return PRIMARY_SCHEMES;
};

//API to download PDF
export const getPdfVersionData = (documentId: string) => {
  return PRIMARY_SCHEME + `/${documentId}`;
};

//Inventory Check
//API to get Categories & SubCategories
export const getCategories = (channelPartnerId: string) => {
  return PRODUCT_INVENTORY + `/categories/${channelPartnerId}`;
};

//API to fetch Inventory Details
export const getInventoryDetails = (category: string, subCategory: string) => {
  return (
    PRODUCT_INVENTORY +
    `/details?category=${category}&subCategory=${subCategory}`
  );
};

//API to Raise Discrepancy
export const submitDiscrepancy = (channelPartnerId: string) => {
  return PRODUCT_INVENTORY + `/${channelPartnerId}/raise-ticket`;
};

//API to get survey Responses
export const getSurveyResponse = (channelPartnerId: string) => {
  return CHANNEL_PARTNERS + `/${channelPartnerId}/beat-details`;
};

//API for Collections
export const submitCollections = (beatPlanItemId: string) => {
  return BEAT_PLAN_COMPLIANCE + `/${beatPlanItemId}`;
};

//Collection Tasks
//API to get Collection Amounts
export const getCollectionAmounts = (channelPartnerId: string) => {
  return CHANNEL_PARTNERS + `/${channelPartnerId}/collections`;
};

//API to get Vigil Outstanding Data
export const getOutstandingData = (channelPartnerId: string) => {
  return OUTSTANDINGS + `?filters[channelPartnerId]=${channelPartnerId}`;
};

//API to get channel finance
export const getChannelFinances = (channelPartnerId: string) => {
  return (
    CHANNEL_FINANCE +
    `?filters[channelPartnerId]=${channelPartnerId}&fields[0]=dueIn16To29Days&fields[1]=dueIn30To59Days&fields[2]=dueAfter60Days`
  );
};

//API to submit Las payment collection
export const submitLasPayment = () => {
  return LAS_PAYMENT_COLLECTION;
};

//Activity
//API to get influncer meet dropdown
export const getInfluencerDropdown = () => {
  return BEAT_PLAN_ACTIVITY + '/enums';
};

//API to add influencers
export const addInfluencer = () => {
  return BEAT_PLAN_ACTIVITY;
};

export const getPrimarySchemePdfData = (documentId: string) => {
  return Config.SFDC_BASE_URL + `apexrest/documentDetails/${documentId}`;
};

export const getSecondaryCategoryDropdown = (channelPartnerCode: string) => {
  return (
    CHANNEL_PARTNERS +
    `/secondary/${channelPartnerCode}/categories?pagination[pageSize]=100`
  );
};

export const getLastVisitDate = (relationId: string) => {
  return BEAT_LEADS + `/${relationId}`;
};

export const getSecondaryCPAddress = (channelPartnerId: string) => {
  return CHANNEL_PARTNERS + `/secondary/${channelPartnerId}/address`;
};
