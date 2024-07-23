import {PROFILE} from 'services/constants';

export const getProfileDetails = () => {
  return PROFILE;
};

export const getMappedChannelPartners = () => {
  return PROFILE + '/mappedChannelPartners';
};

export const getMappedRetailers = (code: string) => {
  return PROFILE + `/${code}/mappedRetailers`;
};

export const uploadProfilePhoto = () => {
  return PROFILE + '/uploadPhoto';
};
