import {IRowDataProps} from 'components/dataCard/DataCard';

export interface IRetailerOrderHistoryData {
  id: string;
  date: string;
  invoiceNo: string;
  headerData: IRowDataProps[];
  orderData: IRowDataProps[][];
}
