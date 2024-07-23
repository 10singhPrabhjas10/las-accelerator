import {
  AREA_MASTERS,
  LEAD_DROPDOWN,
  PRIMARY_LEAD,
  SECONDARY_LEAD,
} from 'services/constants';

//API to fetch Lead Dropdown

export const getLeadDropdown = () => {
  return LEAD_DROPDOWN;
};

//API to create Primary Lead

export const createPrimaryLead = () => {
  return PRIMARY_LEAD;
};

//API to Validate PinCode

export const getPinCodeDetailsApi = (pincode: string) => {
  return AREA_MASTERS + `?filters[pincode]=${pincode}`;
};

//API to create Secondary Lead

export const createSecondaryLead = () => {
  return SECONDARY_LEAD;
};
