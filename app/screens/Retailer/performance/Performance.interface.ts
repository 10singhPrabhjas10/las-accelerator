export interface IRetailerPerformanceReqBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: {
    categoryNames: string[];
  };
}

export interface IRetailerPerfResponse {
  avgMoV: number;
  categoryName: string;
  mom: number;
  qoq: number;
  salesValueMtd: number;
  salesValuePfy: number;
  salesValuePfyMtd: number;
  salesValueYtd: number;
}

export interface ITransformedResponse {
  categoryName: string;
  id: number;
  data: {title: string; text: string}[];
}

export interface IDownloadRetailerReportReqBody {
  filters: {
    customDate: {
      fromDate: string;
      toDate: string;
    };
  };
}

interface ISalesData {
  invoiceDate: string;
  netAmount: number;
  productId: string;
  paidQuantity: number;
  focQuantity: number;
  productSkuCode: number;
  productSkuDescription: string;
  productCategoryDescription: string;
  productSubcategoryDescription: string;
}
export interface IDownloadReportResponse {
  salesData: ISalesData[];
  customerName: string;
  customerCode: string;
}
