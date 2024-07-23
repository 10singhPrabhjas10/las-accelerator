import Config from 'react-native-config';
import {
  CHANNEL_FINANCE,
  FINANCIAL_OUTSTANDING,
  FINANCIAL_STATEMENT,
} from 'services/constants';

export const getAccountStatementApi = () => {
  return Config.SAP_BASE_URL + FINANCIAL_STATEMENT;
};

export const getAccountOutstandingApi = () => {
  return Config.SAP_BASE_URL + FINANCIAL_OUTSTANDING;
};

export const getChannelFinanceApi = () => {
  return CHANNEL_FINANCE + 'channel-partner';
};
