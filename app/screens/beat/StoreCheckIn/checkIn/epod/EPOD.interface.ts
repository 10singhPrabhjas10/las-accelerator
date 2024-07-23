export interface IInvoicesRequestBody {
  filters: {
    channelPartnerCode: string;
    categoryId?: string[];
    invoiceDate?: {$gte: string; $lte: string};
  };
  fields: Fields[];
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {invoiceDate: string};
}

export enum Fields {
  INVOICE_NO = 'invoiceNo',
  TOTAL_INVOICE_AMOUNT = 'totalInvoiceAmount',
  INVOICE_DATE = 'invoiceDate',
  CATEGORY_ID = 'categoryId',
  POD_DATE_TIME = 'podDateTime',
  POD_RECEIVED = 'podReceived',
}

export interface IEPODRequestBody {
  podDateTime: string;
}

export interface IProductDivisionResponse {
  categoryId: string;
  categoryName: string;
}

export interface IInvoiceResponse {
  id: number;
  invoiceNo: string;
  totalInvoiceAmount: number;
  invoiceDate: string;
  categoryId: string;
  categoryName: string;
  status: string;
  podDateTime: string;
  podReceived: boolean;
}
