import Config from 'react-native-config';

const EASY_DMS_BASE_URL = Config.EASY_DMS_BASE_URL;

export const getEasyDmsAuthenticationApi = () => {
  return EASY_DMS_BASE_URL + 'PIAuth';
};

export const getEasyDmsSaveRetailerApi = () => {
  return EASY_DMS_BASE_URL + 'SaveRetailer';
};

export const getEasyDmsSalesOrderApi = () => {
  return EASY_DMS_BASE_URL + 'SalesOrder';
};

export const getEasyDmsOrderFulfillmentApi = () => {
  return EASY_DMS_BASE_URL + 'GetSalesOrderFulfillment';
};
