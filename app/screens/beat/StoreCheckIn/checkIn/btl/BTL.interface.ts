import {DropdownItem} from '../CheckIn.interface';

export interface ICategoryDropdownResponse {
  categoryId: string;
  categoryName: string;
}

export interface ISubCategoryDrodownResponse {
  id: number;
  attributes: {
    subCategoryCode: string;
    subCategoryId: string;
    subCategoryName: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ISeriesDropdownResponse {
  id: number;
  attributes: {
    seriesCode: number;
    skuProduct: string;
    skuProductName: string;
    uom: string | null;
    materialCode: string | null;
    seriesDescription: string;
  };
}

export interface IBeatPlanRequestBody {
  channelPartnerId: string;
  categoryId: string;
  subCategoryId: string;
  series: string;
  skuProductId: string;
  btlType: string;
  comment: string;
  requestDate: string;
  status: string;
}

export interface IBtlFilterResponse {
  btlTypeEnum: string[];
  statusEnum: string[];
}

export interface IBtlPlanInitialValues {
  mappedCategory: string;
  subCategory: string;
  series: string;
  sku: string;
  btlType: string;
  comments: string;
}

export interface IBTLListRequestBody {
  filters: {
    requestDate?: {
      $gte: string;
      $lte: string;
    };
    status?: string[];
  };
  sort: {
    updatedAt: string;
  };
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface BTLItem {
  id: number;
  btlMaterialCode: string;
  btlMaterialId: string | null;
  categoryId: string;
  subCategoryId: string;
  series: string;
  skuProductId: string;
  btlType: string;
  comment: string;
  requestName: string | null;
  channelPartnerId: string | null;
  requestDate: string;
  status: string;
  activationStatus: string | null;
  createdAt: string;
  updatedAt: string;
  appRequestNo: string | null;
  channelPartnerName: string | null;
  retailerName: string;
}

export interface ITransformedBTLData {
  id: string;
  btlNo: string;
  btlMaterialCode: string;
  data: {
    title: string;
    text: string;
  }[];
}

export interface IBTLData {
  btlType: DropdownItem[];
  statusType?: DropdownItem[];
}

export interface IBTLStatusReqBody {
  data: {
    status: string;
  };
}
