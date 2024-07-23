import {SCHEME_DETAILS} from 'services/constants';

export const getSecondarySchemesDashboardApi = () => {
  return SCHEME_DETAILS + 'dashboard';
};

export const getSecondarySchemesCategoriesApi = () => {
  return SCHEME_DETAILS + 'categories';
};

export const getSecondarySchemesRewardsApi = () => {
  return SCHEME_DETAILS + 'view-rewards';
};
