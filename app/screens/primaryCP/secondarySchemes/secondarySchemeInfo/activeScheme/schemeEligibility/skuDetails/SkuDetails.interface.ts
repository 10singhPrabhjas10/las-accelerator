export interface IRequestBody {
  secondarySchemeId: string;
  categoryId: string;
  subCategoryId: string;
  series: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface ISkuProduct {
  skuproductId: number;
  product: string;
}

export interface ISkuProductList {
  header: string;
  skuProductList: ISkuProduct[];
}
