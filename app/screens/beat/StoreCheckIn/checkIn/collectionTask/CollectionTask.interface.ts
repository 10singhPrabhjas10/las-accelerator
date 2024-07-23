export interface ICollectionAmountResponse {
  currentOutstanding: number;
  currentOverdue: number;
}

export interface ITransformedCollectionAmount {
  leftTitle: string;
  rightTitle: string;
}

export interface IVigilResponse {
  sapAge30: number;
  sapAge60: number;
  sapAge90: number;
  sapAge120: number;
}

export interface IChannelFinanceResponse {
  id: 1;
  attributes: {
    dueIn16To29Days: string;
    dueIn30To59Days: string;
    dueAfter60Days: string;
  };
}

export enum CollectionType {
  CHANNEL_FINANCE = 'Channel Finance',
  VGIL = 'VGIL',
}

export interface IData {
  channelPartnerId: string;
  collectionType: string;
  collectionPaymentValue: number;
  collectionPaymentDate: string;
}

export interface IPaymentCollectionReqBody {
  data: IData[];
}
