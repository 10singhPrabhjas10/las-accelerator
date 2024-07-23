export interface ISkuProductDetail {
  skuId: number;
  series: string;
  text?: string;
}

export interface ISubCategory {
  subCategory: string;
  subCategoryId: string;
  skuProductDetail: ISkuProductDetail[];
}

export interface IEligibleProducts {
  secondarySchemeId: string;
  category: string;
  categoryId: string;
  data: ISubCategory[];
}

export interface ISubCategoryList {
  header: string;
  data: IAccordionData[];
}

export interface IAccordionData {
  accordionHeader: string;
  accordionCard: ISeriesData[];
}

export interface ISeriesData {
  secondarySchemeId: string;
  categoryId: string;
  subCategoryId: string;
  id: number;
  title: string;
  series: string;
  text?: string;
}

export interface IAccordionCardItem {
  id: number;
  text: string;
  title: string;
}
