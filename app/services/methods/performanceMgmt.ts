import {
  PRIMARY_SALES_TARGET,
  SECONDARY_SALES_TARGET,
  PROFILE,
  SECONDARY_STORE_DETAILS,
  COMPLIANCE_PERFORMANCE,
} from 'services/constants';

//API to get Primary Sales
export const getPrimarySales = (
  reportType: string,
  channelPartnerId?: string,
  categoryId?: string,
) => {
  const categoryQuery = categoryId && `&categoryId=${categoryId}`;
  const channelPartnerQuery =
    channelPartnerId && `&channelPartnerId=${channelPartnerId}`;
  return (
    PRIMARY_SALES_TARGET +
    `?reportType=${reportType}${channelPartnerQuery}${categoryQuery}`
  );
};

//API to get Channel partners
export const getChannelPartners = () => {
  return PROFILE + `/channel-partners/list`;
};

//API to get Category List
export const getCategories = () => {
  return PROFILE + `/categories/list`;
};

//API to get Secondary Sales
export const getSecondarySales = (
  reportType: string,
  channelPartnerId?: string,
  categoryId?: string,
) => {
  const categoryQuery = categoryId && `&categoryId=${categoryId}`;
  const channelPartnerQuery =
    channelPartnerId && `&channelPartnerId=${channelPartnerId}`;
  return (
    SECONDARY_SALES_TARGET +
    `?reportType=${reportType}${channelPartnerQuery}${categoryQuery}`
  );
};

//API to get Secondary Store Details
export const getSecondaryStoreDetails = (
  channelPartnerId?: string,
  categoryId?: string,
) => {
  let queryString = '';

  if (categoryId) {
    queryString += `?categoryId=${categoryId}`;
  }

  if (channelPartnerId) {
    // If there is already a query string (i.e., categoryId was added), use &; otherwise, use ?
    queryString += `${
      queryString ? '&' : '?'
    }channelPartnerId=${channelPartnerId}`;
  }
  return SECONDARY_STORE_DETAILS + queryString;
};

//API to get Compliance Performance
export const getComplianceReport = () => {
  return COMPLIANCE_PERFORMANCE;
};
