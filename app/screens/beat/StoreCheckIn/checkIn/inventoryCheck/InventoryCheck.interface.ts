export interface ICategoriesResponse {
  categoryName: string;
  subCategories: string[];
}

export interface ITransformedCategories {
  accordionHeader: string;
  accordionSubHeader: string[];
}

export interface IInventoryDetailsResponse {
  categoryName: string;
  subCategoryName: string;
  skuCode: number;
  skuDescription: string;
  openingStock: number;
  closingStock: number;
  seriesName: string;
}

export interface ITransformedInventoryDetails {
  categoryName: string;
  data: [{title: string; text: string}];
  skuCode: number;
  skuName: string;
  quantity: number;
}

export interface IDiscrepancyReqBody {
  categoryName: string;
  skuDescription: string;
  quantity: string;
  discrepancyQty: string;
  reasonForDiscrepancy: string;
}
