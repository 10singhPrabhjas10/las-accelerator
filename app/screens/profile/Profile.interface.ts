export interface IProfileResponse {
  employeeCode: string;
  mobileNo: string;
  emailId: string;
  lasType: string;
  dateOfJoining: string;
  branch: string;
  reportingManager1: string;
  reportingManager2: string;
  address: string;
  panCardNo: string;
  aadharCardNo: string;
}

export interface IMappedChannelPartnerReqBody {
  pagination: {
    page: number;
    pageSize: number;
  };
}

export interface IMappedChannelPartnerResponse {
  contactPerson: string;
  contactPersonMobileNo: null | number;
  nameOfFirm: string;
  channelPartnerId: string;
  code: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
}

export interface IMappedRetailerReqBody {
  pagination: {
    page: number;
    pageSize: number;
  };
  filters: {
    categoryIds: string[];
  };
}

export interface IRetailer {
  nameOfFirm: string;
  areaName: string | null;
}

export interface IMappedRetailerResponse {
  categoryId: string;
  categoryName: string;
  retailers: IRetailer[];
}

interface ICard {
  title: string;
  text: string;
}

export interface IRetailerData {
  cardData: ICard[];
}
export interface ITransformedRetailer {
  category: string;
  categoryId: string;
  data: IRetailerData[];
}

export interface IProductDivisionResponse {
  categoryId: string;
  categoryName: string;
}

export interface IProfilePhotoReqBody {
  profilePhoto: string;
}

export interface IPhotoProps {
  uri: string;
  width: number;
  height: number;
  mime: string;
  name: string | undefined;
  size: number;
  date: string | undefined;
}
