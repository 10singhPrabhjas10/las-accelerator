import Config from 'react-native-config';
import {
  GET_CATEGORY,
  RETAILER_DEALER_CODE,
  TERMS_AND_CONDITIONS,
} from 'services/constants';

export const getSFDCUploadApi = () => {
  return Config.SFDC_BASE_URL + 'data/v60.0/composite/tree/ContentVersion';
};

export const getDataFromSFDCApi = (entityId: string) => {
  return Config.SFDC_BASE_URL + 'apexrest/syncFiles?linkedEntityId=' + entityId;
};

export const getRetailerDealerCodeApi = (retailerCode: string) => {
  return RETAILER_DEALER_CODE + '?filters[retailerCode]=' + retailerCode;
};

export const saveRetailerDealerCodeApi = () => {
  return RETAILER_DEALER_CODE;
};

export const getTermsAndConditionAPi = (key: string, localeKey: string) => {
  return TERMS_AND_CONDITIONS + '?filters[key]=' + key + `&locale=${localeKey}`;
};

export const getProductCategoryApi = (pageNumber: number, pageSize: number) => {
  return (
    GET_CATEGORY +
    `?fields[0]=categoryId&fields[1]=categoryName&fields[2]=logo&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`
  );
};
