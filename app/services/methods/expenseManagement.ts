import {EXPENSES} from 'services/constants';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;

//API to fetch city rate

export const cityRate = () => {
  return EXPENSES + `/city`;
};

//API to create Expense

export const createExpense = () => {
  return EXPENSES;
};

//API to get Expense

export const getExpense = () => {
  return EXPENSES;
};

//API to update Expense

export const updateExpense = () => {
  return EXPENSES + `/update`;
};

//API to get City List

export const getCityListAPI = (searchText: string) => {
  return (
    BASE_URL +
    `expanse-location-lists?filters[Location][$containsi]=${searchText}`
  );
};

//API to get filtered expense List

export const getFilteredExpenseList = (filters: string) => {
  return filters ? EXPENSES + `?${filters}` : EXPENSES;
};
