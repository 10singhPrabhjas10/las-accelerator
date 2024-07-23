import {SetStateAction} from 'react';

export interface INotificationCheckboxProps {
  id: string;
  name: string;
}

export interface IDateProps {
  date: string;
  value: string;
}
export interface IDate {
  from: string;
  to: string;
}
export interface IRequestDateProps {
  date: IDate | null;
}

export interface IAppliedFilterProps {
  date: IDate | null;
  notificationType: string[];
}

export interface IResponseProps {
  attributes: {
    createdAt: string;
    icon: string;
    name: string;
    updatedAt: string;
  };
  id: number;
}

export interface INotificationFilterProps {
  filterData: IAppliedFilterProps;
  setFilterData: SetStateAction<any>;
  onApplyFilter: () => void;
}
