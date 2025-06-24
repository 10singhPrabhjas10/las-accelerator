import {GET, HttpStatusCode, POST, PUT} from 'constants/httpConstants';
import {SetStateAction} from 'react';
import {
  cityRate,
  getCityListAPI,
  createExpense,
  getExpense,
  updateExpense,
  getFilteredExpenseList,
} from 'services/methods/expenseManagement';
import NetworkRequest from 'services/networkRequest';
import {handleApiError, setReduxLoading} from 'utils/CommonReduxMethods';
import {mapCityResponseToAutoComplete} from './ExpenseManagement.helper';

//API to GET City Rate

export const getCityRateData = async (
  selectedCity: string,
  setCityRate: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const body = {
      city: selectedCity,
    };
    const result = await NetworkRequest(POST, cityRate(), body);
    if (result?.status === HttpStatusCode.OK && result?.data) {
      const {data} = result;
      setCityRate(data.data);
    }
  } catch (error: any) {
    handleApiError(error?.data?.error?.message);
  } finally {
    setReduxLoading(false);
  }
};

export const getCityList = async (
  searchText: string,
  setSearchedCityData: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getCityListAPI(searchText));
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      const dropdownData = mapCityResponseToAutoComplete(data?.data);
      setSearchedCityData(dropdownData);
    } else {
      throw new Error('API failed, using mock data');
    }
  } catch (error: any) {
    console.warn('Using mock city list due to error:', error?.message);

    const mockCityData = [
      {id: 'C001', title: 'Mumbai'},
      {id: 'C002', title: 'Delhi'},
      {id: 'C003', title: 'Bangalore'},
      {id: 'C004', title: 'Chennai'},
    ];

    setSearchedCityData(mockCityData);
    handleApiError(error?.data?.error?.message ?? 'Using mock data');
  } finally {
    setReduxLoading(false);
  }
};

//API to create Primary Lead

export const addNewOrUpdateExpense = async (
  addOrUpdate: string,
  requestBody: any,
  onSuccess: () => void,
  onFailure: () => void,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(
      addOrUpdate === 'Create' ? POST : PUT,
      addOrUpdate === 'Create' ? createExpense() : updateExpense(),
      requestBody,
    );
    if (result.status === HttpStatusCode.CREATED) {
      onSuccess();
    }
  } catch (error: any) {
    onFailure();
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to GET Existing Expense

export const getExistingExpense = async (
  setExistingExpenseList: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getExpense());
    const {status, data} = result;
    if (status === HttpStatusCode.OK && data) {
      setExistingExpenseList(data?.data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};

//API to GET filtered Expense List data
export const getFilteredExpensedataAPI = async (
  filters: string,
  setExistingExpenseList: SetStateAction<any>,
  setTotalPage: SetStateAction<any>,
) => {
  setReduxLoading(true);
  try {
    const result = await NetworkRequest(GET, getFilteredExpenseList(filters));
    if (result?.status === HttpStatusCode.OK && result?.data?.data) {
      const {data} = result?.data;
      setExistingExpenseList(data);
    }
  } catch (error: any) {
    handleApiError(error?.message);
  } finally {
    setReduxLoading(false);
  }
};
