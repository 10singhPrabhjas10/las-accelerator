export interface IInvoiceDetailsReqBody {
  retailerId: string;
  channelPartnerId: string;
  pagination: {
    page: number;
    perPage: number;
  };
}

export interface IInvoiceDetailsResponse {
  invoice_date: string;
  invoice_no: string;
  invoice_value: number;
}

export interface IData {
  title: string;
  text: string;
}

export interface IInvoiceDetailsTransformed {
  id: number;
  date: string;
  invoiceNo: string;
  data: IData[];
}

export interface IInvoiceData {
  skuProductId: string;
  totalAmount: string;
  invoiceQuantity: string;
  discount: number;
  netAmount: number;
  skuProductName: string;
  tax: number;
}

export interface IEachInvoiceDetails {
  invoiceNo: string;
  invoiceDate: string;
  invoiceValue: number;
  data: IInvoiceData[];
}

export interface ITransformedEachInvoiceDetails {
  date: string;
  invoiceNo: string;
  headerData: IData[];
  data: {
    id: string;
    data: IData[];
  }[];
}
