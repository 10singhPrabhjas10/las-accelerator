/* eslint-disable @typescript-eslint/no-unused-vars */
interface IGeneralInfo {
  id: number;
  nameOfFirm: string;
  contactPerson: string;
  phoneNo: string;
  alternatePhoneNo: string;
  code: string;
  emailId: string;
  pincode: string;
  area: string;
  district: string;
  state: string;
  salesOffice: string;
  doorNoOrPremises: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  securityDeposit: string;
  securityDepositRemark: string;
  blockCustomer: boolean;
  customerBlockReason: string;
  creditLimitByVGIL: string;
  noOfDeliveryVehicle: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  billingAddress: {
    city: string;
    country: string;
    countryCode: string;
    geocodeAccuracy: string;
    latitude: string;
    longitude: string;
    postalCode: string;
    state: string;
    stateCode: string;
    street: string;
  };
}

interface ICustomerDetails {
  id: number;
  code: string;
  nameOfFirm: string;
  contactPerson: string;
  phoneNo: string;
  blockCustomer: boolean;
  customerBlockReason: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
}

interface IDataCard {
  title: string;
  text: string | number;
  formatValueInRupees?: boolean;
}

interface IKeyContact {
  name: string;
  designation: string;
  dateOfBirth: string;
  aadharCardNo: string;
  panCardNo: string;
  relationshipToOwner: string;
  phoneNo: string;
}

interface IDataResponse {
  data: IDataCard[];
}

interface IKeyContactResponse {
  name: string;
  data: IDataCard[];
}

interface IShippingListData {
  addressType: string;
  customerAddressCode: string;
  address: string;
  customerAddressId: string;
}

interface IShippingList {
  addressType: string;
  doorNoOrPremises: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  country: string;
  customerAddressCode: string;
  customerAddressId: string;
  street: string;
  city: string;
  district: string;
}

interface IShippingDetails {
  addressType: string;
  data: IDataCard[];
}

interface IShippingInformation {
  addressType: string;
  doorNoOrPremises: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  district: string;
  pincode: string;
  state: string;
  country: string;
  sizeOfWarehouse: string;
  ownershipType: string;
  area?: any;
  street: string;
  city: string;
}

interface IRelatedCodes {
  id: string;
  code: string;
  relationship: string;
  nameOfFirm: string;
  contactPerson: string;
  phoneNo: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  channelPartnerId: string;
}

interface IRelatedCodesDetails {
  code: string;
  relationship: string;
  nameOfFirm: string;
  contactPerson: string;
  address: string;
  phoneNo: string;
  emailId: string;
  gstin: string;
  salesOffice: string;
  productDivison: string[];
  contactPersonFirstName: string;
  contactPersonLastName: string;
}

interface IPrimaryPartnerSearch {
  title: string;
  subTitle: string;
}
interface IResPrimaryPartner {
  nameOfFirm: string;
  code: string;
  channelPartnerId: string;
}

interface IRelatedCodeFilters {
  productDivision: string[];
  relationship: string[];
}

interface IRelatedCodeRequestBody {
  pagination: {
    page: number;
    pageSize?: number;
  };
  filters: IRelatedCodeFilters;
}

interface IRelatedCodesData {
  code: string;
  phoneNo: string;
  data: IDataCard[];
  channelPartnerCode: string;
}

interface IRelatedCodeFilterProps {
  filterData: IRelatedCodeFilters;
  setFilterData: (data: IRelatedCodeFilters) => void;
  onApplyFilter: () => void;
}

interface IDmsInformation {
  id: string;
  dmsStatus: boolean;
  dmsAgreeToUse: boolean;
  dmsLastSyncDate: string;
  dmsAccuracy: string;
  dmsLockStatus: boolean;
}

interface IProfileDetails {
  isBlocked: boolean;
  data: IDataCard[];
}

interface IMappedRetailer {
  retailerCode: string;
  nameOfFirm: string;
  productDivision: string;
  sales: string;
}

interface IMappedRetailerData {
  retailerId: string;
  data: IDataCard[];
}

interface IMappedRetailerFilters {
  categoryIds: string[];
}

interface IMappedRetailerRequestBody {
  pagination: {
    page: number;
    pageSize?: number;
  };
  filters: IMappedRetailerFilters;
}

interface IMappedRetailerFIlterProps {
  filterData: IMappedRetailerFilters;
  setFilterData: (data: IMappedRetailerFilters) => void;
  onApplyFilter: () => void;
}

interface IProductDivision {
  categoryId: string;
  categoryName: string;
}

interface ISecondarySalesFilters {
  retailerChannelPartnerId: string;
  categoryNames: string[];
  sortBy: string;
}

interface ISecondarySalesRequestBody {
  pagination: {
    page: number;
    pageSize?: number;
  };
  filters: ISecondarySalesFilters;
}

interface ISecondarySalesFilterProps {
  isSortFilter: boolean;
  filterData: ISecondarySalesFilters;
  setFilterData: (data: ISecondarySalesFilters) => void;
  onApplyFilter: () => void;
}

interface ISecondarySalesResponse {
  channelPartnerId: string;
  nameOfFirm: string;
  totalSales: string;
}

interface ISecondarySalesData {
  channelPartnerId: string;
  data: IDataCard[];
}

interface ISecondarySalesDataProps {
  retailerChannelPartnerId: string;
  type: string;
}

interface ISecondarySalesPerformanceResponse {
  channelPartnerId: string;
  nameOfFirm: string;
  totalSales: string;
  categories: {
    categoryId: string;
    categoryName: string;
    sales: string;
  }[];
}

interface IPrimarySalesRequestBody {
  pagination: {
    page: number;
    pageSize?: number;
  };
  filters: IPrimarySalesFilters;
}

interface IPrimarySalesFilters {
  categoryIds: string[];
  customDate: {
    fromDate: string;
  };
  selectedMonth?: string;
}

interface IPrimarySalesResponse {
  category_id: string;
  total_target: string;
  total_achievement: string;
  category: string;
  fy_target: string;
  ytdAchievementvsfyTarget: number;
  ytdAchievementPercentage: number;
  customer_target_id: string;
}

interface IPrimarySalesData {
  categoryName: string;
  customerTargetId: string;
  data: IDataCard[];
  salesData: IPrimarySalesResponse;
  categoryId: string;
}

interface IPrimarySalesDetailsResponse {
  achievement: number;
  category: string;
  categoryId: string;
  channelPartnerCategoryId: string;
  customerTargetId: string;
  previousYearSales: number;
  startDate: string;
  target: number;
  mom: number;
  qoq: number;
}

interface IDownloadSalesReportRequestBody {
  channelPartnerId: string;
  customDate: {
    fromDate: string;
    toDate: string;
  };
}

interface IInvoiceLine {
  sku: string;
  material_group: string;
  material_code: string;
  total_paid_quantity: number;
  total_foc_quantity: number;
  total_invoice_amount: number;
  skuName: string;
}

interface ISalesResportResponse {
  id: number;
  invoiceNo: string;
  invoiceId: string;
  invoiceDate: string;
  categoryId: string;
  channelPartnerId: string;
  category: string;
  customerCode: string;
  customerName: string;
  invoiceLine: IInvoiceLine[];
}

interface ITransformedPrimarySalesDetails {
  categoryName: string;
  categoryId: string;
  data: {title: string; text: string}[];
}

interface IVolumeTarget {
  mtdVol: number;
  ytdVol: number;
}

interface ITransformedVolumeTarget {
  data: {title: string; text: string}[];
}
