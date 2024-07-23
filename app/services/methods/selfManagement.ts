import {EXIT_PROCESS} from 'services/constants';

export const getExitProcessReasonsApi = () => {
  return EXIT_PROCESS + '/reasons';
};

export const getExitProcessSubmitApi = () => {
  return EXIT_PROCESS;
};
