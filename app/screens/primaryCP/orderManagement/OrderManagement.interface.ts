/* eslint-disable @typescript-eslint/no-unused-vars */
interface IOrderHistoryListProps {
  data: IDataCard[];
  date: string;
  orderNo: string;
  orderId: string;
  orderCode: string;
}

interface IOrderReturnProgress {
  activeIndex: number;
}

interface IPrevData {
  customerCode: string;
  salesOffice: string;
  productCategory: string;
  reasonForReturn: string;
  comments: string;
  serialisedProducts: boolean;
}

interface IRequestInitiation {
  onSubmit: (prevData: IPrevData) => void;
}

interface ISkuDetails {
  prevData: IPrevData;
  onSubmit: () => void;
}

interface IInvoiceSelection {
  skuData: IAddSkuDetails[];
  onSubmit: () => void;
}

interface IFilterDates {
  fromDate: string;
  toDate: string;
}

interface IOrderHistoryFilters {
  orderStatus: string[];
  customDate: IFilterDates;
  categoryIds: string[];
}

interface IOrderHistoryRequestBody {
  pagination: IPagination;
  filters: IOrderHistoryFilters;
}

interface IOrderHistoryFilterProps {
  filterData: IOrderHistoryFilters;
  setFilterData: (data: IOrderHistoryFilters) => void;
  onApplyFilter: () => void;
}

interface IOrderHistoryListData {
  id: string;
  orderNo: string;
  status: string;
  poNo: string;
  sapOrder: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sfdcOrderNo: string;
  categoryId: string;
  customerAddressId: string;
  ordercode: string;
  salesEmployeeId: string;
  orderDate: string;
  category: string;
  orderId: string;
  sapOrderNo: null;
  orderCode: string;
  netValue: string;
  grossValue: string;
  source: string;
  lasId: string;
  channelPartnerId: string;
  sapOrderNetValue: number;
}

interface IOrderHistoryDetailsData {
  orderNo: string;
  orderDate: string;
  categoryId: string;
  salesEmployeeId: string;
  status: string;
  poNo: string;
  sapOrderNo: string;
  sfdcOrderNo: string;
  customerAddressId: string;
  categoryName: string;
  shippingAddress: {
    doorNoOrPremises: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    country: string;
  };
  salesEmployee: string;
  netValue: string;
  grossValue: string;
  orderId: string;
  orderCode: string;
}

interface IProductDivisionFilter {
  categoryName: string;
  categoryId: string;
}

interface IOrderLineItemsProps {
  id: number;
  materialGroup: string;
  sku: string;
  materialCode: string;
  pricePerItem: string;
  quantity: string;
  itemCategory: string;
  storageLocation: string;
  warehouse: string;
  SkuProductName: string;
  invoiceLineAmount: number;
  taxAmount: number;
  skuProductName: string;
}

interface IOrderLineItemsResponse {
  orderItemDetails: IOrderLineItemsProps[];
}

interface IPagination {
  page: number;
  pageSize?: number;
}

interface IOrderLineItemsRequest {
  orderNo: string;
  pagination: IPagination;
}

interface IOrderInvoiceItemsRequest {
  invoiceNo: string;
  pagination: IPagination;
}

interface IOrderInvoiceDetails {
  id: number;
  invoiceNo: string;
  invoiceValue: string;
  orderNumber: string;
  epod: string;
  invoiceDate: string;
  orderDate: string;
  podReceived: boolean;
  invoiceId: string;
}

interface IOrderInvoiceDetailsResponse {
  invoiceDetails: IOrderInvoiceDetails[];
}

interface IOrderInvoiceData {
  date: string;
  invoiceNo: string;
  data: IDataCard[];
  invoiceId: string;
}

interface IOrderInvoiceFilterData {
  epod: string;
  invoiceDate: {
    fromDate: string;
    toDate: string;
  };
}

interface IOrderInvoiceFilterProps {
  filterData: IOrderInvoiceFilterData;
  setFilterData: (data: IOrderInvoiceFilterData) => void;
  onApplyFilter: () => void;
}

interface IOrderInvoiceSummaryData {
  date: string;
  data: IDataCard[];
}

interface IOrderInvoiceSummaryDetails {
  invoiceNo: string;
  invoiceDate: string;
  invoiceValue: string;
  epod: string;
  sapOrderNo: string;
  salesOffice: string;
  billingType: string;
  categoryId: string;
  netInvoiceAmount: string;
  taxAmount: string;
  grandTotal: string;
  orderNumber: string;
  channelPartnerCode: string;
  productDivision: string;
  salesEmployee: string;
  customerName: string;
  customerCode: string;
  customerGroup: string;
  podReceived: boolean;
}

interface IEpodDetails {
  invoiceNo: string;
  epod: string;
  epodRemarks: string;
  epodSigned: string;
  lrNo: string;
  lrDate: string;
  location: string;
  nameOfTransport: string;
}

interface IAddSkuDetails {
  sku: string;
  quantity: string;
  materialCode: string;
  uom: string;
}

interface IRequestInitiationRequest {
  customerCode: string;
  salesOffice: string;
  productCategory: string;
  reasonForReturn: string;
  comments: string;
  serialisedProducts: boolean;
}

interface IReplacementRequest {
  customerCode: string;
  reasonsForReplacement: string;
  comments: string;
  serialisedProducts: boolean;
}

interface IAddNewSku {
  handleAddNewSku: (data: IAddSkuDetails) => void;
  handleAddNewSkuDone: (data: IAddSkuDetails) => void;
  isLastIndex: boolean;
  componentIndex: number;
  productCategory: string;
}

interface IInvoiceSelectionRequest {
  sku: string[];
  quantity: string[];
  pagination: IPagination;
}

interface IInvoiceItemsRequest {
  channelPartnerId: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

interface ISearchSkuData {
  id: string;
  skuProduct: string;
  skuProductName: string;
  categoryId: string;
  quantity: string;
  materialCode: string;
  uom: string;
}

interface ISkuDetailsData {
  sku: string;
  materialCode: string;
  uom: string;
}

interface IInvoiceSelectionResponse {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  sku: string;
  skuCode: string;
  quantity: string;
  plantCode: string;
  unitPrice: string;
  amount: string;
}

interface IInvoiceSelectionData {
  invoiceNo: string;
  data: IDataCard[];
}

interface IAddNewSkuRequest extends IPrevData {
  data: IAddSkuDetails[];
}

interface IReplacementInformation {
  customerCode: string;
  requestType: string;
  status: string;
  subStatus: string;
  rlScmStatus: string;
  sfdcSrNo: string;
  crmSrNo: string;
}

interface IReturnInformation {
  crmSrNo: string;
  status: string;
  subStatus: string;
  rlScmStatus: string;
  reasonForReturn: string;
  totalAmount: string;
}
