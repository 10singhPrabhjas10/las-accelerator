import {IAppliedFilterProps} from '../component/notificationFilter/NotificationFilter.interface';

export interface IFilterChip {
  key: string;
  title: string;
  isOpened?: boolean;
  isSelected: boolean;
}

export interface INotificationList {
  icon: string;
  title: string;
  subTitle: string;
  date: string;
  message: string;
  isRead: boolean;
  id: string;
  notificationTypeId?: string;
}

export interface IFiltersRequest extends IAppliedFilterProps {
  isOpened?: boolean | null;
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IRequestBodyData {
  filters: IFiltersRequest;
  pagination: IPagination;
}

export interface INotificationType {
  attributes: {
    createdAt: string;
    icon: string;
    name: string;
    updatedAt: string;
  };
  id: number;
}
export interface INotificationResponse {
  attributes: {
    createdAt: string;
    date: string;
    description: string;
    isOpened: boolean;
    notificationType: {
      data: INotificationType;
    };
    retailerId: string;
    title: string;
    updatedAt: string;
  };
  id: number;
}
