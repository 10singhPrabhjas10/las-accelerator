import {RETAILERS} from '../constants';

export const getSecondaryUserListApi = (param: string) => {
  return RETAILERS + '?filters[parentId]=' + param;
};

export const deleteSecondaryUserApi = (param: string | number) => {
  return RETAILERS + '/' + param;
};

export const addSecondaryUserApi = () => {
  return RETAILERS;
};

export const retailerPersonalDetailsService = (retailerId: string) => {
  return RETAILERS + `?filters[retailerId][$eq]=${retailerId}`;
};
