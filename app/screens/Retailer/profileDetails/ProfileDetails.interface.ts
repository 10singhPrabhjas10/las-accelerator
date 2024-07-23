export interface IPersonalDetailsResponse {
  dateOfBirth: string;
  emailId: string;
  gender: string;
  maritalStatus: string;
  marriageAnniversary: string;
  nameOfFirm: string;
  retailerAlternativePhoneNo: string;
  retailerPhoneNo: string;
  customerMobile?: string;
}

export interface IBusinessDetailsResponse {
  storeImage: string;
  latitude: number;
  longitude: number;
  contactPerson: string;
  phoneNo: string;
  nameOfFirm: string;
  pincode: string;
  area: string;
  district: string;
  state: string;
  invitationDate: string;
  address: string;
  retailerName: string;
  retailerPhoneNo: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
}

export interface IBankDetailsResponse {
  gstin: string;
  retailerGstIn: boolean;
  retailerPanCardNo: string;
}

export interface IInfluncerMappingResponse {
  influencerName: string;
  influencerType: string;
  status: string;
  dateOfJoining: string;
}

export interface IPersonalDetailsReqyBody {
  emailId?: string;
  maritalStatus?: string;
  marriageAnniversary?: string;
}

export interface IBusinessDetailsReqyBody {
  storeImage?: string;
}

export interface IStoreDetailsResponse {
  entityType: string;
  storeType: string;
  storeTurnover: string;
  frequencyOfPurchase: number;
  lastSixMonthsSales: number;
}

export interface IDataItem {
  title: string;
  text: string;
}

export interface ITransformedBusinessDetails {
  storeImage: string;
  data: IDataItem[];
  areaId: string;
}
