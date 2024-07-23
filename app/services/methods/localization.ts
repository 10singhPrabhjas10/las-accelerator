import {LOCALIZATION} from '../constants';

export const getLocalizationApi = (param: string) => {
  return LOCALIZATION + `?locale=${param}`;
};
