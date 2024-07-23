export interface ISaveRetailerRequestBody {
  distributorcode: string;
  retailercode: string;
  name: string;
  address1: string;
  address2: string;
  zone: string;
  cityname: string;
  statename: string;
  pincode: string;
  latitude: string;
  longitude: string;
  software: string;
  version: string;
  email: string;
  mobilenumber: string;
  gstin: string;
  isclosed: string;
  contactperson: string;
  udf?: {
    Territory: string;
  }[];
}

export interface ISalesOrderItem {
  itemcode: string;
  quantity: string;
  rate: string;
  discountamount: string;
  orderunit: string;
}

export interface ISalesOrderRequestBody {
  ordernumber: string;
  orderdate: string;
  employeename: string;
  distributorcode: string;
  dealercode: string;
  beatname: string;
  latitude: string;
  longitude: string;
  itemlist: ISalesOrderItem[];
}

export interface IShipToAddressResponse {
  id: number;
  attributes: {
    doorNoOrPremises: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    area: string;
    district: string;
    pincode: string;
    state: string;
    country: string;
    addressType: string;
    sizeOfWarehouse: string;
    ownershipType: string;
    channelPartnerCode: string;
    customerAddressCode: string;
    createdAt: string;
    updatedAt: string;
    customerAddressId: string;
    channelPartnerId: string;
  };
}

export interface IItems {
  sku: string;
  quantity: number;
  uom: string;
  skuProductId: string;
}

export interface IPrimaryOrderRequestBody {
  categoryId: string;
  channelPartnerId: string;
  customerAddressId: string;
  items: IItems[];
}

export interface IOrderStatusReqBody {
  filters: {
    channelPartnerId: string;
    orderDate?: {
      $gte: string;
      $lte: string;
    };
    status?: string[];
  };
  pagination: {
    page: number;
    pageSize: number;
  };
}
export interface IOrderFulfillmentRequestBody {
  StartDate: string;
  EndDate: string;
  DistributorCode: string;
  PageIndex: number;
  PerPageRecord: number;
}

export interface IOrderStatusResponse {
  id: number;
  orderNo: string;
  orderDate: string;
  status: string;
  netValue: string | number;
  categoryId: string;
  orderId: string;
  channelPartnerId: string;
  categoryName: string;
  invoiceAmount: number;
  transportName: string;
  vechileNumber: string;
  contantPerson: string;
  contactNumber: string;
  invoiceNo: string;
}

export interface ITransformedOrderStatus {
  id: string;
  name: string;
  invoiceNo: string;
  data: [
    {
      title: string;
      text: string;
    },
  ];
}

export interface ISecondaryOrderResponse {
  masterid: number;
  sono: string;
  sodate: string;
  dealercode: string;
  invoiceno: string;
  invoicedate: any;
  distributorcode: string;
  dispatchstatus: string;
  itemlist: ISecondaryOrderItemlist[];
}

export interface ISecondaryOrderItemlist {
  itemcode: string;
  qty: number;
  rate: number;
  dispatchqty: number;
  pendingqty: number;
}

export enum ReportType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

export interface ITargetPerformanceResponse {
  target: number;
  achievedValue: number;
  lastOrderDate: string;
}

export interface ITargetTransformedResponse {
  name: string;
  leftTitle: string;
  leftValue: string;
  rightTitle: string;
  rightValue: string;
  orderDate: string;
}

interface IAddress {
  city: string;
  state: string;
  street: string;
  country: string;
  stateCode: string;
  postalCode: string;
  countryCode: string;
}

interface IBillingDetails {
  gstIn: string;
  phone: string;
  mobile: string;
  billingAddress: IAddress;
  billingStateCode: number;
}

interface IInvoiceSetting {
  id: number;
  titleForInvoice: string;
  addressForInvoice: string;
  officeAddressForInvoice: string;
  logoForInvoice: string;
  registeredOfficeAddress: string;
  telephone: string;
  fax: string;
  email: string;
  website: string;
  queryTextForInvoice: string;
}

interface IDetails {
  invoiceNo: string;
  invoiceDate: string;
  sapInvoiceNo: string;
  cin: string;
  gstIn: string;
  panNumber: string;
  sapDocumentNumber: string;
}

export interface ILineItems {
  invoiceAmount: number;
  sku: string;
  quantity: string;
  skuName: string;
  materialCode: string;
  uom: string;
}

export interface IInvoiceData {
  details: IDetails;
  billingDetails: IBillingDetails;
  invoiceLineItems: ILineItems[];
  invoiceSetting: IInvoiceSetting;
  totalInvoiceAmount: number;
}

export interface ICreditLimit {
  availableCreditLimit: number;
  pei: number;
  totalCreditLimit: number;
  utilizedCreditLimit: number;
}
