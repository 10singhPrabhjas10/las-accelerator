export interface ISecondarySchemeReqBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: {
    schemeStatus: string;
    schemeType: string[] | string;
    customDate: {
      fromDate: string;
      toDate: string;
    };
    categoryIds: string[];
    schemeNameIds: string[];
  };
}

export interface ISecondarySchemeDetails {
  id: number;
  secondarySchemeId: string;
  name: string;
  targetActivationDate: string;
  endDate: string;
  schemeType: string;
}

export interface IResponseSecondaryScheme {
  category: string;
  categoryId: string;
  schemes: ISecondarySchemeDetails[];
}

export interface IAccordionCardItem {
  id: number;
  text: string;
  title: string;
}

export interface IAccordion {
  accordionCard: IAccordionCardItem[];
  accordionHeader: string;
  category: string;
  categoryId: string;
  schemeName: string;
  secondarySchemeId: string;
}

export interface ISecondaryScheme {
  data: IAccordion[];
  category: string;
  categoryId: string;
}

export interface ISecondarySchemeDetails {
  id: number;
  secondarySchemeId: string;
  name: string;
  targetActivationDate: string;
  endDate: string;
  schemeType: string;
}

export interface ISlabDetailsResponse {
  focName: string | null;
  rewardToBeEarned: string;
  rewardType: string;
  rewardUnit: number;
  slabCriteriaUOM: string;
  slabThresholdFrom: number;
  slabThresholdTo: number;
  achievement: string;
  description: string;
}

export interface ISKUDetailsRequestBody {
  secondarySchemeId: string;
  categoryId: string;
  subCategoryId: string;
  series: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

interface ISkuProductItem {
  skuproductId: number;
  product: string;
}

export interface ISKUDetailsResponse {
  series: string;
  skuProductList: ISkuProductItem[];
}

export interface ISchemeNameResponse {
  name: string;
  secondarySchemeId: string;
}

export interface ICategoryDropdownResponse {
  categoryId: string;
  categoryName: string;
}
