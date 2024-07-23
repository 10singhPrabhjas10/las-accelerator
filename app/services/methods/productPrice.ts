import {
  GET_PRICE_LIST,
  GET_PRODUCT_FILTERS,
  PRODUCT_DOCUMENTS,
  PRODUCT_VIDEOS,
  GET_DOCUMENT,
} from 'services/constants';

export const getProductDocument = () => {
  return PRODUCT_DOCUMENTS;
};

export const getPRoductVideos = () => {
  return PRODUCT_VIDEOS;
};

export const getProductFilters = (categoryId: string) => {
  return GET_PRODUCT_FILTERS + `filters?categoryId=${categoryId}`;
};

export const getPriceList = () => {
  return GET_PRICE_LIST;
};

export const getDocument = (documentId: string) => {
  return GET_DOCUMENT + `?filters[contentDocumentId]=${documentId}`;
};
