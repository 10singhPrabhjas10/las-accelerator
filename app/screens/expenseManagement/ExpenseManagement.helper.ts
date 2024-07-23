import { ISearchCityData } from './ExpenseManagement.Interface';


export const mapCityResponseToAutoComplete = (data: ISearchCityData[]) => {
    return data.map(item => ({
      id: item.attributes.category,
      title: item.attributes.Location,
    }));
  };