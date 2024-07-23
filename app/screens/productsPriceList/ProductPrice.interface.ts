/* eslint-disable @typescript-eslint/no-unused-vars */
interface ICheckboxProps {
  id: string;
  name: string;
  isChecked: boolean;
}

interface IProductVideoProps {
  id: number;
  title: string;
  subTitle: string;
  url: string;
}

interface IDocument {
  id: number;
  title: string;
  subTitle: string;
}

interface ICategoryResponseData {
  attributes: {
    categoryId: string;
    categoryName: string;
    logo: string;
  };
  id: number;
}

interface IProductPriceFilters {
  categoryId: string;
  subCategoryId: string[];
  documentType: {
    $containsi: string[];
  };
  skuProduct: {
    $containsi: string[];
  };
  youtubeCreatedAt: {
    $gte: string;
    $lte: string;
  };
}

interface IDocumentRequestBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: IProductPriceFilters;
}

interface IPriceListRequestBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: IProductPriceFilters;
}

interface IVideoRequestBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: {
    categoryId: string;
    subCategoryId?: string[];
    documentType?: {
      $containsi: string[];
    };
    skuProduct?: {
      $containsi: string[];
    };
    youtubeCreatedAt?: {
      $gte: string;
      $lte: string;
    };
  };
}

type DataItem = {
  id: string;
  link?: string;
  subTitle: string;
  title: string;
  versionData?: any;
};

interface IProductVideoData {
  categoryId: string;
  data: DataItem[];
  label: string;
}

type ProductItem = {
  id: string;
  subTitle: string;
  title: string;
};

interface IProductItemData {
  categoryId: string;
  data: DataItem[];
  label: string;
}

type SubCategoryData = {
  id: number;
  youtubeTitle: string;
  youtubeLink: string;
  youtubeCreatedAt: string | null;
  productDisplayPriceListId: string;
  description: string;
};

type IProductListSubCategory = {
  subCategoryId: string;
  subCategoryName: string;
  data: SubCategoryData[];
};

interface IVersionDataProps {
  attributes: {
    contentVersionCode: string;
    contentDocumentId: string;
    contentUrl: string;
    versionData: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface ISkuCheckboxProps {
  id: string;
  name: string;
  isChecked: boolean;
  skuId?: string;
}

interface IProductDisplayProps {
  tabCurrentIndex: number;
}

interface IProductVideoScreenProps {
  item: IProductVideoData;
  togglePlaying: (videoId: string) => void;
  playing: boolean;
  tabCurrentIndex: number;
}

interface IProductSfdcResponse {
  ContentDownloadUrl: string;
  DistributionPublicUrl: string;
  FileType: string;
  Id: string;
  LinkedEntityId: string;
  PathOnClient: string;
  Title: string;
  VersionNumber: string;
  CreatedDate: string;
}

interface ILeadTypeCheckboxProps {
  id: string;
  name: string;
  isChecked?: boolean;
}
