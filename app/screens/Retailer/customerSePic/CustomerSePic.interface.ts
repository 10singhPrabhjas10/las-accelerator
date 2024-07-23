export interface ICustomerSePicBody {
  channelPartnerId: string;
  retailerId: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface ICustomerSePicResponse {
  id: number;
  retailerPartnerName: string;
  categoryId: string;
  channelPartnerGroup: string;
  lastOrderDate: string;
  channelPartnerId: string;
  categories: string;
  ChannelPartnerName: string;
  salesUserId: string;
  salesUser: {
    name: string;
    mobileNumber: string;
  };
}
