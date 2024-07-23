export interface ICategoryDropdownResponse {
  categoryId: string;
  categoryName: string;
}

export interface IAttribute {
  categoryId: string;
  categoryName: string;
  createdAt: string;
  materialCode: string;
  quantity: string;
  seriesCode: number;
  seriesDescription: string;
  skuProduct: string;
  skuProductCode: string;
  skuProductName: string;
  subCategoryId: string;
  uom: string;
  updatedAt: string;
}

export interface ISeriesDropdownResponse {
  attributes: IAttribute;
  id: number;
}

export interface ICompetitiveIntelligenceResponse {
  id: number;
  competitiveIntelligenceId: string;
  name: string;
  categoryId: string;
  mop: string | null;
  distributorSellingPrice: number | null;
  retailerSellingPrice: number | null;
  btlType: string | null;
  remarks: string | null;
  lasId: string | null;
  channelPartnerId: string | null;
  createdAt: string;
  updatedAt: string;
  series: string;
  skuProductId: string;
}

export interface IBtlFilterResponse {
  btlTypeEnum: string[];
}

export interface DropdownItem {
  label: string;
  value: string;
}

export interface IRequestBody {
  mop: number;
  distributorSellingPrice: number;
  retailerSellingPrice: number;
  btlType: string;
  remarks: string;
}

export interface IInitialValues {
  mop: string;
  distributorSellingPrice: string;
  retailerSellingPrice: string;
  btlType: string;
  competitorName: string;
  remarks: string;
}
